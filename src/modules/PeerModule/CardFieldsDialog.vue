<template>
  <Dialog :open="peerStore.showCardFieldsDialog" @update:open="peerStore.closeCardFieldsDialog()">
    <DialogHeader>
      <DialogTitle>卡片显示设置</DialogTitle>
      <DialogDescription>
        选择「{{ currentCategoryLabel }}」分类下卡片要显示的内容字段
      </DialogDescription>
    </DialogHeader>

    <div class="py-2">
      <!-- 操作栏 -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs text-muted-foreground">核心字段（头像、名称、收藏）始终显示</span>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm" @click="selectAll">全选</Button>
          <Button variant="ghost" size="sm" @click="resetToDefault">重置默认</Button>
        </div>
      </div>

      <!-- 字段列表 -->
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="field in peerStore.cardFieldConfig"
          :key="field.id"
          class="flex items-center gap-2.5 px-3 py-2 rounded-md border transition-colors text-left"
          :class="isSelected(field.id)
            ? 'border-primary bg-primary/5'
            : 'border-border hover:bg-accent/50'"
          @click="toggleField(field.id)"
        >
          <!-- 复选框 -->
          <div
            class="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
            :class="isSelected(field.id) ? 'bg-primary border-primary' : 'border-input'"
          >
            <Check v-if="isSelected(field.id)" class="w-3 h-3 text-primary-foreground" />
          </div>
          <!-- 图标 -->
          <component :is="getIcon(field.icon)" class="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <!-- 标签 -->
          <span class="text-sm">{{ field.label }}</span>
        </button>
      </div>
    </div>

    <DialogFooter>
      <Button variant="outline" size="sm" @click="peerStore.closeCardFieldsDialog()">取消</Button>
      <Button size="sm" @click="save">
        <Check class="w-3.5 h-3.5" />
        保存
      </Button>
    </DialogFooter>
  </Dialog>
</template>

<script setup>
import { ref, computed, markRaw, watch } from 'vue'
import {
  Check, AtSign, User, Folder, Tag, FileText, MapPin,
  Users, Star, UserCheck, Globe, Calendar
} from 'lucide-vue-next'
import { usePeerStore } from '@/store/peer'
import Dialog from '@/components/ui/Dialog.vue'
import DialogHeader from '@/components/ui/DialogHeader.vue'
import DialogTitle from '@/components/ui/DialogTitle.vue'
import DialogDescription from '@/components/ui/DialogDescription.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Button from '@/components/ui/Button.vue'

const peerStore = usePeerStore()

// 图标映射
const ICON_MAP = {
  AtSign: markRaw(AtSign),
  User: markRaw(User),
  Folder: markRaw(Folder),
  Tag: markRaw(Tag),
  FileText: markRaw(FileText),
  MapPin: markRaw(MapPin),
  Users: markRaw(Users),
  Star: markRaw(Star),
  UserCheck: markRaw(UserCheck),
  Globe: markRaw(Globe),
  Calendar: markRaw(Calendar)
}

function getIcon(name) {
  return ICON_MAP[name] || User
}

// 当前分类信息
const currentCategoryLabel = computed(() => {
  const cat = peerStore.getCategory(peerStore.currentCategory)
  return cat ? cat.label : ''
})

// 本地选中的字段（打开弹窗时从 store 拷贝）
const selectedFields = ref([])

function initFields() {
  selectedFields.value = [...peerStore.getCardFields(peerStore.currentCategory)]
}

// 打开弹窗时初始化字段
watch(() => peerStore.showCardFieldsDialog, (val) => {
  if (val) initFields()
})

function isSelected(fieldId) {
  return selectedFields.value.includes(fieldId)
}

function toggleField(fieldId) {
  const idx = selectedFields.value.indexOf(fieldId)
  if (idx === -1) {
    selectedFields.value.push(fieldId)
  } else {
    selectedFields.value.splice(idx, 1)
  }
}

function selectAll() {
  selectedFields.value = peerStore.cardFieldConfig.map(f => f.id)
}

function resetToDefault() {
  selectedFields.value = peerStore.cardFieldConfig.slice(0, 8).map(f => f.id)
}

function save() {
  peerStore.setCardFields(peerStore.currentCategory, [...selectedFields.value])
  peerStore.closeCardFieldsDialog()
}
</script>
