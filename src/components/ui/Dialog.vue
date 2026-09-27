<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
  isOpen.value = val
})

const dialogClasses = computed(() => {
  return cn(
    'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg rounded-lg',
    props.className
  )
})

function close() {
  isOpen.value = false
  emit('update:open', false)
}

function handleOverlayClick() {
  close()
}

function handleContentClick(e) {
  e.stopPropagation()
}

// ESC 键关闭
function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 提供给子组件使用的方法
defineExpose({ close })
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-overlay">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        @click="handleOverlayClick"
      >
        <Transition name="dialog-content">
          <div
            v-if="isOpen"
            :class="dialogClasses"
            @click="handleContentClick"
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay-enter-active,
.dialog-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-overlay-enter-from,
.dialog-overlay-leave-to {
  opacity: 0;
}

.dialog-content-enter-active,
.dialog-content-leave-active {
  transition: all 0.2s ease;
}

.dialog-content-enter-from,
.dialog-content-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
}
</style>
