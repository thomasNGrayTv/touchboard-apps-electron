<script setup>
import Categories from "./Categories.vue";
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
</script>

<template>
  <div class="controlsContainer">
    <transition name="fadeFromAbove" mode="out-in">
      <div v-if="store.sideBarControls === 'main'" class="main">
        <Categories></Categories>
        <button class="btn">
          <span>News Blurb</span>
        </button>
      </div>
      <div v-else class="gPoll">
        <button class="btn">
          <span>Custom Control</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style></style>
