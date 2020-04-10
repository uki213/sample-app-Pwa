<template>
  <section>
    <img
      id="resultImage"
      class="image"
      :src="resultImageData"
    >
    <div>
      <label>
        画像フィルター
        <input
          type="checkbox"
          @change="changeFilter"
        >
      </label>
    </div>
  </section>
</template>

<script>
/* global filterous:writable */
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    imageData: {
      type: String // Base64 Data
    }
  },
  setup(props) {
    const resultImageData = ref()
    const selectedFilter = ref('normal')
    const imageData = computed(() => props.imageData)

    function filterImage(imageElement) {
      const resultImage = new Image()
      resultImage.onload = () => {
        resultImageData.value = resultImage.src
      }

      filterous.importImage(imageElement)
        .applyInstaFilter(selectedFilter.value)
        .renderHtml(resultImage)
    }

    function init() {
      const imageElement = new Image()
      imageElement.onload = () => {
        filterImage(imageElement) // 仮想imgに画像を送り込んだ後に実行する
      }
      imageElement.src = imageData.value
    }

    function changeFilter(event) {
      const isCheaked = event.target.checked
      selectedFilter.value = isCheaked ? 'willow' : 'normal'
      init()
    }

    init()

    return {
      changeFilter,
      resultImageData
    }
  }
})
</script>

<style lang="scss" scoped>
.image{
  width: 320px;
  height: 320px;
}
</style>
