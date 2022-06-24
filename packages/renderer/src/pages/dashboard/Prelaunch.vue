<script setup>
import { useRoute } from "vue-router";
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
const route = useRoute();
const app = JSON.parse(route.query.appData);

store.updateSideBar(app.name);
</script>

<template>
  <div class="prelaunchContainer">
    <h1>prelaunch {{ app.name }}</h1>
    <router-link :to="{ name: 'dashboard-main' }" class="prelaunch-link"
      >Home</router-link
    >
  </div>
</template>

<style></style>
