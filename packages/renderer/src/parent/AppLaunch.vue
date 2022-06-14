<script setup>
import { defineAsyncComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import { mainStore } from "../stores/mainStore";

const store = mainStore();

const DrawTool = defineAsyncComponent(() =>
  import("../components/DrawTool.vue")
);
</script>

<template>
  <NavBar></NavBar>
  <div class="mainAppContainer">
    <router-view></router-view>
    <DrawTool v-if="store.showDraw"></DrawTool>
  </div>
</template>

<style></style>
