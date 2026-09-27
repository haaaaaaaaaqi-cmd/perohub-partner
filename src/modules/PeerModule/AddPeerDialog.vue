<template>
  <!-- 添加/编辑对象弹窗 -->
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <!-- Toggle 切换（仅添加模式显示） -->
    <div v-if="!isEdit" class="flex gap-1 p-1 bg-muted rounded-md">
      <button
        class="flex-1 px-3 py-1.5 text-sm font-medium rounded-sm transition-all"
        :class="formMode === 'person' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground/80'"
        @click="switchMode('person')"
      >
        添加联系人
      </button>
      <button
        class="flex-1 px-3 py-1.5 text-sm font-medium rounded-sm transition-all"
        :class="formMode === 'organization' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground/80'"
        @click="switchMode('organization')"
      >
        添加组织
      </button>
    </div>

    <!-- ========== 表单 ========== -->
    <div class="flex-1 overflow-y-auto max-h-[60vh] -mx-1 px-1 space-y-3 py-1">
      <!-- 编辑模式时也显示当前类型 -->
      <div v-if="isEdit" class="flex gap-1 p-1 bg-muted rounded-md">
        <button
          class="flex-1 px-3 py-1.5 text-sm font-medium rounded-sm transition-all"
          :class="form.type === 'person' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'"
          @click="switchMode('person')"
        >
          联系人
        </button>
        <button
          class="flex-1 px-3 py-1.5 text-sm font-medium rounded-sm transition-all"
          :class="form.type === 'company' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'"
          @click="switchMode('organization')"
        >
          组织
        </button>
      </div>

      <!-- ===== 联系人表单 ===== -->
      <template v-if="form.type === 'person'">
        <!-- 名称 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">名称 <span class="text-destructive">*</span></label>
          <Input v-model="form.name" placeholder="请输入联系人名称" class="h-8" />
        </div>

        <!-- 别名 + 真实姓名 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">别名 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.alias" placeholder="昵称、艺名等" class="h-8" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">真实姓名 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.realName" placeholder="仅详情页可见" class="h-8" />
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
            <label class="text-xs font-medium text-muted-foreground">城市</label>
            <Input v-model="form.city" placeholder="如：上海" class="h-8" />
          </div>
        </div>

        <!-- 标签 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">标签 <span class="text-muted-foreground/60">(逗号分隔)</span></label>
          <Input v-model="form.tagsInput" placeholder="如：二次元, 角色设计, 原画" class="h-8" />
        </div>

        <!-- 简介 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">简介</label>
          <textarea
            v-model="form.desc"
            rows="2"
            placeholder="简要描述..."
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </template>

      <!-- ===== 组织表单 ===== -->
      <template v-else>
        <!-- 组织名称 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">组织名称 <span class="text-destructive">*</span></label>
          <Input v-model="form.name" placeholder="请输入组织全称" class="h-8" />
        </div>

        <!-- 简称 + 官网 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">简称 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.alias" placeholder="如：PeroHub" class="h-8" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">官网 <span class="text-muted-foreground/60">(选填)</span></label>
            <Input v-model="form.website" placeholder="https://" class="h-8" />
          </div>
        </div>

        <!-- 分类 + 城市 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">行业分类 <span class="text-destructive">*</span></label>
            <select
              v-model="form.category"
              class="flex h-8 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>请选择行业</option>
              <option v-for="cat in companyCategories" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.label }}
              </option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">总部城市</label>
            <Input v-model="form.city" placeholder="如：北京" class="h-8" />
          </div>
        </div>

        <!-- 标签 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">业务标签 <span class="text-muted-foreground/60">(逗号分隔)</span></label>
          <Input v-model="form.tagsInput" placeholder="如：游戏研发, 发行, IP授权" class="h-8" />
        </div>

        <!-- 公司简介 -->
        <div class="space-y-1">
          <label class="text-xs font-medium text-muted-foreground">公司简介</label>
          <textarea
            v-model="form.desc"
            rows="2"
            placeholder="主营业务、规模等..."
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          ></textarea>
        </div>
      </template>

      <Separator />

      <!-- 社交媒体（联系人=个人账号，组织=官方账号） -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {{ form.type === 'person' ? '社交媒体' : '官方社媒' }}
          </label>
          <button
            class="text-xs text-primary hover:text-primary/80 flex items-center gap-0.5"
            @click="addSocialMedia"
          >
            <Plus class="w-3 h-3" /> 添加
          </button>
        </div>
        <div v-if="form.socialMedia.length === 0" class="text-xs text-muted-foreground/60 italic">
          暂无社交媒体账号
        </div>
        <div class="space-y-2">
          <div
            v-for="(sm, idx) in form.socialMedia"
            :key="idx"
            class="flex items-center gap-2 p-2 rounded-md bg-muted/30"
          >
            <select
              v-model="sm.platform"
              class="flex h-7 w-24 rounded-md border border-input bg-transparent px-2 text-xs flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option v-for="p in socialPlatforms" :key="p.id" :value="p.id">
                {{ p.label }}
              </option>
            </select>
            <Input v-model="sm.handle" placeholder="主页链接" class="h-7 flex-1 text-xs" />
            <button
              class="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-accent transition-colors flex-shrink-0"
              @click="removeSocialMedia(idx)"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <Separator />

      <!-- 联系方式（联系人=个人联系，组织=商务联系） -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {{ form.type === 'person' ? '联系方式' : '商务联系' }}
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
            <Input v-model="c.value" placeholder="联系方式内容" class="h-7 flex-1 text-xs" />
            <button
              class="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-accent transition-colors flex-shrink-0"
              @click="removeContact(idx)"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- 组织专属：对接人 -->
      <template v-if="form.type === 'company'">
        <Separator />
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">对接人</label>
            <button
              class="text-xs text-primary hover:text-primary/80 flex items-center gap-0.5"
              @click="addHandler"
            >
              <Plus class="w-3 h-3" /> 添加
            </button>
          </div>
          <div v-if="form.handlers.length === 0" class="text-xs text-muted-foreground/60 italic">
            暂无对接人
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

      <Separator />

      <!-- 风险提示 -->
      <div class="space-y-1">
        <label class="text-xs font-medium text-muted-foreground">风险提示 <span class="text-muted-foreground/60">(选填)</span></label>
        <textarea
          v-model="form.risk"
          rows="2"
          placeholder="如有风险点请备注..."
          class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        ></textarea>
      </div>
    </div>

    <!-- 底部按钮 -->
    <DialogFooter>
      <a class="text-xs text-primary hover:text-primary/80 cursor-pointer mr-auto" @click="showTip('批量导入功能开发中')">
        批量导入
      </a>
      <Button variant="outline" size="sm" @click="handleClose">取消</Button>
      <Button size="sm" :disabled="!form.name.trim()" @click="handleSubmit">
        <Check class="w-3.5 h-3.5" />
        {{ isEdit ? '保存' : '添加' }}
      </Button>
    </DialogFooter>
  </Dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Check, Plus, X } from 'lucide-vue-next'
import { usePeerStore } from '@/store/peer'
import { useAppStore } from '@/store/app'
import Dialog from '@/components/ui/Dialog.vue'
import DialogFooter from '@/components/ui/DialogFooter.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Separator from '@/components/ui/Separator.vue'

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

// 表单模式（用于切换显示）
const formMode = ref('person')

// 分类列表 - 按类型筛选
const personCategories = computed(() => peerStore.categories.filter(c => c.group === 'person'))
const companyCategories = computed(() => peerStore.categories.filter(c => c.group === 'company'))

// 社交平台列表
const socialPlatforms = computed(() => peerStore.socialPlatforms)

// ========== 表单 ==========
const form = ref(getEmptyForm())

function getEmptyForm() {
  return {
    name: '',
    alias: '',
    realName: '',
    website: '',
    type: 'person',
    category: '',
    city: '',
    followers: 0,
    tagsInput: '',
    desc: '',
    risk: '',
    avatar: '',
    following: false,
    socialMedia: [],
    contacts: [
      { type: 'wechat', label: '微信', value: '' },
      { type: 'email', label: '邮箱', value: '' }
    ],
    handlers: []
  }
}

// 切换模式
function switchMode(mode) {
  formMode.value = mode
  form.value.type = mode === 'person' ? 'person' : 'company'
  // 切换时重置分类为空，需要用户手动选择
  form.value.category = ''
  // 组织模式时确保有 handlers 数组
  if (form.value.type === 'company' && !form.value.handlers) {
    form.value.handlers = []
  }
}

// 编辑模式时回填数据
watch(() => props.open, (val) => {
  if (val && props.editPeer) {
    const p = props.editPeer
    form.value = {
      name: p.name || '',
      alias: p.alias || '',
      realName: p.realName || '',
      website: p.website || '',
      type: p.type || 'person',
      category: p.category || 'artist',
      city: p.city || '',
      followers: p.followers || 0,
      tagsInput: (p.tags || []).join(', '),
      desc: p.desc || '',
      risk: p.risk || '',
      avatar: p.avatar || '',
      following: p.following || false,
      socialMedia: JSON.parse(JSON.stringify(p.socialMedia || [])),
      contacts: JSON.parse(JSON.stringify(p.contacts || [])),
      handlers: JSON.parse(JSON.stringify(p.handlers || []))
    }
    formMode.value = form.value.type === 'company' ? 'organization' : 'person'
  } else if (val) {
    form.value = getEmptyForm()
    formMode.value = 'person'
  }
})

// 社交媒体操作
function addSocialMedia() {
  form.value.socialMedia.push({
    platform: 'weibo',
    handle: '',
    url: '',
    followers: 0
  })
}

function removeSocialMedia(idx) {
  form.value.socialMedia.splice(idx, 1)
}

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
  form.value.handlers.splice(idx, 1)
}

// 关闭弹窗
function handleClose() {
  emit('update:open', false)
}

// 提交
function handleSubmit() {
  if (!form.value.name.trim()) {
    appStore.showToast('请输入名称', 'error')
    return
  }

  const tags = form.value.tagsInput
    .split(/[,，]/)
    .map(t => t.trim())
    .filter(Boolean)

  const data = {
    name: form.value.name.trim(),
    alias: form.value.alias.trim(),
    realName: form.value.type === 'person' ? form.value.realName.trim() : '',
    website: form.value.type === 'company' ? (form.value.website || '').trim() : '',
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
    handlers: form.value.type === 'company' ? (form.value.handlers || []).filter(h => h.name?.trim()) : []
  }

  if (isEdit.value && props.editPeer) {
    peerStore.updatePeer(props.editPeer.id, {
      name: data.name,
      alias: data.alias,
      realName: data.realName,
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
