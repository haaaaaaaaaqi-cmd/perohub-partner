import { defineStore } from 'pinia'
import { MockData } from '@/mock'
import { useProjectStore } from './project'

// ===== 资源表单 Store =====
// 管理看板、任务、附件等资源表单相关状态

const BOARD_STORAGE_KEY = 'perohub_workspaceData_v9'
const getProjectWorkspaceKey = (projectId) => 'rh_project_workspace_' + projectId

const DEFAULT_BOARD_ATTACH_VIEW = 'grid_md'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    // 资源表单数据 { boards, tasks, attachments }
    workspaceData: {
      boards: {},
      tasks: {},
      attachments: {}
    },

    // 按项目存储的资源表单数据 { projectId: workspaceData }
    projectWorkspaceData: {},

    // 看板ID列表
    boardIds: [],

    // 当前看板ID
    currentBoardId: null,

    // 任务筛选状态
    taskFilter: 'all',

    // 任务排序字段
    boardTaskSortBy: 'createdAt',

    // 任务排序方向
    boardTaskSortDesc: true,

    // 展开的任务集合
    expandedBoardTasks: new Set(),

    // 当前看板任务ID
    currentBoardTaskId: null,

    // 选中的看板任务ID
    selectedBoardTaskId: null,

    // 看板右键菜单目标ID
    boardContextTargetId: null,

    // 选中的看板图标
    selectedBoardIcon: '📝',

    // 每个任务的附件视图模式 { taskId: 'grid_md' | 'preview' | ... }
    boardAttachViews: {},

    // 网格尺寸子菜单是否打开
    gridSubmenuOpen: false,

    // 附件视图配置
    attachViewConfigs: MockData.ATTACH_VIEW_CONFIGS,

    // 新建任务弹窗
    newTaskModalOpen: false,
    newTaskBoardId: null,

    // 任务详情弹窗
    taskDetailModalOpen: false,
    taskDetailTaskId: null
  }),

  getters: {
    // 获取当前项目的资源表单数据
    currentWorkspaceData(state) {
      const projectStore = useProjectStore()
      if (!projectStore.currentProjectId) return state.workspaceData
      return state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
    },

    // 获取所有看板
    boards(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      return data?.boards || {}
    },

    // 获取所有任务
    tasks(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      return data?.tasks || {}
    },

    // 获取所有附件
    attachments(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      return data?.attachments || {}
    },

    // 获取看板列表（数组形式）
    boardList(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      return Object.values(data?.boards || {})
    },

    // 获取当前看板
    currentBoard(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const boards = data?.boards || {}
      // 优先使用 currentBoardId，否则返回第一个看板
      if (state.currentBoardId && boards[state.currentBoardId]) {
        return boards[state.currentBoardId]
      }
      const boardList = Object.values(boards)
      return boardList.length > 0 ? boardList[0] : null
    },

    // 获取当前看板的任务（支持筛选）
    currentBoardTasks(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const boards = data?.boards || {}
      let board = null
      if (state.currentBoardId && boards[state.currentBoardId]) {
        board = boards[state.currentBoardId]
      } else {
        const boardList = Object.values(boards)
        board = boardList.length > 0 ? boardList[0] : null
      }
      if (!board || !board.taskIds) return []
      let tasks = board.taskIds
        .map(id => data?.tasks?.[id])
        .filter(Boolean)
      // 状态筛选
      if (state.taskFilter !== 'all') {
        tasks = tasks.filter(t => t.status === state.taskFilter)
      }
      return tasks
    },

    // 待办任务
    todoTasks(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const boards = data?.boards || {}
      let board = null
      if (state.currentBoardId && boards[state.currentBoardId]) {
        board = boards[state.currentBoardId]
      } else {
        const boardList = Object.values(boards)
        board = boardList.length > 0 ? boardList[0] : null
      }
      if (!board || !board.taskIds) return []
      return board.taskIds
        .map(id => data?.tasks?.[id])
        .filter(t => t && t.status === 'todo')
    },

    // 进行中任务
    doingTasks(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const boards = data?.boards || {}
      let board = null
      if (state.currentBoardId && boards[state.currentBoardId]) {
        board = boards[state.currentBoardId]
      } else {
        const boardList = Object.values(boards)
        board = boardList.length > 0 ? boardList[0] : null
      }
      if (!board || !board.taskIds) return []
      return board.taskIds
        .map(id => data?.tasks?.[id])
        .filter(t => t && t.status === 'doing')
    },

    // 已完成任务
    doneTasks(state) {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const boards = data?.boards || {}
      let board = null
      if (state.currentBoardId && boards[state.currentBoardId]) {
        board = boards[state.currentBoardId]
      } else {
        const boardList = Object.values(boards)
        board = boardList.length > 0 ? boardList[0] : null
      }
      if (!board || !board.taskIds) return []
      return board.taskIds
        .map(id => data?.tasks?.[id])
        .filter(t => t && t.status === 'done')
    },

    // 获取任务的附件
    getTaskAttachments: (state) => (taskId) => {
      const projectStore = useProjectStore()
      const data = projectStore.currentProjectId
        ? state.projectWorkspaceData[projectStore.currentProjectId] || state.workspaceData
        : state.workspaceData
      const task = data?.tasks?.[taskId]
      if (!task || !task.attachments) return []
      return task.attachments
        .map(attId => data?.attachments?.[attId])
        .filter(Boolean)
    }
  },

  actions: {
    // 加载资源表单数据
    loadWorkspaceData() {
      const projectStore = useProjectStore()

      try {
        // 尝试从旧的全局存储键加载
        const stored = localStorage.getItem(BOARD_STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed.boards && parsed.tasks) {
            this.workspaceData = parsed
          }
        }
      } catch (e) {}

      // 加载各项目的资源表单数据
      projectStore.projects.forEach(p => {
        try {
          const key = getProjectWorkspaceKey(p.id)
          const stored = localStorage.getItem(key)
          if (stored) {
            const parsed = JSON.parse(stored)
            if (parsed.boards && parsed.tasks && Object.keys(parsed.boards).length > 0) {
              this.projectWorkspaceData[p.id] = parsed
            }
          }
        } catch (e) {}
      })

      // 如果没有数据，使用 mock 数据
      if (Object.keys(this.workspaceData.boards).length === 0) {
        this.workspaceData = JSON.parse(JSON.stringify(MockData.workspaceData))
      }

      // 更新看板ID列表
      this.boardIds = Object.keys(this.workspaceData.boards)

      // 设置默认当前看板
      if (this.boardIds.length > 0 && !this.currentBoardId) {
        this.currentBoardId = this.boardIds[0]
      }
    },

    // 保存资源表单数据
    saveWorkspaceData() {
      const projectStore = useProjectStore()

      try {
        // 保存全局
        localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(this.workspaceData))

        // 保存到当前项目
        if (projectStore.currentProjectId) {
          const key = getProjectWorkspaceKey(projectStore.currentProjectId)
          localStorage.setItem(key, JSON.stringify(this.workspaceData))
        }
      } catch (e) {}
    },

    // 切换到指定项目的资源表单数据
    switchProjectWorkspace(projectId) {
      if (this.projectWorkspaceData[projectId]) {
        // 先保存当前项目的数据
        const currentProjectStore = useProjectStore()
        if (currentProjectStore.currentProjectId) {
          const key = getProjectWorkspaceKey(currentProjectStore.currentProjectId)
          try {
            localStorage.setItem(key, JSON.stringify(this.workspaceData))
          } catch (e) {}
        }
        this.workspaceData = this.projectWorkspaceData[projectId]
      }
    },

    // ===== 看板操作 =====
    addBoard(name, icon = '📝') {
      const boardId = 'ws-' + Date.now()
      const newBoard = {
        id: boardId,
        name: name || '新看板',
        icon: icon,
        taskIds: [],
        canvas: {
          collapsed: false,
          widgets: []
        }
      }
      this.workspaceData.boards[boardId] = newBoard
      this.boardIds.push(boardId)
      this.saveWorkspaceData()
      return newBoard
    },

    renameBoard(boardId, newName) {
      if (this.workspaceData.boards[boardId]) {
        this.workspaceData.boards[boardId].name = newName
        this.saveWorkspaceData()
      }
    },

    deleteBoard(boardId) {
      const board = this.workspaceData.boards[boardId]
      if (!board) return

      // 删除看板下的所有任务和附件
      board.taskIds?.forEach(taskId => {
        this.deleteTask(taskId)
      })

      delete this.workspaceData.boards[boardId]
      this.boardIds = this.boardIds.filter(id => id !== boardId)

      // 如果删除的是当前看板，切换到第一个
      if (this.currentBoardId === boardId) {
        this.currentBoardId = this.boardIds.length > 0 ? this.boardIds[0] : null
      }

      this.saveWorkspaceData()
    },

    // 选择看板
    selectBoard(boardId) {
      if (this.workspaceData.boards[boardId]) {
        this.currentBoardId = boardId
        this.selectedBoardTaskId = null
      }
    },

    // 设置任务筛选
    setTaskFilter(filter) {
      this.taskFilter = filter
    },

    // ===== 任务操作 =====
    addTask(boardId, taskData) {
      const board = this.workspaceData.boards[boardId]
      if (!board) return null

      const taskId = 'task-' + Date.now()
      const newTask = {
        id: taskId,
        title: taskData.title || '新任务',
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        due: taskData.due || '',
        assignee: taskData.assignee || '',
        quantity: taskData.quantity || 0,
        desc: taskData.desc || '',
        createdAt: new Date().toISOString(),
        attachments: []
      }

      this.workspaceData.tasks[taskId] = newTask
      board.taskIds.push(taskId)
      this.saveWorkspaceData()
      return newTask
    },

    updateTask(taskId, updates) {
      if (this.workspaceData.tasks[taskId]) {
        Object.assign(this.workspaceData.tasks[taskId], updates)
        this.saveWorkspaceData()
      }
    },

    deleteTask(taskId) {
      const task = this.workspaceData.tasks[taskId]
      if (!task) return

      // 删除任务的附件
      task.attachments?.forEach(attId => {
        delete this.workspaceData.attachments[attId]
      })

      // 从看板中移除
      Object.values(this.workspaceData.boards).forEach(board => {
        if (board.taskIds) {
          const index = board.taskIds.indexOf(taskId)
          if (index > -1) {
            board.taskIds.splice(index, 1)
          }
        }
      })

      delete this.workspaceData.tasks[taskId]
      this.saveWorkspaceData()
    },

    // 移动任务到另一个看板
    moveTask(taskId, targetBoardId) {
      const task = this.workspaceData.tasks[taskId]
      const targetBoard = this.workspaceData.boards[targetBoardId]
      if (!task || !targetBoard) return false

      // 从原看板移除
      Object.values(this.workspaceData.boards).forEach(board => {
        if (board.taskIds) {
          const index = board.taskIds.indexOf(taskId)
          if (index > -1) {
            board.taskIds.splice(index, 1)
          }
        }
      })

      // 添加到目标看板
      targetBoard.taskIds.push(taskId)
      this.saveWorkspaceData()
      return true
    },

    // ===== 附件操作 =====
    addAttachment(taskId, attachmentData) {
      const task = this.workspaceData.tasks[taskId]
      if (!task) return null

      const attId = 'att-' + Date.now()
      const newAttachment = {
        id: attId,
        type: attachmentData.type || 'link',
        targetId: attachmentData.targetId || '',
        name: attachmentData.name || '附件',
        createdAt: new Date().toISOString(),
        customFields: {}
      }

      this.workspaceData.attachments[attId] = newAttachment
      task.attachments.push(attId)
      this.saveWorkspaceData()
      return newAttachment
    },

    deleteAttachment(attId) {
      const attachment = this.workspaceData.attachments[attId]
      if (!attachment) return

      // 从任务中移除
      Object.values(this.workspaceData.tasks).forEach(task => {
        if (task.attachments) {
          const index = task.attachments.indexOf(attId)
          if (index > -1) {
            task.attachments.splice(index, 1)
          }
        }
      })

      delete this.workspaceData.attachments[attId]
      this.saveWorkspaceData()
    },

    // 更新附件自定义字段
    updateAttachmentCustomField(attId, fieldId, value) {
      const attachment = this.workspaceData.attachments[attId]
      if (attachment) {
        if (!attachment.customFields) {
          attachment.customFields = {}
        }
        attachment.customFields[fieldId] = value
        this.saveWorkspaceData()
      }
    },

    // ===== 任务展开/折叠 =====
    toggleTaskExpand(taskId) {
      if (this.expandedBoardTasks.has(taskId)) {
        this.expandedBoardTasks.delete(taskId)
      } else {
        this.expandedBoardTasks.add(taskId)
      }
    },

    // ===== 附件视图 =====
    getAttachView(taskId) {
      return this.boardAttachViews[taskId] || DEFAULT_BOARD_ATTACH_VIEW
    },

    setAttachView(taskId, view) {
      this.boardAttachViews[taskId] = view
    },

    // ===== 弹窗控制 =====
    openNewTaskModal(boardId) {
      this.newTaskBoardId = boardId
      this.newTaskModalOpen = true
    },

    closeNewTaskModal() {
      this.newTaskModalOpen = false
      this.newTaskBoardId = null
    },

    openTaskDetail(taskId) {
      this.taskDetailTaskId = taskId
      this.taskDetailModalOpen = true
    },

    closeTaskDetail() {
      this.taskDetailModalOpen = false
      this.taskDetailTaskId = null
    },

    // ===== 看板画布 =====
    toggleBoardCanvas(boardId) {
      const board = this.workspaceData.boards[boardId]
      if (board && board.canvas) {
        board.canvas.collapsed = !board.canvas.collapsed
        this.saveWorkspaceData()
      }
    },

    addWidget(boardId, widget) {
      const board = this.workspaceData.boards[boardId]
      if (!board) return null
      if (!board.canvas) {
        board.canvas = { collapsed: false, widgets: [] }
      }
      const newWidget = {
        id: 'w-' + Date.now(),
        ...widget
      }
      board.canvas.widgets.push(newWidget)
      this.saveWorkspaceData()
      return newWidget
    },

    deleteWidget(boardId, widgetId) {
      const board = this.workspaceData.boards[boardId]
      if (board && board.canvas && board.canvas.widgets) {
        const index = board.canvas.widgets.findIndex(w => w.id === widgetId)
        if (index > -1) {
          board.canvas.widgets.splice(index, 1)
          this.saveWorkspaceData()
        }
      }
    }
  }
})
