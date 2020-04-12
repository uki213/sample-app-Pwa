<template>
  <ul class="gallery">
    <li
      v-for="(item,index) in images.items"
      :key="index"
    >
      <img
        :src="item.thumbnail"
        @click="$router.push({
          name: 'GalleryPreview', params: {
            imageUrl: item.previewImage
          }
        })"
      >
    </li>
  </ul>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  setup() {
    const images = ref([])
    // ギャラリー更新
    axios.get('./api/gallery.json').then((result) => {
      images.value = result.data
    })

    return {
      images
    }
  }
})
</script>

<style lang="scss" scoped>
.gallery {
  margin: 40px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    width: calc((100% - 20px) / 3);
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid #707070;
    img{
      width: 100%;
      vertical-align: bottom;
    }
  }
}
</style>
