<script setup>
import StationLogo from "./StationLogo.vue";
import Favorite from "./Favorite.vue";
import AppItem from "./AppItem.vue";
import { mainStore } from "../../stores/mainStore";
import { ref } from "vue";

const store = mainStore();
const showCategories = ref(false);

//hard coded api call result
const apps = [
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: true,
    categories: ["Favorites", "All Apps", "Interactive"],
    image: {
      favorite: "/src/assets/basketball.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: true,
    categories: ["Favorites", "All Apps", "Gsync"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
    categories: ["All Apps", "Interactive"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: false,
    categories: ["All Apps", "Maps"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: false,
    categories: ["All Apps", "Elections"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
    categories: ["All Apps", "Gsync"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: false,
    categories: ["All Apps", "Interactive"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: false,
    categories: ["All Apps", "Gsync"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
    categories: ["All Apps", "Interactive"],
    image: {
      favorite: "/src/assets/flag.png",
      preview: "/src/assets/map.png",
    },
  },
];
if (store.apps.length <= 0) {
  store.setApps(apps);
}
console.log(store.categories);
</script>

<template>
  <div class="dashboardMain">
    <div class="sidebar">
      <station-logo></station-logo>

      <div class="controlsContainer">
        <button
          @click="showCategories = !showCategories"
          class="controlsContainer_item categories"
          :class="{ showCategories: showCategories }"
        >
          <span>Categories</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 13.229166 13.229166"
            version="1.1"
            id="svg5"
          >
            <path
              style="
                fill: currentColor;
                stroke: none;
                stroke-width: 1.66639;
                stroke-dasharray: none;
                stroke-opacity: 1;
              "
              d="m 1.124479,4.630208 h 10.980209 l -2.7014793,3.042708 -2.70148,3.042708 z"
              id="path5454"
            />
          </svg>
          <transition name="fadeFromAbove" mode="out-in">
            <ul class="categoriesList" v-if="showCategories">
              <li v-for="(category, index) in store.categories" :key="index">
                <button class="controlsContainer_item">
                  {{ category }} - 5
                </button>
              </li>
            </ul>
          </transition>
        </button>
        <button class="controlsContainer_item">
          <span>Events</span>
        </button>
        <button class="controlsContainer_item">
          <span>Calendar</span>
        </button>
        <button class="controlsContainer_item">
          <span>Share Screen</span>
        </button>
        <button class="controlsContainer_item">
          <span>Change Theme</span>
        </button>
        <button class="controlsContainer_item">
          <span>My Video History</span>
        </button>
        <button class="controlsContainer_item">
          <span>FAQ's</span>
        </button>
      </div>
    </div>
    <div class="vertical-divider"></div>
    <div class="mainContent">
      <h1 class="dashboardTitle">GDM Touchscreen Dashboard</h1>
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
          :to="{ name: app.link }"
        >
          <app-item :app="app" :index="index"></app-item>
        </router-link>
      </div>
    </div>
  </div>
</template>
