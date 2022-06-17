<script setup>
import Login from "../../components/Login.vue";
import { router } from "../../routes/index";
</script>

<template>
  <div class="loginView">
    <div class="titleContainer">
      <img
        src="https://gray.tv/uploads/redesign/HOME/GRAY-horizontal-logo-280x140-white.png"
        alt="Gray TV Logo"
      />
      <h1>Gray Interactive Television SpringBoard</h1>
    </div>
    <Login @login-station="router.push({ name: 'dashboard-main' })"></Login>
  </div>
</template>

<style></style>
