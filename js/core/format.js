/* format.js · 纯函数工具：时间 / 数字 / 文本 / DOM */
(function (AF) {
  'use strict';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var WEEK = ['日', '一', '二', '三', '四', '五', '六'];

  AF.fmt = {
    pad: pad,
    hms: function (d) {
      d = d || new Date();
      return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    },
    fullDate: function (d) {
      d = d || new Date();
      return d.getFullYear() + '年' + pad(d.getMonth() + 1) + '月' + pad(d.getDate()) + '日 星期' + WEEK[d.getDay()];
    },
    num: function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    md5Short: function (m) { return m ? m.slice(0, 8) : '--------'; },
    escape: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    /* 数字滚动动画 */
    countUp: function (el, from, to, dur) {
      dur = dur || 800;
      var start = null;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = AF.fmt.num(Math.round(from + (to - from) * eased));
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  };

  /* 根据账号类型文本归类渠道（用于标签配色 / 环图） */
  AF.channelKind = function (codeType) {
    var t = codeType || '';
    if (t.indexOf('双码') >= 0) return 'dual';
    if (t.indexOf('支付宝') >= 0 && t.indexOf('微信') >= 0) return 'dual';
    if (t.indexOf('游戏充值') >= 0) return 'game';
    if (t.indexOf('支付宝') >= 0) return 'ali';
    return 'wx';
  };
})(window.AF = window.AF || {});
