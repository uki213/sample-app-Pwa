<template>
  <section>
    <HistryBack />
    <div class="resultImageWrap">
      <img
        id="resultImage"
        class="image"
        :src="resultImageData"
      >
    </div>
    <div class="filterSelect">
      <label>
        <span>画像フィルター</span>
        <input
          type="checkbox"
          @change="changeFilter"
        >
      </label>
    </div>
    <div class="buttonArea">
      <button type="button">
        登録
      </button>
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, ref } from '@vue/composition-api'
import filterous from './filterous2-2.0.0.min'

export default defineComponent({
  components: {
    HistryBack: () => import('@/components/commons/HistoryBack.vue')
  },
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

      filterous
        .importImage(imageElement)
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
      selectedFilter.value = isCheaked ? '1977' : 'normal'
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
.resultImageWrap {
  padding-top: 44px;
  text-align: center;
  margin-bottom: 45px;
  .image {
    width: 320px;
    height: 320px;
    vertical-align: bottom;
    box-sizing: border-box;
    border: 1px solid #707070;
  }
}
.filterSelect {
  width: 320px;
  margin: 0 auto 45px;
  label {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      -moz-appearance: none;
      -webkit-appearance: none;
      border: 1px solid #7cbfd8;
      width: 70px;
      height: 40px;
      border-radius: 40px;
      position: relative;
      &::after {
        transition: all 500ms;
        content: "";
        display: block;
        position: absolute;
        box-sizing: border-box;
        border: 1px solid #7cbfd8;
        background:#fff;
        width: 36px;
        height: 36px;
        border-radius: 100%;
        left: 1px;
        top: 1px;
      }
      &:checked {
        &::after {
          background: #7cbfd8;
          left: 30px;
          top: 1px;
        }
      }
    }
  }
}
.buttonArea{
  text-align: center;
  button{
      -moz-appearance: none;
      -webkit-appearance: none;
      width: 140px;
      height: 50px;
      background: #7CBFD8;
      color: #fff;
      border: none;
      font-size: 30px;
      border-radius: 5px;
  }
}
</style>
