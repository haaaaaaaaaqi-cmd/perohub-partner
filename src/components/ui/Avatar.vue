<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})

const classes = computed(() => {
  return cn(
    'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
    props.class
  )
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
