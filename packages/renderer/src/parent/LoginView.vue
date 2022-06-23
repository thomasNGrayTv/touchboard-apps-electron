<script setup>
import Login from "../components/Login.vue";
import { router } from "../routes/index";
</script>

<template>
  <div
    class="background"
    :style="{
      backgroundImage: `url('/src/assets/backgroundImage.jpg')`,
    }"
  ></div>
  <div class="loginView">
    <div class="logoContainer">
      <img
        src="https://gray.tv/uploads/redesign/HOME/GRAY-horizontal-logo-280x140-white.png"
        alt="Gray TV Logo"
      />
    </div>
    <div class="titleFormContainer">
      <h1>Gray Interactive Television SpringBoard</h1>
      <Login @login-station="router.push({ name: 'dashboard-main' })"></Login>
    </div>
  </div>
</template>

<style></style>
