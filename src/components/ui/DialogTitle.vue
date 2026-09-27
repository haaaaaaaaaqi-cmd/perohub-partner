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
  return cn('text-lg font-semibold leading-none tracking-tight', props.class)
})
</script>

<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>
