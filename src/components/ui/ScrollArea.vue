<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'auto' // auto, always, scroll, hover
  }
})

const classes = computed(() => {
  return cn(
    'relative overflow-hidden',
    props.class
  )
})
</script>

<template>
  <div :class="classes">
    <div class="h-full w-full overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 自定义滚动条样式 */
:deep(::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(::-webkit-scrollbar-thumb) {
  background-color: hsl(var(--muted-foreground) / 0.2);
  border-radius: 3px;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background-color: hsl(var(--muted-foreground) / 0.3);
}
</style>
