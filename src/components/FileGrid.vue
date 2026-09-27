<template>
  <!-- 文件网格视图组件 -->
  <div
    class="grid gap-3 p-4 content-start"
    :class="'grid-cols-[repeat(auto-fill,minmax(' + gridSizeWidth + ',1fr))]'"
    @contextmenu.prevent="handleBlankContextMenu"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="relative bg-muted/50 border border-transparent rounded-md cursor-pointer transition-all overflow-hidden hover:bg-accent/50 hover:border-border hover:-translate-y-0.5 hover:shadow-sm"
      :class="{ 'border-primary bg-primary/10': isSelected(item.id), folder: item.type === 'folder' }"
      @click="handleClick(item)"
      @dblclick="handleDoubleClick(item)"
      @contextmenu.prevent="handleItemContextMenu($event, item)"
    >
      <!-- 缩略图/图标 -->
      <div class="relative w-full aspect-square bg-muted overflow-hidden flex items-center justify-center">
        <template v-if="item.thumbnail">
          <img :src="item.thumbnail" :alt="item.name" class="w-full h-full object-cover" loading="lazy" />
        </template>
        <template v-else>
          <div class="text-4xl">{{ getFileIcon(item.type) }}</div>
        </template>

        <!-- 文件夹子项预览 -->
        <div v-if="item.type === 'folder' && item.children?.length > 0" class="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
          {{ item.children.filter(c => !isChildHidden(c)).length }} 项
        </div>

        <!-- 视频时长 -->
        <div v-if="item.duration" class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded backdrop-blur-sm">
          {{ item.duration }}
        </div>

        <!-- 文件格式标签 -->
        <div v-if="item.format && item.type !== 'folder'" class="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded uppercase backdrop-blur-sm">
          {{ item.format }}
        </div>
      </div>

      <!-- 文件名 -->
      <div class="px-3 py-2 text-sm text-foreground truncate" :title="item.name">
        {{ item.name }}
      </div>

      <!-- 文件信息（大尺寸时显示） -->
      <div v-if="gridSize === 'lg' || gridSize === 'xl'" class="px-3 pb-2.5 text-xs text-muted-foreground flex gap-1.5">
        <span v-if="item.size !== undefined">{{ formatSize(item.size) }}</span>
        <span v-if="item.modified">· {{ formatDate(item.modified) }}</span>
      </div>

      <!-- 选中复选框 -->
      <div v-if="isSelected(item.id)" class="absolute top-2 left-2 w-5 h-5 bg-primary text-white rounded flex items-center justify-center">
        <Check class="w-3.5 h-3.5" />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="items.length === 0" class="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground">
      <div class="text-5xl mb-3 opacity-50">📁</div>
      <div class="text-sm">此文件夹为空</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { useFileSystemStore } from '@/store/fileSystem'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  gridSize: {
    type: String,
    default: 'md'
  }
})

const emit = defineEmits(['select', 'open', 'contextMenu', 'blankContextMenu'])

const appStore = useAppStore()
const fileSystemStore = useFileSystemStore()

// 网格尺寸对应的最小宽度
const gridSizeWidth = computed(() => {
  const sizes = {
    xs: '100px',
    sm: '140px',
    md: '180px',
    lg: '220px',
    xl: '280px'
  }
  return sizes[props.gridSize] || sizes.md
})

// 获取文件图标
function getFileIcon(type) {
  return fileSystemStore.getFileIcon(type)
}

// 格式化文件大小
function formatSize(bytes) {
  return fileSystemStore.formatFileSize(bytes)
}

// 格式化日期
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

// 判断是否选中
function isSelected(itemId) {
  return fileSystemStore.selectedItems.has(itemId)
}

// 判断子项是否隐藏
function isChildHidden(childId) {
  const fs = fileSystemStore.currentFileSystem
  return fs[childId]?.hidden
}

// 点击文件
function handleClick(item) {
  fileSystemStore.selectItem(item.id, false)
  appStore.setSelectedFile(item.id)
  emit('select', item)
}

// 双击文件
function handleDoubleClick(item) {
  if (item.type === 'folder') {
    fileSystemStore.goToFolder(item.id)
  } else {
    emit('open', item)
  }
}

// 文件右键菜单
function handleItemContextMenu(event, item) {
  fileSystemStore.selectItem(item.id, false)
  appStore.setSelectedFile(item.id)
  fileSystemStore.setContextTarget(item.id)
  emit('contextMenu', { event, item })
}

// 空白处右键菜单
function handleBlankContextMenu(event) {
  fileSystemStore.clearSelection()
  fileSystemStore.setContextTarget(null)
  emit('blankContextMenu', event)
}
</script>
