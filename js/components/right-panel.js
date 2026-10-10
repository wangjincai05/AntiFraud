/* right-panel.js · 右区：成果 KPI、渠道环图、转款码滚动码墙（两种形态） */
(function (AF) {
  'use strict';

  function esc(s) { return AF.fmt.escape(s == null ? '' : s); }
  function pad2(n) { return (n < 9 ? '0' : '') + (n + 1); }

  function channelTag(codeType) {
    switch (AF.channelKind(codeType)) {
      case 'dual': return '<span class="tag tag-dual">微信+支付宝双码</span>';
      case 'ali': return '<span class="tag tag-ali">支付宝</span>';
      case 'game': return '<span class="tag tag-game">游戏充值通道</span>';
      default: return '<span class="tag tag-wx">微信</span>';
    }
  }

  function cardHTML(c, idx, dataIdx) {
    var hasImg = c.codeImages && c.codeImages.length > 0;
    var thumb = hasImg
      ? '<div class="cc-thumb"><img src="' + esc(c.codeImages[0].src) + '" alt="转款码" loading="lazy">' +
        '<span class="evi-tag">取证原件</span></div>'
      : '<div class="cc-text-thumb">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="8.5" y1="11" x2="13.5" y2="11"/></svg>' +
          '<span>信息样本<br>凭证见任务夹</span></div>';

    return '<div class="code-card' + (hasImg ? '' : ' text-only') + '" data-idx="' + dataIdx + '">' +
      thumb +
      '<div class="cc-info">' +
        '<div class="cc-app">' + esc(c.app) + '<span class="seq">#' + pad2(idx) + ' · ' + esc(c.taskId) + '</span></div>' +
        '<div class="cc-tags">' + channelTag(c.codeType) +
          '<span class="tag tag-cat" style="max-width:158px;overflow:hidden;text-overflow:ellipsis" title="' + esc(c.category || '') + '">' + esc(c.category || '类别未标注') + '</span>' +
          (hasImg ? '' : '<span class="tag tag-info">仅信息</span>') +
        '</div>' +
        '<div class="cc-line"><em>收款人</em><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(c.payee) + '</span>' +
          '<span style="flex:1"></span><span class="cc-amount">' + esc(c.amount) + '</span></div>' +
        (c.url ? '<div class="cc-url" title="' + esc(c.url) + '">' + esc(c.url) + '</div>'
               : '<div class="cc-url" style="color:#6c84a3">账号未解析（仅截图凭证）</div>') +
        '<div class="cc-time">' + esc(c.time) + (c.device ? ' · ' + esc(c.device) : '') + '</div>' +
      '</div>' +
    '</div>';
  }

  AF.rightPanel = {
    init: function () {
      /* 二维码 KPI：今日按 CODES 实时统计；累计 = 历史基线 + 今日 */
      var codes = AF.DATA.CODES;
      var todayTotal = codes.length;
      var todayDedup = (function () {
        var seen = {}, n = 0;
        codes.forEach(function (c) {
          var urls = (c.url || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
          if (!urls.length) { n++; return; }              /* 无 URL（仅图片凭证）按独立一条计 */
          urls.forEach(function (u) { if (!seen[u]) { seen[u] = 1; n++; } });
        });
        return n;
      })();
      var kpiMap = {
        cumTotal: AF.DATA.QR_STATS.cumTotalBase + todayTotal,
        cumDedup: AF.DATA.QR_STATS.cumDedupBase + todayDedup,
        todayTotal: todayTotal,
        todayDedup: todayDedup
      };
      document.querySelectorAll('[data-rkpi]').forEach(function (el) {
        AF.fmt.countUp(el, 0, kpiMap[el.getAttribute('data-rkpi')] || 0, 900);
      });

      /* 码墙：一遍 + 克隆遍，CSS 纵向无缝循环；点击事件委托 */
      var track = document.getElementById('wallTrack');
      var half1 = document.createElement('div');
      half1.className = 'wall-half';
      var half2 = document.createElement('div');
      half2.className = 'wall-half clone';
      codes.forEach(function (c, i) {
        half1.insertAdjacentHTML('beforeend', cardHTML(c, i, i));
        half2.insertAdjacentHTML('beforeend', cardHTML(c, i, i + codes.length));
      });
      track.innerHTML = '';
      track.appendChild(half1);
      track.appendChild(half2);

      track.addEventListener('click', function (e) {
        var card = e.target.closest('.code-card');
        if (!card) return;
        var idx = parseInt(card.dataset.idx, 10) % codes.length;
        AF.detailModal.open(idx);
      });
    }
  };
})(window.AF = window.AF || {});
