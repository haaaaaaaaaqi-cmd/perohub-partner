<script setup>
import { inject, computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  class: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const tabsContext = inject('tabsContext')

const isActive = computed(() => tabsContext.activeValue.value === props.value)

const classes = computed(() => {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    isActive.value
      ? 'bg-background text-foreground shadow-sm'
      : 'hover:text-foreground/80',
    props.class
  )
})

function handleClick() {
  if (!props.disabled) {
    tabsContext.setActiveValue(props.value)
  }
}
</script>

<template>
  <button
    :class="classes"
    role="tab"
    :aria-selected="isActive"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
