<template>
  <div>
    <Tab
      :active-tab="activeTab"
      @click="changeActiveTab($event)"
    />
    <Camera
      v-if="activeTab === 'camera'"
      @click="getImage($event)"
    />
    <Gallery v-show="activeTab === 'gallery'" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import router from '@/router'

export default defineComponent({
  components: {
    Tab: () => import('./Tab.vue'),
    Camera: () => import('./Camera.vue'),
    Gallery: () => import('./Gallery.vue')
  },
  setup() {
    const activeTab = ref('camera')

    const methods = {
      changeActiveTab(selectedTab) {
        activeTab.value = selectedTab
      },
      async getImage(resultData) {
        const imageData = await resultData
        router.push({ name: 'ChooseFilter', params: { imageData } })
      }
    }

    // ヒストリー消去
    // window.history.pushState(null, null, null)

    return {
      activeTab,
      ...methods
    }
  }
})
</script>

<style>
</style>
