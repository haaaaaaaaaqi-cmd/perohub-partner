<script setup>
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  class: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)
const subRef = ref(null)

const triggerClasses = computed(() => {
  return cn(
    'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    props.class
  )
})

function handleEnter() {
  isOpen.value = true
}

function handleLeave() {
  isOpen.value = false
}
</script>

<template>
  <div class="relative" @mouseenter="handleEnter" @mouseleave="handleLeave">
    <!-- 二级菜单触发项 -->
    <div :class="triggerClasses">
      <slot name="label">
        <span class="flex-1">{{ label }}</span>
      </slot>
      <ChevronRight class="w-3.5 h-3.5 ml-auto opacity-60" />
    </div>

    <!-- 二级菜单面板（悬停时显示，向左侧展开） -->
    <Transition name="sub-menu">
      <div
        v-if="isOpen"
        ref="subRef"
        class="absolute top-0 left-full ml-1 min-w-[8rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md z-50"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: all 0.12s ease;
}

.sub-menu-enter-from,
.sub-menu-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}
</style>
