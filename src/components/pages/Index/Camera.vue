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
      <audio
        id="shuttersound"
        preload="auto"
      >
        <source
          src="media/shutter.mp3"
          type="audio/mp3"
        >
      </audio>
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
    let shuttersound
    const previewBufferData = ref('')

    function handleSuccess(stream) {
      previewVideo.srcObject = stream
    }

    onMounted(() => {
      shuttersound = document.getElementById('shuttersound')
      previewVideo = document.getElementById('preview')

      if (navigator.mediaDevices.ondevicechange === null) return

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 1024, ideal: 1920, max: 3840 },
            height: { min: 776, ideal: 1080, max: 2160 },
            frameRate: 25,
            facingMode: { exact: 'environment' }
          }
        })
        .then(handleSuccess)
    })

    async function resultImage() {
      shuttersound.play() // シャッターサウンド
      previewVideo.pause() // プレビューの一時停止

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

      const imageData = virtualCanvas.toDataURL('image/jpeg', 0.95)
      await new Promise((resolve) => setTimeout(resolve, 500))

      return imageData
    }

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
    margin: 0 auto 25px;
    width: 320px;
    height: 320px;
    box-sizing: border-box;
    border: 1px solid #707070;
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
