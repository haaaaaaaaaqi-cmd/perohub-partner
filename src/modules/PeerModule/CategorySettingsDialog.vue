<template>
  <!-- 分类管理弹窗：分栏 + 分类 排序/显隐 -->
  <Dialog :open="open" @update:open="handleClose">
    <!-- 标题 -->
    <DialogHeader>
      <DialogTitle>管理分类</DialogTitle>
      <DialogDescription>拖拽调整顺序，点击眼睛切换显隐</DialogDescription>
    </DialogHeader>

    <!-- 列表 -->
    <div class="space-y-1 max-h-[55vh] overflow-y-auto -mx-1 px-1">
      <!-- 遍历分栏 -->
      <template v-for="(grpId, grpIdx) in groupOrder" :key="grpId">
        <!-- 分栏行 -->
        <div
          class="flex items-center gap-2 p-2 rounded-md border transition-colors bg-muted/40"
          :class="[
            isGroupHidden(grpId) ? 'border-dashed border-border/50 opacity-50' : 'border-border',
            dragOverId === 'grp-' + grpId ? 'border-primary ring-2 ring-primary/20' : ''
          ]"
          draggable="true"
          @dragstart="onGroupDragStart(grpIdx)"
          @dragover.prevent="onGroupDragOver(grpId)"
          @dragleave="onDragLeave"
          @drop.prevent="onGroupDrop"
          @dragend="onDragEnd"
        >
          <!-- 拖拽手柄 -->
          <GripVertical class="w-4 h-4 text-muted-foreground cursor-grab flex-shrink-0" />

          <!-- 图标 -->
          <span class="text-lg flex-shrink-0">{{ getGroupIcon(grpId) }}</span>

          <!-- 名称 -->
          <span class="flex-1 text-sm font-semibold text-foreground">{{ getGroupLabel(grpId) }}</span>

          <!-- 上移/下移 -->
          <div class="flex items-center gap-0.5 flex-shrink-0">
            <button
              class="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="grpIdx === 0"
              @click="moveGroupUp(grpId)"
            >
              <ChevronUp class="w-3.5 h-3.5" />
            </button>
            <button
              class="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              :disabled="grpIdx === groupOrder.length - 1"
              @click="moveGroupDown(grpId)"
            >
              <ChevronDown class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- 显隐切换 -->
          <button
            class="p-1 rounded transition-colors flex-shrink-0"
            :class="isGroupHidden(grpId)
              ? 'text-muted-foreground hover:text-foreground'
              : 'text-primary hover:text-primary/80'"
            :title="isGroupHidden(grpId) ? '点击显示' : '点击隐藏'"
            @click="toggleGroupVis(grpId)"
          >
            <Eye v-if="!isGroupHidden(grpId)" class="w-4 h-4" />
            <EyeOff v-else class="w-4 h-4" />
          </button>
        </div>

        <!-- 该分栏下的分类 -->
        <div class="ml-6 space-y-1 mt-0.5 mb-2">
          <template v-for="catId in getCategoriesByGroup(grpId)" :key="catId">
            <div
              class="flex items-center gap-2 p-1.5 rounded-md border transition-colors"
              :class="[
                isHidden(catId) ? 'border-dashed border-border/50 opacity-50' : 'border-border hover:border-primary/30 hover:bg-accent/30',
                dragOverId === catId ? 'border-primary ring-2 ring-primary/20' : ''
              ]"
              draggable="true"
              @dragstart.stop="onDragStart(catId)"
              @dragover.prevent.stop="onDragOver(catId)"
              @dragleave.stop="onDragLeave"
              @drop.prevent.stop="onDrop"
              @dragend.stop="onDragEnd"
            >
              <!-- 拖拽手柄 -->
              <GripVertical class="w-3.5 h-3.5 text-muted-foreground cursor-grab flex-shrink-0" />

              <!-- 图标 -->
              <span class="text-base flex-shrink-0">{{ getCatIcon(catId) }}</span>

              <!-- 名称 -->
              <span class="flex-1 text-sm text-foreground/80">{{ getCatLabel(catId) }}</span>

              <!-- 上移/下移 -->
              <div class="flex items-center gap-0.5 flex-shrink-0">
                <button
                  class="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="getCatIndex(catId) === 0"
                  @click="moveUp(catId)"
                >
                  <ChevronUp class="w-3 h-3" />
                </button>
                <button
                  class="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="getCatIndex(catId) === categoryOrder.length - 1"
                  @click="moveDown(catId)"
                >
                  <ChevronDown class="w-3 h-3" />
                </button>
              </div>

              <!-- 显隐切换 -->
              <button
                class="p-0.5 rounded transition-colors flex-shrink-0"
                :class="isHidden(catId)
                  ? 'text-muted-foreground hover:text-foreground'
                  : 'text-primary hover:text-primary/80'"
                :title="isHidden(catId) ? '点击显示' : '点击隐藏'"
                @click="toggleVisibility(catId)"
              >
                <Eye v-if="!isHidden(catId)" class="w-3.5 h-3.5" />
                <EyeOff v-else class="w-3.5 h-3.5" />
              </button>

              <!-- 卡片字段配置 -->
              <button
                class="p-0.5 rounded transition-colors flex-shrink-0"
                :class="expandedCardCat === catId ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
                title="配置卡片显示内容"
                @click.stop="toggleCardFields(catId)"
              >
                <LayoutGrid class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- 卡片字段配置面板（展开时显示） -->
            <div
              v-if="expandedCardCat === catId"
              class="ml-6 mb-2 p-2.5 rounded-md border border-border bg-muted/20"
              @click.stop
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-medium text-foreground/80">卡片显示内容</span>
                <button
                  class="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  @click="resetCatCardFields(catId)"
                >
                  恢复默认
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="field in peerStore.cardFields"
                  :key="field.id"
                  class="flex items-center gap-1 px-2 py-1 rounded-md text-xs border transition-colors"
                  :class="getCatCardFields(catId).includes(field.id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50'"
                  @click="toggleCatCardField(catId, field.id)"
                >
                  <Check v-if="getCatCardFields(catId).includes(field.id)" class="w-3 h-3" />
                  <span>{{ field.label }}</span>
                </button>
              </div>
              <p class="text-[10px] text-muted-foreground/70 mt-1.5">头像和名称为固定显示项，不可隐藏</p>
            </div>
          </template>
        </div>
      </template>
    </div>

    <!-- 统计 -->
    <div class="flex items-center justify-between text-xs text-muted-foreground pt-1">
      <span>{{ visibleGroupCount }}/{{ groupOrder.length }} 分栏，{{ visibleCount }}/{{ categoryOrder.length }} 分类</span>
    </div>

    <!-- 底部按钮 -->
    <DialogFooter>
      <Button variant="outline" size="sm" @click="handleReset">
        <RotateCcw class="w-3.5 h-3.5" />
        恢复默认
      </Button>
      <Button size="sm" @click="handleClose">
        <Check class="w-3.5 h-3.5" />
        完成
      </Button>
    </DialogFooter>
  </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  GripVertical, ChevronUp, ChevronDown, Eye, EyeOff, RotateCcw, Check, LayoutGrid, X
} from 'lucide-vue-next'
import { usePeerStore } from '@/store/peer'
import Dialog from '@/components/ui/Dialog.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Button from '@/components/ui/Button.vue'

const peerStore = usePeerStore()

const open = computed(() => peerStore.showCategorySettings)

// 当前展开卡片字段配置的分类 ID
const expandedCardCat = ref(null)

function toggleCardFields(catId) {
  expandedCardCat.value = expandedCardCat.value === catId ? null : catId
}

// 获取某分类的卡片字段
function getCatCardFields(catId) {
  return peerStore.getCategoryCardFields(catId)
}

// 切换某分类的某个卡片字段
function toggleCatCardField(catId, fieldId) {
  // 创建副本，避免修改原数组引用导致响应式不更新
  const current = [...getCatCardFields(catId)]
  const idx = current.indexOf(fieldId)
  if (idx === -1) {
    current.push(fieldId)
  } else {
    current.splice(idx, 1)
  }
  peerStore.updateCategoryCardFields(catId, current)
}

// 恢复某分类的卡片字段为默认
function resetCatCardFields(catId) {
  peerStore.updateCategoryCardFields(catId, [])
}

// ===== 分类 =====
const categoryOrder = computed(() => peerStore.categoryOrder)

const visibleCount = computed(() =>
  peerStore.categoryOrder.length - peerStore.hiddenCategories.length
)

function isHidden(catId) {
  return peerStore.hiddenCategories.includes(catId)
}

function getCat(catId) {
  return peerStore.categories.find(c => c.id === catId)
}
function getCatIcon(catId) {
  return getCat(catId)?.icon || '?'
}
function getCatLabel(catId) {
  return getCat(catId)?.label || catId
}

function getCatIndex(catId) {
  return peerStore.categoryOrder.indexOf(catId)
}

// 按分栏获取分类 ID 列表（所有，包括隐藏的）
function getCategoriesByGroup(groupId) {
  return peerStore.categoryOrder
    .filter(id => {
      const c = peerStore.categories.find(c => c.id === id)
      return c && c.group === groupId
    })
}

function moveUp(catId) {
  peerStore.moveCategory(catId, 'up')
}
function moveDown(catId) {
  peerStore.moveCategory(catId, 'down')
}

function toggleVisibility(catId) {
  if (!isHidden(catId) && visibleCount.value <= 1) return
  peerStore.toggleCategoryVisibility(catId)
}

// ===== 分栏 =====
const groupOrder = computed(() => peerStore.groupOrder)

const visibleGroupCount = computed(() =>
  peerStore.groupOrder.length - peerStore.hiddenGroups.length
)

function isGroupHidden(grpId) {
  return peerStore.hiddenGroups.includes(grpId)
}

function getGroup(grpId) {
  return peerStore.categoryGroups.find(g => g.id === grpId)
}
function getGroupIcon(grpId) {
  return getGroup(grpId)?.icon || '?'
}
function getGroupLabel(grpId) {
  return getGroup(grpId)?.label || grpId
}

function moveGroupUp(grpId) {
  peerStore.moveGroup(grpId, 'up')
}
function moveGroupDown(grpId) {
  peerStore.moveGroup(grpId, 'down')
}

function toggleGroupVis(grpId) {
  peerStore.toggleGroupVisibility(grpId)
}

// 重置
function handleReset() {
  peerStore.resetCategorySettings()
}

// 关闭
function handleClose() {
  peerStore.closeCategorySettings()
}

// ===== 拖拽：分类 =====
const dragFromId = ref(null)
const dragOverId = ref(null)

function onDragStart(catId) {
  dragFromId.value = catId
}
function onDragOver(catId) {
  if (dragFromId.value === null) return
  dragOverId.value = catId
}
function onDragLeave() {
  // 不清除 dragOverId，因为 dragleave 会频繁触发
}
function onDrop() {
  if (dragFromId.value && dragOverId.value && dragOverId.value !== dragFromId.value) {
    peerStore.reorderCategory(dragFromId.value, dragOverId.value)
  }
  dragFromId.value = null
  dragOverId.value = null
}

// ===== 拖拽：分栏 =====
const dragFromGroupId = ref(null)

function onGroupDragStart(grpIdx) {
  dragFromGroupId.value = peerStore.groupOrder[grpIdx]
}
function onGroupDragOver(grpId) {
  if (dragFromGroupId.value === null) return
  dragOverId.value = 'grp-' + grpId
}
function onGroupDrop() {
  if (dragFromGroupId.value) {
    // 从 dragOverId 提取真实 grpId
    const targetGrpId = dragOverId.value?.replace('grp-', '')
    if (targetGrpId && targetGrpId !== dragFromGroupId.value) {
      peerStore.reorderGroup(dragFromGroupId.value, targetGrpId)
    }
  }
  dragFromGroupId.value = null
  dragOverId.value = null
}

function onDragEnd() {
  dragFromId.value = null
  dragFromGroupId.value = null
  dragOverId.value = null
}
</script>
