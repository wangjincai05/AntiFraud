/* app.js · 启动编排：scale 等比适配 → 各栏渲染 → 数据源启动 */
(function (AF) {
  'use strict';

  var W = 1920, H = 1080;

  function fitStage() {
    var scale = Math.min(window.innerWidth / W, window.innerHeight / H);
    var stage = document.getElementById('stage');
    stage.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
  }

  window.addEventListener('resize', fitStage);
  window.addEventListener('DOMContentLoaded', function () {
    fitStage();

    AF.header.init();
    AF.leftPanel.init();
    AF.centerPanel.init();
    AF.rightPanel.init();
    AF.detailModal.init();
    AF.settings.init();

    console.log('[反诈大屏] 启动完成 · 模式=' + AF.config.mode +
      ' · ECharts=' + (window.echarts ? 'ok' : 'missing'));
  });
})(window.AF = window.AF || {});
