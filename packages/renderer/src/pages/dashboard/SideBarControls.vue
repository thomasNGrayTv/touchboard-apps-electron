<script setup>
import Categories from "./Categories.vue";
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
const appUpdates = store.appUpdates;
</script>

<template>
  <div class="controlsContainer">
    <transition name="fadeFromAbove" mode="out-in">
      <div v-if="store.sideBarControls === 'main'" class="main">
        <Categories></Categories>
        <ul class="sideBar_newsUpdates">
          <li
            v-for="(update, index) in appUpdates"
            :key="index"
            :class="{ redBullet: update.type === 'outage' }"
          >
            {{ update.description }}
          </li>
        </ul>
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
