/* ============================================================
 * data.js · 内嵌数据集（全部源自交接材料，无 fetch，file:// 可开）
 *  ① CODES    右区 20 条转款码记录（codes.jsonl 两种形态 + 台账.csv 归一化）
 *  ② DEVICES  中区 6 台设备（设备信息.txt + 接口文档字段）
 *  ③ APK_POOL 左区下载流池（20 个真实 App；类别缺省按路由推断并标注）
 *  ④ V4 / CATEGORIES / CHANNELS 评估报告 v4 实测常量与图表数据
 * ============================================================ */
(function (AF) {
  'use strict';

  var EV = 'assets/evidence/';

  /* —— ① 转款码 20 条（按时间升序，与台账一致） —— */
  var CODES = [
    {
      recId: 'rec01', taskId: '260928_190527_130', app: 'cgnivQ',
      pkg: 'yyn.kdxhxbncvme.pyfjvrfssakssutp', md5: 'C08F338DA5844A822CF2E5558E5EF7E9',
      category: '网络交友-约炮引流', device: '192.168.0.130:5555',
      counterparty: '接待员-宁宁（本人不约）', payee: '敏嘉嘉(微信) / 陈(**炫)(支付宝)',
      codeType: '收款码(微信+支付宝双码截图)', amount: '21.6元(原价36 优惠价21)',
      channel: '诱导截图微信/支付宝零钱扫码支付',
      url: '', fingerprint: 'IMG:a5d084f8af516d6a',
      flow: '话术诱导→拒绝相机权限→索取联系方式→介绍会员套餐(A同城21/B同省41/C全国61)→发收款码要求扫码支付21.6元',
      finalReply: '我再考虑考虑', time: '2026-09-28 19:05:27',
      codeImages: [
        { src: EV + 'rec01/code_wx.jpg', label: '微信收款码 · 敏嘉嘉' },
        { src: EV + 'rec01/code_ali.jpg', label: '支付宝收款码 · 陈(**炫)' }
      ],
      shots: [
        { src: EV + 'rec01/shot_00.jpg', label: '01 进入聊天页' },
        { src: EV + 'rec01/shot_01.jpg', label: '02 拒绝相机权限' },
        { src: EV + 'rec01/shot_02.jpg', label: '03 会员套餐介绍' },
        { src: EV + 'rec01/shot_03.jpg', label: '04 收款码要求支付' },
        { src: EV + 'rec01/shot_04.jpg', label: '05 收款码与付款凭证' },
        { src: EV + 'rec01/shot_05.jpg', label: '06 末态 · 回复考虑考虑' }
      ]
    },
    {
      recId: 'rec02', taskId: '260928_201000_109', app: '𓇻♞',
      pkg: 'cc.steel.cedar.unity', md5: '4C3F60949A1BFEEF6187E21963D13D6F',
      category: '刷单返利类', device: '192.168.0.109:5555',
      counterparty: '1号-约爱经纪人-周晴（真人快捷回复）', payee: '家和万事兴',
      codeType: '收款码(微信)', amount: '32元(办会员)',
      channel: '诱导扫码支付(微信/支付宝零钱)',
      url: 'https://fsiekqq.com/p.html?xid=9a1S6B', fingerprint: 'IMG:1dbd7f1d380b6446',
      flow: '约爱引流→会员套餐(原价380/880/2080,7.8折)→要求付费32元办会员→发微信收款码(用零钱/余额宝,关WiFi防风控)',
      finalReply: '行 我办会员 咋支付', time: '2026-09-28 20:10:00',
      codeImages: [{ src: EV + 'rec02/code_wx.jpg', label: '微信收款码 · 家和万事兴' }],
      shots: [{ src: EV + 'rec02/shot_00.jpg', label: '00 客服会话' }]
    },
    {
      recId: 'rec03', taskId: '260928_201000_130', app: '☬ൢ',
      pkg: 'me.rain.gentle', md5: '907CB67C9F5D7742A87635BA61186F40',
      category: '刷单返利类', device: '192.168.0.130:5555',
      counterparty: '3号-约爱经纪人-鑫妍（真人快捷回复）', payee: '花开花落',
      codeType: '收款码(微信)', amount: '31.98元(办会员)',
      channel: '诱导扫码支付(微信/支付宝零钱)',
      url: 'https://icrozvf.com/p.html?xid=R89JM8', fingerprint: 'IMG:c789e86cc40c2843',
      flow: '约爱引流→会员套餐(原价380/880/2080,7.8折)→要求付费32元办会员→发微信收款码(用零钱;关WiFi防风控;收款异常联系妹妹换码)',
      finalReply: '行 我办会员 咋支付', time: '2026-09-28 20:10:00',
      codeImages: [{ src: EV + 'rec03/code_wx.jpg', label: '微信收款码 · 花开花落' }],
      shots: [{ src: EV + 'rec03/shot_00.jpg', label: '00 客服会话' }]
    },
    {
      recId: 'rec04', taskId: '260928_201000_132', app: 'C▴⓷Pj',
      pkg: 'info.cyber.dewdrop', md5: '3CA55CDFE074F0D09A36D63AA19C04B4',
      category: '刷单返利类', device: '192.168.0.132:5555',
      counterparty: '30号约爱客服 婉儿-24小时在线接单', payee: '李亚茹(微信) / 畅游归来(支付宝直连)',
      codeType: '收款码(微信+支付宝双码)', amount: '27.22元(会员)',
      channel: '诱导扫码支付(微信/支付宝零钱)',
      url: 'https://coeiolq.com/p.html?xid=BI8qMl | https://pay220.ysscoj.cn/69/qAvHKL/VGGPP',
      fingerprint: 'IMG:a71d5e5e4e6c049d',
      flow: '刷单返现漏斗(16元点击返25)→办VIP会员→发微信收款码27.22元(李亚茹)→以支付异常要求换码→改发支付宝直连支付页(畅游归来)',
      finalReply: '码打开就提示风险没付成 重新发一个', time: '2026-09-28 20:10:00',
      codeImages: [
        { src: EV + 'rec04/code_wx.jpg', label: '微信收款码 · 李亚茹' },
        { src: EV + 'rec04/code_ali.jpg', label: '支付宝直连 · 畅游归来' }
      ],
      shots: []
    },
    {
      recId: 'rec05', taskId: '260928_204000_109', app: 'ORqrPe',
      pkg: 'naa.hfktfaimlwbiykr.uvqarnqsdtelxmwdayk', md5: '9C1D445A3938C2A11452D02163E2ADF5',
      category: '刷单返利类', device: '192.168.0.109:5555',
      counterparty: '接待员 熏熏(约爱平台客服)', payee: 'A-欣欣',
      codeType: '收款码(微信个人)', amount: '21.6元(入会费)',
      channel: '诱导扫码支付(微信/支付宝零钱)',
      url: 'wxp://f2f0H9jGj6PvjQF_CZWpaX2o_eHPH0bGe0uGMV-dnWSrGyKgZ-hgBK9F1M-Fal6Xx-oZ',
      fingerprint: 'IMG:d41a0d0a003c64ec',
      flow: '约炮引流(需提供地区+年龄)→发全国资源图+办会员4步→办理入会进VIP群→发微信个人收款码21.6元(财付通)→要求支付后截图',
      finalReply: '卡片点不开 你直接发收款码图片过来', time: '2026-09-28 20:40:00',
      codeImages: [{ src: EV + 'rec05/code_wx.jpg', label: '微信个人收款码 · A-欣欣' }],
      shots: []
    },
    {
      recId: 'rec06', taskId: '260928_204000_132', app: 'vqTFTV',
      pkg: 'ugp.rfkrgjevxuv.aeeqyiocqdvmqxhtdsq', md5: 'F88C420AD950B6BF65D9C824E72B7477',
      category: '虚假服务', device: '192.168.0.132:5555',
      counterparty: '接待员~灵灵(约爱平台客服)', payee: '中手游(mobileztgame 支付网关)',
      codeType: '收款码(H5聚合支付·游戏充值通道)', amount: '22元(新人会员价,原25.2)',
      channel: '扫码支付(零钱/余额/花呗,禁银行卡)',
      url: 'https://mpay.sdk.mobileztgame.com/pay/oneqrcland2?fee=22.00&appid=5256',
      fingerprint: 'IMG:d8371defe7f429b2',
      flow: '约炮引流→发同城小姐姐信息卡→办会员(新人25.2→22元)→获取入会二维码(3分钟有效)→H5聚合支付页(游戏充值通道规避风控)',
      finalReply: '要开通 发收款码', time: '2026-09-28 20:40:00',
      codeImages: [{ src: EV + 'rec06/code_qr.jpg', label: 'H5聚合支付 · 游戏充值通道 · 中手游' }],
      shots: []
    },
    /* —— 7~20：仅信息样本（码图数=0、码指纹 NA） —— */
    { recId: null, taskId: '260928_210000_na', batch: 'T-B09-109', app: 'tQimPX', pkg: 'hkq.flmtwhyxrgrmfyh.svuycnjvoyumpay', md5: '9B82E8F2E47C78196A033956594968D7', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.109:5555', payee: '风行天下(经营)', codeType: '微信个人经营收款码', amount: '16元', url: 'https://payapp.wechatpay.cn/sjt/qr/AQHsDX62dlqgd6T29wEdAjhe', fingerprint: 'NA', flow: '约炮App→客服千瑜→办VIP会员A套餐16元→微信收款码', time: '2026-09-28 21:00:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_211500_na', batch: 'T-B11-132', app: 'κл😈낭', pkg: 'cc.sapphire.orchid', md5: '42848959EF2A5F8CA18064CFE2313DED', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.132:5555', payee: '顾红香', codeType: '微信个人收款码', amount: '21.66元', url: 'http://pwmqr.com/wx/photo/X4AG5JZX', fingerprint: 'NA', flow: '约炮App→客服约爱助理梦意→选号Y5473→选地点→办会员套餐21.66元→微信收款码', time: '2026-09-28 21:15:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_213400_na', batch: 'T-B12-127', app: 'exYWDT', pkg: 'xvr.ueapwdwysgtcm.vbluvftqmkbdqeuil', md5: '3C6C1E02FAA4CD1BF1DBBFC7EBB93A0B', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '中手游(mobileztgame)', codeType: '游戏充值通道(微信/支付宝扫码)', amount: '22.00元', url: 'https://mpay.sdk.mobileztgame.com/pay/oneqrcland2?fee=22.00&appid=5256', fingerprint: 'NA', flow: '约炮App→客服云朵→选号→办会员A套餐22元→财务入会码(游戏充值通道)', time: '2026-09-28 21:34:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_214300_na', batch: 'T-B13-127', app: 'fwrjek', pkg: 'kul.ibtsdejxjyaq.kiexrahufgyrdr', md5: '2A40B7E32AC91BD03FAF1A5DFA2A117F', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '(个人,头像照片)', codeType: '微信个人收款码', amount: '23元', url: 'wxp://f2f0wAELXMZhJwoNS5T0Nt9J39N692-xKPUQUXjFZZ2BjSYFYkKBlu6QBLV8ijHAnYJN', fingerprint: 'NA', flow: '约炮App→客服雪花→匹配→办会员A套餐23元→先用慈善小程序码伪装→被识破后发微信个人收款码', time: '2026-09-28 21:43:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_215400_na', batch: 'T-B14-127', app: 'oKTrcb', pkg: 'com.cdjfqrhjpwnrfyb.ctmkahkdzlvluokukzv', md5: '17CA1934E0A56E31B5668E194788EDFF', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '小仙女', codeType: '微信入会码(短链)', amount: '25.5元', url: 'https://qr22.cn/Clcd/lcd?token=304304', fingerprint: 'NA', flow: '约炮App→客服小咪咪→匹配选号→办会员25.5元→微信入会码(要求零钱支付避风控)', time: '2026-09-28 21:54:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_221000_na', batch: 'T-B15-109', app: 'sQATBh', pkg: 'kca.xnidaoufgqwbp.tbfphnadgjynwsykv', md5: '0876AB9D1C03512D08A967B2FCDCD15F', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.109:5555', payee: '雨后', codeType: '微信收款码(短链)', amount: '18.9元', url: 'https://qingtai.cc/v/dENlXoos', fingerprint: 'NA', flow: '约炮App→办会员18.9元→微信收款码短链', time: '2026-09-28 22:10:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_221000_na', batch: 'T-B15-127', app: 'uSUzGo', pkg: 'cak.crkcxcubxolmm.aqxiqpbcwyxvemhxl', md5: '0041AF8AD9DD185E42EC711C7FBA296C', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '花开花落', codeType: '微信收款码(短链)', amount: '18.9元', url: 'https://icrozvf.com/p.html?xid=R89JM8', fingerprint: 'NA', flow: '约炮App→办会员18.9元→微信收款码短链(与260928_201000_130同入口疑似同码)', time: '2026-09-28 22:10:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_221000_na', batch: 'T-B15-132', app: 'eFBlZB', pkg: 'avq.wlkboafaivgcp.febyntqielckdpwv', md5: 'FCAEEEAE51BFEF0D68E4F880EA719777', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.132:5555', payee: '**波', codeType: '支付宝收款码', amount: '29.6元', url: 'https://qr.alipay.com/fkx16053ovsz6hk2jz4su90', fingerprint: 'NA', flow: '约炮App→办会员29.6元→支付宝收款码', time: '2026-09-28 22:10:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_230500_na', batch: 'T-B17-130', app: 'KRWPsE', pkg: 'whq.hyjawjiyciqa.kpfgeircxcxmrwateuh', md5: 'E27FA61188E43981432BF4792BCC9017', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.130:5555', payee: '兰博部落', codeType: '微信个人收款码', amount: '19.9元', url: 'wxp://f2f0uvKLfzeQUlaR79SI1xleUKsiFbrPQJkk1eh02t-vVro', fingerprint: 'NA', flow: '约炮App→办会员19.9元→微信个人收款码', time: '2026-09-28 23:05:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_234500_na', batch: 'T-B18-109', app: '캪', pkg: 'net.west.jasper.quartz', md5: 'D5A4566AE8256300AC819970428B2DAF', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.109:5555', payee: '小虎(**瑜)', codeType: '支付宝收款码', amount: '26元', url: 'https://qr.alipay.com/fkx12942prvcsjqkwtrem80', fingerprint: 'NA', flow: '约炮App→办会员26元→支付宝收款码', time: '2026-09-28 23:45:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260928_234500_na', batch: 'T-B18-109b', app: '캪', pkg: 'net.west.jasper.quartz', md5: 'D5A4566AE8256300AC819970428B2DAF', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.109:5555', payee: '起风了(**庭)', codeType: '支付宝收款码', amount: '26元', url: 'https://qr.alipay.com/fkx119427pznootrjlznm30', fingerprint: 'NA', flow: '同App二次对线→换收款人→支付宝收款码26元(独立留证)', time: '2026-09-28 23:45:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260929_000200_na', batch: 'T-B19-127', app: 'J3🛜2', pkg: 'org.cherry.laurel', md5: 'B365878B9CC2EA34195FE7411128CE9C', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '电商特约商户F', codeType: '微信收款码', amount: '19元', url: 'wxp://f2f02T5vIvFyBj7DTPYS91qCf85hgXwg8mqzt9UVtBQ3EutKtl3q4NDEtcF_z1ewkX_M', fingerprint: 'NA', flow: '约炮App→办会员19元→微信电商特约商户收款码', time: '2026-09-29 00:02:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260929_003800_na', batch: 'T-B21-132', app: 'uFUeKB', pkg: 'com.kdjvpjbijn.clwmbsfqtvuignfbjeam', md5: '71ACC9A01F80DBAB0955272B2FF69272', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.132:5555', payee: 'skoforv.com/p.html', codeType: '微信收款码短链', amount: '29.6元', url: 'https://skoforv.com/p.html?xid=AXz5JJ', fingerprint: 'NA', flow: '约炮App→办会员29.6元→微信收款码短链(落地页待解析)', time: '2026-09-29 00:38:00', codeImages: [], shots: [] },
    { recId: null, taskId: '260929_011500_na', batch: 'T-B23-127', app: 'bgleos', pkg: 'xai.jbxbmxbroya.psgaaregkdkihjbfcxqh', md5: '6258AD5FED094076BB50BBB4CAEDBAAF', category: '网络交友-约炮引流（路由推断）', device: '192.168.0.127:5555', payee: '林清清(*浩)', codeType: '微信电商特约商户收款码', amount: '36元', url: 'http://net7777.vip.cpolar.cn/page.php?token=YaRBAmJVZFrDDWds', fingerprint: 'NA', flow: '约炮App→办会员36元→微信电商特约商户收款码(cpolar内网穿透入口)', time: '2026-09-29 01:15:00', codeImages: [], shots: [] }
  ];

  /* —— ② 6 台设备（字段对齐 GET /api/v1/devices） —— */
  var DEVICES = [
    { deviceId: '4f3f37ec', adbSerial: '192.168.0.109:5555', type: 'real_device', osVersion: 'Android 10', model: 'ONEPLUS A6010', product: 'OnePlus6T', battery: 86, screenW: 1080, screenH: 2340, currentApp: '𓇻♞', shots: [EV + 'rec02/shot_00.jpg'] },
    { deviceId: '5d0407dc', adbSerial: '192.168.0.130:5555', type: 'real_device', osVersion: 'Android 10', model: 'ONEPLUS A6010', product: 'OnePlus6T', battery: 74, screenW: 1080, screenH: 2340, currentApp: 'cgnivQ', shots: [EV + 'rec01/shot_00.jpg', EV + 'rec01/shot_01.jpg', EV + 'rec01/shot_02.jpg', EV + 'rec01/shot_03.jpg', EV + 'rec01/shot_04.jpg', EV + 'rec01/shot_05.jpg', EV + 'rec03/shot_00.jpg'] },
    { deviceId: 'ea93b179', adbSerial: '192.168.0.132:5555', type: 'real_device', osVersion: 'Android 10', model: 'ONEPLUS A6010', product: 'OnePlus6T', battery: 92, screenW: 1080, screenH: 2340, currentApp: 'vqTFTV', shots: [EV + 'rec03/shot_00.jpg'] },
    { deviceId: '00b9ef5a', adbSerial: '127.0.0.1:5559', type: 'emulator', osVersion: 'Android 9', model: 'ONEPLUS A6010(伪装)', product: 'LDPlayer-1', battery: 100, screenW: 720, screenH: 1280, currentApp: 'exYWDT(调试)', shots: [EV + 'rec01/shot_02.jpg', EV + 'rec01/shot_03.jpg'] },
    { deviceId: '00f8c223', adbSerial: '127.0.0.1:5563', type: 'emulator', osVersion: 'Android 9', model: 'ONEPLUS A6010(伪装)', product: 'LDPlayer-2', battery: 100, screenW: 1080, screenH: 2340, currentApp: 'oKTrcb(调试)', shots: [EV + 'rec01/shot_03.jpg', EV + 'rec01/shot_04.jpg'] },
    { deviceId: '00821309', adbSerial: '127.0.0.1:5565', type: 'emulator', osVersion: 'Android 9', model: 'ONEPLUS A6010(伪装)', product: 'LDPlayer-3', battery: 100, screenW: 1080, screenH: 2340, currentApp: 'bgleos(调试)', shots: [EV + 'rec01/shot_01.jpg', EV + 'rec01/shot_00.jpg'] }
  ];

  /* —— ③ 左区 APK 池（真实样本；前 6 个类别实证，其余路由推断） —— */
  var APK_POOL = CODES.map(function (c) {
    return {
      app: c.app, pkg: c.pkg, md5: c.md5, category: c.category,
      source: c.recId ? 'A' : (Math.random() < 0.35 ? 'A' : 'B'),
      sizeMB: +(3.2 + Math.random() * 38).toFixed(1)
    };
  });

  /* —— ④ v4 实测常量（证据等级：A=完整自然日逐行实测 B=分层抽样） —— */
  var V4 = {
    urlsPerDay: 288725,        // 每日下发网址记录 A
    featuresPerDay: 8066,      // 含下载特征记录 A
    entriesPerDay: 29875,      // 可点下载入口 host（三层去重） B
    pagesPerDay: 9600,         // 真正产出 APK 的页面 B
    pagesRange: [7100, 12800],
    distinctMainstream: 7,     // 不同主流应用（款/天，个位数）
    todayDownloads: 1286       // 模拟：今日已下载 APK 文件计数起点
  };

  var FUNNEL = [
    { name: '网址下发记录', value: V4.urlsPerDay, grade: 'A' },
    { name: '可点下载入口', value: V4.entriesPerDay, grade: 'B' },
    { name: '真正产包页面', value: V4.pagesPerDay, grade: 'B' },
    { name: '不同主流应用', value: V4.distinctMainstream, grade: 'A' }
  ];

  /* 近24h 入库样本类别分布（模拟统计，用于条形图） */
  var CATEGORIES = [
    { name: '刷单返利类', value: 42 },
    { name: '网络交友·约炮引流', value: 37 },
    { name: '虚假网络投资理财', value: 18 },
    { name: '冒充电商物流客服', value: 12 },
    { name: '虚假服务', value: 9 },
    { name: '冒充公检法及其他', value: 5 }
  ];

  var CHANNELS = [
    { name: '微信系收款', value: 13, color: '#22c55e' },
    { name: '支付宝收款', value: 3, color: '#3b82f6' },
    { name: '微信+支付宝双码', value: 2, color: '#ff4d5e' },
    { name: 'H5游戏充值通道', value: 2, color: '#a78bfa' }
  ];

  /* 两个下载源的下载量基线（累计 = 历史全量，today = 当日已发生，A+B today=1286 与 V4.todayDownloads 一致） */
  var SOURCE_STATS = {
    A: { name: '源头A SFTP', cumulative: 48215, today: 612, color: '#38e1ff' },
    B: { name: '源头B HOST爬取', cumulative: 31890, today: 674, color: '#ffb020' }
  };

  /* 二维码累计统计基线（历史全量，不含今日 CODES 批次；累计 = 基线 + 今日动态值） */
  var QR_STATS = {
    cumTotalBase: 1566,    // 历史累计二维码数
    cumDedupBase: 1310     // 历史累计去重二维码数
  };

  /* —— 中区日志剧本（由 flow 话术链脚本化，按设备循环） —— */
  var SCRIPTS = {
    '4f3f37ec': [
      { t: 'sys', m: 'APK「𓇻♞」推送装机成功（pm install -r -g · 18.6MB）' },
      { t: 'enter', m: '进入客服会话 · 1号-约爱经纪人-周晴（真人快捷回复）' },
      { t: 'send', m: 'AI话术：怎么办理会员？都有什么套餐' },
      { t: 'recv', m: '对方：原价380/880/2080，现在7.8折，32元就能办' },
      { t: 'shot', m: '自动截屏存证：客服会话页' },
      { t: 'recv', m: '对方：回【2】微信办理，用零钱支付，关WiFi防风控' },
      { t: 'code', m: '套取到微信收款码：家和万事兴 ¥32 → 已推送右区码墙' },
      { t: 'sys', m: '取证任务 260928_201000_109 归档（码图1 · 截图1）' }
    ],
    '5d0407dc': [
      { t: 'sys', m: 'APK「cgnivQ」推送装机成功（pm install -r -g · 12.4MB）' },
      { t: 'enter', m: '进入客服会话 · 接待员-宁宁（本人不约）' },
      { t: 'send', m: 'AI话术：你好，需要什么流程' },
      { t: 'shot', m: '自动截屏存证：01 进入聊天页' },
      { t: 'recv', m: '对方：先提供地区和年龄，开启相机权限' },
      { t: 'send', m: 'AI：相机权限打不开（拒绝权限试探风控）' },
      { t: 'shot', m: '自动截屏存证：02 拒绝相机权限' },
      { t: 'recv', m: '对方：会员套餐 A同城21 / B同省41 / C全国61，优惠21.6' },
      { t: 'shot', m: '自动截屏存证：03 会员套餐介绍' },
      { t: 'recv', m: '对方：扫码支付21.6元，用零钱，银行卡无效' },
      { t: 'shot', m: '自动截屏存证：04 收款码要求支付' },
      { t: 'code', m: '套取到双码：微信 敏嘉嘉 + 支付宝 陈**炫 ¥21.6 → 码墙' },
      { t: 'shot', m: '自动截屏存证：05 收款码与付款凭证' },
      { t: 'send', m: 'AI末态回复：我再考虑考虑' },
      { t: 'sys', m: '取证任务 260928_190527_130 归档（码图2 · 截图6）' }
    ],
    'ea93b179': [
      { t: 'sys', m: 'APK「vqTFTV」推送装机成功（pm install -r -g · 27.9MB）' },
      { t: 'enter', m: '进入客服会话 · 接待员~灵灵（约爱平台客服）' },
      { t: 'send', m: 'AI话术：要开通，发收款码' },
      { t: 'recv', m: '对方：新人会员价22元（原25.2），给你入会二维码，3分钟有效' },
      { t: 'shot', m: '自动截屏存证：H5聚合支付页' },
      { t: 'recv', m: '对方：跳转游戏充值通道，支持零钱/余额/花呗，禁用银行卡' },
      { t: 'code', m: '套取到游戏充值通道收款码：中手游 mobileztgame ¥22 → 码墙' },
      { t: 'sys', m: '取证任务 260928_204000_132 归档（码图1）' }
    ],
    '00b9ef5a': [
      { t: 'sys', m: '模拟器调试：解析落地页 JS 变量 androidDownloadUrl' },
      { t: 'enter', m: '进入客服会话 · 客服云朵' },
      { t: 'recv', m: '对方：办会员A套餐22元，发财务入会码（游戏充值通道）' },
      { t: 'shot', m: '自动截屏存证：套餐与支付页' },
      { t: 'code', m: '识别到游戏充值通道：中手游 ¥22.00（信息样本，码图待真机复现）' }
    ],
    '00f8c223': [
      { t: 'sys', m: '模拟器调试：点穿风险提示页，跟随JS跳转真实走链' },
      { t: 'enter', m: '进入客服会话 · 客服小咪咪' },
      { t: 'recv', m: '对方：匹配选号后办会员25.5元，微信入会码，零钱支付避风控' },
      { t: 'code', m: '解析到入会码短链：qr22.cn/Clcd/lcd?token=304304 ¥25.5' }
    ],
    '00821309': [
      { t: 'sys', m: '体积指纹聚类完成：识别同款不同渠道包 ×3，已按簇去重' },
      { t: 'enter', m: '进入客服会话 · 约爱助理' },
      { t: 'recv', m: '对方：电商特约商户收款，36元开通会员' },
      { t: 'code', m: '解析到内网穿透入口：net7777.vip.cpolar.cn ¥36（林清清*浩）' }
    ]
  };

  AF.DATA = {
    CODES: CODES,
    DEVICES: DEVICES,
    APK_POOL: APK_POOL,
    V4: V4,
    FUNNEL: FUNNEL,
    CATEGORIES: CATEGORIES,
    CHANNELS: CHANNELS,
    SOURCE_STATS: SOURCE_STATS,
    QR_STATS: QR_STATS,
    SCRIPTS: SCRIPTS
  };
})(window.AF = window.AF || {});
