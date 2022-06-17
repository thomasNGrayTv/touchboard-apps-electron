<script setup>
import { ref } from "vue";
const godMode = ref(true);
const apps = ref([
  {
    name: "app",
    link: "fact-finder",
  },
  {
    name: "app",
    link: "g-poll",
  },
  {
    name: "app",
    link: "whiteboard",
  },
]);
</script>

<template>
  <div class="dashboardMain">
    <h1 class="dashboardTitle">GDM Touchscreen Dashboard</h1>
    <router-link v-if="godMode" :to="{ name: 'login' }"
      >Switch Station</router-link
    >
    <router-link
      v-for="(app, index) in apps"
      :key="index"
      :to="{ name: app.link }"
      >{{ app.link }}</router-link
    >
  </div>
</template>

<style></style>
