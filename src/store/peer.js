import { defineStore } from 'pinia'
import { getAvatarDataUri, isRemoteAvatar } from '@/lib/utils'

// ===== 拍档模块 Store =====
// 管理拍档分类、拍档列表、收藏等

const STORAGE_KEY = 'perohub_peerData_v3'
const CAT_SETTINGS_KEY = 'perohub_catSettings_v1'

// 将外网头像替换为本地生成的 SVG 头像（避免外网不可用时头像破损）
function normalizeAvatar(peer) {
  if (!peer.avatar || isRemoteAvatar(peer.avatar)) {
    peer.avatar = getAvatarDataUri(peer.name, peer.id)
  }
  return peer
}

// 类型配置
const TYPES = [
  { id: 'person', label: '个人', icon: '👤' },
  { id: 'company', label: '公司', icon: '🏢' }
]

// 分类配置（职业/行业）
const CATEGORIES = [
  { id: 'artist', label: '画师', icon: '🎨', group: 'person' },
  { id: 'musician', label: '音乐人', icon: '🎵', group: 'person' },
  { id: 'kol', label: 'KOL', icon: '📢', group: 'person' },
  { id: 'partner', label: '友商', icon: '💼', group: 'company' },
  { id: 'supplier', label: '供应商', icon: '🏭', group: 'company' },
  { id: 'service', label: '服务商', icon: '🤝', group: 'company' },
  { id: 'media', label: '媒体', icon: '📺', group: 'company' }
]

// 分栏配置
const CATEGORY_GROUPS = [
  { id: 'person', label: '个人', icon: '👤' },
  { id: 'company', label: '组织', icon: '🏢' }
]

// 卡片可选显示字段配置（头像、名称为固定头部，不参与配置）
const CARD_FIELDS = [
  { id: 'alias', label: '别名', icon: 'AtSign' },
  { id: 'type', label: '类型', icon: 'User' },
  { id: 'category', label: '分类', icon: 'Tag' },
  { id: 'city', label: '城市', icon: 'MapPin' },
  { id: 'followers', label: '粉丝数', icon: 'Users' },
  { id: 'rating', label: '评分', icon: 'Star' },
  { id: 'tags', label: '标签', icon: 'Hash' },
  { id: 'desc', label: '描述', icon: 'FileText' },
  { id: 'website', label: '网址', icon: 'Globe' },
  { id: 'createdAt', label: '入驻时间', icon: 'Calendar' }
]

// 分类默认卡片显示字段
const DEFAULT_CARD_FIELDS = ['type', 'category', 'city', 'followers', 'rating', 'tags', 'desc']

// 详情面板可选显隐字段配置（头像、名称、别名、类型、分类、城市、简介、标签、联系方式、对接人 等基础信息固定显示，不参与配置）
const DETAIL_FIELDS = [
  { id: 'socialMedia', label: '社媒', types: ['person', 'company'] },
  { id: 'followers', label: '粉丝', types: ['person', 'company'] },
  { id: 'works', label: '作品案例', types: ['person', 'company'] },
  { id: 'cooperations', label: '合作案例', types: ['person', 'company'] },
  { id: 'ratingStars', label: '评星', types: ['person', 'company'] },
  { id: 'ratingScore', label: '评分', types: ['person', 'company'] },
  { id: 'risk', label: '风险', types: ['person', 'company'] },
  { id: 'handlers', label: '联络人', types: ['company'] }
]

// 分类默认详情面板显示字段（全部默认显示）
const DEFAULT_DETAIL_FIELDS = DETAIL_FIELDS.map(f => f.id)

// 社交媒体平台配置
const SOCIAL_PLATFORMS = [
  { id: 'weibo', label: '微博', icon: '📱' },
  { id: 'bilibili', label: 'B站', icon: '📺' },
  { id: 'xiaohongshu', label: '小红书', icon: '📕' },
  { id: 'douyin', label: '抖音', icon: '🎵' },
  { id: 'zhihu', label: '知乎', icon: '💡' },
  { id: 'twitter', label: 'Twitter', icon: '🐦' },
  { id: 'wechat', label: '微信公众号', icon: '💬' },
  { id: 'other', label: '其他', icon: '🔗' }
]

// 默认 mock 数据
const MOCK_PEERS = [
  // ===== 画师 =====
  {
    id: 'p-001', name: '星空画师', alias: '星空', realName: '李明',
    type: 'person', category: 'artist',
    avatar: 'https://i.pravatar.cc/150?img=1',
    city: '上海',
    followers: 12580,
    socialMedia: [
      { platform: 'weibo', handle: '@星空画师', url: '', followers: 12580 },
      { platform: 'bilibili', handle: '星空画师', url: '', followers: 8900 }
    ],
    works: [
      { title: '二次元少女立绘', type: '立绘', views: 25000, date: '2025-08-15' },
      { title: '游戏角色概念设计', type: '概念图', views: 18000, date: '2025-06-20' },
      { title: 'Q版头像系列', type: '插画', views: 32000, date: '2025-03-10' }
    ],
    cooperations: [
      { project: '《星海传说》角色设计', role: '主美', date: '2025-06' },
      { project: '《幻梦之城》立绘外包', role: '画师', date: '2025-02' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'star_artist' },
      { type: 'email', label: '邮箱', value: 'star@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-03-15' },
      { name: '小王', role: '对接人', date: '2025-05-01' }
    ],
    risk: '排期较满，需提前2个月预约',
    rating: { total: 24, count: 5 },
    following: true,
    tags: ['二次元', '角色设计', '原画'],
    desc: '专注二次元角色设计，合作过多个知名游戏项目。',
    createdAt: '2025-03-15'
  },
  {
    id: 'p-002', name: '暮色画手', alias: '暮色', realName: '张远',
    type: 'person', category: 'artist',
    avatar: 'https://i.pravatar.cc/150?img=5',
    city: '北京',
    followers: 8920,
    socialMedia: [
      { platform: 'weibo', handle: '@暮色画手', url: '', followers: 8920 }
    ],
    works: [
      { title: '科幻城市场景', type: '场景', views: 15000, date: '2025-07-10' }
    ],
    cooperations: [
      { project: '《深空纪元》场景概念', role: '场景设计', date: '2025-04' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'dusk_art' },
      { type: 'email', label: '邮箱', value: 'dusk@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-06-20' }
    ],
    risk: '',
    rating: { total: 20, count: 4 },
    following: true,
    tags: ['概念设计', '场景', '科幻'],
    desc: '科幻场景概念设计，擅长宏大世界观构建。',
    createdAt: '2025-06-20'
  },
  {
    id: 'p-003', name: '小狐狸', alias: '狐狐', realName: '胡小雨',
    type: 'person', category: 'artist',
    avatar: 'https://i.pravatar.cc/150?img=9',
    city: '杭州',
    followers: 23400,
    socialMedia: [
      { platform: 'xiaohongshu', handle: '小狐狸画画', url: '', followers: 23400 },
      { platform: 'bilibili', handle: '小狐狸插画', url: '', followers: 15000 }
    ],
    works: [
      { title: '表情包合集·可爱篇', type: '表情包', views: 45000, date: '2025-09-01' }
    ],
    cooperations: [
      { project: '品牌表情包定制', role: '设计师', date: '2025-07' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'fox_art' },
      { type: 'email', label: '邮箱', value: 'fox@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-11-08' }
    ],
    risk: '',
    rating: { total: 22, count: 5 },
    following: false,
    tags: ['Q版', '可爱', '表情包'],
    desc: 'Q版可爱风格画师，表情包定制专家。',
    createdAt: '2024-11-08'
  },
  {
    id: 'p-004', name: '墨染青山', alias: '', realName: '',
    type: 'person', category: 'artist',
    avatar: 'https://i.pravatar.cc/150?img=12',
    city: '成都',
    followers: 6750,
    socialMedia: [
      { platform: 'weibo', handle: '@墨染青山', url: '', followers: 6750 }
    ],
    works: [
      { title: '古风侠客立绘', type: '立绘', views: 12000, date: '2026-01-10' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'ink@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2026-01-10' }
    ],
    risk: '',
    rating: { total: 16, count: 4 },
    following: false,
    tags: ['国风', '水墨', '立绘'],
    desc: '国风水墨风格，擅长古风人物立绘。',
    createdAt: '2026-01-10'
  },

  // ===== 音乐人 =====
  {
    id: 'p-005', name: '声波工坊', alias: '', realName: '',
    type: 'company', category: 'musician',
    avatar: 'https://i.pravatar.cc/150?img=3',
    city: '广州',
    followers: 15600,
    socialMedia: [
      { platform: 'bilibili', handle: '声波工坊', url: '', followers: 15600 }
    ],
    works: [
      { title: '战斗主题曲·破晓', type: 'BGM', views: 52000, date: '2025-08-20' }
    ],
    cooperations: [
      { project: '《星海传说》配乐', role: '音乐制作', date: '2025-05' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'soundwave_studio' },
      { type: 'email', label: '邮箱', value: 'sound@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-08-22' }
    ],
    risk: '',
    rating: { total: 24, count: 5 },
    following: true,
    tags: ['BGM', '游戏配乐', '电子'],
    desc: '专业游戏音乐制作团队，作品覆盖多款热门游戏。',
    createdAt: '2024-08-22'
  },
  {
    id: 'p-006', name: '清风作曲', alias: '', realName: '陈清风',
    type: 'person', category: 'musician',
    avatar: 'https://i.pravatar.cc/150?img=7',
    city: '南京',
    followers: 4280,
    socialMedia: [
      { platform: 'weibo', handle: '@清风作曲', url: '', followers: 4280 }
    ],
    works: [
      { title: '竹林听雨', type: '纯音乐', views: 18000, date: '2025-09-14' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'qingfeng@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-09-14' }
    ],
    risk: '',
    rating: { total: 18, count: 4 },
    following: false,
    tags: ['国风', '古风', '纯音乐'],
    desc: '古风纯音乐创作，擅长古筝、笛子等民族乐器编曲。',
    createdAt: '2025-09-14'
  },
  {
    id: 'p-007', name: 'BGM小达人', alias: '', realName: '',
    type: 'person', category: 'musician',
    avatar: 'https://i.pravatar.cc/150?img=11',
    city: '深圳',
    followers: 9800,
    socialMedia: [
      { platform: 'bilibili', handle: 'BGM小达人', url: '', followers: 9800 }
    ],
    works: [
      { title: 'UI音效合集 Vol.3', type: '音效', views: 22000, date: '2025-02-28' }
    ],
    cooperations: [
      { project: '多款手游UI音效', role: '音效设计', date: '2025-01' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'bgm_master' },
      { type: 'email', label: '邮箱', value: 'bgm@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-02-28' }
    ],
    risk: '',
    rating: { total: 21, count: 5 },
    following: true,
    tags: ['音效', 'UI音效', '配音'],
    desc: '游戏UI音效与配音制作专家。',
    createdAt: '2025-02-28'
  },

  // ===== 供应商 =====
  {
    id: 'p-008', name: '优品模型厂', alias: '', realName: '',
    type: 'company', category: 'supplier',
    avatar: 'https://i.pravatar.cc/150?img=15',
    city: '深圳',
    followers: 3420,
    socialMedia: [
      { platform: 'wechat', handle: '优品模型', url: '', followers: 3420 }
    ],
    works: [],
    cooperations: [
      { project: '限量版手办生产', role: '生产供应商', date: '2024-10' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'youpin_model' },
      { type: 'email', label: '邮箱', value: 'model@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2023-12-01' }
    ],
    risk: '起订量较高，MOQ 500件起',
    rating: { total: 19, count: 4 },
    following: false,
    tags: ['3D模型', '手办', '周边'],
    desc: '专业游戏手办与3D模型周边制作供应商。',
    createdAt: '2023-12-01'
  },
  {
    id: 'p-009', name: '像素印刷', alias: '', realName: '',
    type: 'company', category: 'supplier',
    avatar: 'https://i.pravatar.cc/150?img=18',
    city: '义乌',
    followers: 1850,
    socialMedia: [],
    works: [],
    cooperations: [
      { project: '游戏周边印刷', role: '印刷供应商', date: '2024-05' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'pixel_print' },
      { type: 'email', label: '邮箱', value: 'print@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-05-18' }
    ],
    risk: '',
    rating: { total: 15, count: 4 },
    following: false,
    tags: ['印刷', '包装', '物料'],
    desc: '游戏周边印刷与包装物料一站式服务。',
    createdAt: '2024-05-18'
  },
  {
    id: 'p-010', name: '精工手作', alias: '', realName: '',
    type: 'company', category: 'supplier',
    avatar: 'https://i.pravatar.cc/150?img=20',
    city: '苏州',
    followers: 5600,
    socialMedia: [
      { platform: 'xiaohongshu', handle: '精工手作', url: '', followers: 5600 }
    ],
    works: [],
    cooperations: [
      { project: '徽章立牌定制', role: '制作供应商', date: '2025-03' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'jg_handmade' },
      { type: 'email', label: '邮箱', value: 'hand@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-03-07' }
    ],
    risk: '',
    rating: { total: 23, count: 5 },
    following: true,
    tags: ['手工', '徽章', '立牌'],
    desc: '手工徽章、亚克力立牌等精美周边制作。',
    createdAt: '2024-03-07'
  },

  // ===== 服务商 =====
  {
    id: 'p-011', name: '云帆翻译', alias: '', realName: '',
    type: 'company', category: 'service',
    avatar: 'https://i.pravatar.cc/150?img=23',
    city: '上海',
    followers: 7200,
    socialMedia: [
      { platform: 'wechat', handle: '云帆翻译', url: '', followers: 7200 }
    ],
    works: [],
    cooperations: [
      { project: '《星海传说》多语言本地化', role: '翻译服务', date: '2025-04' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'yunfan_trans' },
      { type: 'email', label: '邮箱', value: 'trans@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-07-12' },
      { name: '小李', role: '对接人', date: '2025-01-15' }
    ],
    risk: '',
    rating: { total: 25, count: 5 },
    following: true,
    tags: ['翻译', '本地化', '多语言'],
    desc: '游戏多语言本地化翻译服务，支持20+语种。',
    createdAt: '2024-07-12'
  },
  {
    id: 'p-012', name: '极速测试', alias: '', realName: '',
    type: 'company', category: 'service',
    avatar: 'https://i.pravatar.cc/150?img=25',
    city: '武汉',
    followers: 2900,
    socialMedia: [],
    works: [],
    cooperations: [
      { project: 'QA功能测试', role: '测试服务', date: '2025-04' }
    ],
    contacts: [
      { type: 'email', label: '邮箱', value: 'test@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-04-22' }
    ],
    risk: '',
    rating: { total: 17, count: 4 },
    following: false,
    tags: ['测试', 'QA', '功能测试'],
    desc: '专业游戏功能测试与QA服务。',
    createdAt: '2025-04-22'
  },
  {
    id: 'p-013', name: '星辰运营', alias: '', realName: '',
    type: 'company', category: 'service',
    avatar: 'https://i.pravatar.cc/150?img=28',
    city: '杭州',
    followers: 4100,
    socialMedia: [],
    works: [],
    cooperations: [
      { project: '社群代运营', role: '运营服务', date: '2025-07' }
    ],
    contacts: [
      { type: 'email', label: '邮箱', value: 'op@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-07-30' }
    ],
    risk: '',
    rating: { total: 16, count: 4 },
    following: false,
    tags: ['运营', '社群', '活动'],
    desc: '游戏社群运营与活动策划服务。',
    createdAt: '2025-07-30'
  },
  {
    id: 'p-014', name: '法务通', alias: '', realName: '',
    type: 'company', category: 'service',
    avatar: 'https://i.pravatar.cc/150?img=30',
    city: '北京',
    followers: 1600,
    socialMedia: [],
    works: [],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'legal@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2026-02-14' }
    ],
    risk: '',
    rating: { total: 14, count: 3 },
    following: false,
    tags: ['法务', '版权', '商标'],
    desc: '游戏版权登记、商标注册、法务咨询服务。',
    createdAt: '2026-02-14'
  },

  // ===== KOL =====
  {
    id: 'p-015', name: '游戏老司机', alias: '老司机', realName: '',
    type: 'person', category: 'kol',
    avatar: 'https://i.pravatar.cc/150?img=33',
    city: '上海',
    followers: 568000,
    socialMedia: [
      { platform: 'bilibili', handle: '游戏老司机', url: '', followers: 568000 },
      { platform: 'weibo', handle: '@游戏老司机', url: '', followers: 320000 }
    ],
    works: [
      { title: '2025年度游戏大盘点', type: '视频', views: 1280000, date: '2025-12-30' },
      { title: '最值得买的10款独立游戏', type: '视频', views: 890000, date: '2025-11-15' },
      { title: '国产游戏崛起之路', type: '视频', views: 650000, date: '2025-09-20' }
    ],
    cooperations: [
      { project: '《星海传说》测评推广', role: 'KOL合作', date: '2025-08' },
      { project: 'CJ展会直播', role: '直播合作', date: '2025-07' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'gamer_laosiji' },
      { type: 'email', label: '邮箱', value: 'gamer@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-03-01' },
      { name: '小张', role: '商务对接', date: '2025-05-10' }
    ],
    risk: '报价较高，单条视频30w起',
    rating: { total: 23, count: 5 },
    following: true,
    tags: ['测评', 'B站', '直播'],
    desc: '头部游戏测评博主，单条视频均播放超百万，擅长深度评测与种草。',
    createdAt: '2024-03-01'
  },
  {
    id: 'p-016', name: '电竞少女阿狸', alias: '阿狸', realName: '苏晓',
    type: 'person', category: 'kol',
    avatar: 'https://i.pravatar.cc/150?img=36',
    city: '广州',
    followers: 128000,
    socialMedia: [
      { platform: 'bilibili', handle: '电竞少女阿狸', url: '', followers: 128000 },
      { platform: 'douyin', handle: '电竞少女阿狸', url: '', followers: 280000 }
    ],
    works: [
      { title: '职业联赛解说集锦', type: '视频', views: 420000, date: '2025-10-05' }
    ],
    cooperations: [
      { project: '电竞赛事解说', role: '解说合作', date: '2025-09' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'esports_ali' },
      { type: 'email', label: '邮箱', value: 'ali@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2024-06-15' }
    ],
    risk: '',
    rating: { total: 22, count: 5 },
    following: true,
    tags: ['电竞', '直播', '解说'],
    desc: '人气电竞女主播，职业赛事解说，粉丝粘性极高。',
    createdAt: '2024-06-15'
  },
  {
    id: 'p-017', name: '手游情报站', alias: '', realName: '',
    type: 'person', category: 'kol',
    avatar: 'https://i.pravatar.cc/150?img=40',
    city: '深圳',
    followers: 89000,
    socialMedia: [
      { platform: 'weibo', handle: '@手游情报站', url: '', followers: 89000 }
    ],
    works: [
      { title: '每周手游排行榜', type: '图文', views: 150000, date: '2026-01-08' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'info@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2023-10-20' }
    ],
    risk: '',
    rating: { total: 18, count: 4 },
    following: false,
    tags: ['资讯', '攻略', '微博'],
    desc: '手游前沿资讯与攻略分享，微博月阅读量破千万。',
    createdAt: '2023-10-20'
  },
  {
    id: 'p-018', name: '二次元安利酱', alias: '安利酱', realName: '',
    type: 'person', category: 'kol',
    avatar: 'https://i.pravatar.cc/150?img=45',
    city: '成都',
    followers: 45000,
    socialMedia: [
      { platform: 'xiaohongshu', handle: '二次元安利酱', url: '', followers: 45000 }
    ],
    works: [
      { title: '本月必追番剧推荐', type: '图文', views: 95000, date: '2025-01-05' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'anime@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2025-01-05' }
    ],
    risk: '',
    rating: { total: 20, count: 5 },
    following: false,
    tags: ['二次元', '安利', '小红书'],
    desc: '二次元内容安利博主，擅长角色鉴赏与同人推荐。',
    createdAt: '2025-01-05'
  },

  // ===== 媒体 =====
  {
    id: 'p-022', name: '游戏葡萄', alias: '', realName: '',
    type: 'company', category: 'media',
    avatar: 'https://i.pravatar.cc/150?img=50',
    city: '北京',
    followers: 320000,
    socialMedia: [
      { platform: 'weibo', handle: '@游戏葡萄', url: '', followers: 320000 },
      { platform: 'wechat', handle: '游戏葡萄', url: '', followers: 280000 }
    ],
    works: [
      { title: '2025游戏产业年度报告', type: '深度报道', views: 580000, date: '2025-12-25' }
    ],
    cooperations: [
      { project: '产业年会媒体合作', role: '媒体支持', date: '2025-12' }
    ],
    contacts: [
      { type: 'wechat', label: '微信', value: 'grape_media' },
      { type: 'email', label: '邮箱', value: 'grape_media@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2023-05-10' }
    ],
    risk: '',
    rating: { total: 25, count: 5 },
    following: true,
    tags: ['行业资讯', '游戏媒体', '深度报道'],
    desc: '游戏行业头部媒体，专注行业趋势与深度报道。',
    createdAt: '2023-05-10'
  },
  {
    id: 'p-023', name: '游民星空', alias: '', realName: '',
    type: 'company', category: 'media',
    avatar: 'https://i.pravatar.cc/150?img=53',
    city: '上海',
    followers: 890000,
    socialMedia: [
      { platform: 'weibo', handle: '@游民星空', url: '', followers: 890000 }
    ],
    works: [
      { title: '年度游戏评测合集', type: '评测', views: 1200000, date: '2025-12-28' }
    ],
    cooperations: [],
    contacts: [
      { type: 'wechat', label: '微信', value: 'gamersky_media' },
      { type: 'email', label: '邮箱', value: 'gamersky@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2003-07-01' }
    ],
    risk: '',
    rating: { total: 22, count: 5 },
    following: true,
    tags: ['攻略', '资讯', '评测'],
    desc: '老牌游戏综合门户，提供游戏资讯、攻略与下载服务。',
    createdAt: '2003-07-01'
  },
  {
    id: 'p-024', name: '触乐', alias: '', realName: '',
    type: 'company', category: 'media',
    avatar: 'https://i.pravatar.cc/150?img=56',
    city: '北京',
    followers: 68000,
    socialMedia: [
      { platform: 'wechat', handle: '触乐', url: '', followers: 68000 }
    ],
    works: [
      { title: '游戏人访谈录', type: '人物专访', views: 180000, date: '2025-11-20' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'chule@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2018-03-15' }
    ],
    risk: '',
    rating: { total: 24, count: 5 },
    following: false,
    tags: ['深度', '采访', '行业'],
    desc: '专注游戏产业深度报道与人物专访，行业影响力媒体。',
    createdAt: '2018-03-15'
  },
  {
    id: 'p-025', name: '游戏茶馆', alias: '', realName: '',
    type: 'company', category: 'media',
    avatar: 'https://i.pravatar.cc/150?img=58',
    city: '成都',
    followers: 45000,
    socialMedia: [
      { platform: 'wechat', handle: '游戏茶馆', url: '', followers: 45000 }
    ],
    works: [
      { title: '出海游戏市场分析', type: '产业分析', views: 75000, date: '2025-10-15' }
    ],
    cooperations: [],
    contacts: [
      { type: 'email', label: '邮箱', value: 'tea@example.com' }
    ],
    handlers: [
      { name: '我', role: '提交人', date: '2019-11-20' }
    ],
    risk: '',
    rating: { total: 19, count: 4 },
    following: false,
    tags: ['产业', '投融资', '出海'],
    desc: '游戏产业新媒体，聚焦投融资、出海与商业模式分析。',
    createdAt: '2019-11-20'
  }
]

export const usePeerStore = defineStore('peer', {
  state: () => ({
    // 当前选中的分类
    currentCategory: 'artist',

    // 搜索关键词
    searchQuery: '',

    // 选中的拍档ID
    selectedPeerId: null,

    // 拍档列表
    peers: [],

    // 类型配置
    types: TYPES,

    // 分类配置
    categories: CATEGORIES,

    // 分栏配置
    categoryGroups: CATEGORY_GROUPS,

    // 分类自定义：排序（ID 数组）+ 隐藏（ID 数组）
    categoryOrder: CATEGORIES.map(c => c.id),
    hiddenCategories: [],

    // 分栏自定义：排序 + 隐藏
    groupOrder: CATEGORY_GROUPS.map(g => g.id),
    hiddenGroups: [],

    // 分类卡片字段配置：{ catId: [fieldId, ...] }
    categoryCardFields: {},

    // 分类详情面板字段配置：{ catId: [fieldId, ...] }
    categoryDetailFields: {},

    // 分类管理弹窗
    showCategorySettings: false,

    // 社交平台配置
    socialPlatforms: SOCIAL_PLATFORMS,

    // 卡片可选字段配置
    cardFields: CARD_FIELDS,

    // 添加弹窗显示状态
    showAddDialog: false,

    // 添加弹窗类型：person | company（由工具栏下拉选择）
    addDialogType: 'person',

    // 编辑弹窗：当前正在编辑的拍档对象
    editPeer: null,

    // 视图模式：grid | list
    viewMode: 'grid',

    // 排序：字段 + 方向
    sortBy: 'name',        // name | followers | createdAt
    sortOrder: 'asc',      // asc | desc

    // 筛选：类型 + 城市 + 标签
    filterType: '',         // '' = 全部
    filterCity: '',         // '' = 全部
    filterTag: '',          // '' = 全部

    // 卡片显示设置弹窗
    showCardFieldsDialog: false
  }),

  getters: {
    // 当前分类的拍档列表（已排序 + 已筛选）
    currentPeers(state) {
      let list = state.peers

      // 按分类筛选（所有分类统一逻辑）
      list = list.filter(p => p.category === state.currentCategory)

      // 搜索过滤
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.trim().toLowerCase()
        list = list.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.alias?.toLowerCase().includes(query) ||
          p.tags?.some(t => t.toLowerCase().includes(query))
        )
      }

      // 类型筛选
      if (state.filterType) {
        list = list.filter(p => p.type === state.filterType)
      }

      // 城市筛选
      if (state.filterCity) {
        list = list.filter(p => p.city === state.filterCity)
      }

      // 标签筛选
      if (state.filterTag) {
        list = list.filter(p => p.tags?.includes(state.filterTag))
      }

      // 排序
      const field = state.sortBy
      const dir = state.sortOrder === 'desc' ? -1 : 1
      list = [...list].sort((a, b) => {
        if (field === 'name') {
          return dir * a.name.localeCompare(b.name, 'zh-CN')
        }
        if (field === 'createdAt') {
          return dir * (new Date(a.createdAt) - new Date(b.createdAt))
        }
        // followers, rating
        if (field === 'rating') {
          const aScore = a.rating?.count ? (a.rating.total / a.rating.count) * 2 : 0
          const bScore = b.rating?.count ? (b.rating.total / b.rating.count) * 2 : 0
          return dir * (aScore - bScore)
        }
        return dir * ((a[field] || 0) - (b[field] || 0))
      })

      return list
    },

    // 选中的拍档
    selectedPeer(state) {
      if (!state.selectedPeerId) return null
      return state.peers.find(p => p.id === state.selectedPeerId) || null
    },

    // 各分类数量
    categoryCounts(state) {
      const counts = {}
      CATEGORIES.forEach(c => { counts[c.id] = 0 })
      state.peers.forEach(p => {
        if (counts[p.category] !== undefined) {
          counts[p.category]++
        }
      })
      return counts
    },

    // 按自定义顺序排列且未隐藏的分类
    visibleCategories(state) {
      return state.categoryOrder
        .filter(id => !state.hiddenCategories.includes(id))
        .map(id => CATEGORIES.find(c => c.id === id))
        .filter(Boolean)
    },

    // 按自定义顺序排列且未隐藏的分栏
    visibleGroups(state) {
      return state.groupOrder
        .filter(id => !state.hiddenGroups.includes(id))
        .map(id => CATEGORY_GROUPS.find(g => g.id === id))
        .filter(Boolean)
    },

    // 可用城市列表（去重）
    availableCities(state) {
      const set = new Set()
      state.peers.forEach(p => { if (p.city) set.add(p.city) })
      return [...set].sort((a, b) => a.localeCompare(b, 'zh-CN'))
    },

    // 可用标签列表（去重）
    availableTags(state) {
      const set = new Set()
      state.peers.forEach(p => p.tags?.forEach(t => set.add(t)))
      return [...set].sort((a, b) => a.localeCompare(b, 'zh-CN'))
    },

    // 是否有激活的筛选条件
    hasActiveFilters(state) {
      return !!(state.filterType || state.filterCity || state.filterTag)
    },

    // 卡片可选字段配置
    cardFieldConfig() {
      return CARD_FIELDS
    },

    // 计算评分（豆瓣式：总星数/评分数*2，满分10）
    getRatingScore: () => (rating) => {
      if (!rating || !rating.count) return 0
      return Math.round((rating.total / rating.count) * 2 * 10) / 10
    }
  },

  actions: {
    // 加载数据
    loadPeerData() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          this.peers = JSON.parse(stored)
          // 迁移：补入新分类 mock 条目
          const existingIds = new Set(this.peers.map(p => p.id))
          const newEntries = MOCK_PEERS.filter(m => !existingIds.has(m.id))
          if (newEntries.length > 0) {
            this.peers.push(...JSON.parse(JSON.stringify(newEntries)))
            this.savePeerData()
          }
        } else {
          this.peers = JSON.parse(JSON.stringify(MOCK_PEERS))
          this.savePeerData()
        }
      } catch (e) {
        this.peers = JSON.parse(JSON.stringify(MOCK_PEERS))
      }
      // 统一替换外网头像为本地 SVG（离线环境下外网图片无法加载）
      this.peers.forEach(normalizeAvatar)
      this.savePeerData()
    },

    // 保存数据
    savePeerData() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.peers))
      } catch (e) {}
    },

    // 切换分类
    setCategory(categoryId) {
      this.currentCategory = categoryId
      this.selectedPeerId = null
    },

    // 加载分类设置
    loadCategorySettings() {
      try {
        const stored = localStorage.getItem(CAT_SETTINGS_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          if (Array.isArray(data.order)) {
            // 合并：确保新增的分类也出现在列表中
            const existing = new Set(data.order)
            const missing = CATEGORIES.map(c => c.id).filter(id => !existing.has(id))
            this.categoryOrder = [...data.order, ...missing]
          }
          if (Array.isArray(data.hidden)) {
            this.hiddenCategories = data.hidden
          }
          if (Array.isArray(data.groupOrder)) {
            const existingG = new Set(data.groupOrder)
            const missingG = CATEGORY_GROUPS.map(g => g.id).filter(id => !existingG.has(id))
            this.groupOrder = [...data.groupOrder, ...missingG]
          }
          if (Array.isArray(data.hiddenGroups)) {
            this.hiddenGroups = data.hiddenGroups
          }
          if (data.cardFields && typeof data.cardFields === 'object') {
            this.categoryCardFields = { ...data.cardFields }
          }
          if (data.detailFields && typeof data.detailFields === 'object') {
            this.categoryDetailFields = { ...data.detailFields }
          }
        }
      } catch (e) {}
    },

    // 保存分类设置
    saveCategorySettings() {
      try {
        localStorage.setItem(CAT_SETTINGS_KEY, JSON.stringify({
          order: this.categoryOrder,
          hidden: this.hiddenCategories,
          groupOrder: this.groupOrder,
          hiddenGroups: this.hiddenGroups,
          cardFields: this.categoryCardFields,
          detailFields: this.categoryDetailFields
        }))
      } catch (e) {}
    },

    // 拖拽排序：将 from 移到 to 的位置
    reorderCategory(fromId, toId) {
      const fromIdx = this.categoryOrder.indexOf(fromId)
      const toIdx = this.categoryOrder.indexOf(toId)
      if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return
      const arr = [...this.categoryOrder]
      arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, fromId)
      this.categoryOrder = arr
      this.saveCategorySettings()
    },

    // 上移/下移
    moveCategory(catId, direction) {
      const idx = this.categoryOrder.indexOf(catId)
      if (idx === -1) return
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= this.categoryOrder.length) return
      const arr = [...this.categoryOrder]
      arr.splice(idx, 1)
      arr.splice(target, 0, catId)
      this.categoryOrder = arr
      this.saveCategorySettings()
    },

    // 切换分类显隐
    toggleCategoryVisibility(catId) {
      const idx = this.hiddenCategories.indexOf(catId)
      if (idx === -1) {
        this.hiddenCategories.push(catId)
        // 如果隐藏的是当前选中分类，切换到第一个可见分类
        if (this.currentCategory === catId) {
          const first = this.visibleCategories[0]
          if (first) this.setCategory(first.id)
        }
      } else {
        this.hiddenCategories.splice(idx, 1)
      }
      this.saveCategorySettings()
    },

    // 重置分类设置
    resetCategorySettings() {
      this.categoryOrder = CATEGORIES.map(c => c.id)
      this.hiddenCategories = []
      this.groupOrder = CATEGORY_GROUPS.map(g => g.id)
      this.hiddenGroups = []
      this.categoryCardFields = {}
      this.categoryDetailFields = {}
      this.saveCategorySettings()
    },

    // ===== 分类卡片字段配置 =====

    // 获取某分类的卡片显示字段（未配置时返回默认）
    getCategoryCardFields(catId) {
      const stored = this.categoryCardFields[catId]
      if (Array.isArray(stored)) return stored
      return [...DEFAULT_CARD_FIELDS]
    },

    // 更新某分类的卡片显示字段
    updateCategoryCardFields(catId, fields) {
      this.categoryCardFields[catId] = fields
      this.saveCategorySettings()
    },

    // 获取当前分类的卡片字段（用于内容页渲染）
    currentCardFields() {
      return this.getCategoryCardFields(this.currentCategory)
    },

    // ===== 分类详情面板字段配置 =====

    // 获取某分类的详情面板显示字段（未配置时返回默认）
    getCategoryDetailFields(catId) {
      const stored = this.categoryDetailFields[catId]
      if (Array.isArray(stored)) return stored
      return [...DEFAULT_DETAIL_FIELDS]
    },

    // 更新某分类的详情面板显示字段
    updateCategoryDetailFields(catId, fields) {
      this.categoryDetailFields[catId] = fields
      this.saveCategorySettings()
    },

    // 获取当前分类的详情面板字段（用于详情页渲染）
    currentDetailFields() {
      return this.getCategoryDetailFields(this.currentCategory)
    },

    // ===== 分栏排序/显隐 =====

    // 拖拽排序分栏
    reorderGroup(fromId, toId) {
      const fromIdx = this.groupOrder.indexOf(fromId)
      const toIdx = this.groupOrder.indexOf(toId)
      if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return
      const arr = [...this.groupOrder]
      arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, fromId)
      this.groupOrder = arr
      this.saveCategorySettings()
    },

    // 上移/下移分栏
    moveGroup(groupId, direction) {
      const idx = this.groupOrder.indexOf(groupId)
      if (idx === -1) return
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= this.groupOrder.length) return
      const arr = [...this.groupOrder]
      arr.splice(idx, 1)
      arr.splice(target, 0, groupId)
      this.groupOrder = arr
      this.saveCategorySettings()
    },

    // 切换分栏显隐
    toggleGroupVisibility(groupId) {
      const idx = this.hiddenGroups.indexOf(groupId)
      if (idx === -1) {
        // 至少保留 1 个可见分栏
        if (this.groupOrder.length - this.hiddenGroups.length <= 1) return
        this.hiddenGroups.push(groupId)
        // 如果当前选中分类属于被隐藏的分栏，切换到第一个可见分类
        const hiddenCat = CATEGORIES.find(c => c.id === this.currentCategory)
        if (hiddenCat && hiddenCat.group === groupId) {
          const firstCat = this.visibleCategories[0]
          if (firstCat) this.setCategory(firstCat.id)
        }
      } else {
        this.hiddenGroups.splice(idx, 1)
      }
      this.saveCategorySettings()
    },

    // 打开/关闭分类管理弹窗
    openCategorySettings() {
      this.showCategorySettings = true
    },
    closeCategorySettings() {
      this.showCategorySettings = false
    },

    // 创建自定义分类
    addCategory(data) {
      const id = 'cat-' + Date.now()
      const newCat = {
        id,
        label: data.label || '新分类',
        icon: data.icon || '📌',
        group: data.group || 'person',
        custom: true
      }
      this.categories.push(newCat)
      this.categoryOrder.push(id)
      this.saveCategorySettings()
      this.saveCustomCategories()
      return newCat
    },

    // 删除分类
    deleteCategory(catId) {
      // 将该分类下的拍档移到第一个可用分类
      const altCat = this.categories.find(c => c.id !== catId)
      if (altCat) {
        this.peers.forEach(p => {
          if (p.category === catId) p.category = altCat.id
        })
        this.savePeerData()
      }
      // 从 categories 中移除
      const catIdx = this.categories.findIndex(c => c.id === catId)
      if (catIdx !== -1) this.categories.splice(catIdx, 1)
      // 从 categoryOrder 中移除
      const orderIdx = this.categoryOrder.indexOf(catId)
      if (orderIdx !== -1) this.categoryOrder.splice(orderIdx, 1)
      // 从 hiddenCategories 中移除
      const hiddenIdx = this.hiddenCategories.indexOf(catId)
      if (hiddenIdx !== -1) this.hiddenCategories.splice(hiddenIdx, 1)
      // 如果当前选中的是被删除的分类，切到第一个可用分类
      if (this.currentCategory === catId) {
        const first = this.visibleCategories[0]
        if (first) this.setCategory(first.id)
      }
      this.saveCategorySettings()
      this.saveCustomCategories()
    },

    // 更新分类
    updateCategory(catId, updates) {
      const cat = this.categories.find(c => c.id === catId)
      if (cat) {
        Object.assign(cat, updates)
        this.saveCustomCategories()
      }
    },

    // 保存自定义分类到 localStorage
    saveCustomCategories() {
      try {
        const custom = this.categories.filter(c => c.custom)
        localStorage.setItem('perohub_customCategories', JSON.stringify(custom))
      } catch (e) {}
    },

    // 加载自定义分类
    loadCustomCategories() {
      try {
        const stored = localStorage.getItem('perohub_customCategories')
        if (stored) {
          const custom = JSON.parse(stored)
          custom.forEach(c => {
            if (!this.categories.find(cat => cat.id === c.id)) {
              this.categories.push(c)
              this.categoryOrder.push(c.id)
            }
          })
        }
      } catch (e) {}
    },

    // 搜索
    setSearchQuery(query) {
      this.searchQuery = query
    },

    // 设置视图模式
    setViewMode(mode) {
      this.viewMode = mode
    },

    // ===== 卡片显示字段设置 =====
    // 获取指定分类的卡片显示字段
    getCardFields(categoryId) {
      return this.getCategoryCardFields(categoryId)
    },

    // 设置指定分类的卡片显示字段
    setCardFields(categoryId, fields) {
      this.updateCategoryCardFields(categoryId, fields)
    },

    // 重置指定分类的卡片显示字段为默认
    resetCardFields(categoryId) {
      const { [categoryId]: _, ...rest } = this.categoryCardFields
      this.categoryCardFields = rest
      this.saveCategorySettings()
    },

    // 打开/关闭卡片字段设置弹窗
    openCardFieldsDialog() {
      this.showCardFieldsDialog = true
    },
    closeCardFieldsDialog() {
      this.showCardFieldsDialog = false
    },

    // 设置排序字段
    setSortBy(field) {
      this.sortBy = field
    },

    // 切换排序方向
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },

    // 设置筛选类型
    setFilterType(type) {
      this.filterType = type
    },

    // 设置筛选城市
    setFilterCity(city) {
      this.filterCity = city
    },

    // 设置筛选标签
    setFilterTag(tag) {
      this.filterTag = tag
    },

    // 清除所有筛选
    clearFilters() {
      this.filterType = ''
      this.filterCity = ''
      this.filterTag = ''
    },

    // 打开添加弹窗（type: person | company）
    openAddDialog(type = 'person') {
      this.editPeer = null
      this.addDialogType = type
      this.showAddDialog = true
    },

    // 打开编辑弹窗
    openEditDialog(peerId) {
      const peer = this.peers.find(p => p.id === peerId)
      if (peer) {
        this.editPeer = peer
        this.showAddDialog = true
      }
    },

    // 关闭弹窗
    closeDialog() {
      this.showAddDialog = false
      this.editPeer = null
    },

    // 选中拍档
    selectPeer(peerId) {
      this.selectedPeerId = peerId
    },

    // 切换收藏
    toggleFollowing(peerId) {
      const peer = this.peers.find(p => p.id === peerId)
      if (peer) {
        peer.following = !peer.following
        this.savePeerData()
      }
    },

    // 提交评分
    ratePeer(peerId, stars) {
      const peer = this.peers.find(p => p.id === peerId)
      if (peer) {
        if (!peer.rating) {
          peer.rating = { total: 0, count: 0 }
        }
        peer.rating.total += stars
        peer.rating.count += 1
        this.savePeerData()
      }
    },

    // 添加拍档
    addPeer(data) {
      const id = 'p-' + Date.now()
      const name = data.name || '未命名'
      const newPeer = {
        id,
        name,
        alias: data.alias || '',
        realName: data.realName || '',
        organization: data.organization || '',
        website: data.website || '',
        type: data.type || 'person',
        category: data.category || 'artist',
        avatar: data.avatar || getAvatarDataUri(name, id),
        city: data.city || '',
        followers: data.followers || 0,
        socialMedia: data.socialMedia || [],
        works: data.works || [],
        cooperations: data.cooperations || [],
        contacts: data.contacts || [
          { type: 'email', label: '邮箱', value: data.email || '' },
          { type: 'wechat', label: '微信', value: data.wechat || '' }
        ],
        handlers: data.handlers || [
          { name: '我', role: '提交人', date: new Date().toISOString().slice(0, 10) }
        ],
        risk: data.risk || '',
        rating: data.rating || { total: 0, count: 0 },
        following: data.following ?? false,
        tags: data.tags || [],
        desc: data.desc || '',
        createdAt: new Date().toISOString().slice(0, 10)
      }
      this.peers.unshift(newPeer)
      this.savePeerData()
      return newPeer
    },

    // 批量添加拍档
    batchAddPeers(list) {
      const today = new Date().toISOString().slice(0, 10)
      let count = 0
      list.forEach((data, idx) => {
        if (!data.name?.trim()) return
        const id = 'p-' + Date.now() + '-' + idx
        const name = data.name.trim()
        const newPeer = {
          id,
          name,
          alias: '',
          realName: '',
          type: data.type || 'person',
          category: data.category || 'artist',
          avatar: data.avatar || getAvatarDataUri(name, id),
          city: data.city || '',
          followers: data.followers || 0,
          socialMedia: [],
          works: [],
          cooperations: [],
          contacts: [
            { type: 'email', label: '邮箱', value: data.email || '' },
            { type: 'wechat', label: '微信', value: data.wechat || '' }
          ],
          handlers: [
            { name: '我', role: '提交人', date: today }
          ],
          risk: '',
          rating: { total: 0, count: 0 },
          following: data.following ?? false,
          tags: data.tags || [],
          desc: data.desc || '',
          createdAt: today
        }
        this.peers.unshift(newPeer)
        count++
      })
      if (count > 0) this.savePeerData()
      return count
    },

    // 更新拍档
    updatePeer(peerId, updates) {
      const peer = this.peers.find(p => p.id === peerId)
      if (peer) {
        Object.assign(peer, updates)
        this.savePeerData()
      }
    },

    // 删除拍档
    deletePeer(peerId) {
      const idx = this.peers.findIndex(p => p.id === peerId)
      if (idx > -1) {
        this.peers.splice(idx, 1)
        if (this.selectedPeerId === peerId) {
          this.selectedPeerId = null
        }
        this.savePeerData()
      }
    },

    // 获取分类信息
    getCategory(categoryId) {
      return CATEGORIES.find(c => c.id === categoryId) || null
    },

    // 获取类型信息
    getType(typeId) {
      return TYPES.find(t => t.id === typeId) || null
    },

    // 获取社交平台信息
    getSocialPlatform(platformId) {
      return SOCIAL_PLATFORMS.find(p => p.id === platformId) || null
    }
  }
})
