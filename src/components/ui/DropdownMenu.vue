<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'start'
  },
  sideOffset: {
    type: Number,
    default: 4
  }
})

const emit = defineEmits(['open-change'])

const isOpen = ref(false)
const triggerRef = ref(null)
const contentRef = ref(null)

const contentClasses = computed(() => {
  return cn(
    'fixed z-50 min-w-[8rem] overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
    props.className
  )
})

function toggle() {
  isOpen.value = !isOpen.value
  emit('open-change', isOpen.value)
  if (isOpen.value) {
    nextTick(() => adjustPosition())
  }
}

function close() {
  isOpen.value = false
  emit('open-change', false)
}

// 调整菜单位置
function adjustPosition() {
  if (!triggerRef.value || !contentRef.value) return
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const content = contentRef.value

  // 先设置为可见以获取尺寸
  content.style.visibility = 'hidden'
  content.style.display = 'block'

  const contentRect = content.getBoundingClientRect()
  let left = triggerRect.left
  let top = triggerRect.bottom + props.sideOffset

  // 根据 align 调整水平位置
  if (props.align === 'end') {
    left = triggerRect.right - contentRect.width
  } else if (props.align === 'center') {
    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
  }

  // 防止超出视口
  const viewportWidth = window.innerWidth
  if (left + contentRect.width > viewportWidth - 8) {
    left = viewportWidth - contentRect.width - 8
  }
  if (left < 8) left = 8

  const viewportHeight = window.innerHeight
  if (top + contentRect.height > viewportHeight - 8) {
    top = triggerRect.top - contentRect.height - props.sideOffset
  }

  content.style.left = left + 'px'
  content.style.top = top + 'px'
  content.style.visibility = 'visible'
  content.style.display = 'block'
}

// 点击外部关闭
function handleClickOutside(e) {
  if (
    isOpen.value &&
    triggerRef.value &&
    contentRef.value &&
    !triggerRef.value.contains(e.target) &&
    !contentRef.value.contains(e.target)
  ) {
    close()
  }
}

// ESC 键关闭
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
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

defineExpose({ toggle, close, isOpen })
</script>

<template>
  <div class="relative inline-block" ref="triggerRef" @click.stop="toggle">
    <slot name="trigger" />
  </div>

  <Teleport to="body">
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        ref="contentRef"
        :class="contentClasses"
        style="display: none;"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
