<script setup>
import Login from "../components/Login.vue";
import themes from "../backups/themes.json";
import { themeStore } from "../stores/themeStore";

const store = themeStore();
</script>

<template>
  <h1>GDM Touchscreen Dashboard</h1>
  <h3>Change Theme:</h3>
  <button
    v-for="(theme, index) in themes"
    :key="index"
    @click="store.changeTheme(theme)"
  >
    Theme {{ index + 1 }}
  </button>
  <Login></Login>
  <router-link :to="{ name: 'app-launch' }">App Launch</router-link>
  <router-view></router-view>
</template>

<style></style>
