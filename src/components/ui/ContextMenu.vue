<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from '@/lib/utils'

const isOpen = ref(false)
const x = ref(0)
const y = ref(0)
const contentRef = ref(null)

function open(menuX, menuY) {
  x.value = menuX
  y.value = menuY
  isOpen.value = true
  nextTick(() => adjustPosition())
}

function close() {
  isOpen.value = false
}

function adjustPosition() {
  if (!contentRef.value) return
  const content = contentRef.value
  content.style.visibility = 'hidden'
  content.style.display = 'block'

  const contentRect = content.getBoundingClientRect()
  let left = x.value
  let top = y.value

  // 防止超出右侧
  if (left + contentRect.width > window.innerWidth - 8) {
    left = window.innerWidth - contentRect.width - 8
  }
  // 防止超出底部
  if (top + contentRect.height > window.innerHeight - 8) {
    top = y.value - contentRect.height
  }
  if (left < 8) left = 8
  if (top < 8) top = 8

  content.style.left = left + 'px'
  content.style.top = top + 'px'
  content.style.visibility = 'visible'
}

function handleClickOutside(e) {
  if (isOpen.value && contentRef.value && !contentRef.value.contains(e.target)) {
    close()
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

function handleScroll() {
  if (isOpen.value) close()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  // 注意：不监听 document 的 contextmenu 事件来关闭菜单，
  // 否则右键时菜单刚 open() 就会被冒泡上来的 contextmenu 事件 close() 掉。
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('scroll', handleScroll, true)
})

defineExpose({ open, close, isOpen })
</script>

<template>
  <Teleport to="body">
    <Transition name="context-menu">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="fixed z-50 min-w-[8rem] overflow-visible rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        style="display: none;"
        @click.stop
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.context-menu-enter-active,
.context-menu-leave-active {
  transition: all 0.12s ease;
}
.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
