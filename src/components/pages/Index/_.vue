<template>
  <div>
    <Tab
      :active-tab="activeTab"
      @click="changeActiveTab($event)"
    />
    <Camera
      v-show="activeTab === 'camera'"
      @click="$router.push({ name:'ChooseFilter', params: getImage($event) })"
    />
    <Gallery v-show="activeTab === 'gallery'" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

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
      getImage(imageData) {
        return {
          imageData
        }
      }
    }

    return {
      activeTab,
      ...methods
    }
  }
})
</script>

<style>
</style>
