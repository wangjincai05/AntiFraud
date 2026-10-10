/* channel-donut.js · 右区：收款渠道环图（中心总数 + 自定义图例） */
(function (AF) {
  'use strict';

  AF.charts = AF.charts || {};

  AF.charts.donut = function (el) {
    if (!window.echarts || !el) return null;
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    var data = AF.DATA.CHANNELS.map(function (c) {
      return { name: c.name, value: c.value, itemStyle: { color: c.color, borderColor: '#0a1220', borderWidth: 2 } };
    });
    chart.setOption({
      animationDuration: 900,
      tooltip: {
        backgroundColor: '#0c1628', borderColor: 'rgba(92,168,255,.4)',
        textStyle: { color: '#e8f1ff', fontSize: 12 },
        formatter: '{b}：<b>{c}</b> 条（{d}%）'
      },
      title: {
        text: '20', subtext: '码记录',
        left: 'center', top: '38%',
        textStyle: { color: '#ff4d5e', fontSize: 26, fontFamily: 'Consolas', fontWeight: 700 },
        subtextStyle: { color: '#6c84a3', fontSize: 10 }
      },
      series: [{
        type: 'pie', radius: ['62%', '82%'], center: ['50%', '50%'],
        avoidLabelOverlap: false, label: { show: false }, labelLine: { show: false },
        hoverAnimation: true,
        data: data
      }]
    });
    return chart;
  };
})(window.AF = window.AF || {});
