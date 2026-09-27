import { defineStore } from 'pinia'
import { MockData } from '@/mock'

// ===== 应用全局设置 Store =====
// 管理应用级别的设置、视图配置、UI 状态等

const SETTINGS_STORAGE_KEY = 'perohub_appSettings'
const STORAGE_KEY = 'perohub_viewSettings'
const COL_WIDTH_STORAGE_KEY = 'perohub_columnWidths'
const TASK_STORAGE_KEY = 'perohub_tasks'
const FILE_TASK_STORAGE_KEY = 'perohub_fileTasks'
const FILE_REVIEW_STORAGE_KEY = 'perohub_fileReviews'
const ATTACH_CUSTOM_FIELDS_KEY = 'rh_attach_custom_fields'

// 默认设置 - 全面的默认配置项
const DEFAULT_SETTINGS = {
  language: 'zh-CN',
  startModule: 'project',
  autoSave: true,
  autoSaveInterval: 30,
  confirmBeforeDelete: true,
  enableNotifications: true,
  enableSound: false,
  dateFormat: 'YYYY-MM-DD',
  timeFormat: '24h',
  recentlyOpenedLimit: 10,
  clipboardMonitoring: true,

  theme: 'gray2',
  colorMode: 'light',  // 亮色/暗色模式：light | dark
  accentColor: 'cyan',
  sidebarWidth: 260,
  detailPanelWidth: 320,
  compactMode: false,
  showFileExtensions: true,
  showHiddenFiles: false,
  thumbnailQuality: 'high',
  animationSpeed: 'normal',
  fontFamily: 'system',

  defaultView: 'grid',
  defaultGridSize: 'medium',
  itemsPerPage: 50,
  sortBy: 'name',
  sortOrder: 'asc',

  version: '2.0.0'
}

const DEFAULT_VIEW = 'grid'
const DEFAULT_GRID_SIZE = 'md'

const DEFAULT_COL_WIDTHS = {
  name: 320,
  size: 100,
  modified: 160,
  type: 110,
  tags: 200,
  actions: 120
}

// 视图配置
const viewConfig = {
  grid: { name: '网格视图' },
  masonry: { name: '瀑布视图' },
  video: { name: '视频视图' },
  audio: { name: '音效视图' },
  music: { name: '音乐视图' },
  table: { name: '表格视图' },
  review: { name: '评审视图' },
  single: { name: '单列视图' },
  task: { name: '任务视图' }
}

// 任务状态配置
const TASK_STATUSES = [
  { key: 'todo', label: '待办', color: '#94a3b8' },
  { key: 'doing', label: '进行中', color: '#3b82f6' }
]

const REVIEW_RATING_LABELS = ['未评分', '1星', '2星', '3星', '4星', '5星']

export const useAppStore = defineStore('app', {
  state: () => ({
    // 应用设置
    settings: { ...DEFAULT_SETTINGS },

    // 视图设置（按上下文存储）
    viewSettings: {},

    // 列宽配置（按上下文存储）
    columnWidths: {},

    // 自定义表格字段
    customTableFields: [],

    // 附件自定义字段
    customAttachFields: [],

    // 任务列表
    tasks: [],

    // 基于文件的任务数据
    fileTasks: {},

    // 基于文件的评审数据
    fileReviews: {},

    // 当前模块
    currentModule: 'project',

    // 侧边栏展开状态
    sidebarOpen: true,

    // 详情面板展开状态
    detailPanelOpen: false,

    // 选中的文件ID
    selectedFileId: null,

    // 搜索关键词
    searchQuery: '',

    // Toast 消息
    toasts: [],

    // 当前排序字段
    sortField: 'name',

    // 排序方向
    sortOrder: 'asc',

    // 当前类型筛选
    typeFilter: 'all',

    // 评审相关状态
    currentReviewFileId: null,
    reviewFilter: 'all',

    // 模块配置
    moduleConfig: [
      { id: 'project', visible: true, label: '资源' },
      { id: 'module1', visible: true, label: '模块' },
      { id: 'module2', visible: true, label: '模块' },
      { id: 'module3', visible: true, label: '模块' }
    ]
  }),

  getters: {
    // 获取网格尺寸配置
    gridSizeConfig: () => MockData.GRID_SIZE_CONFIG,

    // 获取项目颜色配置
    projectColors: () => MockData.PROJECT_COLORS,

    // 获取视图配置
    viewConfigs: () => viewConfig,

    // 获取任务状态配置
    taskStatuses: () => TASK_STATUSES,

    // 获取评审评分标签
    reviewRatingLabels: () => REVIEW_RATING_LABELS,

    // 获取默认列宽
    defaultColWidths: () => DEFAULT_COL_WIDTHS
  },

  actions: {
    // ===== 应用设置持久化 =====
    loadAppSettings() {
      try {
        const data = localStorage.getItem(SETTINGS_STORAGE_KEY)
        if (data) {
          this.settings = Object.assign({}, DEFAULT_SETTINGS, JSON.parse(data))
        } else {
          this.settings = { ...DEFAULT_SETTINGS }
        }
      } catch (e) {
        this.settings = { ...DEFAULT_SETTINGS }
      }
    },

    saveAppSettings() {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings))
      } catch (e) {}
    },

    updateSetting(key, value) {
      this.settings[key] = value
      this.saveAppSettings()
    },

    // 设置颜色模式（亮色/暗色）
    setColorMode(mode) {
      this.settings.colorMode = mode
      this.applyColorMode()
      this.saveAppSettings()
    },

    // 切换亮色/暗色
    toggleColorMode() {
      this.setColorMode(this.settings.colorMode === 'dark' ? 'light' : 'dark')
    },

    // 将颜色模式应用到 DOM
    applyColorMode() {
      const root = document.documentElement
      if (this.settings.colorMode === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    },

    resetSettings() {
      this.settings = { ...DEFAULT_SETTINGS }
      this.saveAppSettings()
    },

    // ===== 视图设置 =====
    loadViewSettings() {
      try {
        const d = localStorage.getItem(STORAGE_KEY)
        this.viewSettings = d ? JSON.parse(d) : {}
      } catch (e) {
        this.viewSettings = {}
      }
    },

    saveViewSettings() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.viewSettings))
      } catch (e) {}
    },

    getView(contextKey) {
      const view = this.viewSettings[contextKey] || DEFAULT_VIEW
      if (view === 'task' || view === 'list') return DEFAULT_VIEW
      return view
    },

    setView(contextKey, view) {
      this.viewSettings[contextKey] = view
      this.saveViewSettings()
    },

    getGridSize(contextKey) {
      return this.viewSettings['gridSize_' + contextKey] || DEFAULT_GRID_SIZE
    },

    setGridSize(contextKey, size) {
      this.viewSettings['gridSize_' + contextKey] = size
      this.saveViewSettings()
    },

    // ===== 列宽管理 =====
    loadAllColumnWidths() {
      try {
        const d = localStorage.getItem(COL_WIDTH_STORAGE_KEY)
        this.columnWidths = d ? JSON.parse(d) : {}
      } catch (e) {
        this.columnWidths = {}
      }
    },

    saveAllColumnWidths() {
      try {
        localStorage.setItem(COL_WIDTH_STORAGE_KEY, JSON.stringify(this.columnWidths))
      } catch (e) {}
    },

    getColumnWidth(contextKey, colKey) {
      const ctxWidths = this.columnWidths[contextKey] || {}
      return ctxWidths[colKey] !== undefined ? ctxWidths[colKey] : DEFAULT_COL_WIDTHS[colKey] || 150
    },

    setColumnWidth(contextKey, colKey, width) {
      if (!this.columnWidths[contextKey]) {
        this.columnWidths[contextKey] = {}
      }
      this.columnWidths[contextKey][colKey] = Math.max(60, width)
      this.saveAllColumnWidths()
    },

    cleanupCustomFieldWidths(fieldId) {
      const colKey = 'custom_' + fieldId
      Object.keys(this.columnWidths).forEach(ctxKey => {
        if (this.columnWidths[ctxKey] && this.columnWidths[ctxKey][colKey] !== undefined) {
          delete this.columnWidths[ctxKey][colKey]
        }
      })
      this.saveAllColumnWidths()
    },

    // ===== 自定义字段 =====
    loadAttachCustomFields() {
      try {
        const data = localStorage.getItem(ATTACH_CUSTOM_FIELDS_KEY)
        if (data) {
          this.customAttachFields = JSON.parse(data)
        } else {
          this.customAttachFields = [
            { id: 'attfield_demo_1', name: '负责人', type: 'text' },
            { id: 'attfield_demo_2', name: '状态', type: 'text' },
            { id: 'attfield_demo_3', name: '备注', type: 'text' }
          ]
          this.saveAttachCustomFields()
        }
      } catch (e) {
        this.customAttachFields = []
      }
    },

    saveAttachCustomFields() {
      try {
        localStorage.setItem(ATTACH_CUSTOM_FIELDS_KEY, JSON.stringify(this.customAttachFields))
      } catch (e) {}
    },

    // ===== 任务管理 =====
    loadTasks() {
      try {
        const data = localStorage.getItem(TASK_STORAGE_KEY)
        if (data) {
          this.tasks = JSON.parse(data)
        } else {
          this.tasks = [
            { id: 'task-1', title: '完成首页设计稿', desc: '包含 banner、功能区、底部模块', status: 'doing', priority: 'high', due: '2026-09-10', createdAt: '2026-09-01T10:00:00' },
            { id: 'task-2', title: '3D 模型审核', desc: '审核新一批上传的角色模型', status: 'todo', priority: 'medium', due: '2026-09-12', createdAt: '2026-09-02T14:30:00' },
            { id: 'task-3', title: '品牌素材整理', desc: '按类别归档品牌 VI 素材', status: 'todo', priority: 'low', due: '2026-09-05', createdAt: '2026-08-28T09:00:00' },
            { id: 'task-4', title: '视频剪辑', desc: '产品宣传视频初剪', status: 'todo', priority: 'high', due: '2026-09-15', createdAt: '2026-09-03T11:20:00' },
            { id: 'task-5', title: 'Spine 动画测试', desc: '验证所有 Spine 动画效果', status: 'doing', priority: 'medium', due: '2026-09-08', createdAt: '2026-09-01T16:45:00' },
            { id: 'task-6', title: '文档模板更新', desc: '更新产品白皮书模板', status: 'todo', priority: 'low', due: '2026-09-01', createdAt: '2026-08-25T13:00:00' }
          ]
          this.saveTasks()
        }
      } catch (e) {
        this.tasks = []
      }
    },

    saveTasks() {
      try {
        localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(this.tasks))
      } catch (e) {}
    },

    addTask(task) {
      const newTask = {
        id: 'task-' + Date.now(),
        title: task.title || '新任务',
        desc: task.desc || '',
        link: task.link || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        due: task.due || '',
        createdAt: new Date().toISOString()
      }
      this.tasks.push(newTask)
      this.saveTasks()
      return newTask
    },

    updateTask(taskId, updates) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        Object.assign(task, updates)
        this.saveTasks()
      }
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this.saveTasks()
    },

    getTasksByStatus(status) {
      return this.tasks.filter(t => t.status === status)
    },

    // ===== 文件任务 =====
    loadFileTasks() {
      try {
        const data = localStorage.getItem(FILE_TASK_STORAGE_KEY)
        this.fileTasks = data ? JSON.parse(data) : {}
      } catch (e) {
        this.fileTasks = {}
      }
    },

    saveFileTasks() {
      try {
        localStorage.setItem(FILE_TASK_STORAGE_KEY, JSON.stringify(this.fileTasks))
      } catch (e) {}
    },

    getFileTask(fileId) {
      return this.fileTasks[fileId] || { status: 'todo', priority: 'medium', due: '', desc: '', assignee: '', quantity: 0 }
    },

    setFileTask(fileId, data) {
      const existing = this.getFileTask(fileId)
      this.fileTasks[fileId] = { ...existing, ...data }
      this.saveFileTasks()
      return this.fileTasks[fileId]
    },

    deleteFileTask(fileId) {
      delete this.fileTasks[fileId]
      this.saveFileTasks()
    },

    // ===== 文件评审 =====
    loadFileReviews() {
      try {
        const data = localStorage.getItem(FILE_REVIEW_STORAGE_KEY)
        this.fileReviews = data ? JSON.parse(data) : {}
      } catch (e) {
        this.fileReviews = {}
      }
    },

    saveFileReviews() {
      try {
        localStorage.setItem(FILE_REVIEW_STORAGE_KEY, JSON.stringify(this.fileReviews))
      } catch (e) {}
    },

    getFileReview(fileId) {
      return this.fileReviews[fileId] || {
        rating: 0,
        history: [],
        reviewer: '',
        lastReviewedAt: ''
      }
    },

    updateReviewRating(fileId, rating) {
      const existing = this.getFileReview(fileId)
      this.fileReviews[fileId] = {
        ...existing,
        rating: rating
      }
      this.saveFileReviews()
      return this.fileReviews[fileId]
    },

    setFileReviewRating(fileId, rating, comment) {
      const existing = this.getFileReview(fileId)
      const now = new Date().toISOString()
      const historyEntry = { rating: rating, comment: comment || '', reviewer: '当前用户', timestamp: now }
      this.fileReviews[fileId] = {
        ...existing,
        rating: rating,
        lastReviewedAt: now,
        history: [historyEntry, ...(existing.history || [])].slice(0, 20)
      }
      this.saveFileReviews()
      return this.fileReviews[fileId]
    },

    // ===== UI 状态管理 =====
    setCurrentModule(module) {
      this.currentModule = module
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    setSidebarOpen(open) {
      this.sidebarOpen = open
    },

    toggleDetailPanel() {
      this.detailPanelOpen = !this.detailPanelOpen
    },

    setDetailPanelOpen(open) {
      this.detailPanelOpen = open
    },

    setSelectedFile(fileId) {
      this.selectedFileId = fileId
      if (fileId) {
        this.detailPanelOpen = true
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setSortField(field) {
      this.sortField = field
    },

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },

    setTypeFilter(filter) {
      this.typeFilter = filter
    },

    // ===== Toast 消息 =====
    showToast(message, type = 'info') {
      const id = Date.now() + Math.random()
      this.toasts.push({ id, message, type })
      setTimeout(() => {
        this.removeToast(id)
      }, 3000)
    },

    removeToast(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },

    // ===== 模块配置 =====
    loadModuleConfig() {
      const stored = localStorage.getItem('perohub_moduleConfig')
      if (stored) {
        try {
          this.moduleConfig = JSON.parse(stored)
        } catch (e) {}
      }
    },

    saveModuleConfig() {
      try {
        localStorage.setItem('perohub_moduleConfig', JSON.stringify(this.moduleConfig))
      } catch (e) {}
    },

    // ===== 数据导入导出 =====
    exportAllData() {
      const data = {
        settings: this.settings,
        exportDate: new Date().toISOString(),
        version: this.settings.version || '2.0.0',
        tasks: this.tasks,
        fileTasks: this.fileTasks,
        fileReviews: this.fileReviews,
        viewSettings: this.viewSettings
      }
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `perohub-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      this.showToast('数据已导出', 'success')
    },

    importAllData(data) {
      try {
        if (data.settings) {
          this.settings = Object.assign({}, DEFAULT_SETTINGS, data.settings)
          this.saveAppSettings()
        }
        if (data.tasks) {
          this.tasks = data.tasks
          this.saveTasks()
        }
        if (data.fileTasks) {
          this.fileTasks = data.fileTasks
          this.saveFileTasks()
        }
        if (data.fileReviews) {
          this.fileReviews = data.fileReviews
          this.saveFileReviews()
        }
        if (data.viewSettings) {
          this.viewSettings = data.viewSettings
          this.saveViewSettings()
        }
        this.showToast('数据已导入，正在刷新...', 'success')
        return true
      } catch (err) {
        this.showToast('导入失败：文件格式错误', 'error')
        return false
      }
    },

    clearAllData() {
      localStorage.clear()
      this.showToast('所有数据已清除，即将刷新...', 'success')
    },

    clearCache() {
      let cleared = 0
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (key && (key.includes('thumb') || key.includes('temp') || key.includes('cache'))) {
          localStorage.removeItem(key)
          cleared++
        }
      }
      this.showToast(`已清除 ${cleared} 项缓存`, 'success')
      return cleared
    }
  }
})
