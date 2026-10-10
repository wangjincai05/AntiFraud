/* center-panel.js · 中区：6 台设备准实时画面墙 + SSE 实时日志 */
(function (AF) {
  'use strict';

  var MAX_LOG = 90;
  var cards = {};   // deviceId -> 卡片 DOM 引用

  var TYPE_LABEL = { enter: '进入客服', send: '发送话术', recv: '收到回复', shot: '自动截屏', code: '取码结果', sys: '系统' };

  function esc(s) { return AF.fmt.escape(s); }
  function shortSerial(serial, type) {
    if (!serial || serial === '—') return type === 'emulator' ? '模拟器' : '真机';
    if (serial.indexOf('127.0.0.1') === 0) return '模拟·' + serial.split(':')[1];
    var m = serial.match(/192\.168\.\d+\.(\d+)/);
    return (type === 'emulator' ? '模拟·' : '真机·') + (m ? m[1] : serial);
  }

  /* ---------------- 设备墙 ---------------- */
  function buildCard(d) {
    var isEmu = d.device_type === 'emulator';
    var card = document.createElement('div');
    card.className = 'phone';
    card.dataset.id = d.device_id;
    card.innerHTML =
      '<div class="phone-frame">' +
        '<div class="phone-screen">' +
          '<img alt="" style="display:none">' +
          '<div class="flicker"></div>' +
          '<div class="phone-placeholder">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>' +
            '<span class="ph-text">在线暂无画面<br>HTTP 444 · 等待 Agent 推送</span>' +
          '</div>' +
          '<div class="phone-live"><i></i>LIVE</div>' +
          '<div class="phone-apptag">' + esc(d.currentApp || '等待装机…') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="phone-meta">' +
        '<div class="pm1"><span class="tag ' + (isEmu ? 'tag-info' : 'tag-a') + '">' + (isEmu ? '模拟器' : '真机') + '</span>' + esc(d.model || '') + '</div>' +
        '<div class="pm2"><span>' + esc(d.adb_serial || '') + '</span><span class="sp" style="flex:1"></span>' +
          '<span class="batt ' + ((d.battery_level || 100) < 30 ? 'low' : '') + '"><i><b style="width:' +
          Math.min(100, d.battery_level || 100) + '%"></b></i>' + (d.battery_level != null ? d.battery_level + '%' : '—') + '</span>' +
        '</div>' +
      '</div>';

    var img = card.querySelector('img');
    var ph = card.querySelector('.phone-placeholder');
    img.addEventListener('load', function () { img.style.display = 'block'; ph.style.display = 'none'; });
    img.addEventListener('error', function () { img.style.display = 'none'; ph.style.display = 'flex'; });
    return card;
  }

  var wallPrimed = false;
  function renderWall(devices) {
    var wall = document.getElementById('deviceWall');
    /* 每个数据源会话的首批列表到达时清场（mock 预置/真实列表互不残留） */
    if (!wallPrimed) { wall.innerHTML = ''; cards = {}; wallPrimed = true; }
    var realN = 0, emuN = 0;
    devices.forEach(function (d) {
      if (d.device_type === 'emulator') emuN++; else realN++;
      if (!cards[d.device_id]) {
        var c = buildCard(d);
        wall.appendChild(c);
        cards[d.device_id] = {
          root: c, img: c.querySelector('img'), ph: c.querySelector('.phone-placeholder'),
          screen: c.querySelector('.phone-screen'),
          apptag: c.querySelector('.phone-apptag'),
          batt: c.querySelector('.batt'),
          live: c.querySelector('.phone-live')
        };
      } else {
        /* 电量/在线状态刷新 */
        if (d.is_online === false) { cards[d.device_id].ph.style.display = 'flex'; cards[d.device_id].img.style.display = 'none'; }
      }
      if (d.currentApp && cards[d.device_id]) cards[d.device_id].apptag.textContent = d.currentApp;
    });
    var sum = document.getElementById('wallSummary');
    if (sum) sum.textContent = '真机 ' + realN + ' · 模拟器 ' + emuN;
  }

  function onFrame(f) {
    var c = cards[f.deviceId];
    if (!c) return;
    if (f.status === 444) { c.img.style.display = 'none'; c.ph.style.display = 'flex'; return; }
    c.screen.classList.remove('refreshing');
    void c.screen.offsetWidth;
    c.screen.classList.add('refreshing');
    if (f.img) { if (c.img.getAttribute('src') !== f.img) c.img.src = f.img; }
    else if (f.url) { c.img.src = f.url; }
  }

  /* ---------------- 日志 ---------------- */
  function appendLog(e) {
    var box = document.getElementById('logScroll');
    var row = document.createElement('div');
    row.className = 'log-row';
    var devCls = e.type === 'emulator' ? 'd-emu' : 'd-real';
    row.innerHTML =
      '<span class="log-time">' + esc(e.time) + '</span>' +
      '<span class="log-dev ' + devCls + '">' + esc(shortSerial(e.serial, e.type)) + '</span>' +
      '<span class="log-type t-' + e.level + '"><i></i>' + (TYPE_LABEL[e.level] || '事件') + '</span>' +
      '<span class="log-msg">' + esc(e.msg) + '</span>';
    box.insertBefore(row, box.firstChild);
    while (box.children.length > MAX_LOG) box.removeChild(box.lastChild);
  }

  function setLogState(state) {
    var lamp = document.getElementById('lampLog');
    var txt = document.getElementById('logState');
    lamp.className = 'lamp' + (state === 'connected' ? '' : state === 'reconnecting' ? ' amber' : ' off');
    txt.textContent = state === 'connected' ? '已连接' : state === 'reconnecting' ? '重连中…' : '已断开';
  }

  AF.centerPanel = {
    reset: function () {
      wallPrimed = false; cards = {};
      var wall = document.getElementById('deviceWall');
      if (wall) wall.innerHTML = '';
      var box = document.getElementById('logScroll');
      if (box) box.innerHTML = '';
      AF.devices.stop(); AF.logFeed.stop();
    },
    init: function () {
      this.reset();
      AF.devices.start({
        onList: renderWall,
        onFrame: onFrame,
        onError: function (m) {
          appendLog({ time: AF.fmt.hms(), serial: '—', type: 'real_device', level: 'sys', msg: '⚠ ' + m });
          AF.bus.emit('data-error', m);
        }
      });

      AF.logFeed.start({
        onLog: appendLog,
        onState: setLogState,
        onError: function (m) {
          appendLog({ time: AF.fmt.hms(), serial: '—', type: 'real_device', level: 'sys', msg: '⚠ ' + m });
          AF.bus.emit('data-error', m);
        }
      });
    }
  };
})(window.AF = window.AF || {});
