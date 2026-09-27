<template>
  <!-- 拍档详情面板 -->
  <div class="flex flex-col h-full bg-background">
    <!-- 头部 -->
    <div class="h-12 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
      <h3 class="text-sm font-semibold">详情</h3>
      <div class="flex items-center gap-1">
        <!-- 编辑按钮 -->
        <button
          v-if="selectedPeer"
          class="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="编辑"
          @click="handleEdit"
        >
          <Pencil class="w-3.5 h-3.5" />
        </button>
        <!-- 详情面板字段显隐设置 -->
        <DropdownMenu v-if="selectedPeer" align="end" :side-offset="6">
          <template #trigger>
            <button
              class="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="详情面板显示设置"
            >
              <Settings class="w-3.5 h-3.5" />
            </button>
          </template>
          <DropdownMenuLabel>详情面板显示内容</DropdownMenuLabel>
          <DropdownMenuItem
            v-for="field in availableDetailFields"
            :key="field.id"
            @select="toggleDetailField(field.id)"
          >
            <span class="flex-1">{{ field.label }}</span>
            <Check v-if="showDetailField(field.id)" class="w-4 h-4 text-primary" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @select="resetDetailFields">
            <RotateCcw class="w-4 h-4" />
            <span class="flex-1">恢复默认</span>
          </DropdownMenuItem>
        </DropdownMenu>
        <!-- 关闭按钮 -->
        <button
          class="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          @click="closeDetailPanel"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 内容区 -->
    <ScrollArea class="flex-1 min-h-0">
      <template v-if="selectedPeer">
        <!-- 头像与基本信息 -->
        <div class="px-4 py-5 border-b border-border text-center">
          <img
            :src="selectedPeer.avatar"
            :alt="selectedPeer.name"
            class="w-20 h-20 rounded-full mx-auto mb-3 object-cover ring-4 ring-primary/10"
            @error="onAvatarError"
          />
          <div class="flex items-center justify-center gap-2 mb-1">
            <h2 class="text-lg font-semibold text-foreground">{{ selectedPeer.name }}</h2>
            <button
              class="p-1 rounded-full transition-colors"
              :class="selectedPeer.following ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'"
              @click="toggleFollow"
            >
              <Star class="w-4 h-4" :class="{ 'fill-current': selectedPeer.following }" />
            </button>
          </div>
          <!-- 别名 -->
          <p v-if="selectedPeer.alias" class="text-sm text-muted-foreground mb-2">{{ selectedPeer.alias }}</p>
          <!-- 类型 + 分类 + 城市 -->
          <div class="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" class="text-xs">
              {{ getTypeIcon(selectedPeer.type) }} {{ getTypeLabel(selectedPeer.type) }}
            </Badge>
            <Badge variant="secondary" class="text-xs">
              {{ getCategoryIcon(selectedPeer.category) }} {{ getCategoryLabel(selectedPeer.category) }}
            </Badge>
            <span v-if="selectedPeer.city" class="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin class="w-3 h-3" />
              {{ selectedPeer.city }}
            </span>
          </div>
        </div>

        <!-- 评分 + 粉丝 统计卡片 -->
        <div
          v-if="showDetailField('ratingScore') || showDetailField('followers')"
          class="px-4 py-3 border-b border-border grid gap-3"
          :class="(showDetailField('ratingScore') && showDetailField('followers')) ? 'grid-cols-2' : 'grid-cols-1'"
        >
          <div v-if="showDetailField('ratingScore')" class="text-center">
            <div class="flex items-center justify-center gap-1 mb-0.5">
              <Star class="w-4 h-4 text-amber-500 fill-amber-500" />
              <span class="text-xl font-bold text-foreground tabular-nums">{{ ratingScore }}</span>
            </div>
            <div class="text-xs text-muted-foreground">{{ selectedPeer.rating?.count || 0 }} 人评分</div>
          </div>
          <div
            v-if="showDetailField('followers')"
            class="text-center"
            :class="showDetailField('ratingScore') ? 'border-l border-border' : ''"
          >
            <div class="text-xl font-bold text-foreground tabular-nums mb-0.5">{{ formatFollowers(selectedPeer.followers) }}</div>
            <div class="text-xs text-muted-foreground">粉丝总数</div>
          </div>
        </div>

        <!-- 评分区（五星评星） -->
        <div v-if="showDetailField('ratingStars')" class="px-4 py-3 border-b border-border">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">我的评分</h4>
          </div>
          <div class="flex items-center gap-1">
            <button
              v-for="n in 5"
              :key="n"
              class="p-0.5 transition-transform hover:scale-110"
              @click="ratePeer(n)"
            >
              <Star
                class="w-5 h-5 transition-colors"
                :class="n <= myRating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'"
              />
            </button>
            <span v-if="myRating > 0" class="ml-2 text-xs text-muted-foreground">{{ myRating }} 星</span>
          </div>
        </div>

        <!-- 真实姓名（详情页专属） -->
        <div v-if="selectedPeer.realName" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">真实姓名</h4>
          <p class="text-sm text-foreground">{{ selectedPeer.realName }}</p>
        </div>

        <!-- 简介 -->
        <div v-if="selectedPeer.desc" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">简介</h4>
          <p class="text-sm text-foreground leading-relaxed">{{ selectedPeer.desc }}</p>
        </div>

        <!-- 标签 -->
        <div v-if="selectedPeer.tags?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">标签</h4>
          <div class="flex flex-wrap gap-1.5">
            <Badge v-for="tag in selectedPeer.tags" :key="tag" variant="secondary" class="text-xs">
              {{ tag }}
            </Badge>
          </div>
        </div>

        <!-- 社交媒体 -->
        <div v-if="showDetailField('socialMedia') && selectedPeer.socialMedia?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">社交媒体</h4>
          <div class="space-y-2">
            <div
              v-for="sm in selectedPeer.socialMedia"
              :key="sm.platform"
              class="flex items-center gap-2 p-2 rounded-md hover:bg-accent/30 transition-colors"
            >
              <span class="text-lg flex-shrink-0">{{ getSocialIcon(sm.platform) }}</span>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-foreground truncate">{{ sm.handle }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ getSocialLabel(sm.platform) }}
                </div>
              </div>
              <div class="text-xs text-muted-foreground tabular-nums flex-shrink-0">
                {{ formatFollowers(sm.followers) }}
              </div>
            </div>
          </div>
        </div>

        <!-- 作品案例 -->
        <div v-if="showDetailField('works') && selectedPeer.works?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            作品案例 <span class="text-[10px] font-normal normal-case">(传播 TOP{{ selectedPeer.works.length }})</span>
          </h4>
          <div class="space-y-2">
            <div
              v-for="(work, idx) in selectedPeer.works"
              :key="idx"
              class="p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <span class="text-sm font-medium text-foreground line-clamp-1">{{ work.title }}</span>
                <Badge variant="outline" class="text-[10px] flex-shrink-0">{{ work.type }}</Badge>
              </div>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span>{{ work.date }}</span>
                <span class="tabular-nums">{{ formatViews(work.views) }} 浏览</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 合作案例 -->
        <div v-if="showDetailField('cooperations') && selectedPeer.cooperations?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">合作案例</h4>
          <div class="space-y-2">
            <div
              v-for="(coop, idx) in selectedPeer.cooperations"
              :key="idx"
              class="p-2 rounded-md border border-border/60 hover:border-primary/30 transition-colors"
            >
              <div class="text-sm font-medium text-foreground mb-0.5">{{ coop.project }}</div>
              <div class="flex items-center justify-between text-xs text-muted-foreground">
                <span>{{ coop.role }}</span>
                <span>{{ coop.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 联系方式 -->
        <div v-if="selectedPeer.contacts?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">联系方式</h4>
          <div class="space-y-2">
            <div
              v-for="(c, idx) in selectedPeer.contacts"
              :key="idx"
              class="flex items-center gap-2 p-2 rounded-md hover:bg-accent/30 transition-colors"
            >
              <component :is="getContactIcon(c.type)" class="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="text-xs text-muted-foreground">{{ c.label }}</div>
                <div class="text-sm font-medium text-foreground truncate">{{ c.value }}</div>
              </div>
              <button
                class="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex-shrink-0"
                @click="copyContact(c.value)"
              >
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- 对接人 -->
        <div v-if="showDetailField('handlers') && selectedPeer.handlers?.length" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">对接人</h4>
          <div class="space-y-1.5">
            <div
              v-for="(h, idx) in selectedPeer.handlers"
              :key="idx"
              class="flex items-center justify-between text-sm"
            >
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                  {{ h.name.charAt(0) }}
                </div>
                <span class="text-foreground">{{ h.name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Badge variant="secondary" class="text-[10px]">{{ h.role }}</Badge>
                <span class="text-xs text-muted-foreground">{{ h.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 风险提示 -->
        <div v-if="showDetailField('risk') && selectedPeer.risk" class="px-4 py-3 border-b border-border">
          <h4 class="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle class="w-3.5 h-3.5" />
            风险提示
          </h4>
          <div class="p-2.5 rounded-md bg-amber-500/10 border border-amber-500/20">
            <p class="text-sm text-amber-700 dark:text-amber-500">{{ selectedPeer.risk }}</p>
          </div>
        </div>

        <!-- 入驻信息 -->
        <div class="px-4 py-3">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>入驻时间</span>
            <span class="tabular-nums">{{ selectedPeer.createdAt }}</span>
          </div>
        </div>
      </template>

      <!-- 空状态 -->
      <template v-else>
        <div class="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div class="text-5xl mb-3 opacity-50">👤</div>
          <div class="text-sm mb-1">未选中拍档</div>
          <div class="text-xs opacity-70">点击左侧列表查看详情</div>
        </div>
      </template>
    </ScrollArea>
  </div>
</template>

<script setup>
import { computed, ref, watch, markRaw } from 'vue'
import {
  Star, X, Pencil, MapPin, Copy, AlertTriangle,
  MessageCircle, Mail, Phone, Globe, Settings, Check, RotateCcw
} from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { usePeerStore } from '@/store/peer'
import { getAvatarDataUri } from '@/lib/utils'
import Badge from '@/components/ui/Badge.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import DropdownMenuLabel from '@/components/ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/DropdownMenuSeparator.vue'

const appStore = useAppStore()
const peerStore = usePeerStore()

// 头像加载失败时回退到本地生成的 SVG 头像
function onAvatarError(e) {
  if (selectedPeer.value) {
    e.target.src = getAvatarDataUri(selectedPeer.value.name, selectedPeer.value.id)
  }
}

// 选中的拍档
const selectedPeer = computed(() => peerStore.selectedPeer)

// 我的评分（本地记录，简化为单次评分）
const myRating = ref(0)

// 切换选中时重置评分
watch(() => selectedPeer.value?.id, () => {
  myRating.value = 0
})

// 评分（豆瓣式：总星数/评分数*2，满分10）
const ratingScore = computed(() => {
  const r = selectedPeer.value?.rating
  if (!r || !r.count) return '0.0'
  return ((r.total / r.count) * 2).toFixed(1)
})

// 关闭详情面板
function closeDetailPanel() {
  appStore.setDetailPanelOpen(false)
}

// 切换收藏
function toggleFollow() {
  if (!selectedPeer.value) return
  peerStore.toggleFollowing(selectedPeer.value.id)
  appStore.showToast(selectedPeer.value.following ? '已收藏' : '已取消收藏', 'success')
}

// 提交评分
function ratePeer(stars) {
  if (!selectedPeer.value) return
  // 如果已经评过分则提示不能重复评
  if (myRating.value > 0) {
    appStore.showToast('您已评过分了', 'error')
    return
  }
  myRating.value = stars
  peerStore.ratePeer(selectedPeer.value.id, stars)
  appStore.showToast(`已提交 ${stars} 星评分`, 'success')
}

// 编辑
function handleEdit() {
  if (!selectedPeer.value) return
  peerStore.openEditDialog(selectedPeer.value.id)
}

// ===== 详情面板字段显隐 =====

// 当前分类的详情面板显示字段
const detailFields = computed(() => peerStore.currentDetailFields())

// 当前拍档类型下可选的详情字段
const availableDetailFields = computed(() => {
  const type = selectedPeer.value?.type
  // DETAIL_FIELDS 定义在 store 中，这里通过 peerStore 类型信息过滤
  const all = [
    { id: 'socialMedia', label: '社媒', types: ['person', 'company'] },
    { id: 'followers', label: '粉丝', types: ['person', 'company'] },
    { id: 'works', label: '作品案例', types: ['person', 'company'] },
    { id: 'cooperations', label: '合作案例', types: ['person', 'company'] },
    { id: 'ratingStars', label: '评星', types: ['person', 'company'] },
    { id: 'ratingScore', label: '评分', types: ['person', 'company'] },
    { id: 'risk', label: '风险', types: ['person', 'company'] },
    { id: 'handlers', label: '联络人', types: ['company'] }
  ]
  return all.filter(f => !type || f.types.includes(type))
})

// 判断某详情字段是否显示
function showDetailField(fieldId) {
  return detailFields.value.includes(fieldId)
}

// 切换某详情字段显隐
function toggleDetailField(fieldId) {
  const catId = peerStore.currentCategory
  const current = [...peerStore.getCategoryDetailFields(catId)]
  const idx = current.indexOf(fieldId)
  if (idx === -1) {
    current.push(fieldId)
  } else {
    current.splice(idx, 1)
  }
  peerStore.updateCategoryDetailFields(catId, current)
}

// 恢复默认（显示全部可选字段）
function resetDetailFields() {
  peerStore.updateCategoryDetailFields(peerStore.currentCategory, availableDetailFields.value.map(f => f.id))
  appStore.showToast('已恢复默认显示', 'success')
}

// 复制联系方式
function copyContact(value) {
  navigator.clipboard?.writeText(value)
  appStore.showToast('已复制到剪贴板', 'success')
}

// 获取类型标签
function getTypeLabel(typeId) {
  const type = peerStore.types.find(t => t.id === typeId)
  return type ? type.label : ''
}
function getTypeIcon(typeId) {
  const type = peerStore.types.find(t => t.id === typeId)
  return type ? type.icon : ''
}

// 获取分类标签
function getCategoryLabel(catId) {
  const cat = peerStore.categories.find(c => c.id === catId)
  return cat ? cat.label : ''
}
function getCategoryIcon(catId) {
  const cat = peerStore.categories.find(c => c.id === catId)
  return cat ? cat.icon : ''
}

// 获取社交平台
function getSocialLabel(pid) {
  const p = peerStore.socialPlatforms.find(x => x.id === pid)
  return p ? p.label : pid
}
function getSocialIcon(pid) {
  const p = peerStore.socialPlatforms.find(x => x.id === pid)
  return p ? p.icon : '🔗'
}

// 联系方式图标
function getContactIcon(type) {
  const icons = {
    wechat: markRaw(MessageCircle),
    email: markRaw(Mail),
    phone: markRaw(Phone),
    other: markRaw(Globe)
  }
  return icons[type] || markRaw(Globe)
}

// 格式化粉丝数
function formatFollowers(num) {
  if (!num) return '0'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

// 格式化浏览量
function formatViews(num) {
  if (!num) return '0'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}
</script>
