<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: ''
  },
  inset: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  return cn(
    'px-2 py-1.5 text-sm font-semibold',
    props.inset && 'pl-8',
    props.class
  )
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
