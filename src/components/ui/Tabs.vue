<script setup>
import { ref, provide, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  defaultValue: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const activeValue = ref(props.modelValue || props.defaultValue)

watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== '') {
    activeValue.value = val
  }
})

function setActiveValue(value) {
  activeValue.value = value
  emit('update:modelValue', value)
}

provide('tabsContext', {
  activeValue,
  setActiveValue
})
</script>

<template>
  <div class="w-full">
    <slot />
  </div>
</template>
