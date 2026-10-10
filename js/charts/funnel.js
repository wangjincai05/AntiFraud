/* funnel.js · 左区：入口收敛漏斗 + 案件类别条形图（ECharts 暗色） */
(function (AF) {
  'use strict';

  var AXIS = '#6c84a3', SPLIT = 'rgba(86,132,184,.12)';

  AF.charts = AF.charts || {};

  AF.charts.funnel = function (el) {
    if (!window.echarts || !el) return null;
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    var LIGHT = ['rgba(56,225,255,.15)', 'rgba(70,168,255,.15)', 'rgba(255,176,32,.15)', 'rgba(255,77,94,.18)'];
    var STRONG = ['#38e1ff', '#46a8ff', '#ffb020', '#ff4d5e'];
    var data = AF.DATA.FUNNEL.map(function (d, idx) {
      return {
        name: d.name, value: d.value, grade: d.grade,
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: LIGHT[idx] },
              { offset: 1, color: STRONG[idx] }
            ]
          },
          borderColor: STRONG[idx],
          borderWidth: 1
        }
      };
    });

    chart.setOption({
      animationDuration: 900,
      tooltip: {
        backgroundColor: '#0c1628', borderColor: 'rgba(92,168,255,.4)', textStyle: { color: '#e8f1ff', fontSize: 12 },
        formatter: function (p) {
          return p.name + '<br/>量级：<b>' + AF.fmt.num(p.value) + '</b> ' + (p.dataIndex === 3 ? '款/天' : '条·个/天')
            + '<br/>证据等级：' + p.data.grade + ' 级';
        }
      },
      series: [{
        type: 'funnel', left: 16, right: 90, top: 8, bottom: 46,
        minSize: '24%', maxSize: '100%', sort: 'descending', gap: 3,
        label: {
          show: true, position: 'right', color: '#cdddf2', fontSize: 11, lineHeight: 15,
          formatter: function (p) {
            var unit = p.dataIndex === 3 ? ' 款/天' : ' /天';
            return '{n|' + p.name + '}  {g|' + p.data.grade + '级}\n{v|' + AF.fmt.num(p.value) + '}' + unit;
          },
          rich: {
            n: { color: '#e8f1ff', fontSize: 11.5, fontWeight: 600 },
            g: { color: '#6c84a3', fontSize: 9.5, fontFamily: 'Consolas' },
            v: { color: '#38e1ff', fontSize: 15, fontFamily: 'Consolas', fontWeight: 700 }
          }
        },
        labelLine: { length: 12, lineStyle: { color: 'rgba(92,168,255,.35)' } },
        itemStyle: { opacity: .92 },
        emphasis: { label: { fontSize: 12 } },
        data: data
      }],
      graphic: [
        {
          type: 'text', left: 14, bottom: 24,
          style: { text: '旁证：含下载特征记录 8,066 条/天（A级）', fill: '#a9bdd6', fontSize: 10.5, fontFamily: 'Consolas' }
        },
        {
          type: 'text', left: 14, bottom: 8,
          style: { text: '爬取规则：URL形态判入口 → 跟JS真实走链 → 点穿风险页 → 体积指纹识别同款去重', fill: '#6c84a3', fontSize: 10 }
        }
      ]
    });
    return chart;
  };

  AF.charts.categories = function (el) {
    if (!window.echarts || !el) return null;
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    var cats = AF.DATA.CATEGORIES;
    chart.setOption({
      animationDuration: 800,
      grid: { left: 128, right: 34, top: 4, bottom: 4, containLabel: false },
      tooltip: { backgroundColor: '#0c1628', borderColor: 'rgba(92,168,255,.4)', textStyle: { color: '#e8f1ff', fontSize: 12 } },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category', inverse: true,
        data: cats.map(function (c) { return c.name; }),
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: AXIS, fontSize: 10.5 }
      },
      series: [{
        type: 'bar', barWidth: 8,
        data: cats.map(function (c, i) {
          return {
            value: c.value,
            itemStyle: {
              color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [{ offset: 0, color: 'rgba(56,225,255,.18)' }, { offset: 1, color: i < 2 ? '#38e1ff' : '#46a8ff' }] },
              borderRadius: [0, 2, 2, 0]
            }
          };
        }),
        label: { show: true, position: 'right', color: '#7fb8e8', fontSize: 10, fontFamily: 'Consolas' },
        splitLine: { show: false }
      }]
    });
    return chart;
  };
})(window.AF = window.AF || {});
