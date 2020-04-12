<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,body{
  overscroll-behavior-y: none;
  padding: 0;
  margin: 0;
  *{
    outline: none;
  }
}
#app{
  padding: 10px;
  font-size: 20px;
  color: #707070;
}
</style>
