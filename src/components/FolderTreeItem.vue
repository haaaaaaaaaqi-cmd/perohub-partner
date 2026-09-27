<template>
  <!-- 目录树项（递归组件） -->
  <div class="w-full">
    <div
      class="flex items-center gap-1.5 py-1.5 cursor-pointer rounded-md transition-colors text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      :class="{ 'bg-sidebar-accent text-sidebar-foreground font-medium': isActive }"
      :style="{ paddingLeft: depth * 16 + 8 + 'px' }"
      @click="handleClick"
    >
      <span
        v-if="item.type === 'folder'"
        class="flex items-center justify-center w-3 flex-shrink-0 text-sidebar-foreground/50 transition-transform"
        :class="{ 'rotate-90': isExpanded }"
        @click.stop="toggleExpand"
      >
        <ChevronRight class="w-3 h-3" />
      </span>
      <span v-else class="w-3 flex-shrink-0"></span>
      <span class="flex-shrink-0 text-base">{{ getIcon }}</span>
      <span class="flex-1 min-w-0 truncate">{{ item.name }}</span>
      <span
        v-if="item.children && item.children.length > 0"
        class="flex-shrink-0 text-xs text-sidebar-foreground/50 bg-sidebar-accent/60 px-1.5 py-0.5 rounded-full"
      >
        {{ item.children.filter(c => !isHiddenChild(c)).length }}
      </span>
    </div>

    <!-- 子文件夹（递归） -->
    <div v-if="item.type === 'folder' && isExpanded && childFolders.length > 0" class="w-full">
      <FolderTreeItem
        v-for="child in childFolders"
        :key="child.id"
        :item="child"
        :depth="depth + 1"
        :expanded-folders="expandedFolders"
        @toggle="$emit('toggle', $event)"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useFileSystemStore } from '@/store/fileSystem'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  },
  expandedFolders: {
    type: Set,
    default: () => new Set()
  }
})

const emit = defineEmits(['toggle', 'select'])

const fileSystemStore = useFileSystemStore()

// 是否展开
const isExpanded = computed(() => {
  return props.expandedFolders.has(props.item.id)
})

// 是否激活（当前路径中）
const isActive = computed(() => {
  const currentPath = fileSystemStore.currentPath
  return currentPath[currentPath.length - 1] === props.item.id
})

// 获取图标
const getIcon = computed(() => {
  const icons = {
    folder: '📁',
    image: '🖼️',
    video: '🎬',
    audio: '🎵',
    document: '📄',
    model3d: '🧊',
    spine: '🎭',
    psd: '🎨'
  }
  return icons[props.item.type] || '📄'
})

// 子文件夹
const childFolders = computed(() => {
  if (!props.item.children) return []
  const fs = fileSystemStore.currentFileSystem
  return props.item.children
    .map(id => fs[id])
    .filter(child => child && child.type === 'folder' && !child.hidden)
})

// 判断子项是否隐藏
function isHiddenChild(childId) {
  const fs = fileSystemStore.currentFileSystem
  return fs[childId]?.hidden
}

// 切换展开
function toggleExpand() {
  emit('toggle', props.item.id)
}

// 点击处理
function handleClick() {
  if (props.item.type === 'folder') {
    emit('select', props.item.id)
    // 自动展开
    if (!isExpanded.value) {
      emit('toggle', props.item.id)
    }
  }
}
</script>
