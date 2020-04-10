<!--
 カメラの操作はjsフレームワークでも直接browserの機能を呼ぶ必要がある。
 このコンポーネントでは、mediaDevicesを用いてカメラのプレビュー及び、
 キャプチャショットを取得し、emitでそのキャプチャショットを返却することで、
 vue.jsのエコシステムに乗せている。
-->

<template>
  <section>
    <div class="previewWrap">
      <video
        id="preview"
        class="previewBuffer"
        autoplay
      />
    </div>
    <div>
      <img
        src="img/ui/shutterMark.svg"
        @click="$emit('click', resultImage())"
      >
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    let previewVideo
    const previewBufferData = ref('')

    function handleSuccess(stream) {
      previewVideo.srcObject = stream
    }

    onMounted(() => {
      previewVideo = document.getElementById('preview')
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 776, ideal: 720, max: 1080 },
            frameRate: 10,
            facingMode: { exact: 'environment' }
          }
        })
        .then(handleSuccess)
    })

    function resultImage() {
      const virtualCanvas = document.createElement('canvas')
      virtualCanvas.width = previewVideo.videoWidth
      virtualCanvas.height = previewVideo.videoWidth

      const context = virtualCanvas.getContext('2d')
      context.drawImage(
        previewVideo,
        0,
        0,
        previewVideo.videoWidth,
        previewVideo.videoHeight
      )
      const imageData = virtualCanvas.toDataURL('image/jpeg', 0.8)
      return imageData
    }

    setInterval(() => {
      previewBufferData.value = resultImage()
    }, 50)

    return {
      previewBufferData,
      resultImage
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  padding-top: 44px;
  text-align: center;
  .previewWrap {
    margin: auto;
    width: 320px;
    height: 320px;
    position: relative;
    overflow: hidden;
    .previewBuffer {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
}
</style>
