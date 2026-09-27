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
  }
})

const tabsContext = inject('tabsContext')

const isActive = computed(() => tabsContext.activeValue.value === props.value)

const classes = computed(() => {
  return cn(
    'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    props.class
  )
})
</script>

<template>
  <div
    v-show="isActive"
    :class="classes"
    role="tabpanel"
  >
    <slot />
  </div>
</template>
