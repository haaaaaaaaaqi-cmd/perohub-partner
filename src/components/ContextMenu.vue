<template>
  <!-- 右键菜单 -->
  <Teleport to="body">
    <Transition name="context-menu">
      <div
        v-if="visible"
        class="fixed z-[9999] min-w-44 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg"
        :style="{ left: position.x + 'px', top: position.y + 'px' }"
        @click.stop
        ref="menuRef"
      >
        <!-- 文件项右键菜单 -->
        <template v-if="menuType === 'file'">
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleOpen"
          >
            <ExternalLink class="w-3.5 h-3.5" />
            <span>打开</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handlePreview"
          >
            <Eye class="w-3.5 h-3.5" />
            <span>预览</span>
          </div>
          <Separator class="my-1" />
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleRename"
          >
            <Pencil class="w-3.5 h-3.5" />
            <span>重命名</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleDuplicate"
          >
            <Copy class="w-3.5 h-3.5" />
            <span>复制</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleMove"
          >
            <Move class="w-3.5 h-3.5" />
            <span>移动到...</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleCreateLink"
          >
            <Link class="w-3.5 h-3.5" />
            <span>创建链接</span>
          </div>
          <Separator class="my-1" />
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleDownload"
          >
            <Download class="w-3.5 h-3.5" />
            <span>下载</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleAddToTask"
          >
            <CheckSquare class="w-3.5 h-3.5" />
            <span>添加到任务</span>
          </div>
          <Separator class="my-1" />
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm text-destructive hover:bg-destructive/10 transition-colors"
            @click="handleDelete"
          >
            <Trash2 class="w-3.5 h-3.5" />
            <span>删除</span>
          </div>
        </template>

        <!-- 空白处右键菜单 -->
        <template v-else-if="menuType === 'blank'">
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleNewFolder"
          >
            <FolderPlus class="w-3.5 h-3.5" />
            <span>新建文件夹</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleUpload"
          >
            <Upload class="w-3.5 h-3.5" />
            <span>上传文件</span>
          </div>
          <Separator class="my-1" />
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handlePaste"
          >
            <Clipboard class="w-3.5 h-3.5" />
            <span>粘贴</span>
          </div>
          <Separator class="my-1" />
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleRefresh"
          >
            <RefreshCw class="w-3.5 h-3.5" />
            <span>刷新</span>
          </div>
          <div
            class="flex items-center gap-2.5 px-2 py-1.5 text-sm cursor-pointer rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            @click="handleSelectAll"
          >
            <CheckSquare class="w-3.5 h-3.5" />
            <span>全选</span>
          </div>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  ExternalLink, Eye, Pencil, Copy, Move, Link, Download,
  CheckSquare, Trash2, FolderPlus, Upload, Clipboard, RefreshCw
} from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { useFileSystemStore } from '@/store/fileSystem'
import Separator from '@/components/ui/Separator.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  },
  menuType: {
    type: String,
    default: 'file'
  },
  targetId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close', 'action'])

const appStore = useAppStore()
const fileSystemStore = useFileSystemStore()
const menuRef = ref(null)

// 打开文件
function handleOpen() {
  if (props.targetId) {
    const item = fileSystemStore.getDisplayItem(props.targetId)
    if (item?.type === 'folder') {
      fileSystemStore.goToFolder(props.targetId)
    }
  }
  close()
}

// 预览
function handlePreview() {
  appStore.showToast('预览功能开发中', 'info')
  close()
}

// 重命名
function handleRename() {
  appStore.showToast('重命名功能开发中', 'info')
  close()
}

// 复制
function handleDuplicate() {
  if (props.targetId) {
    const currentFolderId = fileSystemStore.currentPath[fileSystemStore.currentPath.length - 1]
    fileSystemStore.copyItem(props.targetId, currentFolderId)
    appStore.showToast('已复制', 'success')
  }
  close()
}

// 移动
function handleMove() {
  appStore.showToast('移动功能开发中', 'info')
  close()
}

// 创建链接
function handleCreateLink() {
  if (props.targetId) {
    fileSystemStore.setLinkClipboard(props.targetId)
    appStore.showToast('已复制链接，可粘贴到目标位置', 'success')
  }
  close()
}

// 下载
function handleDownload() {
  appStore.showToast('下载功能开发中', 'info')
  close()
}

// 添加到任务
function handleAddToTask() {
  appStore.showToast('添加到任务功能开发中', 'info')
  close()
}

// 删除
function handleDelete() {
  if (props.targetId) {
    if (confirm('确定要删除此文件吗？')) {
      fileSystemStore.deleteItem(props.targetId)
      appStore.showToast('已删除', 'success')
    }
  }
  close()
}

// 新建文件夹
function handleNewFolder() {
  const name = prompt('请输入文件夹名称：', '新建文件夹')
  if (name) {
    const currentFolderId = fileSystemStore.currentPath[fileSystemStore.currentPath.length - 1]
    fileSystemStore.createFolder(currentFolderId, name)
    appStore.showToast('文件夹已创建', 'success')
  }
  close()
}

// 上传
function handleUpload() {
  appStore.showToast('上传功能开发中', 'info')
  close()
}

// 粘贴
function handlePaste() {
  appStore.showToast('粘贴功能开发中', 'info')
  close()
}

// 刷新
function handleRefresh() {
  appStore.showToast('已刷新', 'success')
  close()
}

// 全选
function handleSelectAll() {
  fileSystemStore.toggleSelectAll()
  close()
}

// 关闭菜单
function close() {
  emit('close')
}

// 点击外部关闭
function handleClickOutside(e) {
  if (props.visible && menuRef.value && !menuRef.value.contains(e.target)) {
    close()
  }
}

// ESC 键关闭
function handleKeydown(e) {
  if (e.key === 'Escape' && props.visible) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})

// 监听可见性变化，调整菜单位置防止超出视口
watch(() => props.visible, (val) => {
  if (val && menuRef.value) {
    requestAnimationFrame(() => {
      const menu = menuRef.value
      if (!menu) return
      const rect = menu.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (rect.right > viewportWidth) {
        menu.style.left = (viewportWidth - rect.width - 10) + 'px'
      }
      if (rect.bottom > viewportHeight) {
        menu.style.top = (viewportHeight - rect.height - 10) + 'px'
      }
    })
  }
})
</script>

<style>
.context-menu-enter-active,
.context-menu-leave-active {
  transition: all 0.15s ease-out;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
