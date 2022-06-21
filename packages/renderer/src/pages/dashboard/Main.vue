<script setup>
import { ref } from "vue";
import StationLogo from "./StationLogo.vue";
import AppItem from "./AppItem.vue";

const apps = ref([
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: true,
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: true,
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
  },
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: false,
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: false,
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
  },
  {
    name: "Fact Finder",
    link: "fact-finder",
    favorite: false,
  },
  {
    name: "gPoll",
    link: "g-poll",
    favorite: false,
  },
  {
    name: "Whiteboard",
    link: "whiteboard",
    favorite: false,
  },
]);
</script>

<template>
  <div class="dashboardMain">
    <div class="sidebar">
      <station-logo></station-logo>

      <div class="controlsContainer">
        <button class="controlsContainer_item">
          <span>Categories</span
          ><svg
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
          <button class="favorites-item">
            <img src="../../assets/basketball.png" alt="scores image" />
            <span>Scores</span>
          </button>
          <button class="favorites-item">
            <img src="../../assets/flag.png" alt="scores image" />
            <span>Elections</span>
          </button>
        </div>
      </div>
      <div class="horizontal-divider"></div>
      <div class="apps">
        <router-link
          class="app-item"
          v-for="(app, index) in apps"
          :key="index"
          :to="{ name: app.link }"
        >
          <app-item :app="app"></app-item>
        </router-link>
      </div>
    </div>
  </div>
</template>
