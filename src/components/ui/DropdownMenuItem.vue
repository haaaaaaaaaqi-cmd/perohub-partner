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
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const classes = computed(() => {
  return cn(
    'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground',
    'hover:bg-accent hover:text-accent-foreground',
    props.inset && 'pl-8',
    props.disabled && 'pointer-events-none opacity-50',
    props.class
  )
})

function handleClick() {
  if (!props.disabled) {
    emit('select')
  }
}
</script>

<template>
  <div :class="classes" @click="handleClick">
    <slot />
  </div>
</template>
