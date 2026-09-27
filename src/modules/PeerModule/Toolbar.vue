<template>
  <!-- 拍档工具栏 -->
  <div class="flex items-center w-full h-full gap-3">
    <!-- 移动端菜单按钮 -->
    <Button variant="ghost" size="icon" class="md:hidden h-8 w-8" @click="toggleSidebar">
      <Menu class="w-4 h-4" />
    </Button>

    <!-- 当前分类标题 -->
    <div class="flex items-center gap-2 flex-1 min-w-0">
      <span class="text-lg">{{ currentCategoryInfo?.icon }}</span>
      <span class="text-base font-semibold truncate">{{ currentCategoryInfo?.label }}</span>
      <Badge variant="secondary" class="text-xs">{{ peerCount }} 位</Badge>
      <!-- 筛选激活指示 -->
      <Badge v-if="peerStore.hasActiveFilters" variant="default" class="text-[10px] gap-1">
        <Filter class="w-2.5 h-2.5" />
        {{ activeFilterCount }}
      </Badge>
    </div>

    <div class="flex items-center gap-2 flex-shrink-0">
      <!-- 搜索框 -->
      <div class="relative">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          :value="searchQuery"
          placeholder="搜索拍档、别名、标签..."
          class="w-56 pl-8 h-8"
          @input="handleSearch"
        />
      </div>

      <Separator orientation="vertical" class="h-6" />

      <!-- 排序下拉 -->
      <DropdownMenu align="end" :side-offset="6">
        <template #trigger>
          <Tooltip content="排序">
            <Button variant="secondary" size="icon" class="h-8 w-8">
              <ArrowUpDown class="w-4 h-4" />
            </Button>
          </Tooltip>
        </template>
        <DropdownMenuLabel>排序方式</DropdownMenuLabel>
        <DropdownMenuItem @select="setSortBy('name')">
          <User class="w-4 h-4" />
          <span class="flex-1">名称</span>
          <Check v-if="sortBy === 'name'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem @select="setSortBy('followers')">
          <Users class="w-4 h-4" />
          <span class="flex-1">粉丝数</span>
          <Check v-if="sortBy === 'followers'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem @select="setSortBy('rating')">
          <Star class="w-4 h-4" />
          <span class="flex-1">评分</span>
          <Check v-if="sortBy === 'rating'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem @select="setSortBy('createdAt')">
          <Calendar class="w-4 h-4" />
          <span class="flex-1">入驻时间</span>
          <Check v-if="sortBy === 'createdAt'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @select="toggleSortOrder">
          <component :is="sortOrder === 'asc' ? ArrowUpAZ : ArrowDownAZ" class="w-4 h-4" />
          <span class="flex-1">{{ sortOrder === 'asc' ? '升序 (A→Z)' : '降序 (Z→A)' }}</span>
        </DropdownMenuItem>
      </DropdownMenu>

      <!-- 筛选下拉 -->
      <DropdownMenu align="end" :side-offset="6">
        <template #trigger>
          <Tooltip content="筛选">
            <Button
              variant="secondary"
              size="icon"
              class="h-8 w-8 relative"
              :class="{ 'bg-primary/10 text-primary': peerStore.hasActiveFilters }"
            >
              <Filter class="w-4 h-4" />
              <span
                v-if="peerStore.hasActiveFilters"
                class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary"
              ></span>
            </Button>
          </Tooltip>
        </template>

        <!-- 类型筛选 -->
        <DropdownMenuLabel>类型</DropdownMenuLabel>
        <DropdownMenuItem @select="setType('')">
          <span class="flex-1">全部类型</span>
          <Check v-if="!filterType" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem v-for="t in types" :key="t.id" @select="setType(t.id)">
          <span class="w-4 text-center">{{ t.icon }}</span>
          <span class="flex-1">{{ t.label }}</span>
          <Check v-if="filterType === t.id" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <!-- 城市筛选 -->
        <DropdownMenuLabel>城市</DropdownMenuLabel>
        <DropdownMenuItem @select="setCity('')">
          <span class="flex-1">全部城市</span>
          <Check v-if="!filterCity" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem v-for="city in cities" :key="city" @select="setCity(city)">
          <MapPin class="w-4 h-4" />
          <span class="flex-1">{{ city }}</span>
          <Check v-if="filterCity === city" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <!-- 标签筛选 -->
        <DropdownMenuLabel>标签</DropdownMenuLabel>
        <DropdownMenuItem @select="setTag('')">
          <span class="flex-1">全部标签</span>
          <Check v-if="!filterTag" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem v-for="tag in tags" :key="tag" @select="setTag(tag)">
          <Tag class="w-4 h-4" />
          <span class="flex-1 truncate">{{ tag }}</span>
          <Check v-if="filterTag === tag" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem v-if="peerStore.hasActiveFilters" @select="clearAllFilters">
          <X class="w-4 h-4" />
          <span class="flex-1">清除筛选</span>
        </DropdownMenuItem>
      </DropdownMenu>

      <!-- 视图切换 -->
      <DropdownMenu align="end" :side-offset="6">
        <template #trigger>
          <Tooltip content="视图">
            <Button variant="secondary" size="icon" class="h-8 w-8">
              <component :is="viewIcon" class="w-4 h-4" />
            </Button>
          </Tooltip>
        </template>
        <DropdownMenuLabel>视图方式</DropdownMenuLabel>
        <DropdownMenuItem @select="setView('grid')">
          <LayoutGrid class="w-4 h-4" />
          <span class="flex-1">卡片视图</span>
          <Check v-if="viewMode === 'grid'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuItem @select="setView('list')">
          <List class="w-4 h-4" />
          <span class="flex-1">列表视图</span>
          <Check v-if="viewMode === 'list'" class="w-4 h-4 text-primary" />
        </DropdownMenuItem>
      </DropdownMenu>

      <!-- 卡片显示设置 -->
      <Tooltip content="卡片显示设置">
        <Button variant="secondary" size="icon" class="h-8 w-8" @click="openCardFieldsDialog">
          <Eye class="w-4 h-4" />
        </Button>
      </Tooltip>

      <Separator orientation="vertical" class="h-6" />

      <!-- 添加按钮 -->
      <Tooltip content="添加拍档">
        <Button @click="openAddDialog">
          <UserPlus class="w-3.5 h-3.5" />
          添加
        </Button>
      </Tooltip>

      <!-- 详情面板切换 -->
      <Tooltip content="详情面板">
        <Button
          variant="secondary"
          size="icon"
          class="h-8 w-8"
          :class="{ 'bg-accent text-accent-foreground': appStore.detailPanelOpen }"
          @click="toggleDetailPanel"
        >
          <PanelRight class="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw } from 'vue'
import {
  Menu, Search, ArrowUpDown, Filter, UserPlus, PanelRight,
  LayoutGrid, List, Check, User, Users, Star, Calendar,
  MapPin, Tag, X, ArrowUpAZ, ArrowDownAZ, Eye
} from 'lucide-vue-next'
import { useAppStore } from '@/store/app'
import { usePeerStore } from '@/store/peer'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import Separator from '@/components/ui/Separator.vue'
import Badge from '@/components/ui/Badge.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import DropdownMenuItem from '@/components/ui/DropdownMenuItem.vue'
import DropdownMenuLabel from '@/components/ui/DropdownMenuLabel.vue'
import DropdownMenuSeparator from '@/components/ui/DropdownMenuSeparator.vue'

const appStore = useAppStore()
const peerStore = usePeerStore()

// 视图模式（从 store 读取）
const viewMode = computed(() => peerStore.viewMode)

// 当前分类信息
const currentCategoryInfo = computed(() => {
  return peerStore.getCategory(peerStore.currentCategory)
})

// 当前数量
const peerCount = computed(() => peerStore.currentPeers.length)

// 搜索关键词
const searchQuery = computed(() => peerStore.searchQuery)

// 视图图标
const viewIcon = computed(() => {
  return viewMode.value === 'grid' ? markRaw(LayoutGrid) : markRaw(List)
})

// 排序
const sortBy = computed(() => peerStore.sortBy)
const sortOrder = computed(() => peerStore.sortOrder)

// 类型
const types = computed(() => peerStore.types)
const filterType = computed(() => peerStore.filterType)

// 筛选
const filterCity = computed(() => peerStore.filterCity)
const filterTag = computed(() => peerStore.filterTag)
const cities = computed(() => peerStore.availableCities)
const tags = computed(() => peerStore.availableTags)

// 激活筛选数量
const activeFilterCount = computed(() => {
  let n = 0
  if (peerStore.filterType) n++
  if (peerStore.filterCity) n++
  if (peerStore.filterTag) n++
  return n
})

// 切换侧边栏
function toggleSidebar() {
  appStore.toggleSidebar()
}

// 切换详情面板
function toggleDetailPanel() {
  appStore.toggleDetailPanel()
}

// 搜索
function handleSearch(e) {
  peerStore.setSearchQuery(e.target.value)
}

// 设置视图
function setView(mode) {
  peerStore.setViewMode(mode)
}

// 排序
function setSortBy(field) {
  peerStore.setSortBy(field)
}

function toggleSortOrder() {
  peerStore.toggleSortOrder()
}

// 筛选
function setType(type) {
  peerStore.setFilterType(type)
}

function setCity(city) {
  peerStore.setFilterCity(city)
}

function setTag(tag) {
  peerStore.setFilterTag(tag)
}

function clearAllFilters() {
  peerStore.clearFilters()
}

// 打开添加弹窗
function openAddDialog() {
  peerStore.openAddDialog()
}

// 打开卡片显示设置弹窗
function openCardFieldsDialog() {
  peerStore.openCardFieldsDialog()
}
</script>
