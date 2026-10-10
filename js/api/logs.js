/* ============================================================
 * logs.js · 实时日志适配层（mock / real 同一回调面）
 *   start({ onLog(entry), onState('connected'|'reconnecting'|'closed') })
 *   real 模式：EventSource(SSE)，原生自动重连。
 *     约定事件字段（待后端实时日志接口对齐）：
 *       { time, device_id|serial, type, content|msg }
 *     type 归一：enter/send/recv/shot/code/sys
 * ★ SSE 必须直连后端；经未开流式的反代会被整体缓冲（8s 0 字节）。
 * ============================================================ */
(function (AF) {
  'use strict';

  var es = null;

  var TYPE_MAP = {
    '进入客服': 'enter', 'enter': 'enter', 'login': 'enter',
    '发送话术': 'send', 'send': 'send', 'sent': 'send',
    '收到回复': 'recv', 'recv': 'recv', 'reply': 'recv', 'receive': 'recv',
    '截图': 'shot', 'shot': 'shot', 'screenshot': 'shot',
    '取码结果': 'code', 'code': 'code', 'paycode': 'code',
    'sys': 'sys', 'system': 'sys', 'info': 'sys'
  };

  function normType(t) { return TYPE_MAP[t] || TYPE_MAP[String(t || '').toLowerCase()] || 'sys'; }

  function startMock(cb) {
    AF.stream.logs.start({
      onLog: function (e) {
        cb.onLog({ time: e.time, serial: e.serial, type: e.type, level: e.level, msg: e.msg });
      }
    });
    cb.onState && cb.onState('connected');
  }

  function startReal(cb) {
    try { es = new EventSource(AF.config.sseUrl); } catch (e) {
      cb.onState && cb.onState('closed');
      cb.onError && cb.onError('SSE 初始化失败：' + e.message);
      return;
    }
    es.onopen = function () { cb.onState && cb.onState('connected'); };
    es.onerror = function () {
      /* EventSource 会自动重连；若被反代缓冲，表象是长时间无消息而非 error */
      cb.onState && cb.onState('reconnecting');
      cb.onError && cb.onError('SSE 连接中断，正在自动重连（若长时间无日志，请确认直连后端、网关已开流式）');
    };
    es.onmessage = function (ev) {
      var d = {};
      try { d = JSON.parse(ev.data); } catch (e) { d = { content: ev.data }; }
      cb.onLog({
        time: d.time || AF.fmt.hms(),
        serial: d.device_id || d.serial || d.device || '—',
        type: (d.device_id && d.device_id.indexOf('127.0.0.1') === 0) ? 'emulator' : 'real_device',
        level: normType(d.type || d.event),
        msg: d.content || d.msg || d.text || ev.data
      });
    };
  }

  AF.logFeed = {
    start: function (cb) {
      this.stop();
      if (AF.config.mode === 'real') startReal(cb); else startMock(cb);
    },
    stop: function () {
      if (es) { es.close(); es = null; }
      AF.stream.logs.stop();
    }
  };
})(window.AF = window.AF || {});
