<template>
  <!-- 拍档模块入口 -->
  <Layout>
    <template #sidebar>
      <PeerSidebar />
    </template>

    <template #toolbar>
      <PeerToolbar />
    </template>

    <template #default>
      <PeerContent />
    </template>

    <template #detail>
      <PeerDetailPanel />
    </template>
  </Layout>

  <!-- 添加/编辑拍档弹窗（共享） -->
  <AddPeerDialog
    :open="peerStore.showAddDialog"
    :edit-peer="peerStore.editPeer"
    @update:open="handleDialogOpen"
  />
</template>

<script setup>
import Layout from '@/components/Layout.vue'
import PeerSidebar from './Sidebar.vue'
import PeerToolbar from './Toolbar.vue'
import PeerContent from './Content.vue'
import PeerDetailPanel from './DetailPanel.vue'
import AddPeerDialog from './AddPeerDialog.vue'
import { usePeerStore } from '@/store/peer'

const peerStore = usePeerStore()

// 弹窗开关控制
function handleDialogOpen(val) {
  if (!val) {
    peerStore.closeDialog()
  }
}
</script>
