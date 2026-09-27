<template>
  <!-- 添加/编辑对象弹窗 -->
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <!-- 类型标识（由工具栏下拉选择决定 / 编辑时读取原类型） -->
    <div class="flex items-center gap-2 mb-1">
      <component :is="form.type === 'person' ? UserIcon : Building2" class="w-4 h-4 text-primary" />
      <span class="text-sm font-semibold">{{ form.type === 'person' ? '添加个人' : '添加组织' }}</span>
      <span class="text-xs text-muted-foreground">
        {{ form.type === 'person' ? '· 画师 / 音乐人 / KOL' : '· 友商 / 供应商 / 服务商 / 媒体' }}
      </span>
    </div>

    <!-- ========== 表单 ========== -->
    <div class="flex-1 overflow-y-auto max-h-[60vh] -mx-1 px-1 space-y-3 py-1">
      <!-- ===== 个人表单 ===== -->
      <template v-if="form.type === 'person'">
        <!-- 称谓（必填） -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">称谓 <span class="text-destructive">*</span></label>
          <Input v-model="form.name" placeholder="请输入联系人称谓" class="h-8" />
        </div>

        <!-- 别名 + 组织 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">别名 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.alias" placeholder="昵称、艺名等" class="h-8" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">所属组织 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.organization" placeholder="所属公司/团体" class="h-8" />
          </div>
        </div>

        <!-- 分类 + 城市 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">分类 <span class="text-destructive">*</span></label>
            <select
              v-model="form.category"
              class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>请选择分类</option>
              <option v-for="cat in personCategories" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.label }}
              </option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">城市 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.city" placeholder="如：上海" class="h-8" />
          </div>
        </div>

        <!-- 标签 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">标签 <span class="text-muted-foreground/60">(选填，逗号分隔)</span></label>
          <Input v-model="form.tagsInput" placeholder="如：二次元, 角色设计, 原画" class="h-8" />
        </div>

        <!-- 简介 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">简介 <span class="text-muted-foreground/60">(选填)</span></label>
          <textarea
            v-model="form.desc"
            rows="2"
            placeholder="简要描述..."
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>

        <!-- 联系方式（必填，至少一种，默认微信） -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              联系方式 <span class="text-destructive">*</span>
              <span class="text-[10px] font-normal normal-case text-muted-foreground/60 ml-1">至少填写一种</span>
            </label>
            <button
              class="text-xs text-primary hover:text-primary/80 flex items-center gap-0.5"
              @click="addContact"
            >
              <Plus class="w-3 h-3" /> 添加
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(c, idx) in form.contacts"
              :key="idx"
              class="flex items-center gap-2 p-2 rounded-md bg-muted/30"
            >
              <select
                v-model="c.type"
                class="flex h-7 w-20 rounded-md border border-input bg-transparent px-2 text-xs flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="wechat">微信</option>
                <option value="email">邮箱</option>
                <option value="phone">电话</option>
                <option value="other">其他</option>
              </select>
              <Input v-model="c.value" :placeholder="contactPlaceholder(c.type)" class="h-7 flex-1 text-xs" />
              <button
                class="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-accent transition-colors flex-shrink-0"
                @click="removeContact(idx)"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- 对接人（必填，默认为提交人） -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              对接人 <span class="text-destructive">*</span>
            </label>
            <button
              class="text-xs text-primary hover:text-primary/80 flex items-center gap-0.5"
              @click="addHandler"
            >
              <Plus class="w-3 h-3" /> 添加
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="(h, idx) in form.handlers"
              :key="idx"
              class="flex items-center gap-2 p-2 rounded-md bg-muted/30"
            >
              <Input v-model="h.name" placeholder="对接人姓名" class="h-7 flex-1 text-xs" />
              <Input v-model="h.role" placeholder="角色/职务" class="h-7 w-24 text-xs flex-shrink-0" />
              <button
                class="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-accent transition-colors flex-shrink-0"
                @click="removeHandler(idx)"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- ===== 组织表单 ===== -->
      <template v-else>
        <!-- 名称（必填） -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">名称 <span class="text-destructive">*</span></label>
          <Input v-model="form.name" placeholder="请输入组织全称" class="h-8" />
        </div>

        <!-- 分类 + 城市 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">分类 <span class="text-destructive">*</span></label>
            <select
              v-model="form.category"
              class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>请选择分类</option>
              <option v-for="cat in companyCategories" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.label }}
              </option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">城市 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.city" placeholder="如：北京" class="h-8" />
          </div>
        </div>

        <!-- 官网（必填） -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">官网 <span class="text-destructive">*</span></label>
          <Input v-model="form.website" placeholder="https://" class="h-8" />
        </div>

        <!-- 标签 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">标签 <span class="text-muted-foreground/60">(选填，逗号分隔)</span></label>
          <Input v-model="form.tagsInput" placeholder="如：游戏研发, 发行, IP授权" class="h-8" />
        </div>

        <!-- 简介 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">简介 <span class="text-muted-foreground/60">(选填)</span></label>
          <textarea
            v-model="form.desc"
            rows="2"
            placeholder="主营业务、规模等..."
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </template>
    </div>

    <!-- 底部按钮 -->
    <DialogFooter>
      <a class="text-xs text-primary hover:text-primary/80 cursor-pointer mr-auto" @click="showTip('批量导入功能开发中')">
        批量导入
      </a>
      <Button variant="outline" size="sm" @click="handleClose">取消</Button>
      <Button size="sm" :disabled="!canSubmit" @click="handleSubmit">
        <Check class="w-3.5 h-3.5" />
        {{ isEdit ? '保存' : '添加' }}
      </Button>
    </DialogFooter>
  </Dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Check, Plus, X, User as UserIcon, Building2 } from 'lucide-vue-next'
import { usePeerStore } from '@/store/peer'
import { useAppStore } from '@/store/app'
import Dialog from '@/components/ui/Dialog.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  editPeer: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:open', 'success'])

const peerStore = usePeerStore()
const appStore = useAppStore()

// 是否编辑模式
const isEdit = computed(() => !!props.editPeer)

// 分类列表 - 按类型筛选
const personCategories = computed(() => peerStore.categories.filter(c => c.group === 'person'))
const companyCategories = computed(() => peerStore.categories.filter(c => c.group === 'company'))

// ========== 表单 ==========
const form = ref(getEmptyForm('person'))

function getEmptyForm(type) {
  const t = type === 'company' ? 'company' : 'person'
  return {
    name: '',
    alias: '',
    realName: '',
    organization: '',
    website: '',
    type: t,
    category: '',
    city: '',
    followers: 0,
    tagsInput: '',
    desc: '',
    risk: '',
    avatar: '',
    following: false,
    socialMedia: [],
    contacts: t === 'person'
      ? [{ type: 'wechat', label: '微信', value: '' }]
      : [],
    handlers: t === 'person'
      ? [{ name: '我', role: '提交人' }]
      : []
  }
}

// 联系方式占位文案
function contactPlaceholder(type) {
  const map = { wechat: '微信号', email: '邮箱地址', phone: '手机号码', other: '联系方式' }
  return map[type] || '联系方式'
}

// 表单校验：是否可提交
const canSubmit = computed(() => {
  const f = form.value
  if (!f.name.trim()) return false
  if (!f.category) return false
  // 组织：官网必填
  if (f.type === 'company' && !f.website.trim()) return false
  // 个人：联系方式至少一种
  if (f.type === 'person' && !f.contacts.some(c => c.value?.trim())) return false
  // 个人：对接人至少一个
  if (f.type === 'person' && !f.handlers.some(h => h.name?.trim())) return false
  return true
})

// 弹窗打开时：回填编辑数据 / 初始化新增表单（类型由工具栏下拉决定）
watch(() => props.open, (val) => {
  if (val && props.editPeer) {
    const p = props.editPeer
    form.value = {
      name: p.name || '',
      alias: p.alias || '',
      realName: p.realName || '',
      organization: p.organization || '',
      website: p.website || '',
      type: p.type || 'person',
      category: p.category || '',
      city: p.city || '',
      followers: p.followers || 0,
      tagsInput: (p.tags || []).join(', '),
      desc: p.desc || '',
      risk: p.risk || '',
      avatar: p.avatar || '',
      following: p.following || false,
      socialMedia: JSON.parse(JSON.stringify(p.socialMedia || [])),
      contacts: (p.contacts && p.contacts.length)
        ? JSON.parse(JSON.stringify(p.contacts))
        : [{ type: 'wechat', label: '微信', value: '' }],
      handlers: (p.handlers && p.handlers.length)
        ? JSON.parse(JSON.stringify(p.handlers))
        : [{ name: '我', role: '提交人' }]
    }
  } else if (val) {
    // 新增模式：使用工具栏下拉选择的类型
    form.value = getEmptyForm(peerStore.addDialogType)
  }
})

// 联系方式操作
function addContact() {
  form.value.contacts.push({
    type: 'other',
    label: '其他',
    value: ''
  })
}

function removeContact(idx) {
  if (form.value.contacts.length <= 1) return
  form.value.contacts.splice(idx, 1)
}

// 对接人操作
function addHandler() {
  if (!form.value.handlers) form.value.handlers = []
  form.value.handlers.push({ name: '', role: '' })
}

function removeHandler(idx) {
  if (form.value.handlers.length <= 1) return
  form.value.handlers.splice(idx, 1)
}

// 关闭弹窗
function handleClose() {
  emit('update:open', false)
}

// 提交
function handleSubmit() {
  if (!canSubmit.value) {
    const f = form.value
    if (!f.name.trim()) {
      appStore.showToast(f.type === 'person' ? '请输入称谓' : '请输入名称', 'error')
    } else if (!f.category) {
      appStore.showToast('请选择分类', 'error')
    } else if (f.type === 'company' && !f.website.trim()) {
      appStore.showToast('请输入官网', 'error')
    } else if (f.type === 'person' && !f.contacts.some(c => c.value?.trim())) {
      appStore.showToast('请至少填写一种联系方式', 'error')
    } else if (f.type === 'person' && !f.handlers.some(h => h.name?.trim())) {
      appStore.showToast('请至少填写一个对接人', 'error')
    }
    return
  }

  const tags = form.value.tagsInput
    .split(/[,，]/)
    .map(t => t.trim())
    .filter(Boolean)

  const data = {
    name: form.value.name.trim(),
    alias: form.value.alias.trim(),
    realName: form.value.realName.trim(),
    organization: form.value.type === 'person' ? form.value.organization.trim() : '',
    website: form.value.website.trim(),
    type: form.value.type,
    category: form.value.category,
    city: form.value.city.trim(),
    followers: Number(form.value.followers) || 0,
    tags,
    desc: form.value.desc.trim(),
    risk: form.value.risk.trim(),
    avatar: form.value.avatar.trim(),
    following: form.value.following,
    socialMedia: form.value.socialMedia.filter(sm => sm.handle?.trim()),
    contacts: form.value.contacts.filter(c => c.value?.trim()),
    handlers: form.value.handlers.filter(h => h.name?.trim())
  }

  if (isEdit.value && props.editPeer) {
    peerStore.updatePeer(props.editPeer.id, {
      name: data.name,
      alias: data.alias,
      realName: data.realName,
      organization: data.organization,
      website: data.website,
      type: data.type,
      category: data.category,
      city: data.city,
      followers: data.followers,
      tags: data.tags,
      desc: data.desc,
      risk: data.risk,
      avatar: data.avatar || props.editPeer.avatar,
      following: data.following,
      socialMedia: data.socialMedia,
      contacts: data.contacts,
      handlers: data.handlers
    })
    appStore.showToast('对象信息已更新', 'success')
  } else {
    const newPeer = peerStore.addPeer(data)
    appStore.showToast('已添加：' + newPeer.name, 'success')
    peerStore.selectPeer(newPeer.id)
  }

  emit('success')
  handleClose()
}

// 提示
function showTip(msg) {
  appStore.showToast(msg, 'info')
}
</script>
