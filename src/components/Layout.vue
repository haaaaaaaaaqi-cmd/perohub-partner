<template>
  <!--
    ================================================================
    布局组件（Layout）
    ================================================================
    这个组件负责把页面分成四个区域，像搭积木一样排列：
    
    ┌─────────┬────────────────────────────┬──────────┐
    │         │  工具栏（toolbar 插槽）      │          │
    │ 侧边栏   ├────────────────────────────┤  详情面板 │
    │(sidebar)│                            │ (detail) │
    │ 插槽    │  主内容区（default 插槽）     │  插槽     │
    │         │                            │          │
    └─────────┴────────────────────────────┴──────────┘
    
    每个区域的内容不是写死的，而是通过"插槽"（slot）让外部
    模块塞进来。这样不同模块（资源库、表单、设置）可以共用
    同一个布局骨架，只换里面的内容。
    ================================================================
  -->

  <!--
    最外层容器 div
    ────────────────────────────────────────────────────────────────
    class 里的每个词都是 Tailwind CSS 工具类，作用如下：
    - flex        ：使用弹性盒子布局，让里面的元素横向排列
    - flex-1      ：让这个容器填满父容器剩余的空间
    - min-w-0     ：允许内容在空间不足时缩小，防止撑破布局
    - h-full      ：高度撑满父容器（100%）
  -->
  <div class="flex flex-1 min-w-0 h-full">

    <!--
      ============================================================
      左侧侧边栏区域
      ============================================================
      使用 <aside> 标签表示这是页面旁边的辅助内容区域。

      v-if="$slots.sidebar"
      ── 只有当外部模块提供了 sidebar 插槽内容时，才显示这个区域。
         如果某个模块（比如设置页）不需要侧边栏，不传内容就不会渲染。

      class 各部分含义：
      - flex-shrink-0       ：不允许缩小，保持固定宽度
      - border-r            ：右侧加一条边框线
      - border-border       ：边框颜色用主题里的 border 变量
      - bg-sidebar          ：背景色用主题里的侧边栏背景色变量
      - transition-all      ：所有属性变化都加过渡动画（展开/折叠时平滑过渡）
      - duration-200        ：动画持续时间 200 毫秒
      - ease-in-out         ：动画速度先慢后快再慢，看起来更自然
      - overflow-hidden     ：内容超出时隐藏，不显示滚动条

      :class 是动态绑定的 class，根据 sidebarOpen 的值决定宽度：
      - sidebarOpen 为 true  → 'w-[240px]'   宽度 240 像素，正常展开
      - sidebarOpen 为 false → 'w-0 border-r-0' 宽度变成 0，同时去掉右边框
        这样侧边栏就会"收起来"，变成看不见的状态
    -->
    <aside
      v-if="$slots.sidebar"
      class="flex-shrink-0 border-r border-border bg-sidebar transition-all duration-200 ease-in-out overflow-hidden"
      :class="sidebarOpen ? 'w-[240px]' : 'w-0 border-r-0'"
    >
      <!--
        侧边栏内容包装层
        ──────────────────────────────────────────────
        v-show="sidebarOpen"
        ── 当 sidebarOpen 为 false 时，用 display:none 隐藏内容。
           注意：这里用 v-show 而不是 v-if，是因为侧边栏折叠时
           宽度会动画过渡到 0，但内容需要先隐藏，否则在动画
           过程中内容会挤在一起很难看。

        class="h-full"
        ── 高度撑满父容器，确保侧边栏内容区域可以完整滚动。
      -->
      <div v-show="sidebarOpen" class="h-full">
        <!--
          <slot name="sidebar" />
          ── 这是一个"具名插槽"，名字叫 sidebar。
             外部模块会把侧边栏的具体内容塞到这里。
             比如资源库模块会塞入文件夹树，表单模块会塞入表单列表。
        -->
        <slot name="sidebar" />
      </div>
    </aside>

    <!--
      ============================================================
      中间主区域
      ============================================================
      这个 div 包含工具栏（顶部）和主内容区（下方），纵向排列。

      class 各部分含义：
      - flex        ：弹性盒子布局
      - flex-col    ：纵向排列（从上到下），而不是默认的横向
      - flex-1      ：填满侧边栏和详情面板之间的剩余空间
      - min-w-0     ：允许缩小，防止内容撑破
    -->
    <div class="flex flex-col flex-1 min-w-0">

      <!--
        ──────────────────────────────────────────────────────
        顶部工具栏
        ──────────────────────────────────────────────────────
        使用 <header> 标签表示这是页面顶部的区域。

        v-if="$slots.toolbar"
        ── 只有外部提供了 toolbar 插槽内容时才渲染。

        class 各部分含义：
        - h-12          ：高度固定 48 像素（12 × 4px = 48px）
        - flex-shrink-0 ：不允许缩小，保持固定高度
        - border-b      ：底部加一条边框线，和下面的内容区分开
        - border-border ：边框颜色用主题变量
        - bg-background：背景色用主题的背景色变量
        - px-4          ：左右内边距 16 像素（4 × 4px = 16px）
      -->
      <header
        v-if="$slots.toolbar"
        class="h-12 flex-shrink-0 border-b border-border bg-background px-4"
      >
        <!--
          <slot name="toolbar" />
          ── 工具栏插槽，外部模块塞入工具栏内容。
             比如面包屑导航、搜索框、按钮等。
        -->
        <slot name="toolbar" />
      </header>

      <!--
        ──────────────────────────────────────────────────────
        主内容区
        ──────────────────────────────────────────────────────
        使用 <main> 标签表示这是页面的主体内容区域。

        class 各部分含义：
        - flex-1        ：填满工具栏下方的所有剩余空间
        - min-h-0       ：允许高度缩小，这是 flex 布局中防止
                          子元素溢出父容器的关键写法
        - overflow-hidden：内容超出时隐藏，由内部组件自己
                           管理滚动条，而不是这里统一滚动
      -->
      <main class="flex-1 min-h-0 overflow-hidden">
        <!--
          <slot />
          ── 这是"默认插槽"（没有起名字的插槽）。
             外部模块不指定插槽名的内容会放到这里。
             在本项目中，各模块的 index.vue 里写了
             <template #default>，内容就会塞到这里。
             这是整个页面最主要的内容区域，比如文件列表、
             表单列表等。
        -->
        <slot />
      </main>
    </div>

    <!--
      ============================================================
      右侧详情面板
      ============================================================
      使用 <aside> 标签表示这是页面旁边的辅助区域。

      v-if="$slots.detail"
      ── 只有外部提供了 detail 插槽内容时才渲染。
         没有详情面板需求的模块不会显示这个区域。

      class 各部分含义：
      - flex-shrink-0       ：不允许缩小，保持固定宽度
      - border-l            ：左侧加一条边框线
      - border-border       ：边框颜色用主题变量
      - bg-background       ：背景色用主题的背景色变量
      - transition-all      ：所有属性变化加过渡动画
      - duration-200        ：动画持续 200 毫秒
      - ease-in-out         ：动画先慢后快再慢
      - overflow-hidden     ：超出内容隐藏

      :class 动态绑定，根据 detailOpen 决定宽度：
      - detailOpen 为 true  → 'w-[320px]'   宽度 320 像素，正常展开
      - detailOpen 为 false → 'w-0 border-l-0' 宽度变 0，去掉左边框
        详情面板就会平滑地"收起来"
    -->
    <aside
      v-if="$slots.detail"
      class="flex-shrink-0 border-l border-border bg-background transition-all duration-200 ease-in-out overflow-hidden"
      :class="detailOpen ? 'w-[320px]' : 'w-0 border-l-0'"
    >
      <!--
        详情面板内容包装层
        ──────────────────────────────────────────────
        v-show="detailOpen"
        ── 详情面板折叠时先隐藏内容，让宽度动画过渡更平滑。
        class="h-full"
        ── 高度撑满父容器。
      -->
      <div v-show="detailOpen" class="h-full">
        <!--
          <slot name="detail" />
          ── 详情面板插槽，外部模块塞入详情内容。
             比如选中一个文件后，右侧显示文件的详细信息。
        -->
        <slot name="detail" />
      </div>
    </aside>
  </div>
</template>

<script setup>
/* ================================================================
   脚本部分（JavaScript 逻辑）
   ================================================================
   <script setup> 是 Vue 3 的语法糖，写法更简洁。
   这个组件的逻辑非常简单：从全局状态仓库读取侧边栏和详情面板
   的展开/折叠状态，然后通过模板里的 class 绑定来控制宽度。
   ================================================================ */

/* import { computed } from 'vue'
   ── 从 Vue 中引入 computed（计算属性）。
      计算属性是一种"自动追踪依赖"的变量：当它依赖的数据变化时，
      它会自动重新计算，模板里用到它的地方也会自动更新。 */
import { computed } from 'vue'

/* import { useAppStore } from '@/store/app'
   ── 引入全局状态管理仓库（Pinia store）。
      '@/store/app' 是 src/store/app.js 文件的别名路径。
      这个仓库里保存了应用级别的各种状态，包括侧边栏是否展开、
      详情面板是否展开等。 */
import { useAppStore } from '@/store/app'

/* const appStore = useAppStore()
   ── 创建仓库实例。之后就可以通过 appStore.xxx 读取或修改
      仓库里的数据了。 */
const appStore = useAppStore()

/* const sidebarOpen = computed(() => appStore.sidebarOpen)
   ── 创建一个计算属性 sidebarOpen，它的值来自仓库的 sidebarOpen。
      当仓库里的 sidebarOpen 发生变化时（比如用户点击了折叠按钮），
      这个计算属性会自动更新，模板里用到的 :class 也会自动更新，
      侧边栏的宽度就会跟着变化（展开 ↔ 折叠）。 */
const sidebarOpen = computed(() => appStore.sidebarOpen)

/* const detailOpen = computed(() => appStore.detailPanelOpen)
   ── 创建一个计算属性 detailOpen，它的值来自仓库的 detailPanelOpen。
      当仓库里的 detailPanelOpen 发生变化时（比如用户选中了一个文件），
      详情面板的宽度就会自动变化（展开 ↔ 折叠）。 */
const detailOpen = computed(() => appStore.detailPanelOpen)
</script>
