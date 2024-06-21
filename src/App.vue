<script setup lang="ts">
  import { RouterView } from 'vue-router'
  // import TabsView from './views/TabsView'
</script>

<template>
  <div class="app">
    <!-- <TabsView></TabsView> -->
    <RouterView></RouterView>
  </div>
</template>

<style lang="scss">
@import 'normalize.css';

#app{
  --op-gray-bg-color: rgb(248,248,248);
  //字体抗锯齿,字体看起来更清晰
  -webkit-font-smoothimg:antialiased;
  -moz-osx-font-smoothimg:grayscale;
  color: #2c3e50;
  font-size: 14px;
  background:var(--op-gray-bg-color);
}
</style>
