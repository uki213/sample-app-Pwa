<template>
  <section class="historyBack">
    <img
      src="img/ui/back.svg"
      @click="$router.go(-1)"
    >
  </section>
</template>

<style lang="scss" scoped>
.historyBack{
  height: 51px;
  border-bottom: 1px solid #707070;
  img{
    position: relative;
    top: 10px;
  }
}
</style>
