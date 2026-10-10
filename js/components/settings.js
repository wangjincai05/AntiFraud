/* settings.js · 数据源设置：模拟/真实切换、中控地址、连接状态提示 */
(function (AF) {
  'use strict';

  function $(id) { return document.getElementById(id); }
  var open = false;

  function syncUI() {
    document.querySelectorAll('#modeSeg button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.mode === AF.config.mode);
    });
    $('baseUrl').value = AF.config.baseUrl;
    $('sseUrl').value = AF.config.sseUrl;
    var ep = $('logEndpoint');
    if (ep) ep.textContent = AF.config.mode === 'real' ? ('SSE · ' + AF.config.sseUrl) : 'SSE · /api/logs（模拟）';
  }

  function setStatus(msg, isErr) {
    var el = $('connStatus');
    el.style.color = isErr ? '#ff8b96' : '#7ee0c0';
    el.textContent = msg;
  }

  AF.settings = {
    isOpen: function () { return open; },
    show: function () {
      syncUI();
      $('settingsOverlay').classList.add('show');
      $('settingsModal').classList.add('show');
      open = true;
    },
    hide: function () {
      $('settingsOverlay').classList.remove('show');
      $('settingsModal').classList.remove('show');
      open = false;
    },
    init: function () {
      syncUI();
      $('btnSettings').onclick = function () { AF.settings.show(); };
      $('settingsClose').onclick = function () { AF.settings.hide(); };
      $('settingsOverlay').onclick = function () { AF.settings.hide(); };

      document.querySelectorAll('#modeSeg button').forEach(function (b) {
        b.onclick = function () {
          AF.config.mode = b.dataset.mode;
          AF.config.save();
          syncUI();
          document.querySelectorAll('#modeSeg button').forEach(function (x) { x.classList.toggle('active', x === b); });
          /* 模式切换即时生效：重启中区数据源（左区下载流无真实接口，继续模拟） */
          AF.centerPanel.init();
          setStatus(AF.config.mode === 'real'
            ? '已切换真实接口：' + AF.config.baseUrl + '（如长时间无画面/日志，请检查 CORS 与 SSE 直连）'
            : '已切换模拟数据，全画面由内置数据源驱动。', false);
        };
      });

      $('baseUrl').addEventListener('change', function () {
        AF.config.baseUrl = this.value.trim().replace(/\/+$/, '');
        AF.config.sseUrl = AF.config.baseUrl + '/api/logs';
        AF.config.save(); syncUI();
        if (AF.config.mode === 'real') AF.centerPanel.init();
      });
      $('sseUrl').addEventListener('change', function () {
        AF.config.sseUrl = this.value.trim(); AF.config.save(); syncUI();
        if (AF.config.mode === 'real') AF.centerPanel.init();
      });

      AF.bus.on('data-error', function (m) {
        if (open) setStatus(AF.fmt.hms() + ' ' + m, true);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && open) AF.settings.hide();
      });
    }
  };
})(window.AF = window.AF || {});
