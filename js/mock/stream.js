/* ============================================================
 * stream.js · 模拟实时源（无后端时驱动大屏）
 *   downloads : 左区 APK 下载事件发生器（含"同款不同渠道"与"新增App"两种事件）
 *   logs      : 中区 SSE 日志仿真器（按设备剧本循环，节奏随机）
 * 真实模式下这两个发生器不启动，由 api/devices.js、api/logs.js 接管同一回调面。
 * ============================================================ */
(function (AF) {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 工具 ---------- */
  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function hex(n) {
    var s = '', c = '0123456789ABCDEF';
    for (var i = 0; i < n; i++) s += c[Math.floor(Math.random() * 16)];
    return s;
  }
  /* 仿源头A清单里的 6 位随机 App 名（AZFOUe 式） */
  function randomAppName() {
    var c = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    var s = '';
    for (var i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)];
    return s;
  }
  function randomPkg() {
    var tlds = ['com', 'net', 'cc', 'org', 'info', 'hkq', 'me', 'ugp', 'xvr', 'kul'];
    var seg = function () { return hex(0) || Math.random().toString(36).slice(2, 2 + Math.floor(rand(4, 9))); };
    return pick(tlds) + '.' + seg() + '.' + seg() + seg();
  }

  var uidSeq = 0;

  /* ---------- 左区：下载事件流 ---------- */
  var downloads = {
    timer: null,
    sinceNew: 0,
    start: function (cb) {
      this.stop();
      var self = this;
      var pool = AF.DATA.APK_POOL;
      var tick = function () {
        self.sinceNew++;
        var isBrandNew = self.sinceNew >= 14;            // 约每 14 个下载事件出 1 个"不同App"
        var ev;
        if (isBrandNew) {
          self.sinceNew = 0;
          var name = randomAppName();
          ev = {
            uid: ++uidSeq, app: name, pkg: randomPkg(),
            category: pick(['刷单返利类', '网络交友-约炮引流', '虚假服务', '冒充电商物流客服', '虚假网络投资理财']),
            source: 'B', md5: hex(32), sizeMB: +rand(3.5, 42).toFixed(1),
            time: AF.fmt.hms(), isNew: true, variant: false
          };
          cb.onDistinct && cb.onDistinct(ev);
        } else {
          var base = pick(pool);
          var variant = Math.random() < 0.62;           // 多数为同款不同渠道（重签名新MD5）
          ev = {
            uid: ++uidSeq,
            app: base.app, pkg: base.pkg, category: base.category,
            source: Math.random() < 0.3 ? 'A' : base.source,
            md5: variant ? hex(32) : base.md5,
            sizeMB: variant ? +(base.sizeMB * (1 + rand(-0.025, 0.025))).toFixed(1) : base.sizeMB,
            time: AF.fmt.hms(), isNew: false, variant: variant
          };
        }
        cb.onEvent && cb.onEvent(ev);
      };
      /* 先补一批历史，随后持续产出 */
      for (var i = 0; i < 6; i++) tick();
      this.timer = setInterval(tick, reduceMotion ? 2600 : 1100);
    },
    stop: function () { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
  };

  /* ---------- 中区：日志仿真（SSE 形态） ---------- */
  var logs = {
    timer: null,
    state: {},
    start: function (cb) {
      this.stop();
      var self = this;
      var ids = AF.DATA.DEVICES.map(function (d) { return d.deviceId; });
      ids.forEach(function (id, i) {
        self.state[id] = { idx: 0, nextAt: Date.now() + 600 + i * 900 };
      });
      this.timer = setInterval(function () {
        var now = Date.now();
        ids.forEach(function (id) {
          var st = self.state[id];
          if (now < st.nextAt) return;
          var dev = AF.DATA.DEVICES.filter(function (d) { return d.deviceId === id; })[0];
          var script = AF.DATA.SCRIPTS[id] || [];
          if (!script.length) return;
          var line = script[st.idx % script.length];
          cb.onLog && cb.onLog({
            time: AF.fmt.hms(),
            deviceId: id,
            serial: dev.adbSerial,
            type: dev.type,
            app: dev.currentApp,
            level: line.t,
            msg: line.m
          });
          st.idx++;
          /* 一轮结束：长停顿后重播（模拟新一轮对线） */
          if (st.idx % script.length === 0) st.nextAt = now + rand(9000, 16000);
          else st.nextAt = now + (reduceMotion ? 3600 : rand(1300, 3100));
        });
      }, reduceMotion ? 1500 : 650);
    },
    stop: function () { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
  };

  AF.stream = { downloads: downloads, logs: logs };
})(window.AF = window.AF || {});
