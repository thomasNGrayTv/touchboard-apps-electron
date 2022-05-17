<script setup>
import { defineAsyncComponent, ref } from "vue";

const showDraw = ref(false);

const DrawTool = defineAsyncComponent(() =>
  import("./components/DrawTool.vue")
);
</script>

<template>
  <router-link :to="{ name: 'main-page' }">Main Page</router-link>
  <router-link :to="{ name: 'fact-finder' }">Fact Finder</router-link>
  <button @click="showDraw = !showDraw">Draw</button>

  <router-view></router-view>
  <DrawTool v-if="showDraw"></DrawTool>
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
</style>
