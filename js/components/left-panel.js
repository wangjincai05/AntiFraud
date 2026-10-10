/* left-panel.js · 左区：双口径卡片、图表、APK 下载滚动流（含状态机） */
(function (AF) {
  'use strict';

  var MAX_ROWS = 22;
  var dlCount = AF.DATA.V4.todayDownloads;
  var appCount = AF.DATA.V4.distinctMainstream;
  var timers = {};           // uid -> [timerIds]
  var hovering = false;
  var buffer = [];

  /* —— 下载源统计（累计 / 当日，按 ev.source 分桶） —— */
  var srcStats = {
    A: { cumulative: AF.DATA.SOURCE_STATS.A.cumulative, today: AF.DATA.SOURCE_STATS.A.today, color: AF.DATA.SOURCE_STATS.A.color, name: AF.DATA.SOURCE_STATS.A.name },
    B: { cumulative: AF.DATA.SOURCE_STATS.B.cumulative, today: AF.DATA.SOURCE_STATS.B.today, color: AF.DATA.SOURCE_STATS.B.color, name: AF.DATA.SOURCE_STATS.B.name }
  };

  function el(id) { return document.getElementById(id); }
  function esc(s) { return AF.fmt.escape(s); }

  /* —— 下载完成卡 + 校验→入库→推送 状态机（下载完成才上屏，一行 = 一次下载完成） —— */
  var DL_MS_MIN = 1600, DL_MS_MAX = 2800;   // 模拟单个 APK 的下载耗时
  var STAGES = [
    { key: 'st-verify', text: 'MD5校验·指纹聚类', dur: 750 },
    { key: 'st-stored', text: '已入库', dur: 500 },
    { key: 'st-push', text: '推送装机', dur: -1 }
  ];

  function clearTimers(uid) {
    (timers[uid] || []).forEach(clearInterval);
    (timers[uid + '_t'] || []).forEach(clearTimeout);
    delete timers[uid]; delete timers[uid + '_t'];
  }

  function setStage(row, idx) {
    var st = STAGES[idx];
    var stageEl = row.querySelector('.dl-stage');
    stageEl.className = 'dl-stage ' + st.key;
    stageEl.innerHTML = (st.key === 'st-push' ? '' : '<i></i>') + esc(st.text);
    if (st.key === 'st-push') {
      clearTimers(row.dataset.uid);
      return;
    }
    var uid = row.dataset.uid;
    timers[uid + '_t'] = timers[uid + '_t'] || [];
    timers[uid + '_t'].push(setTimeout(function () { setStage(row, idx + 1); }, st.dur));
  }

  function createRow(ev) {
    var list = el('dlStream');
    var row = document.createElement('div');
    row.className = 'dl-row';
    row.dataset.uid = ev.uid;

    var badge = ev.isNew
      ? '<span class="dl-new">新增App</span>'
      : (ev.variant ? '<span class="tag tag-info" title="体积指纹同簇，判定同款不同渠道（重签名新MD5）">同款×渠道</span>' : '');

    row.innerHTML =
      '<div class="dl-top">' +
        '<span class="dl-name">' + esc(ev.app) + '</span>' +
        '<span class="tag ' + (ev.source === 'A' ? 'tag-a' : 'tag-b') + '">' + (ev.source === 'A' ? '源头A 成品库' : '源头B 爬取') + '</span>' +
        '<span class="tag tag-cat">' + esc(ev.category) + '</span>' +
        badge +
        '<span class="sp"></span>' +
        '<span class="dl-stage st-verify"><i></i>MD5校验·指纹聚类</span>' +
      '</div>' +
      '<div class="dl-pkg" title="' + esc(ev.pkg) + '">' + esc(ev.pkg) + '</div>' +
      '<div class="dl-bot"><span>MD5 ' + AF.fmt.md5Short(ev.md5) + '</span><span>' + ev.sizeMB.toFixed(1) + ' MB</span>' +
        '<span class="sp"></span><span>' + esc(ev.time) + '</span></div>';

    list.insertBefore(row, list.firstChild);

    /* 上屏即视为下载完成，走 校验→入库→推送 状态机 */
    setStage(row, 0);

    /* 裁剪超量节点 */
    while (list.children.length > MAX_ROWS) {
      var old = list.lastElementChild;
      clearTimers(old.dataset.uid);
      list.removeChild(old);
    }
  }

  function bumpDl() {
    dlCount++;
    var e = el('caliDl'); if (e) e.textContent = AF.fmt.num(dlCount);
  }
  function bumpApps() {
    appCount++;
    var e = el('caliApps');
    if (e) { e.textContent = appCount; e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); }
    AF.bus.emit('distinct-app', appCount);
  }

  function flushBuffer() {
    var items = buffer.splice(0);
    items.forEach(function (ev, i) { setTimeout(function () { completeDownload(ev); }, i * 120); });
  }

  function addEvent(ev) {
    /* 模拟下载耗时：下载完成后才计入并上屏 */
    timers[ev.uid + '_t'] = [setTimeout(function () { completeDownload(ev); },
      DL_MS_MIN + Math.random() * (DL_MS_MAX - DL_MS_MIN))];
  }

  function completeDownload(ev) {
    if (hovering) { if (buffer.length < 30) buffer.push(ev); return; }
    bumpDl();
    bumpSource(ev.source);
    if (ev.isNew) bumpApps();
    createRow(ev);
  }

  /* —— 下载源统计：渲染 + 实时刷新 —— */
  function srcCardHTML(key) {
    var s = srcStats[key];
    return '<div class="src-card ' + key + '">' +
      '<div class="src-name"><i style="background:' + s.color + '"></i>' + esc(s.name) + '</div>' +
      '<div class="src-cum" id="srcCum' + key + '">' + AF.fmt.num(s.cumulative) + '</div>' +
      '<div class="src-cum-label">累计下载（次）</div>' +
      '<div class="src-today"><b id="srcToday' + key + '">' + AF.fmt.num(s.today) + '</b><span>当日下载</span></div>' +
    '</div>';
  }

  function renderSourceStats() {
    el('srcStatsBody').innerHTML =
      '<div class="src-grid">' + srcCardHTML('A') + srcCardHTML('B') + '</div>' +
      '<div class="src-ratio"><span class="sr-label">今日占比</span>' +
        '<div class="sr-bar"><i id="srBarA" style="background:' + srcStats.A.color + '"></i><i id="srBarB" style="background:' + srcStats.B.color + '"></i></div>' +
        '<span class="sr-pct" id="srPctA">A 0%</span><span class="sr-pct" id="srPctB">B 0%</span>' +
      '</div>';
    updateSrcStats();
  }

  function updateSrcStats() {
    var cumA = el('srcCumA'), cumB = el('srcCumB'), todayA = el('srcTodayA'), todayB = el('srcTodayB');
    if (cumA) cumA.textContent = AF.fmt.num(srcStats.A.cumulative);
    if (cumB) cumB.textContent = AF.fmt.num(srcStats.B.cumulative);
    if (todayA) todayA.textContent = AF.fmt.num(srcStats.A.today);
    if (todayB) todayB.textContent = AF.fmt.num(srcStats.B.today);
    var totalToday = srcStats.A.today + srcStats.B.today;
    var pa = totalToday ? Math.round(srcStats.A.today / totalToday * 100) : 50;
    var pb = 100 - pa;
    var barA = el('srBarA'), barB = el('srBarB'), pctA = el('srPctA'), pctB = el('srPctB');
    if (barA) barA.style.flexBasis = pa + '%';
    if (barB) barB.style.flexBasis = pb + '%';
    if (pctA) pctA.textContent = 'A ' + pa + '%';
    if (pctB) pctB.textContent = 'B ' + pb + '%';
  }

  function bumpSource(src) {
    var s = srcStats[src] || srcStats.B;
    s.cumulative++; s.today++;
    updateSrcStats();
  }

  AF.leftPanel = {
    init: function () {
      renderSourceStats();
      AF.charts.categories(el('catChart'));

      var scroll = el('dlStream');
      scroll.addEventListener('mouseenter', function () { hovering = true; });
      scroll.addEventListener('mouseleave', function () { hovering = false; flushBuffer(); });

      /* 左区下载流始终由内置发生器驱动（真实下载管道接口待建，卡面已标"模拟"） */
      AF.stream.downloads.start({ onEvent: addEvent });
    }
  };
})(window.AF = window.AF || {});
