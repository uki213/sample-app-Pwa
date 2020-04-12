<template>
  <section>
    <HistryBack />
    <div class="image">
      <img
        class="previewWrap"
        :src="imageUrl"
      >
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    HistryBack: () => import('@/components/commons/HistoryBack.vue')
  },
  props: {
    imageUrl: { type: String }
  }
})
</script>

<style lang="scss" scoped>
.image{
  padding-top: 44px;
  text-align: center;
  .previewWrap {
    margin: 0 auto 25px;
    width: calc(100vw - 20px);
    height: calc(100vw - 20px);
    box-sizing: border-box;
    border: 1px solid #707070;
    position: relative;
    overflow: hidden;
  }
}
</style>
