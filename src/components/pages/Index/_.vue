<template>
  <div>
    <Tab
      :active-tab="activeTab"
      :route="$route"
      @click="changeActiveTab($event)"
    />
    <Camera
      v-if="activeTab === 'camera'"
      @click="getImage($event)"
    />
    <Gallery v-if="activeTab === 'gallery'" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import router from '@/router'

export default defineComponent({
  props: {
    isGalleryMode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Tab: () => import('./Tab.vue'),
    Camera: () => import('./Camera.vue'),
    Gallery: () => import('./Gallery.vue')
  },
  // 特定ページからの戻りはgalleryを表示する
  beforeRouteEnter(to, from, next) {
    const checkList = ['GalleryPreview']
    const returnPageName = from.name

    next((vm) => {
      if (checkList.includes(returnPageName)) {
        vm.activeTab = 'gallery'
      }
    })
  },
  setup(props) {
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

    // routerでGalleryを指定してきた場合にgalleryを表示する
    if (props.isGalleryMode) {
      activeTab.value = 'gallery'
    }

    return {
      activeTab,
      ...methods
    }
  }
})
</script>
