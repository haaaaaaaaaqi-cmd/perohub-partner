import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/peer'
  },
  {
    path: '/peer',
    name: 'Peer',
    component: () => import('@/modules/PeerModule/index.vue'),
    meta: { title: '拍档通讯录', showSidebar: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} — Perohub 资源管理中心`
    : 'Perohub — 资源管理中心'
  next()
})

export default router
