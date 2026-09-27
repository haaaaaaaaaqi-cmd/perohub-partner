<template>
  <!-- 应用主容器 -->
  <div class="flex h-full bg-background">
    <!-- 模块导航栏：最左侧图标栏 -->
    <nav class="w-14 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-2 flex-shrink-0">
      <!-- Logo 区域 -->
      <div
        class="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm mb-2 cursor-pointer"
        title="Perohub"
        @click="goToPeer"
      >
        P
      </div>
      <Separator class="w-8 my-2" />

      <!-- 模块导航项 -->
      <div class="flex flex-col items-center gap-1 w-full px-1">
        <Tooltip
          v-for="module in modules"
          :key="module.id"
          :content="module.label"
          side="right"
        >
          <button
            class="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all"
            :class="isModuleActive(module.id)
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground'"
            @click="switchModule(module.id)"
          >
            <component :is="module.iconComponent" class="w-5 h-5" />
          </button>
        </Tooltip>
      </div>

      <div class="flex-1"></div>

      <!-- 用户头像与个人中心菜单 -->
      <div class="relative" @click.stop>
        <DropdownMenu align="end" :side-offset="8">
          <template #trigger>
            <button class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
              Z
            </button>
          </template>
          <div class="min-w-56">
            <div class="px-3 py-3 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                Z
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium truncate">好奇</div>
                <div class="text-xs text-muted-foreground truncate">当前账号</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuSub label="主题选择">
              <DropdownMenuItem @select="setLightMode">
                <Sun class="w-4 h-4" />
                <span class="flex-1">亮色</span>
                <Check v-if="appStore.settings.colorMode === 'light'" class="w-4 h-4 text-primary" />
              </DropdownMenuItem>
              <DropdownMenuItem @select="setDarkMode">
                <Moon class="w-4 h-4" />
                <span class="flex-1">暗色</span>
                <Check v-if="appStore.settings.colorMode === 'dark'" class="w-4 h-4 text-primary" />
              </DropdownMenuItem>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem @select="logout" class="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut class="w-4 h-4" />
              退出登录
            </DropdownMenuItem>
          </div>
        </DropdownMenu>
      </div>
    </nav>

    <!-- 路由页面 -->
    <div class="flex-1 min-w-0 h-full overflow-hidden">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" class="h-full" />
        </transition>
      </router-view>
    </div>

    <!-- Toast 消息提示 -->
    <div class="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in appStore.toasts"
          :key="toast.id"
          class="flex items-center gap-2 px-4 py-2.5 bg-popover border border-border rounded-md shadow-lg text-sm text-popover-foreground pointer-events-auto"
          :class="toastClass(toast.type)"
        >
          <component :is="toastIcon(toast.type)" class="w-4 h-4 flex-shrink-0" :class="toastIconClass(toast.type)" />
          <span>{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Users, LogOut,
  CheckCircle, XCircle, AlertTriangle, Info,
  Sun, Moon, Check
} from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { usePeerStore } from '@/store/peer'
import Tooltip from '@/components/ui/Tooltip.vue'
import Separator from '@/components/ui/Separator.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import DropdownMenuSeparator from '@/components/ui/DropdownMenuSeparator.vue'
import DropdownMenuSub from '@/components/ui/DropdownMenuSub.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const peerStore = usePeerStore()

// 模块配置
const modules = [
  { id: 'peer', label: '拍档', iconComponent: markRaw(Users) }
]

// 判断模块是否激活
function isModuleActive(moduleId) {
  if (moduleId === 'peer') return route.name === 'Peer'
  return false
}

// 切换模块
function switchModule(moduleId) {
  if (moduleId === 'peer') {
    router.push('/peer')
  }
}

// 跳转到拍档页
function goToPeer() {
  router.push('/peer')
}

// 切换为亮色模式
function setLightMode() {
  appStore.setColorMode('light')
  appStore.showToast('已切换为亮色模式', 'success')
}

// 切换为暗色模式
function setDarkMode() {
  appStore.setColorMode('dark')
  appStore.showToast('已切换为暗色模式', 'success')
}

// 退出登录
function logout() {
  appStore.showToast('退出登录功能开发中', 'info')
}

// Toast 图标
function toastIcon(type) {
  const icons = {
    success: markRaw(CheckCircle),
    error: markRaw(XCircle),
    warning: markRaw(AlertTriangle),
    info: markRaw(Info)
  }
  return icons[type] || icons.info
}

function toastIconClass(type) {
  const classes = {
    success: 'text-green-500',
    error: 'text-destructive',
    warning: 'text-amber-500',
    info: 'text-primary'
  }
  return classes[type] || classes.info
}

function toastClass(type) {
  return ''
}

// 应用初始化
function init() {
  appStore.loadAppSettings()
  appStore.applyColorMode()
  peerStore.loadPeerData()
  peerStore.loadCustomCategories()
  peerStore.loadCategorySettings()
}

onMounted(() => {
  init()
})

onUnmounted(() => {
})
</script>

<style>
/* 路由过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Toast 动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
