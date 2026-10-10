/* detail-modal.js · 右区详情弹窗（三要素：APK信息 / 中间取证图 / 转款码） */
(function (AF) {
  'use strict';

  var cur = null;       // 当前记录
  var shotIdx = 0, codeIdx = 0;

  function esc(s) { return AF.fmt.escape(s == null ? '' : s); }
  function $(id) { return document.getElementById(id); }

  function row(label, value, mono) {
    return '<div class="info-row"><span>' + label + '</span>' +
      '<b' + (mono ? ' class="mono"' : '') + '>' + (value === '' || value == null ? '—' : value) + '</b></div>';
  }

  function renderInfo(c) {
    $('detailInfo').innerHTML =
      row('应用名称', esc(c.app)) +
      row('包名', esc(c.pkg), true) +
      row('安装包 MD5', esc(c.md5), true) +
      row('案件类别', esc(c.category || '类别未标注')) +
      row('任务 ID', esc(c.taskId), true) +
      (c.batch ? row('批次编号', esc(c.batch), true) : '') +
      row('取证设备', esc(c.device || '未登记（仅信息留档）'), true) +
      row('对线时间', esc(c.time), true) +
      (c.counterparty ? row('对线对象', esc(c.counterparty)) : '') +
      (c.finalReply ? row('AI 末态回复', esc(c.finalReply)) : '') +
      row('话术链路', esc(c.flow));
  }

  function renderShots(c) {
    var stage = $('shotStage');
    var thumbs = $('shotThumbs');
    if (!c.shots || !c.shots.length) {
      var hint = (c.codeImages && c.codeImages.length)
        ? '该任务未留存对线过程截图<br><br>转款码原件已在第 ③ 栏取证'
        : '该任务无对线过程截图<br><br>仅留存账号 / 短链文本（信息样本）<br>截图凭证见交付任务夹目录';
      stage.innerHTML = '<div class="shot-empty">' + hint + '</div>';
      thumbs.innerHTML = '';
      return;
    }
    stage.innerHTML =
      '<button class="shot-nav prev" aria-label="上一张">‹</button>' +
      '<img alt="取证截图">' +
      '<button class="shot-nav next" aria-label="下一张">›</button>' +
      '<div class="shot-cap"><b class="cap-idx"></b><span class="cap-label"></span></div>';
    thumbs.innerHTML = c.shots.map(function (s, i) {
      return '<img class="shot-thumb' + (i === 0 ? ' active' : '') + '" src="' + esc(s.src) + '" data-i="' + i + '" alt="' + esc(s.label) + '">';
    }).join('');

    function show(i) {
      shotIdx = (i + c.shots.length) % c.shots.length;
      var img = stage.querySelector('img');
      img.src = c.shots[shotIdx].src;
      stage.querySelector('.cap-idx').textContent = (shotIdx + 1) + ' / ' + c.shots.length;
      stage.querySelector('.cap-label').textContent = c.shots[shotIdx].label;
      thumbs.querySelectorAll('.shot-thumb').forEach(function (t, ti) { t.classList.toggle('active', ti === shotIdx); });
    }
    stage.querySelector('.prev').onclick = function () { show(shotIdx - 1); };
    stage.querySelector('.next').onclick = function () { show(shotIdx + 1); };
    thumbs.querySelectorAll('.shot-thumb').forEach(function (t) {
      t.onclick = function () { show(parseInt(t.dataset.i, 10)); };
    });
    show(0);
  }

  function renderCode(c) {
    var box = $('detailCode');
    var head = '';
    if (c.codeImages && c.codeImages.length > 1) {
      head = '<div class="code-tabs">' + c.codeImages.map(function (img, i) {
        var name = img.label.split(' · ')[0];
        return '<button class="code-tab' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' + esc(name) + '</button>';
      }).join('') + '</div>';
    }

    var media;
    if (c.codeImages && c.codeImages.length) {
      media = '<div class="code-big"><img alt="转款码原件" src="' + esc(c.codeImages[0].src) + '"></div>';
    } else {
      media = '<div class="text-only-note">' +
        '<b>仅信息样本</b>（码图数 = 0 · 码指纹 NA）<br>' +
        '该任务未取得码图原件，多为短链 / H5 游戏充值通道；<br>收款账号与入口已按台账留档，截图凭证见任务夹。</div>';
    }

    box.innerHTML =
      head + media +
      row('收款人', esc(c.payee)) +
      row('账号类型', esc(c.codeType)) +
      row('金额', esc(c.amount)) +
      row('支付渠道', esc(c.channel || '—')) +
      row('账号 / 入口', esc(c.url || '未解析（仅截图）'), true) +
      row('码指纹', esc(c.fingerprint || 'NA'), true) +
      '<div class="evi-foot">证据产物<b style="color:#ff8b96"> 只增不改 · 绝不伪造 </b>；同码跨任务独立留证、按码指纹比对。收款人姓名已部分打码，材料限内部研判使用。</div>';

    var bigImg = box.querySelector('.code-big img');
    box.querySelectorAll('.code-tab').forEach(function (tab) {
      tab.onclick = function () {
        box.querySelectorAll('.code-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        codeIdx = parseInt(tab.dataset.i, 10);
        bigImg.src = c.codeImages[codeIdx].src;
      };
    });
  }

  function open(idx) {
    cur = AF.DATA.CODES[idx];
    shotIdx = 0; codeIdx = 0;
    $('detailTitle').textContent = '转款码取证详情 · ' + cur.app;
    renderInfo(cur);
    renderShots(cur);
    renderCode(cur);
    $('detailOverlay').classList.add('show');
    $('detailModal').classList.add('show');
    $('detailModal').querySelector('.modal-body').scrollTop = 0;
  }

  function close() {
    $('detailOverlay').classList.remove('show');
    $('detailModal').classList.remove('show');
    cur = null;
  }

  AF.detailModal = {
    open: open,
    close: close,
    init: function () {
      $('detailClose').onclick = close;
      $('detailOverlay').onclick = close;
      document.addEventListener('keydown', function (e) {
        if (!$('detailModal').classList.contains('show')) return;
        if (e.key === 'Escape') close();
        if (cur && cur.shots && cur.shots.length) {
          if (e.key === 'ArrowLeft') $('shotStage').querySelector('.prev').click();
          if (e.key === 'ArrowRight') $('shotStage').querySelector('.next').click();
        }
      });
    }
  };
})(window.AF = window.AF || {});
