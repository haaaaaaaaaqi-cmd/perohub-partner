<template>
  <!-- 拍档内容区 -->
  <div class="w-full h-full overflow-hidden">
    <!-- ========== 列表视图 ========== -->
    <template v-if="viewMode === 'list'">
      <div class="h-full flex flex-col">
        <!-- 表头 -->
        <div class="flex items-center gap-2 px-4 h-9 flex-shrink-0 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">
          <div class="w-[36px] flex-shrink-0 text-center">
            <button class="hover:text-foreground transition-colors" @click="toggleFollowAll">
              <Star class="w-3.5 h-3.5 mx-auto" />
            </button>
          </div>
          <div class="w-[200px] flex-shrink-0 truncate">名称</div>
          <div class="w-[72px] flex-shrink-0 truncate">类型</div>
          <div class="w-[90px] flex-shrink-0 truncate">分类</div>
          <div class="w-[72px] flex-shrink-0 truncate">城市</div>
          <div class="w-[72px] flex-shrink-0 text-right">粉丝</div>
          <div class="w-[80px] flex-shrink-0 text-right">评分</div>
          <div class="flex-1 min-w-0 truncate">标签</div>
          <div class="w-[80px] flex-shrink-0 text-right pr-1">入驻</div>
        </div>

        <!-- 列表内容 -->
        <ScrollArea class="flex-1 min-h-0">
          <div class="divide-y divide-border">
            <div
              v-for="peer in peers"
              :key="peer.id"
              class="flex items-center gap-2 px-4 h-14 cursor-pointer transition-colors hover:bg-accent/50"
              :class="{ 'bg-primary/5': selectedPeerId === peer.id }"
              @click="selectPeer(peer)"
            >
              <!-- 收藏 -->
              <div class="w-[36px] flex-shrink-0 text-center">
                <button
                  class="p-1 rounded transition-colors inline-flex"
                  :class="peer.following ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'"
                  @click.stop="toggleFollow(peer.id)"
                >
                  <Star class="w-3.5 h-3.5" :class="{ 'fill-current': peer.following }" />
                </button>
              </div>

              <!-- 名称 + 头像 -->
              <div class="w-[200px] flex-shrink-0 flex items-center gap-2 min-w-0">
                <img :src="peer.avatar" :alt="peer.name" class="w-7 h-7 rounded-full object-cover flex-shrink-0" @error="onAvatarError($event, peer)" />
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-medium text-foreground truncate">{{ peer.name }}</span>
                  <span v-if="peer.alias" class="text-[11px] text-muted-foreground truncate">{{ peer.alias }}</span>
                </div>
              </div>

              <!-- 类型 -->
              <div class="w-[72px] flex-shrink-0">
                <Badge variant="outline" class="text-[11px]">
                  {{ getTypeIcon(peer.type) }} {{ getTypeLabel(peer.type) }}
                </Badge>
              </div>

              <!-- 分类 -->
              <div class="w-[90px] flex-shrink-0 text-sm text-muted-foreground truncate">
                {{ getCategoryLabel(peer.category) }}
              </div>

              <!-- 城市 -->
              <div class="w-[72px] flex-shrink-0 text-sm text-muted-foreground flex items-center gap-1 truncate">
                <MapPin class="w-3 h-3 flex-shrink-0" />
                <span class="truncate">{{ peer.city || '-' }}</span>
              </div>

              <!-- 粉丝 -->
              <div class="w-[72px] flex-shrink-0 text-sm text-muted-foreground text-right tabular-nums">
                {{ formatFollowers(peer.followers) }}
              </div>

              <!-- 评分 -->
              <div class="w-[80px] flex-shrink-0 text-sm text-right flex items-center justify-end gap-1">
                <Star class="w-3 h-3 text-amber-500 fill-amber-500" />
                <span class="tabular-nums font-medium">{{ getRatingScore(peer.rating) }}</span>
              </div>

              <!-- 标签 -->
              <div class="flex-1 min-w-0 flex items-center gap-1 overflow-hidden">
                <Badge
                  v-for="tag in peer.tags?.slice(0, 3)"
                  :key="tag"
                  variant="secondary"
                  class="text-[10px] flex-shrink-0"
                >
                  {{ tag }}
                </Badge>
                <span v-if="peer.tags?.length > 3" class="text-[10px] text-muted-foreground">+{{ peer.tags.length - 3 }}</span>
              </div>

              <!-- 入驻时间 -->
              <div class="w-[80px] flex-shrink-0 text-xs text-muted-foreground text-right pr-1 tabular-nums">
                {{ peer.createdAt }}
              </div>
            </div>

            <!-- 空状态 -->
            <div v-if="peers.length === 0" class="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <div class="text-5xl mb-3 opacity-50">👥</div>
              <div class="text-sm mb-1">暂无拍档</div>
              <button class="text-xs text-primary hover:text-primary/80 transition-colors" @click="peerStore.openAddDialog()">
                点击添加第一位拍档
              </button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </template>

    <!-- ========== 卡片视图 ========== -->
    <template v-else>
      <ScrollArea class="h-full">
        <div class="p-4 grid gap-4" :class="gridClass">
          <div
            v-for="peer in peers"
            :key="peer.id"
            class="bg-background border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all"
            :class="{ 'ring-2 ring-primary': selectedPeerId === peer.id }"
            @click="selectPeer(peer)"
          >
            <!-- 头部：头像 + 名称 + 收藏按钮 -->
            <div class="flex items-start gap-3 mb-3">
              <img
                :src="peer.avatar"
                :alt="peer.name"
                class="w-12 h-12 rounded-full object-cover flex-shrink-0"
                @error="onAvatarError($event, peer)"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-semibold text-foreground truncate">{{ peer.name }}</span>
                  <Star
                    v-if="peer.following"
                    class="w-3.5 h-3.5 text-amber-500 flex-shrink-0 fill-amber-500"
                  />
                </div>
                <!-- 别名 -->
                <span v-if="showField('alias') && peer.alias" class="text-[11px] text-muted-foreground truncate block">
                  {{ peer.alias }}
                </span>
                <!-- 类型 + 分类 -->
                <div v-if="showField('type') || showField('category')" class="flex items-center gap-1.5 mt-0.5">
                  <Badge v-if="showField('type')" variant="outline" class="text-[10px]">
                    {{ getTypeIcon(peer.type) }} {{ getTypeLabel(peer.type) }}
                  </Badge>
                  <span v-if="showField('category')" class="text-xs text-muted-foreground truncate">
                    {{ getCategoryLabel(peer.category) }}
                  </span>
                </div>
              </div>
              <button
                class="p-1 rounded-md hover:bg-accent transition-colors flex-shrink-0"
                :class="peer.following ? 'text-amber-500' : 'text-muted-foreground'"
                @click.stop="toggleFollow(peer.id)"
              >
                <Star class="w-4 h-4" :class="{ 'fill-current': peer.following }" />
              </button>
            </div>

            <!-- 真实姓名 -->
            <div v-if="showField('realName') && peer.realName" class="text-xs text-muted-foreground mb-2">
              <span class="text-muted-foreground/60">真实姓名：</span>{{ peer.realName }}
            </div>

            <!-- 网站 -->
            <div v-if="showField('website') && peer.website" class="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Globe class="w-3 h-3 flex-shrink-0" />
              <span class="truncate">{{ peer.website }}</span>
            </div>

            <!-- 标签 -->
            <div v-if="showField('tags') && peer.tags?.length" class="flex flex-wrap gap-1 mb-3">
              <Badge
                v-for="tag in peer.tags.slice(0, 3)"
                :key="tag"
                variant="secondary"
                class="text-[10px]"
              >
                {{ tag }}
              </Badge>
            </div>

            <!-- 描述 -->
            <p v-if="showField('desc') && peer.desc" class="text-xs text-muted-foreground line-clamp-2 mb-3">{{ peer.desc }}</p>

            <!-- 底部信息 -->
            <div
              v-if="hasFooterFields"
              class="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border"
            >
              <div v-if="showField('city')" class="flex items-center gap-1">
                <MapPin class="w-3 h-3" />
                <span>{{ peer.city || '-' }}</span>
              </div>
              <div v-if="showField('followers')" class="flex items-center gap-1">
                <Users class="w-3 h-3" />
                <span>{{ formatFollowers(peer.followers) }}</span>
              </div>
              <div v-if="showField('rating')" class="flex items-center gap-1">
                <Star class="w-3 h-3 text-amber-500 fill-amber-500" />
                <span class="tabular-nums font-medium text-foreground/80">{{ getRatingScore(peer.rating) }}</span>
              </div>
              <div v-if="showField('createdAt')" class="flex items-center gap-1">
                <Calendar class="w-3 h-3" />
                <span class="tabular-nums">{{ peer.createdAt }}</span>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="peers.length === 0" class="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div class="text-5xl mb-3 opacity-50">👥</div>
            <div class="text-sm mb-1">暂无拍档</div>
            <button class="text-xs text-primary hover:text-primary/80 transition-colors" @click="peerStore.openAddDialog()">
              点击添加第一位拍档
            </button>
          </div>
        </div>
      </ScrollArea>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Star, MapPin, Users, Globe, Calendar } from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { usePeerStore } from '@/store/peer'
import { getAvatarDataUri } from '@/lib/utils'
import Badge from '@/components/ui/Badge.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'

const appStore = useAppStore()
const peerStore = usePeerStore()

// 头像加载失败时回退到本地生成的 SVG 头像
function onAvatarError(e, peer) {
  if (peer) {
    e.target.src = getAvatarDataUri(peer.name, peer.id)
  }
}

// 当前分类的卡片显示字段
const cardFields = computed(() => peerStore.currentCardFields)

// 判断某字段是否显示
function showField(fieldId) {
  return cardFields.value.includes(fieldId)
}

// 底部信息栏是否有显示字段
const hasFooterFields = computed(() =>
  ['city', 'followers', 'rating', 'createdAt'].some(f => showField(f))
)

// 拍档列表
const peers = computed(() => peerStore.currentPeers)

// 选中的拍档ID
const selectedPeerId = computed(() => peerStore.selectedPeerId)

// 视图模式
const viewMode = computed(() => peerStore.viewMode)

// 网格类
const gridClass = 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]'

// 选中拍档
function selectPeer(peer) {
  // 再次点击当前选中的对象时关闭详情页
  if (peerStore.selectedPeerId === peer.id && appStore.detailPanelOpen) {
    appStore.setDetailPanelOpen(false)
    peerStore.selectPeer(null)
    return
  }
  peerStore.selectPeer(peer.id)
  appStore.setSelectedFile(peer.id)
  appStore.setDetailPanelOpen(true)
}

// 切换收藏
function toggleFollow(peerId) {
  peerStore.toggleFollowing(peerId)
  const peer = peerStore.peers.find(p => p.id === peerId)
  if (peer) {
    appStore.showToast(peer.following ? '已收藏' : '已取消收藏', 'success')
  }
}

// 批量切换收藏（表头星标按钮）
function toggleFollowAll() {
  const visiblePeers = peers.value
  const allFollowing = visiblePeers.every(p => p.following)
  visiblePeers.forEach(p => {
    if (allFollowing && p.following) {
      peerStore.toggleFollowing(p.id)
    } else if (!allFollowing && !p.following) {
      peerStore.toggleFollowing(p.id)
    }
  })
  appStore.showToast(allFollowing ? '已取消全部收藏' : '已收藏全部', 'success')
}

// 格式化粉丝数
function formatFollowers(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
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

// 获取评分
function getRatingScore(rating) {
  if (!rating || !rating.count) return '0.0'
  return ((rating.total / rating.count) * 2).toFixed(1)
}
</script>
