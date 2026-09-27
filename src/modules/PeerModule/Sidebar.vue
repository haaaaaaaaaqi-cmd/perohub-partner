<template>
  <!-- 拍档侧边栏：分类列表 -->
  <div class="flex flex-col h-full bg-sidebar text-sidebar-foreground">
    <!-- 侧边栏头部 -->
    <div class="p-3 border-b border-sidebar-border">
      <div class="flex items-center gap-2 px-2 py-1.5">
        <div class="w-7 h-7 rounded-md bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
          拍
        </div>
        <span class="text-sm font-medium">拍档通讯录</span>
      </div>
    </div>

    <!-- 分类列表（分栏） -->
    <div class="flex-1 min-h-0 flex flex-col" @contextmenu.prevent="onBlankContextMenu">
      <ScrollArea class="flex-1 px-2">
        <div class="pb-2">
          <!-- 遍历分栏 -->
          <template v-for="(grp, grpIdx) in categoryGroups" :key="grp.id">
            <!-- 分栏标题 + 管理按钮 -->
            <div
              class="group/section px-2 py-2 flex items-center gap-1.5"
              @contextmenu.prevent.stop="onGroupContextMenu($event, grp.id)"
            >
              <span class="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider flex-1">{{ grp.label }}</span>
              <button
                class="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover/section:opacity-100"
                title="管理分类"
                @click="peerStore.openCategorySettings()"
              >
                <SlidersHorizontal class="w-3.5 h-3.5" />
              </button>
            </div>
            <!-- 该分栏下的分类（按自定义排序 + 显隐过滤） -->
            <div class="space-y-0.5">
              <div
                v-for="cat in getVisibleCategoriesByGroup(grp.id)"
                :key="cat.id"
                class="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded-md transition-colors text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                :class="{ 'bg-sidebar-accent text-sidebar-foreground font-medium': currentCategory === cat.id }"
                @click="selectCategory(cat.id)"
                @contextmenu.prevent.stop="onCatContextMenu($event, cat)"
              >
                <span class="text-base flex-shrink-0">{{ cat.icon }}</span>
                <span class="flex-1 truncate">{{ cat.label }}</span>
                <Badge variant="secondary" class="text-xs">{{ categoryCounts[cat.id] || 0 }}</Badge>
              </div>
              <!-- 该分栏全部隐藏时的提示 -->
              <div v-if="getVisibleCategoriesByGroup(grp.id).length === 0" class="px-2 py-1.5 text-xs text-muted-foreground/50 italic">
                无可见分类
              </div>
            </div>
            <!-- 分栏之间的分割线（最后一个不显示） -->
            <div v-if="grpIdx < categoryGroups.length - 1" class="my-2 border-t border-sidebar-border"></div>
          </template>
        </div>
      </ScrollArea>
    </div>

    <!-- 底部操作 -->
    <div class="border-t border-sidebar-border p-2 flex items-center justify-around">
      <Tooltip content="添加拍档">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="peerStore.openAddDialog()">
          <UserPlus class="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="导入">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="showTip('导入功能开发中')">
          <Upload class="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="设置">
        <Button variant="ghost" size="icon" class="h-8 w-8" @click="showTip('设置功能开发中')">
          <Settings class="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>

    <!-- 分类管理弹窗 -->
    <CategorySettingsDialog />

    <!-- 右键菜单 -->
    <ContextMenu ref="contextMenuRef">
      <!-- 分类条目上的菜单 -->
      <template v-if="contextCat">
        <div class="flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer rounded-sm hover:bg-accent transition-colors" @click="handleEditCategory">
          <Pencil class="w-3.5 h-3.5" />
          <span>编辑分类</span>
        </div>
        <div class="h-px bg-border my-1"></div>
        <div class="flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer rounded-sm hover:bg-accent transition-colors text-destructive" @click="handleDeleteCategory">
          <Trash2 class="w-3.5 h-3.5" />
          <span>删除分类</span>
        </div>
      </template>
      <!-- 空白区域菜单 -->
      <template v-else>
        <div class="flex items-center gap-2 px-2.5 py-1.5 text-xs cursor-pointer rounded-sm hover:bg-accent transition-colors" @click="handleCreateCategory">
          <Plus class="w-3.5 h-3.5" />
          <span>创建分类</span>
        </div>
      </template>
    </ContextMenu>

    <!-- 创建/编辑分类弹窗 -->
    <Dialog :open="showCatDialog" @update:open="showCatDialog = $event">
      <DialogHeader>
        <DialogTitle>{{ editingCat ? '编辑分类' : '创建分类' }}</DialogTitle>
      </DialogHeader>
      <div class="space-y-3 py-1">
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">名称 <span class="text-destructive">*</span></label>
          <Input v-model="catForm.label" placeholder="请输入分类名称" class="h-8" @keyup.enter="submitCatForm" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">图标</label>
            <Input v-model="catForm.icon" placeholder="如：🎨" class="h-8" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">分栏</label>
            <select
              v-model="catForm.group"
              :disabled="!!editingCat"
              class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option v-for="g in peerStore.categoryGroups" :key="g.id" :value="g.id">{{ g.label }}</option>
            </select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" size="sm" @click="showCatDialog = false">取消</Button>
        <Button size="sm" :disabled="!catForm.label.trim()" @click="submitCatForm">
          <Check class="w-3.5 h-3.5" />
          {{ editingCat ? '保存' : '创建' }}
        </Button>
      </DialogFooter>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { UserPlus, Upload, Settings, SlidersHorizontal, Plus, Pencil, Trash2, Check } from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { usePeerStore } from '@/store/peer'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import Badge from '@/components/ui/Badge.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import ContextMenu from '@/components/ui/ContextMenu.vue'
import Dialog from '@/components/ui/Dialog.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import CategorySettingsDialog from './CategorySettingsDialog.vue'

const appStore = useAppStore()
const peerStore = usePeerStore()

// 分栏列表（按自定义排序 + 显隐过滤）
const categoryGroups = computed(() => peerStore.visibleGroups)

// 当前分类
const currentCategory = computed(() => peerStore.currentCategory)

// 各分类数量
const categoryCounts = computed(() => peerStore.categoryCounts)

// 按分栏获取可见分类（已按自定义排序）
function getVisibleCategoriesByGroup(groupId) {
  return peerStore.visibleCategories.filter(c => c.group === groupId)
}

// 选择分类
function selectCategory(categoryId) {
  peerStore.setCategory(categoryId)
}

// 显示提示
function showTip(msg) {
  appStore.showToast(msg, 'info')
}

// ===== 右键菜单 =====
const contextMenuRef = ref(null)
const contextCat = ref(null)
// 右键时所在的分栏（用于创建分类时预填）
const pendingGroup = ref('person')

// 空白区域右键
function onBlankContextMenu(e) {
  contextCat.value = null
  pendingGroup.value = peerStore.categoryGroups[0]?.id || 'person'
  contextMenuRef.value?.open(e.clientX, e.clientY)
}

// 分栏标题右键：弹出创建分类菜单，并预填该分栏
function onGroupContextMenu(e, groupId) {
  contextCat.value = null
  pendingGroup.value = groupId
  contextMenuRef.value?.open(e.clientX, e.clientY)
}

// 分类条目右键
function onCatContextMenu(e, cat) {
  contextCat.value = cat
  contextMenuRef.value?.open(e.clientX, e.clientY)
}

// ===== 创建/编辑分类弹窗 =====
const showCatDialog = ref(false)
const editingCat = ref(null)
const catForm = reactive({
  label: '',
  icon: '📌',
  group: 'person'
})

// 创建分类
function handleCreateCategory() {
  editingCat.value = null
  catForm.label = ''
  catForm.icon = '📌'
  catForm.group = pendingGroup.value
  showCatDialog.value = true
}

// 编辑分类
function handleEditCategory() {
  if (!contextCat.value) return
  editingCat.value = contextCat.value
  catForm.label = contextCat.value.label
  catForm.icon = contextCat.value.icon
  catForm.group = contextCat.value.group
  showCatDialog.value = true
}

// 删除分类
function handleDeleteCategory() {
  if (!contextCat.value) return
  const cat = contextCat.value
  const count = peerStore.categoryCounts[cat.id] || 0
  if (confirm(`确定删除分类「${cat.label}」吗？${count > 0 ? `该分类下有 ${count} 个拍档将移至其他分类。` : ''}`)) {
    peerStore.deleteCategory(cat.id)
    appStore.showToast(`已删除分类「${cat.label}」`, 'success')
  }
}

// 提交分类表单
function submitCatForm() {
  if (!catForm.label.trim()) return
  if (editingCat.value) {
    peerStore.updateCategory(editingCat.value.id, {
      label: catForm.label.trim(),
      icon: catForm.icon || '📌',
      group: catForm.group
    })
    appStore.showToast('分类已更新', 'success')
  } else {
    peerStore.addCategory({
      label: catForm.label.trim(),
      icon: catForm.icon || '📌',
      group: catForm.group
    })
    appStore.showToast('分类已创建', 'success')
  }
  showCatDialog.value = false
}
</script>
