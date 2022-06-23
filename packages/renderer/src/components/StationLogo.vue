<script setup>
import { ref } from "vue";
const godMode = ref(true);
</script>

<template>
  <div class="stationLogoContainer">
    <div class="logo">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP45tm-YZz4-ht3RpitvZMOBN-NTVoLVK25g&usqp=CAU"
        alt="station logo"
      />
      <router-link v-if="godMode" :to="{ name: 'login' }"
        >Switch Station</router-link
      >
    </div>
  </div>
</template>
