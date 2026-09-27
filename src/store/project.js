import { defineStore } from 'pinia'
import { MockData, fileSystemTemplate } from '@/mock'

// ===== 项目管理 Store =====
// 管理项目列表、当前项目、项目切换等

const getProjectListKey = () => 'rh_project_list'
const getProjectStorageKey = (projectId) => 'rh_project_fs_' + projectId
const getProjectTableFieldsKey = (projectId) => 'rh_project_fields_' + projectId
const getProjectNavKey = (projectId) => 'rh_project_nav_' + projectId
const getProjectWorkspaceKey = (projectId) => 'rh_project_workspace_' + projectId

export const useProjectStore = defineStore('project', {
  state: () => ({
    // 项目列表
    projects: [],

    // 当前项目ID
    currentProjectId: null,

    // 各项目的文件系统 { projectId: fileSystemObject }
    projectFileSystems: {},

    // 新建项目时选中的颜色
    selectedProjectColor: 'cyan-purple',

    // 项目下拉菜单是否展开
    projectDropdownOpen: false,

    // 新建项目弹窗是否打开
    projectModalOpen: false
  }),

  getters: {
    // 当前项目
    currentProject(state) {
      return state.projects.find(p => p.id === state.currentProjectId) || null
    },

    // 当前项目名称
    currentProjectName(state) {
      const project = state.projects.find(p => p.id === state.currentProjectId)
      return project?.name || '我的资源'
    },

    // 当前项目颜色
    currentProjectColor(state) {
      const project = state.projects.find(p => p.id === state.currentProjectId)
      return project?.color || 'cyan-purple'
    },

    // 当前项目颜色渐变
    currentProjectGradient(state) {
      const color = state.projects.find(p => p.id === state.currentProjectId)?.color || 'cyan-purple'
      return MockData.PROJECT_COLORS[color] || MockData.PROJECT_COLORS['cyan-purple']
    },

    // 项目颜色配置
    projectColors: () => MockData.PROJECT_COLORS
  },

  actions: {
    // 创建默认文件系统结构
    createDefaultFileSystem(projectName) {
      return {
        root: {
          id: 'root',
          name: projectName || '我的资源',
          type: 'folder',
          children: []
        }
      }
    },

    // 加载所有项目
    loadProjects() {
      const stored = localStorage.getItem(getProjectListKey())
      if (stored) {
        try {
          this.projects = JSON.parse(stored)
        } catch (e) {
          this.projects = []
        }
      }

      // 如果没有项目，创建默认项目
      if (this.projects.length === 0) {
        const defaultProject = {
          id: 'project-default',
          name: '默认项目',
          color: 'cyan-purple',
          createdAt: new Date().toISOString()
        }
        this.projects = [defaultProject]
        this.saveProjects()
        // 使用 mock 数据作为默认项目的文件系统
        this.projectFileSystems['project-default'] = JSON.parse(JSON.stringify(MockData.fileSystem))
        this.saveProjectFileSystem('project-default')
      }

      // 加载每个项目的文件系统
      this.projects.forEach(p => {
        if (!this.projectFileSystems[p.id]) {
          const storedFS = localStorage.getItem(getProjectStorageKey(p.id))
          if (storedFS) {
            try {
              this.projectFileSystems[p.id] = JSON.parse(storedFS)
            } catch (e) {
              this.projectFileSystems[p.id] = this.createDefaultFileSystem(p.name)
            }
          } else if (p.id === 'project-default') {
            this.projectFileSystems[p.id] = JSON.parse(JSON.stringify(MockData.fileSystem))
          } else {
            this.projectFileSystems[p.id] = this.createDefaultFileSystem(p.name)
          }
        }
      })

      this.currentProjectId = this.projects[0]?.id || null
    },

    // 保存项目列表
    saveProjects() {
      localStorage.setItem(getProjectListKey(), JSON.stringify(this.projects))
    },

    // 保存项目文件系统
    saveProjectFileSystem(projectId) {
      if (this.projectFileSystems[projectId]) {
        try {
          localStorage.setItem(
            getProjectStorageKey(projectId),
            JSON.stringify(this.projectFileSystems[projectId])
          )
        } catch (e) {}
      }
    },

    // 获取当前项目的文件系统
    getCurrentFileSystem() {
      if (!this.currentProjectId) return null
      return this.projectFileSystems[this.currentProjectId]
    },

    // 切换项目
    switchProject(projectId) {
      if (this.projectFileSystems[projectId]) {
        // 保存当前项目状态
        if (this.currentProjectId) {
          this.saveProjectFileSystem(this.currentProjectId)
        }
        this.currentProjectId = projectId
        this.projectDropdownOpen = false
      }
    },

    // 创建新项目
    createProject(name, color = 'cyan-purple') {
      const newProject = {
        id: 'project-' + Date.now(),
        name: name || '新项目',
        color: color,
        createdAt: new Date().toISOString()
      }
      this.projects.push(newProject)
      this.projectFileSystems[newProject.id] = this.createDefaultFileSystem(name)
      this.saveProjects()
      this.saveProjectFileSystem(newProject.id)
      this.projectModalOpen = false
      this.switchProject(newProject.id)
      return newProject
    },

    // 删除项目
    deleteProject(projectId) {
      const index = this.projects.findIndex(p => p.id === projectId)
      if (index === -1) return false
      if (this.projects.length <= 1) return false // 至少保留一个项目

      this.projects.splice(index, 1)
      delete this.projectFileSystems[projectId]
      localStorage.removeItem(getProjectStorageKey(projectId))
      localStorage.removeItem(getProjectTableFieldsKey(projectId))
      localStorage.removeItem(getProjectNavKey(projectId))
      localStorage.removeItem(getProjectWorkspaceKey(projectId))

      this.saveProjects()

      // 如果删除的是当前项目，切换到第一个项目
      if (this.currentProjectId === projectId) {
        this.currentProjectId = this.projects[0]?.id || null
      }
      return true
    },

    // 重命名项目
    renameProject(projectId, newName) {
      const project = this.projects.find(p => p.id === projectId)
      if (project) {
        project.name = newName
        // 同时更新根文件夹名称
        const fs = this.projectFileSystems[projectId]
        if (fs && fs.root) {
          fs.root.name = newName
        }
        this.saveProjects()
        this.saveProjectFileSystem(projectId)
      }
    },

    // 切换项目下拉菜单
    toggleProjectDropdown() {
      this.projectDropdownOpen = !this.projectDropdownOpen
    },

    // 关闭项目下拉菜单
    closeProjectDropdown() {
      this.projectDropdownOpen = false
    },

    // 打开新建项目弹窗
    openProjectModal() {
      this.selectedProjectColor = 'cyan-purple'
      this.projectModalOpen = true
      this.projectDropdownOpen = false
    },

    // 关闭新建项目弹窗
    closeProjectModal() {
      this.projectModalOpen = false
    },

    // 选择项目颜色
    selectProjectColor(color) {
      this.selectedProjectColor = color
    },

    // 保存项目自定义字段
    saveTableFields(projectId, fields) {
      if (projectId) {
        try {
          localStorage.setItem(
            getProjectTableFieldsKey(projectId),
            JSON.stringify(fields)
          )
        } catch (e) {}
      }
    },

    // 加载项目自定义字段
    loadTableFields(projectId) {
      if (!projectId) return []
      try {
        const data = localStorage.getItem(getProjectTableFieldsKey(projectId))
        return data ? JSON.parse(data) : []
      } catch (e) {
        return []
      }
    },

    // 保存项目导航状态
    saveProjectNavState(projectId, path, filter) {
      if (!projectId) return
      try {
        localStorage.setItem(
          getProjectNavKey(projectId),
          JSON.stringify({ path, filter })
        )
      } catch (e) {}
    },

    // 加载项目导航状态
    loadProjectNavState(projectId) {
      if (!projectId) return { path: ['root'], filter: 'all' }
      try {
        const data = localStorage.getItem(getProjectNavKey(projectId))
        if (data) {
          const nav = JSON.parse(data)
          return {
            path: nav.path && nav.path.length ? nav.path : ['root'],
            filter: nav.filter || 'all'
          }
        }
      } catch (e) {}
      return { path: ['root'], filter: 'all' }
    },

    // 保存所有项目状态
    saveAllProjectState() {
      if (this.currentProjectId) {
        this.saveProjectFileSystem(this.currentProjectId)
      }
      this.saveProjects()
    }
  }
})
