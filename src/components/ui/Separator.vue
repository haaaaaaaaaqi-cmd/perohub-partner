<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal'
  },
  class: {
    type: String,
    default: ''
  }
})

const classes = computed(() => {
  return cn(
    'shrink-0 bg-border',
    props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    props.class
  )
})
</script>

<template>
  <div :class="classes" role="separator" :aria-orientation="orientation" />
</template>
