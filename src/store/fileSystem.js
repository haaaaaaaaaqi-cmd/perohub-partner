import { defineStore } from 'pinia'
import { useProjectStore } from './project'

// ===== 文件系统 Store =====
// 管理文件浏览、目录树、当前路径、文件操作等

export const useFileSystemStore = defineStore('fileSystem', {
  state: () => ({
    // 当前路径（文件夹ID数组）
    currentPath: ['root'],

    // 当前空间：'resource' 或 'workspace'
    currentSpace: 'resource',

    // 当前筛选器
    currentFilter: 'all',

    // 选中的项目集合
    selectedItems: new Set(),

    // 右键菜单目标ID
    contextTargetId: null,

    // 剪贴板（用于创建链接）
    linkClipboard: null,

    // 待上传文件列表
    pendingFiles: [],

    // 展开的文件夹集合（目录树）
    expandedFolders: new Set(['root']),

    // 资源库目录树展开状态
    resourceExpandedFolders: new Set(['root']),

    // 资源表单目录树展开状态
    workspaceExpandedFolders: new Set(),

    // 自定义目录栏设置弹窗
    customNavModalOpen: false,
    customNavContext: 'resource'
  }),

  getters: {
    // 获取当前文件系统
    currentFileSystem() {
      const projectStore = useProjectStore()
      return projectStore.getCurrentFileSystem() || {}
    },

    // 获取当前文件夹
    currentFolder(state) {
      const fs = this.currentFileSystem
      const folderId = state.currentPath[state.currentPath.length - 1] || 'root'
      return fs[folderId] || null
    },

    // 获取当前文件夹的子项
    currentChildren(state) {
      const fs = this.currentFileSystem
      const folder = this.currentFolder
      if (!folder || !folder.children) return []

      let children = folder.children
        .map(id => fs[id])
        .filter(item => item && !item.hidden)

      // 类型筛选
      if (state.currentFilter !== 'all') {
        children = children.filter(item => {
          if (state.currentFilter === 'folder') return item.type === 'folder'
          if (state.currentFilter === 'image') {
            return item.type === 'image' || item.type === 'png' || item.type === 'gif' || item.type === 'psd'
          }
          if (state.currentFilter === 'video') return item.type === 'video'
          if (state.currentFilter === 'model3d') return item.type === 'model3d'
          if (state.currentFilter === 'audio') return item.type === 'audio'
          if (state.currentFilter === 'document') return item.type === 'document'
          if (state.currentFilter === 'spine') return item.type === 'spine'
          return true
        })
      }

      return children
    },

    // 面包屑路径
    breadcrumbPath(state) {
      const fs = this.currentFileSystem
      return state.currentPath.map(id => ({
        id,
        name: fs[id]?.name || '根目录'
      }))
    },

    // 是否有选中项
    hasSelection(state) {
      return state.selectedItems.size > 0
    },

    // 第一个选中项
    firstSelected(state) {
      if (state.selectedItems.size === 0) return null
      const fs = this.currentFileSystem
      const firstId = Array.from(state.selectedItems)[0]
      return fs[firstId] || null
    }
  },

  actions: {
    // 初始化导航状态
    initNavState(path, filter) {
      this.currentPath = path || ['root']
      this.currentFilter = filter || 'all'
    },

    // 切换当前空间（资源库/资源表单）
    setCurrentSpace(space) {
      this.currentSpace = space
      this.currentPath = ['root']
      this.currentFilter = 'all'
      this.selectedItems.clear()
    },

    // 进入文件夹
    goToFolder(folderId) {
      const fs = this.currentFileSystem
      const folder = fs[folderId]
      if (!folder || folder.type !== 'folder') return

      // 构建新路径
      const path = []
      let current = folder
      while (current) {
        path.unshift(current.id)
        current = current.parent ? fs[current.parent] : null
      }
      this.currentPath = path
      this.selectedItems.clear()

      // 确保展开
      this.expandedFolders.add(folderId)
    },

    // 导航到路径中的某一级
    goToPathIndex(index) {
      if (index < 0 || index >= this.currentPath.length) return
      this.currentPath = this.currentPath.slice(0, index + 1)
      this.selectedItems.clear()
    },

    // 返回上一级
    goBack() {
      if (this.currentPath.length > 1) {
        this.currentPath.pop()
        this.selectedItems.clear()
      }
    },

    // 跳转到根目录
    goToRoot() {
      this.currentPath = ['root']
      this.selectedItems.clear()
    },

    // 跳转到指定分区根目录
    goToSectionRoot(section) {
      this.setCurrentSpace(section === 'workspace' ? 'workspace' : 'resource')
    },

    // 设置类型筛选
    setTypeFilter(filter) {
      this.currentFilter = filter
    },

    // 切换文件夹展开状态（目录树）
    toggleFolderExpand(folderId) {
      if (this.expandedFolders.has(folderId)) {
        this.expandedFolders.delete(folderId)
      } else {
        this.expandedFolders.add(folderId)
      }
    },

    // 选中项目
    selectItem(itemId, addToSelection = false) {
      if (addToSelection) {
        if (this.selectedItems.has(itemId)) {
          this.selectedItems.delete(itemId)
        } else {
          this.selectedItems.add(itemId)
        }
      } else {
        this.selectedItems.clear()
        this.selectedItems.add(itemId)
      }
    },

    // 清除选中
    clearSelection() {
      this.selectedItems.clear()
    },

    // 全选/取消全选
    toggleSelectAll() {
      const children = this.currentChildren
      if (this.selectedItems.size === children.length) {
        this.selectedItems.clear()
      } else {
        children.forEach(child => {
          this.selectedItems.add(child.id)
        })
      }
    },

    // 创建新文件夹
    createFolder(parentId, name) {
      const fs = this.currentFileSystem
      const parent = fs[parentId]
      if (!parent) return null

      const newFolder = {
        id: 'folder-' + Date.now(),
        name: name || '新建文件夹',
        type: 'folder',
        parent: parentId,
        children: [],
        modified: new Date().toISOString(),
        tags: []
      }

      fs[newFolder.id] = newFolder
      parent.children.push(newFolder.id)
      parent.modified = new Date().toISOString()

      return newFolder
    },

    // 重命名项目
    renameItem(itemId, newName) {
      const fs = this.currentFileSystem
      const item = fs[itemId]
      if (item) {
        item.name = newName
        item.modified = new Date().toISOString()
      }
    },

    // 删除项目
    deleteItem(itemId) {
      const fs = this.currentFileSystem
      const item = fs[itemId]
      if (!item) return

      // 从父文件夹中移除
      if (item.parent) {
        const parent = fs[item.parent]
        if (parent && parent.children) {
          const index = parent.children.indexOf(itemId)
          if (index > -1) {
            parent.children.splice(index, 1)
          }
          parent.modified = new Date().toISOString()
        }
      }

      // 如果是文件夹，递归删除子项
      if (item.type === 'folder' && item.children) {
        item.children.forEach(childId => {
          this.deleteItem(childId)
        })
      }

      // 删除项目本身
      delete fs[itemId]

      // 从选中集合中移除
      this.selectedItems.delete(itemId)
    },

    // 复制项目
    copyItem(itemId, targetFolderId) {
      const fs = this.currentFileSystem
      const item = fs[itemId]
      const targetFolder = fs[targetFolderId]
      if (!item || !targetFolder || targetFolder.type !== 'folder') return null

      const newId = item.type + '-' + Date.now()
      const newItem = JSON.parse(JSON.stringify(item))
      newItem.id = newId
      newItem.parent = targetFolderId
      newItem.modified = new Date().toISOString()

      // 如果是文件夹，递归复制子项
      if (newItem.type === 'folder' && newItem.children) {
        const newChildren = []
        item.children.forEach(childId => {
          const childCopy = this.copyItem(childId, newId)
          if (childCopy) {
            newChildren.push(childCopy.id)
          }
        })
        newItem.children = newChildren
      }

      fs[newId] = newItem
      targetFolder.children.push(newId)
      targetFolder.modified = new Date().toISOString()

      return newItem
    },

    // 移动项目
    moveItem(itemId, targetFolderId) {
      const fs = this.currentFileSystem
      const item = fs[itemId]
      const targetFolder = fs[targetFolderId]
      if (!item || !targetFolder || targetFolder.type !== 'folder') return false
      if (item.parent === targetFolderId) return false

      // 从原父文件夹移除
      if (item.parent) {
        const oldParent = fs[item.parent]
        if (oldParent && oldParent.children) {
          const index = oldParent.children.indexOf(itemId)
          if (index > -1) {
            oldParent.children.splice(index, 1)
          }
          oldParent.modified = new Date().toISOString()
        }
      }

      // 添加到新父文件夹
      item.parent = targetFolderId
      targetFolder.children.push(itemId)
      targetFolder.modified = new Date().toISOString()

      return true
    },

    // 获取显示项目（处理 link 类型）
    getDisplayItem(itemId) {
      const fs = this.currentFileSystem
      const item = fs[itemId]
      if (!item) return null
      if (item.type === 'link' && item.targetId) {
        const target = fs[item.targetId]
        if (target) {
          return { ...target, id: itemId, linkName: item.name, isLink: true, originalId: item.targetId }
        }
      }
      return item
    },

    // 获取文件图标
    getFileIcon(type) {
      const icons = {
        folder: '📁',
        image: '🖼️',
        png: '🖼️',
        gif: '🎞️',
        psd: '🎨',
        video: '🎬',
        model3d: '🧊',
        audio: '🎵',
        document: '📄',
        spine: '🎭',
        link: '🔗'
      }
      return icons[type] || '📄'
    },

    // 格式化文件大小
    formatFileSize(bytes) {
      if (bytes === undefined || bytes === null) return '-'
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
    },

    // 格式化日期
    formatDate(dateStr) {
      if (!dateStr) return '-'
      const date = new Date(dateStr)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    // 设置右键菜单目标
    setContextTarget(id) {
      this.contextTargetId = id
    },

    // 复制链接剪贴板
    setLinkClipboard(itemId) {
      this.linkClipboard = itemId
    },

    // 打开自定义目录栏弹窗
    openCustomNavModal(context) {
      this.customNavContext = context
      this.customNavModalOpen = true
    },

    // 关闭自定义目录栏弹窗
    closeCustomNavModal() {
      this.customNavModalOpen = false
    }
  }
})
