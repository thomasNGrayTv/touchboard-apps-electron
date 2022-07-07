<script setup>
import Login from "../components/Login.vue";
import { router } from "../routes/index";

//testing local storage
let pin = localStorage.getItem("pin");

if (!pin) {
  pin = (Math.random() + 1).toString(36).substring(7);
  localStorage.setItem("pin", pin);
}
</script>

<template>
  <img class="background" src="../assets/backgroundImage.jpg" />
  <div class="loginView">
    <div class="logoContainer">
      <img
        src="https://gray.tv/uploads/redesign/HOME/GRAY-horizontal-logo-280x140-white.png"
        alt="Gray TV Logo"
      />
    </div>
    <div class="titleFormContainer">
      <h1>Gray Interactive Television SpringBoard</h1>
      <Login @login-station="router.push({ name: 'dashboard' })"></Login>
      <p>Pin: {{ pin }}</p>
    </div>
  </div>
</template>

<style></style>
