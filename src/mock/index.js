// ============================================================
// Mock Data - 所有示例数据、配置常量和数据生成函数
// 从 app.js 中抽取，挂载到 window.MockData 全局对象
// ============================================================

export const MockData = {

  // 网格尺寸配置
  GRID_SIZE_CONFIG: {
    xs: { name: '最小', label: '网格视图' },
    sm: { name: '小', label: '网格视图' },
    md: { name: '中', label: '网格视图' },
    lg: { name: '大', label: '网格视图' },
    xl: { name: '最大', label: '网格视图' }
  },

  // 项目颜色配置
  PROJECT_COLORS: {
    'cyan-purple':  'linear-gradient(135deg, #22d3ee, #a78bfa)',
    'pink-fuchsia': 'linear-gradient(135deg, #f472b6, #e879f9)',
    'amber-orange': 'linear-gradient(135deg, #fbbf24, #f97316)',
    'green-teal':   'linear-gradient(135deg, #34d399, #14b8a6)',
    'blue-indigo':  'linear-gradient(135deg, #60a5fa, #3b82f6)',
    'red-rose':     'linear-gradient(135deg, #f87171, #ef4444)',
  },

  // 创建默认文件系统结构
  createDefaultFileSystem: function (projectName) {
    return {
      root: {
        id: 'root',
        name: projectName || '我的资源',
        type: 'folder',
        children: []
      }
    };
  },

  // 示例数据 - 初始化时的默认文件系统
  fileSystem: {
    root: {
      id: 'root',
      name: '我的资源',
      type: 'folder',
      children: ['folder-3d', 'folder-psd', 'folder-video', 'folder-png', 'folder-gif', 'folder-spine', 'folder-audio', 'folder-doc']
    },
  
    // ========== 1. 3D 模型库 ==========
    'folder-3d': {
      id: 'folder-3d',
      name: '3D 模型库',
      type: 'folder',
      parent: 'root',
      children: ['m-glb-1', 'm-glb-2', 'm-fbx-1', 'm-fbx-2', 'm-obj-1'],
      modified: '2026-08-30T09:15:00',
      tags: ['3D', '模型']
    },
    'm-glb-1': {
      id: 'm-glb-1',
      name: '破损头盔.glb',
      type: 'model3d',
      parent: 'folder-3d',
      size: 15600000,
      format: 'GLB',
      vertices: 42000,
      modified: '2026-08-29T08:42:00',
      tags: ['道具', '3D'],
      thumbnail: 'https://picsum.photos/seed/helmet3d/400/400',
      modelUrl: 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/models/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb'
    },
    'm-glb-2': {
      id: 'm-glb-2',
      name: '小黄鸭.glb',
      type: 'model3d',
      parent: 'folder-3d',
      size: 28400000,
      format: 'GLB',
      vertices: 128000,
      modified: '2026-08-28T16:30:00',
      tags: ['角色', '3D'],
      thumbnail: 'https://picsum.photos/seed/duck3d/400/400',
      modelUrl: 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/models/gltf/Duck/glTF-Binary/Duck.glb'
    },
    'm-fbx-1': {
      id: 'm-fbx-1',
      name: '桑巴舞者.fbx',
      type: 'model3d',
      parent: 'folder-3d',
      size: 42000000,
      format: 'FBX',
      vertices: 18000,
      modified: '2026-08-27T10:15:00',
      tags: ['角色', '动画', 'FBX'],
      thumbnail: 'https://picsum.photos/seed/samba3d/400/400',
      modelUrl: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/models/fbx/Samba%20Dancing.fbx'
    },
    'm-fbx-2': {
      id: 'm-fbx-2',
      name: '弗拉明戈舞者.fbx',
      type: 'model3d',
      parent: 'folder-3d',
      size: 38000000,
      format: 'FBX',
      vertices: 15000,
      modified: '2026-08-26T14:30:00',
      tags: ['角色', '动画', 'FBX'],
      thumbnail: 'https://picsum.photos/seed/flamenco3d/400/400',
      modelUrl: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/models/fbx/Flamenco.fbx'
    },
    'm-obj-1': {
      id: 'm-obj-1',
      name: '人物模型.obj',
      type: 'model3d',
      parent: 'folder-3d',
      size: 9800000,
      format: 'OBJ',
      vertices: 32000,
      modified: '2026-08-25T11:20:00',
      tags: ['人物', '3D', 'OBJ'],
      thumbnail: 'https://picsum.photos/seed/male3d/400/400',
      modelUrl: 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/models/obj/male02/male02.obj'
    },
  
    // ========== 2. PSD 源文件 ==========
    'folder-psd': {
      id: 'folder-psd',
      name: 'PSD 源文件',
      type: 'folder',
      parent: 'root',
      children: ['psd-1', 'psd-2'],
      modified: '2026-08-28T10:30:00',
      tags: ['PSD', '设计']
    },
    'psd-1': {
      id: 'psd-1',
      name: '海报设计稿.psd',
      type: 'psd',
      parent: 'folder-psd',
      size: 32000000,
      format: 'PSD',
      width: 1920,
      height: 1080,
      layers: 24,
      modified: '2026-08-28T10:30:00',
      thumbnail: 'https://picsum.photos/seed/psdposter/400/400',
      tags: ['海报', '设计'],
      psdUrl: 'https://cdn.jsdelivr.net/gh/AgamRest/ag-psd@master/test/images/test.psd'
    },
    'psd-2': {
      id: 'psd-2',
      name: 'UI 界面分层稿.psd',
      type: 'psd',
      parent: 'folder-psd',
      size: 18500000,
      format: 'PSD',
      width: 1440,
      height: 900,
      layers: 36,
      modified: '2026-08-27T14:20:00',
      thumbnail: 'https://picsum.photos/seed/psdui/400/400',
      tags: ['UI', '分层'],
      psdUrl: 'https://cdn.jsdelivr.net/gh/AgamRest/ag-psd@master/test/images/test.psd'
    },
  
    // ========== 3. 视频文件 ==========
    'folder-video': {
      id: 'folder-video',
      name: '视频文件',
      type: 'folder',
      parent: 'root',
      children: ['vid-1', 'vid-2', 'vid-3', 'vid-4', 'vid-5', 'vid-6', 'vid-7', 'vid-8', 'vid-9', 'vid-10'],
      modified: '2026-08-25T15:20:00',
      tags: ['视频', '媒体']
    },
    'vid-1': {
      id: 'vid-1',
      name: '角色攻击动画.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 2200000,
      format: 'MP4',
      duration: '0:10',
      width: 1280,
      height: 720,
      modified: '2026-08-25T15:20:00',
      thumbnail: 'https://picsum.photos/seed/vid1/400/400',
      tags: ['动画', '角色'],
      videoUrl: 'https://lorem.video/bunny_720p_h264_10s.mp4'
    },
    'vid-2': {
      id: 'vid-2',
      name: '场景过渡动画.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 2100000,
      format: 'MP4',
      duration: '0:10',
      width: 1280,
      height: 720,
      modified: '2026-08-24T11:10:00',
      thumbnail: 'https://picsum.photos/seed/vid2/400/400',
      tags: ['动画', '场景'],
      videoUrl: 'https://lorem.video/cat_720p_h264_10s.mp4'
    },
    'vid-3': {
      id: 'vid-3',
      name: '特效演示.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 2300000,
      format: 'MP4',
      duration: '0:10',
      width: 1280,
      height: 720,
      modified: '2026-08-23T09:30:00',
      thumbnail: 'https://picsum.photos/seed/vid3/400/400',
      tags: ['特效', '测试'],
      videoUrl: 'https://lorem.video/corgi_720p_h264_10s.mp4'
    },
    'vid-4': {
      id: 'vid-4',
      name: 'UI动效预览.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 2100000,
      format: 'MP4',
      duration: '0:10',
      width: 1280,
      height: 720,
      modified: '2026-08-22T14:00:00',
      thumbnail: 'https://picsum.photos/seed/vid4/400/400',
      tags: ['UI', '动效'],
      videoUrl: 'https://lorem.video/test_720p_h264_10s.mp4'
    },
    'vid-5': {
      id: 'vid-5',
      name: '角色待机循环.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 5200000,
      format: 'MP4',
      duration: '0:15',
      width: 1920,
      height: 1080,
      modified: '2026-08-21T10:30:00',
      thumbnail: 'https://picsum.photos/seed/vid5/400/400',
      tags: ['动画', '角色'],
      videoUrl: 'https://lorem.video/bunny_1080p_h264_15s.mp4'
    },
    'vid-6': {
      id: 'vid-6',
      name: '过场动画片段.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 1100000,
      format: 'MP4',
      duration: '0:10',
      width: 854,
      height: 480,
      modified: '2026-08-20T16:45:00',
      thumbnail: 'https://picsum.photos/seed/vid6/400/400',
      tags: ['动画', '过场'],
      videoUrl: 'https://lorem.video/cat_480p_h264_10s.mp4'
    },
    'vid-7': {
      id: 'vid-7',
      name: 'Boss战预览.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 5400000,
      format: 'MP4',
      duration: '0:15',
      width: 1920,
      height: 1080,
      modified: '2026-08-19T09:15:00',
      thumbnail: 'https://picsum.photos/seed/vid7/400/400',
      tags: ['Boss', '战斗'],
      videoUrl: 'https://lorem.video/corgi_1080p_h264_15s.mp4'
    },
    'vid-8': {
      id: 'vid-8',
      name: '粒子效果测试.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 1000000,
      format: 'MP4',
      duration: '0:10',
      width: 854,
      height: 480,
      modified: '2026-08-18T13:20:00',
      thumbnail: 'https://picsum.photos/seed/vid8/400/400',
      tags: ['粒子', '特效'],
      videoUrl: 'https://lorem.video/test_480p_h264_10s.mp4'
    },
    'vid-9': {
      id: 'vid-9',
      name: '环境氛围动画.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 1200000,
      format: 'MP4',
      duration: '0:10',
      width: 854,
      height: 480,
      modified: '2026-08-17T11:00:00',
      thumbnail: 'https://picsum.photos/seed/vid9/400/400',
      tags: ['环境', '氛围'],
      videoUrl: 'https://lorem.video/bunny_480p_h264_10s.mp4'
    },
    'vid-10': {
      id: 'vid-10',
      name: '技能释放动画.mp4',
      type: 'video',
      parent: 'folder-video',
      size: 5300000,
      format: 'MP4',
      duration: '0:15',
      width: 1920,
      height: 1080,
      modified: '2026-08-16T15:30:00',
      thumbnail: 'https://picsum.photos/seed/vid10/400/400',
      tags: ['技能', '动画'],
      videoUrl: 'https://lorem.video/cat_1080p_h264_15s.mp4'
    },
  
    // ========== 4. PNG 文件 ==========
    'folder-png': {
      id: 'folder-png',
      name: 'PNG 文件',
      type: 'folder',
      parent: 'root',
      children: ['png-1', 'png-2', 'png-3', 'png-4', 'png-5', 'png-6', 'png-7', 'png-8', 'png-9', 'png-10', 'png-11', 'png-12', 'png-13', 'png-14', 'png-15', 'png-16', 'png-17', 'png-18', 'png-19', 'png-20', 'png-21', 'png-22', 'png-23', 'png-24', 'png-25', 'png-26', 'png-27', 'png-28', 'png-29', 'png-30', 'png-31', 'png-32', 'png-33'],
      modified: '2026-08-22T16:00:00',
      tags: ['PNG', '图片']
    },
    'png-1': {
      id: 'png-1',
      name: '透明球体.png',
      type: 'png',
      parent: 'folder-png',
      size: 680000,
      format: 'PNG',
      width: 512,
      height: 512,
      modified: '2026-08-22T16:00:00',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
      tags: ['透明', '球体'],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png'
    },
    'png-2': {
      id: 'png-2',
      name: '透明演示图2.png',
      type: 'png',
      parent: 'folder-png',
      size: 520000,
      format: 'PNG',
      width: 800,
      height: 600,
      modified: '2026-08-21T14:30:00',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Alpha_san_marcos_drape.png',
      tags: ['透明', '织物'],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Alpha_san_marcos_drape.png'
    },
    'png-3': {
      id: 'png-3',
      name: '图标素材.png',
      type: 'png',
      parent: 'folder-png',
      size: 340000,
      format: 'PNG',
      width: 256,
      height: 256,
      modified: '2026-08-20T10:15:00',
      thumbnail: 'https://picsum.photos/seed/pngicon/400/400',
      tags: ['图标', '素材'],
      imageUrl: 'https://picsum.photos/seed/pngicon/800/800'
    },
    'png-4': {
      id: 'png-4',
      name: '横版风景.png',
      type: 'png',
      parent: 'folder-png',
      size: 890000,
      format: 'PNG',
      width: 1200,
      height: 600,
      modified: '2026-08-19T09:30:00',
      thumbnail: 'https://picsum.photos/seed/png04/600/300',
      tags: ['风景', '横版'],
      imageUrl: 'https://picsum.photos/seed/png04/1200/600'
    },
    'png-5': {
      id: 'png-5',
      name: '竖版人像.png',
      type: 'png',
      parent: 'folder-png',
      size: 720000,
      format: 'PNG',
      width: 600,
      height: 900,
      modified: '2026-08-18T14:20:00',
      thumbnail: 'https://picsum.photos/seed/png05/400/600',
      tags: ['人像', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png05/600/900'
    },
    'png-6': {
      id: 'png-6',
      name: '超宽横幅.png',
      type: 'png',
      parent: 'folder-png',
      size: 1100000,
      format: 'PNG',
      width: 1600,
      height: 400,
      modified: '2026-08-17T11:00:00',
      thumbnail: 'https://picsum.photos/seed/png06/800/200',
      tags: ['横幅', '超宽'],
      imageUrl: 'https://picsum.photos/seed/png06/1600/400'
    },
    'png-7': {
      id: 'png-7',
      name: '长条海报.png',
      type: 'png',
      parent: 'folder-png',
      size: 950000,
      format: 'PNG',
      width: 400,
      height: 1200,
      modified: '2026-08-16T16:45:00',
      thumbnail: 'https://picsum.photos/seed/png07/200/600',
      tags: ['海报', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png07/400/1200'
    },
    'png-8': {
      id: 'png-8',
      name: '方形插画.png',
      type: 'png',
      parent: 'folder-png',
      size: 560000,
      format: 'PNG',
      width: 800,
      height: 800,
      modified: '2026-08-15T10:30:00',
      thumbnail: 'https://picsum.photos/seed/png08/400/400',
      tags: ['插画', '方形'],
      imageUrl: 'https://picsum.photos/seed/png08/800/800'
    },
    'png-9': {
      id: 'png-9',
      name: '16:9 场景.png',
      type: 'png',
      parent: 'folder-png',
      size: 1200000,
      format: 'PNG',
      width: 1920,
      height: 1080,
      modified: '2026-08-14T13:15:00',
      thumbnail: 'https://picsum.photos/seed/png09/640/360',
      tags: ['场景', '16:9'],
      imageUrl: 'https://picsum.photos/seed/png09/1920/1080'
    },
    'png-10': {
      id: 'png-10',
      name: '手机壁纸.png',
      type: 'png',
      parent: 'folder-png',
      size: 1500000,
      format: 'PNG',
      width: 1080,
      height: 1920,
      modified: '2026-08-13T15:00:00',
      thumbnail: 'https://picsum.photos/seed/png10/360/640',
      tags: ['壁纸', '手机'],
      imageUrl: 'https://picsum.photos/seed/png10/1080/1920'
    },
    'png-11': {
      id: 'png-11',
      name: '小图标.png',
      type: 'png',
      parent: 'folder-png',
      size: 45000,
      format: 'PNG',
      width: 128,
      height: 128,
      modified: '2026-08-12T09:00:00',
      thumbnail: 'https://picsum.photos/seed/png11/200/200',
      tags: ['图标', '小尺寸'],
      imageUrl: 'https://picsum.photos/seed/png11/128/128'
    },
    'png-12': {
      id: 'png-12',
      name: '宽幅建筑.png',
      type: 'png',
      parent: 'folder-png',
      size: 1350000,
      format: 'PNG',
      width: 1400,
      height: 700,
      modified: '2026-08-11T14:30:00',
      thumbnail: 'https://picsum.photos/seed/png12/700/350',
      tags: ['建筑', '横版'],
      imageUrl: 'https://picsum.photos/seed/png12/1400/700'
    },
    'png-13': {
      id: 'png-13',
      name: '竖版风景.png',
      type: 'png',
      parent: 'folder-png',
      size: 820000,
      format: 'PNG',
      width: 500,
      height: 750,
      modified: '2026-08-10T11:20:00',
      thumbnail: 'https://picsum.photos/seed/png13/400/600',
      tags: ['风景', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png13/500/750'
    },
    'png-14': {
      id: 'png-14',
      name: '超宽屏背景.png',
      type: 'png',
      parent: 'folder-png',
      size: 1800000,
      format: 'PNG',
      width: 2560,
      height: 720,
      modified: '2026-08-09T16:00:00',
      thumbnail: 'https://picsum.photos/seed/png14/800/225',
      tags: ['背景', '超宽'],
      imageUrl: 'https://picsum.photos/seed/png14/2560/720'
    },
    'png-15': {
      id: 'png-15',
      name: '高长竖图.png',
      type: 'png',
      parent: 'folder-png',
      size: 1600000,
      format: 'PNG',
      width: 600,
      height: 1800,
      modified: '2026-08-08T10:45:00',
      thumbnail: 'https://picsum.photos/seed/png15/200/600',
      tags: ['长图', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png15/600/1800'
    },
    'png-16': {
      id: 'png-16',
      name: '正方形头像.png',
      type: 'png',
      parent: 'folder-png',
      size: 180000,
      format: 'PNG',
      width: 400,
      height: 400,
      modified: '2026-08-07T13:30:00',
      thumbnail: 'https://picsum.photos/seed/png16/300/300',
      tags: ['头像', '方形'],
      imageUrl: 'https://picsum.photos/seed/png16/400/400'
    },
    'png-17': {
      id: 'png-17',
      name: '4:3 旧照片.png',
      type: 'png',
      parent: 'folder-png',
      size: 650000,
      format: 'PNG',
      width: 800,
      height: 600,
      modified: '2026-08-06T09:15:00',
      thumbnail: 'https://picsum.photos/seed/png17/400/300',
      tags: ['复古', '4:3'],
      imageUrl: 'https://picsum.photos/seed/png17/800/600'
    },
    'png-18': {
      id: 'png-18',
      name: '3:4 竖图.png',
      type: 'png',
      parent: 'folder-png',
      size: 540000,
      format: 'PNG',
      width: 600,
      height: 800,
      modified: '2026-08-05T14:00:00',
      thumbnail: 'https://picsum.photos/seed/png18/300/400',
      tags: ['竖版', '3:4'],
      imageUrl: 'https://picsum.photos/seed/png18/600/800'
    },
    'png-19': {
      id: 'png-19',
      name: '全景宽图.png',
      type: 'png',
      parent: 'folder-png',
      size: 2100000,
      format: 'PNG',
      width: 2000,
      height: 500,
      modified: '2026-08-04T11:30:00',
      thumbnail: 'https://picsum.photos/seed/png19/800/200',
      tags: ['全景', '横版'],
      imageUrl: 'https://picsum.photos/seed/png19/2000/500'
    },
    'png-20': {
      id: 'png-20',
      name: '细长插画.png',
      type: 'png',
      parent: 'folder-png',
      size: 480000,
      format: 'PNG',
      width: 300,
      height: 1000,
      modified: '2026-08-03T15:45:00',
      thumbnail: 'https://picsum.photos/seed/png20/150/500',
      tags: ['插画', '细长'],
      imageUrl: 'https://picsum.photos/seed/png20/300/1000'
    },
    'png-21': {
      id: 'png-21',
      name: '中大方形.png',
      type: 'png',
      parent: 'folder-png',
      size: 920000,
      format: 'PNG',
      width: 1000,
      height: 1000,
      modified: '2026-08-02T10:00:00',
      thumbnail: 'https://picsum.photos/seed/png21/400/400',
      tags: ['方形', '中大尺寸'],
      imageUrl: 'https://picsum.photos/seed/png21/1000/1000'
    },
    'png-22': {
      id: 'png-22',
      name: '电影宽幅.png',
      type: 'png',
      parent: 'folder-png',
      size: 1450000,
      format: 'PNG',
      width: 1920,
      height: 800,
      modified: '2026-08-01T13:20:00',
      thumbnail: 'https://picsum.photos/seed/png22/600/250',
      tags: ['电影', '宽幅'],
      imageUrl: 'https://picsum.photos/seed/png22/1920/800'
    },
    'png-23': {
      id: 'png-23',
      name: '杂志竖版.png',
      type: 'png',
      parent: 'folder-png',
      size: 1100000,
      format: 'PNG',
      width: 850,
      height: 1100,
      modified: '2026-07-31T14:50:00',
      thumbnail: 'https://picsum.photos/seed/png23/400/518',
      tags: ['杂志', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png23/850/1100'
    },
    'png-24': {
      id: 'png-24',
      name: '小横图.png',
      type: 'png',
      parent: 'folder-png',
      size: 120000,
      format: 'PNG',
      width: 320,
      height: 180,
      modified: '2026-07-30T09:30:00',
      thumbnail: 'https://picsum.photos/seed/png24/320/180',
      tags: ['小尺寸', '横版'],
      imageUrl: 'https://picsum.photos/seed/png24/320/180'
    },
    'png-25': {
      id: 'png-25',
      name: '小竖图.png',
      type: 'png',
      parent: 'folder-png',
      size: 95000,
      format: 'PNG',
      width: 180,
      height: 320,
      modified: '2026-07-29T11:15:00',
      thumbnail: 'https://picsum.photos/seed/png25/180/320',
      tags: ['小尺寸', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png25/180/320'
    },
    'png-26': {
      id: 'png-26',
      name: '极宽横幅.png',
      type: 'png',
      parent: 'folder-png',
      size: 980000,
      format: 'PNG',
      width: 2400,
      height: 300,
      modified: '2026-07-28T16:30:00',
      thumbnail: 'https://picsum.photos/seed/png26/800/100',
      tags: ['横幅', '极宽'],
      imageUrl: 'https://picsum.photos/seed/png26/2400/300'
    },
    'png-27': {
      id: 'png-27',
      name: '极高竖图.png',
      type: 'png',
      parent: 'folder-png',
      size: 850000,
      format: 'PNG',
      width: 300,
      height: 2000,
      modified: '2026-07-27T10:45:00',
      thumbnail: 'https://picsum.photos/seed/png27/100/667',
      tags: ['长图', '极高'],
      imageUrl: 'https://picsum.photos/seed/png27/300/2000'
    },
    'png-28': {
      id: 'png-28',
      name: 'A4 横版.png',
      type: 'png',
      parent: 'folder-png',
      size: 1700000,
      format: 'PNG',
      width: 1754,
      height: 1240,
      modified: '2026-07-26T13:00:00',
      thumbnail: 'https://picsum.photos/seed/png28/500/353',
      tags: ['A4', '横版'],
      imageUrl: 'https://picsum.photos/seed/png28/1754/1240'
    },
    'png-29': {
      id: 'png-29',
      name: 'A4 竖版.png',
      type: 'png',
      parent: 'folder-png',
      size: 1650000,
      format: 'PNG',
      width: 1240,
      height: 1754,
      modified: '2026-07-25T15:30:00',
      thumbnail: 'https://picsum.photos/seed/png29/353/500',
      tags: ['A4', '竖版'],
      imageUrl: 'https://picsum.photos/seed/png29/1240/1754'
    },
    'png-30': {
      id: 'png-30',
      name: '正方形大图.png',
      type: 'png',
      parent: 'folder-png',
      size: 2200000,
      format: 'PNG',
      width: 1600,
      height: 1600,
      modified: '2026-07-24T11:00:00',
      thumbnail: 'https://picsum.photos/seed/png30/400/400',
      tags: ['方形', '大尺寸'],
      imageUrl: 'https://picsum.photos/seed/png30/1600/1600'
    },
    'png-31': {
      id: 'png-31',
      name: '21:9 超宽.png',
      type: 'png',
      parent: 'folder-png',
      size: 1900000,
      format: 'PNG',
      width: 2560,
      height: 1080,
      modified: '2026-07-23T14:20:00',
      thumbnail: 'https://picsum.photos/seed/png31/640/270',
      tags: ['超宽屏', '21:9'],
      imageUrl: 'https://picsum.photos/seed/png31/2560/1080'
    },
    'png-32': {
      id: 'png-32',
      name: '9:16 短视频.png',
      type: 'png',
      parent: 'folder-png',
      size: 1750000,
      format: 'PNG',
      width: 1080,
      height: 1920,
      modified: '2026-07-22T09:45:00',
      thumbnail: 'https://picsum.photos/seed/png32/270/480',
      tags: ['短视频', '9:16'],
      imageUrl: 'https://picsum.photos/seed/png32/1080/1920'
    },
    'png-33': {
      id: 'png-33',
      name: '微型图标.png',
      type: 'png',
      parent: 'folder-png',
      size: 15000,
      format: 'PNG',
      width: 64,
      height: 64,
      modified: '2026-07-21T16:00:00',
      thumbnail: 'https://picsum.photos/seed/png33/100/100',
      tags: ['图标', '微型'],
      imageUrl: 'https://picsum.photos/seed/png33/64/64'
    },
  
    // ========== 5. GIF 文件 ==========
    'folder-gif': {
      id: 'folder-gif',
      name: 'GIF 文件',
      type: 'folder',
      parent: 'root',
      children: ['gif-1', 'gif-2', 'gif-3'],
      modified: '2026-08-20T12:00:00',
      tags: ['GIF', '动画']
    },
    'gif-1': {
      id: 'gif-1',
      name: '旋转地球.gif',
      type: 'gif',
      parent: 'folder-gif',
      size: 2400000,
      format: 'GIF',
      width: 400,
      height: 400,
      modified: '2026-08-20T12:00:00',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif',
      tags: ['地球', '动画'],
      gifUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif'
    },
    'gif-2': {
      id: 'gif-2',
      name: '加载动画.gif',
      type: 'gif',
      parent: 'folder-gif',
      size: 890000,
      format: 'GIF',
      width: 200,
      height: 200,
      modified: '2026-08-19T15:45:00',
      thumbnail: 'https://media.giphy.com/media/3oEjI6S94BoYIKSyoM/giphy.gif',
      tags: ['加载', '动画'],
      gifUrl: 'https://media.giphy.com/media/3oEjI6S94BoYIKSyoM/giphy.gif'
    },
    'gif-3': {
      id: 'gif-3',
      name: '猫跳跃.gif',
      type: 'gif',
      parent: 'folder-gif',
      size: 1200000,
      format: 'GIF',
      width: 480,
      height: 320,
      modified: '2026-08-18T09:20:00',
      thumbnail: 'https://media.giphy.com/media/JltDjO1aj3qjq/giphy.gif',
      tags: ['猫', '动画'],
      gifUrl: 'https://media.giphy.com/media/JltDjO1aj3qjq/giphy.gif'
    },
  
    // ========== 6. Spine 文件 ==========
    'folder-spine': {
      id: 'folder-spine',
      name: 'Spine 文件',
      type: 'folder',
      parent: 'root',
      children: ['spine-1', 'spine-2'],
      modified: '2026-08-18T14:00:00',
      tags: ['Spine', '动画']
    },
    'spine-1': {
      id: 'spine-1',
      name: 'Raptor (spine)',
      type: 'spine',
      parent: 'folder-spine',
      size: 5800000,
      format: 'JSON',
      modified: '2026-08-18T14:00:00',
      thumbnail: 'https://picsum.photos/seed/raptor/400/400',
      tags: ['恐龙', 'Spine'],
      spineJsonUrl: 'https://esotericsoftware.com/files/raptor/raptor-pro.json',
      spineAtlasUrl: 'https://esotericsoftware.com/files/raptor/raptor.atlas',
      spineTexturePrefix: 'https://esotericsoftware.com/files/raptor/'
    },
    'spine-2': {
      id: 'spine-2',
      name: 'Stretch (spine)',
      type: 'spine',
      parent: 'folder-spine',
      size: 3200000,
      format: 'JSON',
      modified: '2026-08-17T10:30:00',
      thumbnail: 'https://picsum.photos/seed/stretch/400/400',
      tags: ['人物', 'Spine'],
      spineJsonUrl: 'https://esotericsoftware.com/files/stretch/stretch-pro.json',
      spineAtlasUrl: 'https://esotericsoftware.com/files/stretch/stretch.atlas',
      spineTexturePrefix: 'https://esotericsoftware.com/files/stretch/'
    },
  
    // ========== 7. 音频文件 ==========
    'folder-audio': {
      id: 'folder-audio',
      name: '音频文件',
      type: 'folder',
      parent: 'root',
      children: ['aud-1', 'aud-2', 'aud-3'],
      modified: '2026-08-17T11:00:00',
      tags: ['音频', '音乐']
    },
    'aud-1': {
      id: 'aud-1',
      name: 'SoundHelix Song 1.mp3',
      type: 'audio',
      parent: 'folder-audio',
      size: 5600000,
      format: 'MP3',
      duration: '5:51',
      modified: '2026-08-17T11:00:00',
      thumbnail: 'https://picsum.photos/seed/audio1/400/400',
      tags: ['音乐', '示例'],
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    'aud-2': {
      id: 'aud-2',
      name: 'SoundHelix Song 2.mp3',
      type: 'audio',
      parent: 'folder-audio',
      size: 6200000,
      format: 'MP3',
      duration: '6:25',
      modified: '2026-08-16T14:20:00',
      thumbnail: 'https://picsum.photos/seed/audio2/400/400',
      tags: ['音乐', '示例'],
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    'aud-3': {
      id: 'aud-3',
      name: 'SoundHelix Song 8.mp3',
      type: 'audio',
      parent: 'folder-audio',
      size: 4800000,
      format: 'MP3',
      duration: '4:58',
      modified: '2026-08-15T09:45:00',
      thumbnail: 'https://picsum.photos/seed/audio8/400/400',
      tags: ['音乐', '示例'],
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
    },
  
    // ========== 8. 文档 ==========
    'folder-doc': {
      id: 'folder-doc',
      name: '文档',
      type: 'folder',
      parent: 'root',
      children: ['doc-1', 'doc-2', 'doc-3', 'doc-4', 'doc-5', 'doc-6', 'doc-7', 'doc-8', 'doc-9', 'doc-10', 'doc-11', 'doc-12', 'doc-13', 'doc-14', 'doc-15', 'doc-16', 'doc-17', 'doc-18', 'doc-19', 'doc-20'],
      modified: '2026-08-15T10:00:00',
      tags: ['文档', '资料']
    },
    'doc-1': {
      id: 'doc-1',
      name: 'TraceMonkey 论文.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 1200000,
      format: 'PDF',
      pages: 9,
      modified: '2026-08-15T10:00:00',
      thumbnail: 'https://picsum.photos/seed/tracepdf/400/400',
      tags: ['论文', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-2': {
      id: 'doc-2',
      name: '产品白皮书.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 3400000,
      format: 'PDF',
      pages: 24,
      modified: '2026-08-14T16:30:00',
      thumbnail: 'https://picsum.photos/seed/whitepaper/400/400',
      tags: ['白皮书', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-3': {
      id: 'doc-3',
      name: '技术架构设计.docx',
      type: 'document',
      parent: 'folder-doc',
      size: 850000,
      format: 'DOCX',
      pages: 15,
      modified: '2026-08-13T09:20:00',
      thumbnail: 'https://picsum.photos/seed/archdoc/400/400',
      tags: ['技术', '架构']
    },
    'doc-4': {
      id: 'doc-4',
      name: '需求规格说明书.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 2100000,
      format: 'PDF',
      pages: 32,
      modified: '2026-08-12T14:45:00',
      thumbnail: 'https://picsum.photos/seed/reqspec/400/400',
      tags: ['需求', '规格']
    },
    'doc-5': {
      id: 'doc-5',
      name: '用户操作手册.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 4500000,
      format: 'PDF',
      pages: 68,
      modified: '2026-08-11T11:30:00',
      thumbnail: 'https://picsum.photos/seed/usermanual/400/400',
      tags: ['手册', '用户指南']
    },
    'doc-6': {
      id: 'doc-6',
      name: '项目进度报告.xlsx',
      type: 'document',
      parent: 'folder-doc',
      size: 320000,
      format: 'XLSX',
      pages: 3,
      modified: '2026-08-10T16:00:00',
      thumbnail: 'https://picsum.photos/seed/progressrep/400/400',
      tags: ['报告', '进度']
    },
    'doc-7': {
      id: 'doc-7',
      name: 'API 接口文档.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 1800000,
      format: 'PDF',
      pages: 42,
      modified: '2026-08-09T10:15:00',
      thumbnail: 'https://picsum.photos/seed/apidoc/400/400',
      tags: ['API', '接口']
    },
    'doc-8': {
      id: 'doc-8',
      name: '市场调研报告.pptx',
      type: 'document',
      parent: 'folder-doc',
      size: 6200000,
      format: 'PPTX',
      pages: 28,
      modified: '2026-08-08T13:45:00',
      thumbnail: 'https://picsum.photos/seed/marketppt/400/400',
      tags: ['市场', '调研']
    },
    'doc-9': {
      id: 'doc-9',
      name: '测试用例文档.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 950000,
      format: 'PDF',
      pages: 18,
      modified: '2026-08-07T09:30:00',
      thumbnail: 'https://picsum.photos/seed/testcase/400/400',
      tags: ['测试', '用例']
    },
    'doc-10': {
      id: 'doc-10',
      name: '数据字典文档.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 1600000,
      format: 'PDF',
      pages: 25,
      modified: '2026-08-06T15:20:00',
      thumbnail: 'https://picsum.photos/seed/datadict/400/400',
      tags: ['数据', '字典']
    },
  
    // ===== doc-1 附件 =====
    'doc-1__attach': {
      id: 'doc-1__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-1-att-1', 'doc-1-att-2', 'doc-1-att-3', 'doc-1-att-4', 'doc-1-att-5', 'doc-1-att-6', 'doc-1-att-7', 'doc-1-att-8', 'doc-1-att-9', 'doc-1-att-10'],
      modified: '2026-08-15T10:00:00',
      hidden: true
    },
    'doc-1-att-1': { id: 'doc-1-att-1', type: 'link', parent: 'doc-1__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-1-att-2': { id: 'doc-1-att-2', type: 'link', parent: 'doc-1__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-1-att-3': { id: 'doc-1-att-3', type: 'link', parent: 'doc-1__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-1-att-4': { id: 'doc-1-att-4', type: 'link', parent: 'doc-1__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-1-att-5': { id: 'doc-1-att-5', type: 'link', parent: 'doc-1__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-1-att-6': { id: 'doc-1-att-6', type: 'link', parent: 'doc-1__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-1-att-7': { id: 'doc-1-att-7', type: 'link', parent: 'doc-1__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-1-att-8': { id: 'doc-1-att-8', type: 'link', parent: 'doc-1__attach', targetId: 'doc-2', name: '产品白皮书.pdf' },
    'doc-1-att-9': { id: 'doc-1-att-9', type: 'link', parent: 'doc-1__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-1-att-10': { id: 'doc-1-att-10', type: 'link', parent: 'doc-1__attach', targetId: 'png-2', name: '透明演示图2.png' },
  
    // ===== doc-2 附件 =====
    'doc-2__attach': {
      id: 'doc-2__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-2-att-1', 'doc-2-att-2', 'doc-2-att-3', 'doc-2-att-4', 'doc-2-att-5', 'doc-2-att-6', 'doc-2-att-7', 'doc-2-att-8', 'doc-2-att-9', 'doc-2-att-10'],
      modified: '2026-08-14T16:30:00',
      hidden: true
    },
    'doc-2-att-1': { id: 'doc-2-att-1', type: 'link', parent: 'doc-2__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-2-att-2': { id: 'doc-2-att-2', type: 'link', parent: 'doc-2__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-2-att-3': { id: 'doc-2-att-3', type: 'link', parent: 'doc-2__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-2-att-4': { id: 'doc-2-att-4', type: 'link', parent: 'doc-2__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-2-att-5': { id: 'doc-2-att-5', type: 'link', parent: 'doc-2__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-2-att-6': { id: 'doc-2-att-6', type: 'link', parent: 'doc-2__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-2-att-7': { id: 'doc-2-att-7', type: 'link', parent: 'doc-2__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-2-att-8': { id: 'doc-2-att-8', type: 'link', parent: 'doc-2__attach', targetId: 'doc-3', name: '技术架构设计.docx' },
    'doc-2-att-9': { id: 'doc-2-att-9', type: 'link', parent: 'doc-2__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-2-att-10': { id: 'doc-2-att-10', type: 'link', parent: 'doc-2__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
  
    // ===== doc-3 附件 =====
    'doc-3__attach': {
      id: 'doc-3__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-3-att-1', 'doc-3-att-2', 'doc-3-att-3', 'doc-3-att-4', 'doc-3-att-5', 'doc-3-att-6', 'doc-3-att-7', 'doc-3-att-8', 'doc-3-att-9', 'doc-3-att-10'],
      modified: '2026-08-13T09:20:00',
      hidden: true
    },
    'doc-3-att-1': { id: 'doc-3-att-1', type: 'link', parent: 'doc-3__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-3-att-2': { id: 'doc-3-att-2', type: 'link', parent: 'doc-3__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-3-att-3': { id: 'doc-3-att-3', type: 'link', parent: 'doc-3__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-3-att-4': { id: 'doc-3-att-4', type: 'link', parent: 'doc-3__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-3-att-5': { id: 'doc-3-att-5', type: 'link', parent: 'doc-3__attach', targetId: 'doc-4', name: '需求规格说明书.pdf' },
    'doc-3-att-6': { id: 'doc-3-att-6', type: 'link', parent: 'doc-3__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-3-att-7': { id: 'doc-3-att-7', type: 'link', parent: 'doc-3__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-3-att-8': { id: 'doc-3-att-8', type: 'link', parent: 'doc-3__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-3-att-9': { id: 'doc-3-att-9', type: 'link', parent: 'doc-3__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-3-att-10': { id: 'doc-3-att-10', type: 'link', parent: 'doc-3__attach', targetId: 'png-2', name: '透明演示图2.png' },
  
    // ===== doc-4 附件 =====
    'doc-4__attach': {
      id: 'doc-4__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-4-att-1', 'doc-4-att-2', 'doc-4-att-3', 'doc-4-att-4', 'doc-4-att-5', 'doc-4-att-6', 'doc-4-att-7', 'doc-4-att-8', 'doc-4-att-9', 'doc-4-att-10'],
      modified: '2026-08-12T14:45:00',
      hidden: true
    },
    'doc-4-att-1': { id: 'doc-4-att-1', type: 'link', parent: 'doc-4__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-4-att-2': { id: 'doc-4-att-2', type: 'link', parent: 'doc-4__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-4-att-3': { id: 'doc-4-att-3', type: 'link', parent: 'doc-4__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-4-att-4': { id: 'doc-4-att-4', type: 'link', parent: 'doc-4__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-4-att-5': { id: 'doc-4-att-5', type: 'link', parent: 'doc-4__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-4-att-6': { id: 'doc-4-att-6', type: 'link', parent: 'doc-4__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-4-att-7': { id: 'doc-4-att-7', type: 'link', parent: 'doc-4__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-4-att-8': { id: 'doc-4-att-8', type: 'link', parent: 'doc-4__attach', targetId: 'doc-5', name: '用户操作手册.pdf' },
    'doc-4-att-9': { id: 'doc-4-att-9', type: 'link', parent: 'doc-4__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-4-att-10': { id: 'doc-4-att-10', type: 'link', parent: 'doc-4__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
  
    // ===== doc-5 附件 =====
    'doc-5__attach': {
      id: 'doc-5__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-5-att-1', 'doc-5-att-2', 'doc-5-att-3', 'doc-5-att-4', 'doc-5-att-5', 'doc-5-att-6', 'doc-5-att-7', 'doc-5-att-8', 'doc-5-att-9', 'doc-5-att-10'],
      modified: '2026-08-11T11:30:00',
      hidden: true
    },
    'doc-5-att-1': { id: 'doc-5-att-1', type: 'link', parent: 'doc-5__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-5-att-2': { id: 'doc-5-att-2', type: 'link', parent: 'doc-5__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-5-att-3': { id: 'doc-5-att-3', type: 'link', parent: 'doc-5__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-5-att-4': { id: 'doc-5-att-4', type: 'link', parent: 'doc-5__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-5-att-5': { id: 'doc-5-att-5', type: 'link', parent: 'doc-5__attach', targetId: 'doc-6', name: '项目进度报告.xlsx' },
    'doc-5-att-6': { id: 'doc-5-att-6', type: 'link', parent: 'doc-5__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-5-att-7': { id: 'doc-5-att-7', type: 'link', parent: 'doc-5__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-5-att-8': { id: 'doc-5-att-8', type: 'link', parent: 'doc-5__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-5-att-9': { id: 'doc-5-att-9', type: 'link', parent: 'doc-5__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-5-att-10': { id: 'doc-5-att-10', type: 'link', parent: 'doc-5__attach', targetId: 'png-2', name: '透明演示图2.png' },
  
    // ===== doc-6 附件 =====
    'doc-6__attach': {
      id: 'doc-6__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-6-att-1', 'doc-6-att-2', 'doc-6-att-3', 'doc-6-att-4', 'doc-6-att-5', 'doc-6-att-6', 'doc-6-att-7', 'doc-6-att-8', 'doc-6-att-9', 'doc-6-att-10'],
      modified: '2026-08-10T16:00:00',
      hidden: true
    },
    'doc-6-att-1': { id: 'doc-6-att-1', type: 'link', parent: 'doc-6__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-6-att-2': { id: 'doc-6-att-2', type: 'link', parent: 'doc-6__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-6-att-3': { id: 'doc-6-att-3', type: 'link', parent: 'doc-6__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-6-att-4': { id: 'doc-6-att-4', type: 'link', parent: 'doc-6__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-6-att-5': { id: 'doc-6-att-5', type: 'link', parent: 'doc-6__attach', targetId: 'doc-7', name: 'API 接口文档.pdf' },
    'doc-6-att-6': { id: 'doc-6-att-6', type: 'link', parent: 'doc-6__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-6-att-7': { id: 'doc-6-att-7', type: 'link', parent: 'doc-6__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-6-att-8': { id: 'doc-6-att-8', type: 'link', parent: 'doc-6__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-6-att-9': { id: 'doc-6-att-9', type: 'link', parent: 'doc-6__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-6-att-10': { id: 'doc-6-att-10', type: 'link', parent: 'doc-6__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
  
    // ===== doc-7 附件 =====
    'doc-7__attach': {
      id: 'doc-7__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-7-att-1', 'doc-7-att-2', 'doc-7-att-3', 'doc-7-att-4', 'doc-7-att-5', 'doc-7-att-6', 'doc-7-att-7', 'doc-7-att-8', 'doc-7-att-9', 'doc-7-att-10'],
      modified: '2026-08-09T10:15:00',
      hidden: true
    },
    'doc-7-att-1': { id: 'doc-7-att-1', type: 'link', parent: 'doc-7__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-7-att-2': { id: 'doc-7-att-2', type: 'link', parent: 'doc-7__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-7-att-3': { id: 'doc-7-att-3', type: 'link', parent: 'doc-7__attach', targetId: 'png-2', name: '透明演示图2.png' },
    'doc-7-att-4': { id: 'doc-7-att-4', type: 'link', parent: 'doc-7__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-7-att-5': { id: 'doc-7-att-5', type: 'link', parent: 'doc-7__attach', targetId: 'doc-8', name: '市场调研报告.pptx' },
    'doc-7-att-6': { id: 'doc-7-att-6', type: 'link', parent: 'doc-7__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-7-att-7': { id: 'doc-7-att-7', type: 'link', parent: 'doc-7__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-7-att-8': { id: 'doc-7-att-8', type: 'link', parent: 'doc-7__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-7-att-9': { id: 'doc-7-att-9', type: 'link', parent: 'doc-7__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-7-att-10': { id: 'doc-7-att-10', type: 'link', parent: 'doc-7__attach', targetId: 'png-1', name: '透明球体.png' },
  
    // ===== doc-8 附件 =====
    'doc-8__attach': {
      id: 'doc-8__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-8-att-1', 'doc-8-att-2', 'doc-8-att-3', 'doc-8-att-4', 'doc-8-att-5', 'doc-8-att-6', 'doc-8-att-7', 'doc-8-att-8', 'doc-8-att-9', 'doc-8-att-10'],
      modified: '2026-08-08T13:45:00',
      hidden: true
    },
    'doc-8-att-1': { id: 'doc-8-att-1', type: 'link', parent: 'doc-8__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-8-att-2': { id: 'doc-8-att-2', type: 'link', parent: 'doc-8__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-8-att-3': { id: 'doc-8-att-3', type: 'link', parent: 'doc-8__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-8-att-4': { id: 'doc-8-att-4', type: 'link', parent: 'doc-8__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-8-att-5': { id: 'doc-8-att-5', type: 'link', parent: 'doc-8__attach', targetId: 'doc-9', name: '测试用例文档.pdf' },
    'doc-8-att-6': { id: 'doc-8-att-6', type: 'link', parent: 'doc-8__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-8-att-7': { id: 'doc-8-att-7', type: 'link', parent: 'doc-8__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-8-att-8': { id: 'doc-8-att-8', type: 'link', parent: 'doc-8__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-8-att-9': { id: 'doc-8-att-9', type: 'link', parent: 'doc-8__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-8-att-10': { id: 'doc-8-att-10', type: 'link', parent: 'doc-8__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
  
    // ===== doc-9 附件 =====
    'doc-9__attach': {
      id: 'doc-9__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-9-att-1', 'doc-9-att-2', 'doc-9-att-3', 'doc-9-att-4', 'doc-9-att-5', 'doc-9-att-6', 'doc-9-att-7', 'doc-9-att-8', 'doc-9-att-9', 'doc-9-att-10'],
      modified: '2026-08-07T09:30:00',
      hidden: true
    },
    'doc-9-att-1': { id: 'doc-9-att-1', type: 'link', parent: 'doc-9__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-9-att-2': { id: 'doc-9-att-2', type: 'link', parent: 'doc-9__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-9-att-3': { id: 'doc-9-att-3', type: 'link', parent: 'doc-9__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-9-att-4': { id: 'doc-9-att-4', type: 'link', parent: 'doc-9__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-9-att-5': { id: 'doc-9-att-5', type: 'link', parent: 'doc-9__attach', targetId: 'doc-10', name: '数据字典文档.pdf' },
    'doc-9-att-6': { id: 'doc-9-att-6', type: 'link', parent: 'doc-9__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-9-att-7': { id: 'doc-9-att-7', type: 'link', parent: 'doc-9__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-9-att-8': { id: 'doc-9-att-8', type: 'link', parent: 'doc-9__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-9-att-9': { id: 'doc-9-att-9', type: 'link', parent: 'doc-9__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-9-att-10': { id: 'doc-9-att-10', type: 'link', parent: 'doc-9__attach', targetId: 'png-2', name: '透明演示图2.png' },
  
    // ===== doc-10 附件 =====
    'doc-10__attach': {
      id: 'doc-10__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-10-att-1', 'doc-10-att-2', 'doc-10-att-3', 'doc-10-att-4', 'doc-10-att-5', 'doc-10-att-6', 'doc-10-att-7', 'doc-10-att-8', 'doc-10-att-9', 'doc-10-att-10'],
      modified: '2026-08-06T15:20:00',
      hidden: true
    },
    'doc-10-att-1': { id: 'doc-10-att-1', type: 'link', parent: 'doc-10__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-10-att-2': { id: 'doc-10-att-2', type: 'link', parent: 'doc-10__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-10-att-3': { id: 'doc-10-att-3', type: 'link', parent: 'doc-10__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-10-att-4': { id: 'doc-10-att-4', type: 'link', parent: 'doc-10__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-10-att-5': { id: 'doc-10-att-5', type: 'link', parent: 'doc-10__attach', targetId: 'doc-1', name: 'TraceMonkey 论文.pdf' },
    'doc-10-att-6': { id: 'doc-10-att-6', type: 'link', parent: 'doc-10__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-10-att-7': { id: 'doc-10-att-7', type: 'link', parent: 'doc-10__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
    'doc-10-att-8': { id: 'doc-10-att-8', type: 'link', parent: 'doc-10__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-10-att-9': { id: 'doc-10-att-9', type: 'link', parent: 'doc-10__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-10-att-10': { id: 'doc-10-att-10', type: 'link', parent: 'doc-10__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-11': {
      id: 'doc-11',
      name: '系统运维手册.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 2800000,
      format: 'PDF',
      pages: 56,
      modified: '2026-08-14T09:30:00',
      thumbnail: 'https://picsum.photos/seed/sysopspdf/400/400',
      tags: ['运维', 'PDF', '手册'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-12': {
      id: 'doc-12',
      name: '安全规范文档.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 1500000,
      format: 'PDF',
      pages: 38,
      modified: '2026-08-13T14:20:00',
      thumbnail: 'https://picsum.photos/seed/securitypdf/400/400',
      tags: ['安全', 'PDF', '规范'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-13': {
      id: 'doc-13',
      name: '数据库设计.docx',
      type: 'document',
      parent: 'folder-doc',
      size: 720000,
      format: 'DOCX',
      pages: 22,
      modified: '2026-08-12T11:15:00',
      thumbnail: 'https://picsum.photos/seed/dbdocx/400/400',
      tags: ['数据库', '设计', 'DOCX'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-14': {
      id: 'doc-14',
      name: '部署运维指南.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 3200000,
      format: 'PDF',
      pages: 72,
      modified: '2026-08-11T16:45:00',
      thumbnail: 'https://picsum.photos/seed/deploypdf/400/400',
      tags: ['部署', '运维', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-15': {
      id: 'doc-15',
      name: '代码规范文档.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 980000,
      format: 'PDF',
      pages: 28,
      modified: '2026-08-10T10:00:00',
      thumbnail: 'https://picsum.photos/seed/codestandard/400/400',
      tags: ['代码', '规范', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-16': {
      id: 'doc-16',
      name: '性能测试报告.xlsx',
      type: 'document',
      parent: 'folder-doc',
      size: 450000,
      format: 'XLSX',
      pages: 5,
      modified: '2026-08-09T13:30:00',
      thumbnail: 'https://picsum.photos/seed/perfreport/400/400',
      tags: ['测试', '性能', 'XLSX'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-17': {
      id: 'doc-17',
      name: '架构评审记录.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 1100000,
      format: 'PDF',
      pages: 31,
      modified: '2026-08-08T15:00:00',
      thumbnail: 'https://picsum.photos/seed/archreview/400/400',
      tags: ['架构', '评审', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-18': {
      id: 'doc-18',
      name: '产品需求文档.docx',
      type: 'document',
      parent: 'folder-doc',
      size: 1600000,
      format: 'DOCX',
      pages: 48,
      modified: '2026-08-07T09:45:00',
      thumbnail: 'https://picsum.photos/seed/prddocx/400/400',
      tags: ['产品', '需求', 'DOCX'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-19': {
      id: 'doc-19',
      name: '用户反馈汇总.pdf',
      type: 'document',
      parent: 'folder-doc',
      size: 2200000,
      format: 'PDF',
      pages: 45,
      modified: '2026-08-06T11:20:00',
      thumbnail: 'https://picsum.photos/seed/userfeedback/400/400',
      tags: ['用户', '反馈', 'PDF'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
    'doc-20': {
      id: 'doc-20',
      name: '项目总结报告.pptx',
      type: 'document',
      parent: 'folder-doc',
      size: 5800000,
      format: 'PPTX',
      pages: 35,
      modified: '2026-08-05T17:00:00',
      thumbnail: 'https://picsum.photos/seed/projectsum/400/400',
      tags: ['项目', '总结', 'PPTX'],
      docUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-06.pdf'
    },
  
    // ===== doc-11 附件 =====
    'doc-11__attach': {
      id: 'doc-11__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-11-att-1', 'doc-11-att-2', 'doc-11-att-3', 'doc-11-att-4', 'doc-11-att-5', 'doc-11-att-6', 'doc-11-att-7', 'doc-11-att-8', 'doc-11-att-9', 'doc-11-att-10'],
      modified: '2026-08-14T09:30:00',
      hidden: true
    },
    'doc-11-att-1': { id: 'doc-11-att-1', type: 'link', parent: 'doc-11__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-11-att-2': { id: 'doc-11-att-2', type: 'link', parent: 'doc-11__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-11-att-3': { id: 'doc-11-att-3', type: 'link', parent: 'doc-11__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-11-att-4': { id: 'doc-11-att-4', type: 'link', parent: 'doc-11__attach', targetId: 'png-2', name: '透明演示图2.png' },
    'doc-11-att-5': { id: 'doc-11-att-5', type: 'link', parent: 'doc-11__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
    'doc-11-att-6': { id: 'doc-11-att-6', type: 'link', parent: 'doc-11__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-11-att-7': { id: 'doc-11-att-7', type: 'link', parent: 'doc-11__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-11-att-8': { id: 'doc-11-att-8', type: 'link', parent: 'doc-11__attach', targetId: 'doc-12', name: '安全规范文档.pdf' },
    'doc-11-att-9': { id: 'doc-11-att-9', type: 'link', parent: 'doc-11__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-11-att-10': { id: 'doc-11-att-10', type: 'link', parent: 'doc-11__attach', targetId: 'png-3', name: '图标素材.png' },
  
    // ===== doc-12 附件 =====
    'doc-12__attach': {
      id: 'doc-12__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-12-att-1', 'doc-12-att-2', 'doc-12-att-3', 'doc-12-att-4', 'doc-12-att-5', 'doc-12-att-6', 'doc-12-att-7', 'doc-12-att-8', 'doc-12-att-9', 'doc-12-att-10'],
      modified: '2026-08-13T14:20:00',
      hidden: true
    },
    'doc-12-att-1': { id: 'doc-12-att-1', type: 'link', parent: 'doc-12__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-12-att-2': { id: 'doc-12-att-2', type: 'link', parent: 'doc-12__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-12-att-3': { id: 'doc-12-att-3', type: 'link', parent: 'doc-12__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-12-att-4': { id: 'doc-12-att-4', type: 'link', parent: 'doc-12__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-12-att-5': { id: 'doc-12-att-5', type: 'link', parent: 'doc-12__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-12-att-6': { id: 'doc-12-att-6', type: 'link', parent: 'doc-12__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-12-att-7': { id: 'doc-12-att-7', type: 'link', parent: 'doc-12__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-12-att-8': { id: 'doc-12-att-8', type: 'link', parent: 'doc-12__attach', targetId: 'doc-13', name: '数据库设计.docx' },
    'doc-12-att-9': { id: 'doc-12-att-9', type: 'link', parent: 'doc-12__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-12-att-10': { id: 'doc-12-att-10', type: 'link', parent: 'doc-12__attach', targetId: 'gif-2', name: '加载动画.gif' },
  
    // ===== doc-13 附件 =====
    'doc-13__attach': {
      id: 'doc-13__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-13-att-1', 'doc-13-att-2', 'doc-13-att-3', 'doc-13-att-4', 'doc-13-att-5', 'doc-13-att-6', 'doc-13-att-7', 'doc-13-att-8', 'doc-13-att-9', 'doc-13-att-10'],
      modified: '2026-08-12T11:15:00',
      hidden: true
    },
    'doc-13-att-1': { id: 'doc-13-att-1', type: 'link', parent: 'doc-13__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-13-att-2': { id: 'doc-13-att-2', type: 'link', parent: 'doc-13__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-13-att-3': { id: 'doc-13-att-3', type: 'link', parent: 'doc-13__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-13-att-4': { id: 'doc-13-att-4', type: 'link', parent: 'doc-13__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-13-att-5': { id: 'doc-13-att-5', type: 'link', parent: 'doc-13__attach', targetId: 'doc-14', name: '部署运维指南.pdf' },
    'doc-13-att-6': { id: 'doc-13-att-6', type: 'link', parent: 'doc-13__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-13-att-7': { id: 'doc-13-att-7', type: 'link', parent: 'doc-13__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
    'doc-13-att-8': { id: 'doc-13-att-8', type: 'link', parent: 'doc-13__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-13-att-9': { id: 'doc-13-att-9', type: 'link', parent: 'doc-13__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-13-att-10': { id: 'doc-13-att-10', type: 'link', parent: 'doc-13__attach', targetId: 'png-1', name: '透明球体.png' },
  
    // ===== doc-14 附件 =====
    'doc-14__attach': {
      id: 'doc-14__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-14-att-1', 'doc-14-att-2', 'doc-14-att-3', 'doc-14-att-4', 'doc-14-att-5', 'doc-14-att-6', 'doc-14-att-7', 'doc-14-att-8', 'doc-14-att-9', 'doc-14-att-10'],
      modified: '2026-08-11T16:45:00',
      hidden: true
    },
    'doc-14-att-1': { id: 'doc-14-att-1', type: 'link', parent: 'doc-14__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-14-att-2': { id: 'doc-14-att-2', type: 'link', parent: 'doc-14__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-14-att-3': { id: 'doc-14-att-3', type: 'link', parent: 'doc-14__attach', targetId: 'png-2', name: '透明演示图2.png' },
    'doc-14-att-4': { id: 'doc-14-att-4', type: 'link', parent: 'doc-14__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-14-att-5': { id: 'doc-14-att-5', type: 'link', parent: 'doc-14__attach', targetId: 'doc-15', name: '代码规范文档.pdf' },
    'doc-14-att-6': { id: 'doc-14-att-6', type: 'link', parent: 'doc-14__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-14-att-7': { id: 'doc-14-att-7', type: 'link', parent: 'doc-14__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-14-att-8': { id: 'doc-14-att-8', type: 'link', parent: 'doc-14__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-14-att-9': { id: 'doc-14-att-9', type: 'link', parent: 'doc-14__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-14-att-10': { id: 'doc-14-att-10', type: 'link', parent: 'doc-14__attach', targetId: 'png-3', name: '图标素材.png' },
  
    // ===== doc-15 附件 =====
    'doc-15__attach': {
      id: 'doc-15__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-15-att-1', 'doc-15-att-2', 'doc-15-att-3', 'doc-15-att-4', 'doc-15-att-5', 'doc-15-att-6', 'doc-15-att-7', 'doc-15-att-8', 'doc-15-att-9', 'doc-15-att-10'],
      modified: '2026-08-10T10:00:00',
      hidden: true
    },
    'doc-15-att-1': { id: 'doc-15-att-1', type: 'link', parent: 'doc-15__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-15-att-2': { id: 'doc-15-att-2', type: 'link', parent: 'doc-15__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-15-att-3': { id: 'doc-15-att-3', type: 'link', parent: 'doc-15__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-15-att-4': { id: 'doc-15-att-4', type: 'link', parent: 'doc-15__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-15-att-5': { id: 'doc-15-att-5', type: 'link', parent: 'doc-15__attach', targetId: 'doc-16', name: '性能测试报告.xlsx' },
    'doc-15-att-6': { id: 'doc-15-att-6', type: 'link', parent: 'doc-15__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-15-att-7': { id: 'doc-15-att-7', type: 'link', parent: 'doc-15__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-15-att-8': { id: 'doc-15-att-8', type: 'link', parent: 'doc-15__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-15-att-9': { id: 'doc-15-att-9', type: 'link', parent: 'doc-15__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-15-att-10': { id: 'doc-15-att-10', type: 'link', parent: 'doc-15__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
  
    // ===== doc-16 附件 =====
    'doc-16__attach': {
      id: 'doc-16__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-16-att-1', 'doc-16-att-2', 'doc-16-att-3', 'doc-16-att-4', 'doc-16-att-5', 'doc-16-att-6', 'doc-16-att-7', 'doc-16-att-8', 'doc-16-att-9', 'doc-16-att-10'],
      modified: '2026-08-09T13:30:00',
      hidden: true
    },
    'doc-16-att-1': { id: 'doc-16-att-1', type: 'link', parent: 'doc-16__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-16-att-2': { id: 'doc-16-att-2', type: 'link', parent: 'doc-16__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-16-att-3': { id: 'doc-16-att-3', type: 'link', parent: 'doc-16__attach', targetId: 'png-2', name: '透明演示图2.png' },
    'doc-16-att-4': { id: 'doc-16-att-4', type: 'link', parent: 'doc-16__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-16-att-5': { id: 'doc-16-att-5', type: 'link', parent: 'doc-16__attach', targetId: 'doc-17', name: '架构评审记录.pdf' },
    'doc-16-att-6': { id: 'doc-16-att-6', type: 'link', parent: 'doc-16__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-16-att-7': { id: 'doc-16-att-7', type: 'link', parent: 'doc-16__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-16-att-8': { id: 'doc-16-att-8', type: 'link', parent: 'doc-16__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-16-att-9': { id: 'doc-16-att-9', type: 'link', parent: 'doc-16__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-16-att-10': { id: 'doc-16-att-10', type: 'link', parent: 'doc-16__attach', targetId: 'png-3', name: '图标素材.png' },
  
    // ===== doc-17 附件 =====
    'doc-17__attach': {
      id: 'doc-17__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-17-att-1', 'doc-17-att-2', 'doc-17-att-3', 'doc-17-att-4', 'doc-17-att-5', 'doc-17-att-6', 'doc-17-att-7', 'doc-17-att-8', 'doc-17-att-9', 'doc-17-att-10'],
      modified: '2026-08-08T15:00:00',
      hidden: true
    },
    'doc-17-att-1': { id: 'doc-17-att-1', type: 'link', parent: 'doc-17__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-17-att-2': { id: 'doc-17-att-2', type: 'link', parent: 'doc-17__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-17-att-3': { id: 'doc-17-att-3', type: 'link', parent: 'doc-17__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-17-att-4': { id: 'doc-17-att-4', type: 'link', parent: 'doc-17__attach', targetId: 'png-1', name: '透明球体.png' },
    'doc-17-att-5': { id: 'doc-17-att-5', type: 'link', parent: 'doc-17__attach', targetId: 'doc-18', name: '产品需求文档.docx' },
    'doc-17-att-6': { id: 'doc-17-att-6', type: 'link', parent: 'doc-17__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
    'doc-17-att-7': { id: 'doc-17-att-7', type: 'link', parent: 'doc-17__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-17-att-8': { id: 'doc-17-att-8', type: 'link', parent: 'doc-17__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-17-att-9': { id: 'doc-17-att-9', type: 'link', parent: 'doc-17__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-17-att-10': { id: 'doc-17-att-10', type: 'link', parent: 'doc-17__attach', targetId: 'png-2', name: '透明演示图2.png' },
  
    // ===== doc-18 附件 =====
    'doc-18__attach': {
      id: 'doc-18__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-18-att-1', 'doc-18-att-2', 'doc-18-att-3', 'doc-18-att-4', 'doc-18-att-5', 'doc-18-att-6', 'doc-18-att-7', 'doc-18-att-8', 'doc-18-att-9', 'doc-18-att-10'],
      modified: '2026-08-07T09:45:00',
      hidden: true
    },
    'doc-18-att-1': { id: 'doc-18-att-1', type: 'link', parent: 'doc-18__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-18-att-2': { id: 'doc-18-att-2', type: 'link', parent: 'doc-18__attach', targetId: 'vid-3', name: '特效演示.mp4' },
    'doc-18-att-3': { id: 'doc-18-att-3', type: 'link', parent: 'doc-18__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-18-att-4': { id: 'doc-18-att-4', type: 'link', parent: 'doc-18__attach', targetId: 'aud-1', name: 'SoundHelix Song 1.mp3' },
    'doc-18-att-5': { id: 'doc-18-att-5', type: 'link', parent: 'doc-18__attach', targetId: 'doc-19', name: '用户反馈汇总.pdf' },
    'doc-18-att-6': { id: 'doc-18-att-6', type: 'link', parent: 'doc-18__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-18-att-7': { id: 'doc-18-att-7', type: 'link', parent: 'doc-18__attach', targetId: 'gif-2', name: '加载动画.gif' },
    'doc-18-att-8': { id: 'doc-18-att-8', type: 'link', parent: 'doc-18__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-18-att-9': { id: 'doc-18-att-9', type: 'link', parent: 'doc-18__attach', targetId: 'm-fbx-1', name: '桑巴舞者.fbx' },
    'doc-18-att-10': { id: 'doc-18-att-10', type: 'link', parent: 'doc-18__attach', targetId: 'gif-1', name: '旋转地球.gif' },
  
    // ===== doc-19 附件 =====
    'doc-19__attach': {
      id: 'doc-19__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-19-att-1', 'doc-19-att-2', 'doc-19-att-3', 'doc-19-att-4', 'doc-19-att-5', 'doc-19-att-6', 'doc-19-att-7', 'doc-19-att-8', 'doc-19-att-9', 'doc-19-att-10'],
      modified: '2026-08-06T11:20:00',
      hidden: true
    },
    'doc-19-att-1': { id: 'doc-19-att-1', type: 'link', parent: 'doc-19__attach', targetId: 'm-glb-1', name: '破损头盔.glb' },
    'doc-19-att-2': { id: 'doc-19-att-2', type: 'link', parent: 'doc-19__attach', targetId: 'psd-2', name: 'UI 界面分层稿.psd' },
    'doc-19-att-3': { id: 'doc-19-att-3', type: 'link', parent: 'doc-19__attach', targetId: 'vid-1', name: '角色攻击动画.mp4' },
    'doc-19-att-4': { id: 'doc-19-att-4', type: 'link', parent: 'doc-19__attach', targetId: 'png-2', name: '透明演示图2.png' },
    'doc-19-att-5': { id: 'doc-19-att-5', type: 'link', parent: 'doc-19__attach', targetId: 'doc-20', name: '项目总结报告.pptx' },
    'doc-19-att-6': { id: 'doc-19-att-6', type: 'link', parent: 'doc-19__attach', targetId: 'gif-1', name: '旋转地球.gif' },
    'doc-19-att-7': { id: 'doc-19-att-7', type: 'link', parent: 'doc-19__attach', targetId: 'spine-2', name: 'Stretch (spine)' },
    'doc-19-att-8': { id: 'doc-19-att-8', type: 'link', parent: 'doc-19__attach', targetId: 'aud-2', name: 'SoundHelix Song 2.mp3' },
    'doc-19-att-9': { id: 'doc-19-att-9', type: 'link', parent: 'doc-19__attach', targetId: 'm-obj-1', name: '人物模型.obj' },
    'doc-19-att-10': { id: 'doc-19-att-10', type: 'link', parent: 'doc-19__attach', targetId: 'png-1', name: '透明球体.png' },
  
    // ===== doc-20 附件 =====
    'doc-20__attach': {
      id: 'doc-20__attach',
      name: '__attachments__',
      type: 'folder',
      parent: 'folder-doc',
      children: ['doc-20-att-1', 'doc-20-att-2', 'doc-20-att-3', 'doc-20-att-4', 'doc-20-att-5', 'doc-20-att-6', 'doc-20-att-7', 'doc-20-att-8', 'doc-20-att-9', 'doc-20-att-10'],
      modified: '2026-08-05T17:00:00',
      hidden: true
    },
    'doc-20-att-1': { id: 'doc-20-att-1', type: 'link', parent: 'doc-20__attach', targetId: 'm-fbx-2', name: '弗拉明戈舞者.fbx' },
    'doc-20-att-2': { id: 'doc-20-att-2', type: 'link', parent: 'doc-20__attach', targetId: 'vid-2', name: '场景过渡动画.mp4' },
    'doc-20-att-3': { id: 'doc-20-att-3', type: 'link', parent: 'doc-20__attach', targetId: 'png-3', name: '图标素材.png' },
    'doc-20-att-4': { id: 'doc-20-att-4', type: 'link', parent: 'doc-20__attach', targetId: 'aud-3', name: 'SoundHelix Song 8.mp3' },
    'doc-20-att-5': { id: 'doc-20-att-5', type: 'link', parent: 'doc-20__attach', targetId: 'doc-1', name: 'TraceMonkey 论文.pdf' },
    'doc-20-att-6': { id: 'doc-20-att-6', type: 'link', parent: 'doc-20__attach', targetId: 'psd-1', name: '海报设计稿.psd' },
    'doc-20-att-7': { id: 'doc-20-att-7', type: 'link', parent: 'doc-20__attach', targetId: 'gif-3', name: '猫跳跃.gif' },
    'doc-20-att-8': { id: 'doc-20-att-8', type: 'link', parent: 'doc-20__attach', targetId: 'spine-1', name: 'Raptor (spine)' },
    'doc-20-att-9': { id: 'doc-20-att-9', type: 'link', parent: 'doc-20__attach', targetId: 'm-glb-2', name: '小黄鸭.glb' },
    'doc-20-att-10': { id: 'doc-20-att-10', type: 'link', parent: 'doc-20__attach', targetId: 'png-2', name: '透明演示图2.png' },
  },

  // 资源表单初始数据
  workspaceData: {
    boards: {
      'ws-cosmic': {
        id: 'ws-cosmic',
        name: '宇宙幻想',
        taskIds: ['task-cosmic-1', 'task-cosmic-2'],
        canvas: {
          collapsed: true,
          widgets: [
            { id: 'w-1', type: 'stat', title: '任务总数', value: '5', icon: '📋', color: 'blue' },
            { id: 'w-2', type: 'stat', title: '进行中', value: '3', icon: '⚡', color: 'cyan' },
            { id: 'w-4', type: 'progress', title: '项目进度', value: 40, color: 'cyan' },
            { id: 'w-5', type: 'note', title: '项目说明', content: '本周重点推进星空场景设计，完成飞船3D模型初稿。周五前提交评审。', color: 'yellow' },
            { id: 'w-6', type: 'text', title: '负责人', content: '张三 · 李四\n设计组 · 模型组', icon: '👥' }
          ]
        }
      },
      'ws-daily': {
        id: 'ws-daily',
        name: '暮城日常',
        taskIds: [],
        canvas: { collapsed: true, widgets: [] }
      },
      'ws-strange': {
        id: 'ws-strange',
        name: '暮城异闻',
        taskIds: [],
        canvas: { collapsed: true, widgets: [] }
      },
      'ws-basic': {
        id: 'ws-basic',
        name: '基础系统',
        taskIds: [],
        canvas: { collapsed: true, widgets: [] }
      }
    },
    tasks: {
      'task-cosmic-1': {
        id: 'task-cosmic-1',
        title: '星空场景概念设计',
        status: 'doing',
        priority: 'high',
        due: '2026-09-20',
        assignee: '张三',
        quantity: 5,
        desc: '设计宇宙幻想主题的星空场景',
        createdAt: '2026-09-10T10:00:00',
        attachments: []
      },
      'task-cosmic-2': {
        id: 'task-cosmic-2',
        title: '飞船模型制作',
        status: 'todo',
        priority: 'medium',
        due: '2026-09-25',
        assignee: '李四',
        quantity: 3,
        desc: '制作太空飞船3D模型',
        createdAt: '2026-09-11T08:30:00',
        attachments: []
      }
    },
    attachments: {}
  },

  // 看板 ID 列表
  workspaceBoardIds: ['ws-cosmic', 'ws-daily', 'ws-strange', 'ws-basic', 'ws-template'],

  // 附件视图配置
  ATTACH_VIEW_CONFIGS: {
    grid: { name: '网格视图', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    preview: { name: '预览视图', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>' },
    plugin: { name: '插件视图', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 3L11 9H7"/><path d="M2 12h4l3 3 4-6h4"/></svg>' },
    table: { name: '表格视图', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="15" x2="21" y2="15"/></svg>' },
  },

  // 资源文件 ID 列表（用于随机生成附件）
  _resourceFileIds: [
    'm-glb-1', 'm-glb-2', 'm-fbx-1', 'm-fbx-2', 'm-obj-1',
    'psd-1', 'psd-2',
    'vid-1', 'vid-2', 'vid-3', 'vid-4', 'vid-5', 'vid-6', 'vid-7', 'vid-8', 'vid-9', 'vid-10',
    'png-1', 'png-2', 'png-3',
    'gif-1', 'gif-2', 'gif-3',
    'spine-1', 'spine-2',
    'aud-1', 'aud-2', 'aud-3',
    'doc-1', 'doc-2', 'doc-3', 'doc-4', 'doc-5', 'doc-6', 'doc-7', 'doc-8', 'doc-9', 'doc-10'
  ],

  // 随机数工具函数
  _randInt: function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },

  // 数组随机打乱
  _shuffle: function (arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // 看板任务标题
  _boardTaskTitles: {
    'ws-cosmic': ['星空场景概念设计', '飞船模型制作', '银河背景绘制', '行星纹理贴图', '太空站场景搭建', '宇宙特效粒子调校', '星云配色方案', '陨石带建模', '黑洞视觉效果', '星际穿越动画', '外星生物概念稿', '航天服细节设计'],
    'ws-daily': ['角色待机动画', '城市地图区块铺设', 'NPC对话系统搭建', '街道灯光氛围调整', '天气系统切换效果', '角色服装变体制作', '商店UI界面设计', '日常任务流程配置', '昼夜循环配色', '行人AI路径规划', '建筑内室内场景', '背景音乐分段测试'],
    'ws-strange': ['异界入口特效设计', '诡异音效素材收集', '怪物变形动画', '迷雾场景氛围调试', '异常事件触发逻辑', '暗影粒子系统制作', '诡异光照效果调整', '诡异音效混音', '异常状态UI设计', '灵异场景分镜绘制', '诡异NPC交互逻辑', '异常区域地图生成'],
    'ws-basic': ['角色基础移动逻辑', '物理碰撞检测优化', '存档系统开发', '输入映射配置', '战斗系统框架搭建', '背包系统UI开发', '技能树数据结构设计', '属性面板界面制作', '基础敌人AI编写', '伤害计算公式调优', '游戏设置菜单开发', '新手引导流程制作'],
    'ws-template': ['图片[大]', '图片[中]', '图片[小]', '动图', '视频', '音效', '音乐', 'Spine', '3D 模型', '插件', '文件[图标]', '文件[表格]']
  },

  // 任务分配人 / 状态 / 优先级
  _assignees: ['张三', '李四', '王五', '赵六', '陈七', '周八', '吴九', '郑十'],
  _statuses: ['todo', 'doing'],
  _priorities: ['low', 'medium', 'medium', 'high', 'urgent'],

  // 模板任务到资源文件的映射
  _templateTaskFileMap: {
    '图片[大]': ['png-1', 'png-2', 'png-3'],
    '图片[中]': ['png-1', 'png-2'],
    '图片[小]': ['png-3'],
    '动图': ['gif-1', 'gif-2', 'gif-3'],
    '视频': ['vid-1', 'vid-2', 'vid-3', 'vid-4', 'vid-5', 'vid-6', 'vid-7', 'vid-8', 'vid-9', 'vid-10'],
    '音效': ['aud-1'],
    '音乐': ['aud-2', 'aud-3'],
    'Spine': ['spine-1', 'spine-2'],
    '3D 模型': ['m-glb-1', 'm-glb-2', 'm-fbx-1', 'm-fbx-2', 'm-obj-1'],
    '插件': ['doc-1', 'doc-2'],
    '文件[图标]': ['png-3', 'gif-2'],
    '文件[表格]': ['doc-3', 'doc-4', 'doc-5']
  },

  // 为看板生成随机任务数据（演示用）
  _generateBoardTasks: function (boardId) {
    const titles = _boardTaskTitles[boardId] || _boardTaskTitles['ws-basic'];
    if (boardId === 'ws-template') {
      const tasks = {}, taskIds = [], attachments = {};
      titles.forEach((title, i) => {
        const taskId = `task-${boardId}-${i + 1}`, status = _statuses[_randInt(0, _statuses.length - 1)], priority = _priorities[_randInt(0, _priorities.length - 1)], assignee = _assignees[_randInt(0, _assignees.length - 1)], quantity = _randInt(1, 8), dayOffset = _randInt(1, 60), dueDate = new Date(2026, 8, 1 + dayOffset).toISOString().split('T')[0], createdOffset = _randInt(0, 20), createdAt = new Date(2026, 8, 1 + createdOffset).toISOString().split('T')[0] + 'T' + String(_randInt(8, 18)).padStart(2, '0') + ':' + String(_randInt(0, 59)).padStart(2, '0') + ':00';
        // Use type-specific file mapping for template tasks
        const fileIds = _templateTaskFileMap[title] || _shuffle(_resourceFileIds).slice(0, _randInt(5, 10)), taskAttIds = [];
        fileIds.forEach(fileId => {
          const fileItem = fileSystem[fileId];
          if (!fileItem) return;
          const attId = `att-${boardId}-${i + 1}-${fileId}`;
          attachments[attId] = {
            id: attId,
            type: 'link',
            targetId: fileId,
            name: fileItem.name,
            createdAt: new Date().toISOString()
          };
          taskAttIds.push(attId);
        });
        tasks[taskId] = {
          id: taskId,
          title: title,
          status: status,
          priority: priority,
          due: dueDate,
          assignee: assignee,
          quantity: quantity,
          desc: '',
          createdAt: createdAt,
          attachments: taskAttIds
        };
        taskIds.push(taskId);
      });
      return { tasks, taskIds, attachments };
    }
    // Other boards: random 5~10 tasks with random attachments
    const count = _randInt(5, 10), shuffledTitles = _shuffle(titles), tasks = {}, taskIds = [], attachments = {};
    for (let i = 0; i < count; i++) {
      const taskId = `task-${boardId}-${i + 1}`, title = shuffledTitles[i % shuffledTitles.length], status = _statuses[_randInt(0, _statuses.length - 1)], priority = _priorities[_randInt(0, _priorities.length - 1)], assignee = _assignees[_randInt(0, _assignees.length - 1)], quantity = _randInt(1, 8), dayOffset = _randInt(1, 60), dueDate = new Date(2026, 8, 1 + dayOffset).toISOString().split('T')[0], createdOffset = _randInt(0, 20), createdAt = new Date(2026, 8, 1 + createdOffset).toISOString().split('T')[0] + 'T' + String(_randInt(8, 18)).padStart(2, '0') + ':' + String(_randInt(0, 59)).padStart(2, '0') + ':00', attCount = _randInt(5, 10), shuffledFiles = _shuffle(_resourceFileIds).slice(0, attCount), taskAttIds = [];
      shuffledFiles.forEach(fileId => {
        const fileItem = fileSystem[fileId];
        if (!fileItem) return;
        const attId = `att-${boardId}-${i + 1}-${fileId}`;
        attachments[attId] = {
          id: attId,
          type: 'link',
          targetId: fileId,
          name: fileItem.name,
          createdAt: new Date().toISOString()
        };
        taskAttIds.push(attId);
      });
      tasks[taskId] = {
        id: taskId,
        title: title,
        status: status,
        priority: priority,
        due: dueDate,
        assignee: assignee,
        quantity: quantity,
        desc: '',
        createdAt: createdAt,
        attachments: taskAttIds
      };
      taskIds.push(taskId);
    }
    return { tasks, taskIds, attachments };
  },

  // 构建默认资源表单数据
  _buildDefaultWorkspaceData: function () {
    return {
      boards: {},
      tasks: {},
      attachments: {}
    };
  }

};

// 深拷贝 fileSystem 生成模板（与原 app.js 逻辑一致）
export const fileSystemTemplate = JSON.parse(JSON.stringify(MockData.fileSystem));
