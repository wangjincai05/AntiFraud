/* ============================================================
 * config.js · 运行配置（模拟 / 真实接口开关，localStorage 持久化）
 *
 * 真实接口对接约定（源自 02-中区/CatDevicePlatform接口文档.md）：
 *   GET  {baseUrl}/api/v1/devices                       设备列表（内存读，毫秒级）
 *   GET  {baseUrl}/api/v1/devices/{id}/screenshot?t=    实时截图 PNG（444=在线暂无图）
 *   GET  {baseUrl}/api/v1/devices/{id}/ui_tree          UI 控件树
 *   SSE  {sseUrl}                                       text/event-stream 日志长连接
 * ★ SSE 必须直连后端；经未开启 StreamBody/ImmediateHeaderFlush
 *   的反向代理会被整体缓冲（读到 EOF 才转发 → 前端 8 秒 0 字节）。
 * ============================================================ */
(function (AF) {
  'use strict';

  var LS_MODE = 'af-screen-mode';
  var LS_BASE = 'af-screen-base-url';
  var LS_SSE  = 'af-screen-sse-url';

  AF.config = {
    mode: localStorage.getItem(LS_MODE) || 'mock',          // 'mock' | 'real'
    baseUrl: (localStorage.getItem(LS_BASE) || 'http://192.168.0.109:8080').replace(/\/+$/, ''),
    sseUrl: localStorage.getItem(LS_SSE) || 'http://192.168.0.109:8080/api/logs',
    screenshotInterval: 2000,                                // 截图轮询 2s（文档建议 1~2s）
    save: function () {
      localStorage.setItem(LS_MODE, this.mode);
      localStorage.setItem(LS_BASE, this.baseUrl);
      localStorage.setItem(LS_SSE, this.sseUrl);
    }
  };

  /* 极简事件总线：streams/panels/app 解耦 */
  AF.bus = {
    map: {},
    on: function (evt, fn) { (this.map[evt] = this.map[evt] || []).push(fn); },
    emit: function (evt, payload) {
      (this.map[evt] || []).forEach(function (fn) { try { fn(payload); } catch (e) { console.error(e); } });
    }
  };
})(window.AF = window.AF || {});
