/* header.js · 顶栏：时钟、KPI 计数动画、不同 App 数联动 */
(function (AF) {
  'use strict';

  var WEEK = ['日', '一', '二', '三', '四', '五', '六'];

  AF.header = {
    init: function () {
      var timeEl = document.getElementById('clockTime');
      var dateEl = document.getElementById('clockDate');
      function tick() {
        var d = new Date();
        function p(n) { return (n < 10 ? '0' : '') + n; }
        timeEl.textContent = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
        dateEl.textContent = d.getFullYear() + '年' + p(d.getMonth() + 1) + '月' + p(d.getDate())
          + '日 星期' + WEEK[d.getDay()] + ' · 内部研判';
      }
      tick(); setInterval(tick, 1000);

      /* KPI 入场计数 */
      document.querySelectorAll('[data-kpi]').forEach(function (el) {
        var raw = el.textContent.replace(/[^0-9]/g, '');
        var final = parseInt(raw, 10) || 0;
        el.textContent = '0';
        AF.fmt.countUp(el, 0, final, 1100);
      });

      /* 左区发现"不同App"时联动顶栏 */
      AF.bus.on('distinct-app', function (n) {
        var el = document.querySelector('[data-kpi="apps"]');
        var cur = parseInt((el.textContent || '').replace(/[^0-9]/g, ''), 10) || 0;
        if (n > cur) { el.textContent = AF.fmt.num(n); el.style.textShadow = '0 0 18px rgba(255,77,94,.8)'; setTimeout(function(){ el.style.textShadow = ''; }, 900); }
      });
    }
  };
})(window.AF = window.AF || {});
