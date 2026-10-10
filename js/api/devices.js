/* ============================================================
 * devices.js · 设备画面适配层（mock / real 同一回调面）
 *   start({ onList(devices), onFrame({deviceId,status,img,url}) })
 *   real 模式：GET /api/v1/devices + 每 2s 给每台设备签发防缓存截图 URL
 *              （444=在线无图、网络错误 → 组件侧 onerror 显示占位）
 * ============================================================ */
(function (AF) {
  'use strict';

  var frameTimer = null, listTimer = null, shotIdx = {};

  function startMock(cb) {
    var devs = AF.DATA.DEVICES.map(function (d) {
      return {
        device_id: d.deviceId, adb_serial: d.adbSerial, device_type: d.type,
        os_version: d.osVersion, model: d.model, product: d.product,
        battery_level: d.battery, is_online: true,
        screen_width: d.screenW, screen_height: d.screenH,
        currentApp: d.currentApp, shots: d.shots
      };
    });
    cb.onList(devs);
    devs.forEach(function (d) { shotIdx[d.device_id] = 0; });

    function emitFrames() {
      devs.forEach(function (d) {
        if (!d.shots || !d.shots.length) { cb.onFrame({ deviceId: d.device_id, status: 444 }); return; }
        var idx = shotIdx[d.device_id] || 0;
        cb.onFrame({ deviceId: d.device_id, status: 200, img: d.shots[idx] });
        shotIdx[d.device_id] = (idx + 1) % d.shots.length;
      });
    }
    emitFrames();   /* 首帧立即下发，避免开机误闪 444 占位 */
    frameTimer = setInterval(emitFrames, AF.config.screenshotInterval + 300);
  }

  function startReal(cb) {
    var base = AF.config.baseUrl;
    var known = {};

    function pollList() {
      fetch(base + '/api/v1/devices')
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (list) {
          list.forEach(function (d) { known[d.device_id] = true; });
          cb.onList(list);
        })
        .catch(function (e) {
          cb.onError && cb.onError('设备列表获取失败：' + e.message + '（请检查中控地址/CORS）');
        });
    }
    pollList();
    listTimer = setInterval(pollList, 10000);

    /* 截图只签发 URL，由 <img> 自行加载；444/离线在组件 onerror/onload 区分 */
    frameTimer = setInterval(function () {
      Object.keys(known).forEach(function (id) {
        cb.onFrame({
          deviceId: id, status: 200,
          url: base + '/api/v1/devices/' + id + '/screenshot?t=' + Date.now()
        });
      });
    }, AF.config.screenshotInterval);
  }

  AF.devices = {
    start: function (cb) {
      this.stop();
      if (AF.config.mode === 'real') startReal(cb); else startMock(cb);
    },
    stop: function () {
      if (frameTimer) { clearInterval(frameTimer); frameTimer = null; }
      if (listTimer) { clearInterval(listTimer); listTimer = null; }
      shotIdx = {};
    }
  };
})(window.AF = window.AF || {});
