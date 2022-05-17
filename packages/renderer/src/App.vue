<script setup>
import { defineAsyncComponent, ref } from "vue";

const showDraw = ref(false);

const DrawTool = defineAsyncComponent(() =>
  import("./components/DrawTool.vue")
);
</script>

<template>
  <router-link class="navItem" :to="{ name: 'main-page' }"
    >Main Page</router-link
  >
  <router-link class="navItem" :to="{ name: 'fact-finder' }"
    >Fact Finder</router-link
  >
  <button class="navItem" @click="showDraw = !showDraw">Draw</button>
  <div class="mainAppContainer">
    <router-view></router-view>
    <DrawTool v-if="showDraw"></DrawTool>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body a {
  margin: 1em;
}

.mainAppContainer {
  position: relative;
}

.navItem {
  z-index: 9999999;
}
</style>
