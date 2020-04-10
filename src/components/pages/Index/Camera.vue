<!--
 カメラの操作はjsフレームワークでも直接browserの機能を呼ぶ必要がある。
 このコンポーネントでは、mediaDevicesを用いてカメラのプレビュー及び、
 キャプチャショットを取得し、emitでそのキャプチャショットを返却することで、
 vue.jsのエコシステムに乗せている。
-->

<template>
  <section>
    <video
      id="preview"
      class="preview"
      controls
      autoplay
    />
    <div>
      <img
        src="img/ui/shutterMark.svg"
        @click="$emit('click', resultImage())"
      >
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const canvasSize = {
      x: 800,
      y: 800
    }
    let playerElement

    function handleSuccess(stream) {
      playerElement.srcObject = stream
    }

    onMounted(() => {
      playerElement = document.getElementById('preview')
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: { exact: 'environment' },
            width: canvasSize.x,
            height: canvasSize.y
          }
        })
        .then(handleSuccess)
    })

    function resultImage() {
      const virtualCanvas = document.createElement('canvas')
      virtualCanvas.width = canvasSize.x
      virtualCanvas.height = canvasSize.y
      const context = virtualCanvas.getContext('2d')
      context.drawImage(
        playerElement,
        0,
        0,
        virtualCanvas.width,
        virtualCanvas.height
      )
      const imageData = virtualCanvas.toDataURL('image/jpeg', 1.0)
      return imageData
    }
    return {
      resultImage
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  padding-top: 44px;
  text-align: center;
  .preview {
    width: 320px;
    height: 320px;
  }
}
</style>
