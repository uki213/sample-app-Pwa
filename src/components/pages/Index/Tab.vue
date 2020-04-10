<template>
  <section class="tab">
    <div
      class="item"
      :class="{ active: activeTab === 'camera' }"
      @click="$emit('click', 'camera')"
    >
      カメラ
    </div>
    <div
      class="item"
      :class="{ active: activeTab === 'gallery' }"
      @click="$emit('click', 'gallery')"
    >
      ギャラリー
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    activeTab: { type: String }
  }
})
</script>

<style lang="scss" scoped>
.tab{
  display: flex;
  border-bottom: 1px solid #707070;
  .item{
    border: 1px solid #707070;
    border-bottom: 0;
    border-radius: 5px 5px 0 0;
    width: 150px;
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    box-sizing: border-box;
    background: #E1F3F9;
    &.active{
      background: #fff;
    }
  }
}
</style>
