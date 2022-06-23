<script setup>
import Favorite from "../../components/Favorite.vue";
import AppItem from "./AppItem.vue";
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
</script>

<template>
  <div class="mainContent">
    <div class="favoritesContainer">
      <h3>FAVORITES</h3>
      <div class="favoritesContainer_items">
        <Favorite
          v-if="store.favoriteApps.length"
          v-for="(app, index) in store.favoriteApps"
          :key="index"
          :favorite="app"
        ></Favorite>
        <p v-else>No favorite apps yet</p>
      </div>
    </div>
    <div class="horizontal-divider"></div>
    <div class="apps">
      <router-link
        class="app-item"
        v-for="(app, index) in store.apps"
        :key="index"
        :to="{
          name: 'dashboard-prelaunch',
          query: { appData: JSON.stringify(app) },
        }"
      >
        <app-item :app="app" :index="index"></app-item>
      </router-link>
    </div>
  </div>
</template>
