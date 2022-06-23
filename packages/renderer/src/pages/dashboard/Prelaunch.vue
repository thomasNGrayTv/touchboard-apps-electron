<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const app = JSON.parse(route.query.appData);
</script>

<template>
  <div class="contain">
    <h1>prelaunch {{ app.name }}</h1>
    <router-link :to="{ name: 'dashboard-main' }">Home</router-link>
  </div>
</template>

<style></style>
