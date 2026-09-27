<script setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  },
  alt: {
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
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    class="aspect-square h-full w-full object-cover"
  />
  <span v-else :class="classes">
    <slot>{{ fallback }}</slot>
  </span>
</template>
