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
    'flex h-full w-full items-center justify-center rounded-full bg-muted',
    props.class
  )
})
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
