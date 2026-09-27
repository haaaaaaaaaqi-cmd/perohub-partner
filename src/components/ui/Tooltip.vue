<script setup>
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  side: {
    type: String,
    default: 'top' // top, bottom, left, right
  },
  className: {
    type: String,
    default: ''
  }
})

const isVisible = ref(false)

function show() {
  isVisible.value = true
}

function hide() {
  isVisible.value = false
}

const positionClasses = computed(() => {
  const base = 'absolute z-50 px-2 py-1 text-xs text-primary-foreground bg-primary rounded-md shadow-sm whitespace-nowrap pointer-events-none'

  switch (props.side) {
    case 'bottom':
      return base + ' top-full left-1/2 -translate-x-1/2 mt-1.5'
    case 'left':
      return base + ' right-full top-1/2 -translate-y-1/2 mr-1.5'
    case 'right':
      return base + ' left-full top-1/2 -translate-y-1/2 ml-1.5'
    case 'top':
    default:
      return base + ' bottom-full left-1/2 -translate-x-1/2 mb-1.5'
  }
})

const tooltipClasses = computed(() => {
  return cn(positionClasses.value, props.className)
})
</script>

<template>
  <div
    class="relative inline-flex"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
    <Transition name="tooltip">
      <div
        v-if="isVisible && content"
        :class="tooltipClasses"
        role="tooltip"
      >
        {{ content }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(2px);
}
</style>
