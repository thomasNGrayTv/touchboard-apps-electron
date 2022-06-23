<script setup>
import StationLogo from "../components/StationLogo.vue";
import SideBarControls from "../pages/dashboard/SideBarControls.vue";
import { ref } from "vue";
import apps from "../backups/apps.json";
import { mainStore } from "../stores/mainStore";

const store = mainStore();
const showSupportDropDown = ref(false);
const supports = ref(["Share Screen", "Video History"]);

//hard coded api call result
if (store.apps.length <= 0) {
  store.setApps(apps.data);
}
</script>

<template>
  <img
    id="background-image"
    src="https://touchscreen.gray.tv/modules/grayTouchScreenSetup/uploads/KWCH/b_87_bg_image.jpg"
    alt="background image"
  />
  <div class="dashboardMain">
    <div class="sidebar">
      <station-logo></station-logo>

      <side-bar-controls></side-bar-controls>
    </div>
    <div class="vertical-divider"></div>
    <div class="appView">
      <div class="headerSection">
        <h1 class="dashboardTitle">GDM Touchscreen Dashboard</h1>
        <button
          @click="showSupportDropDown = !showSupportDropDown"
          class="btn dropdown support"
          :class="{ showDropDown: showSupportDropDown }"
        >
          <img
            class="supportIcon"
            src="../assets/gears.png"
            alt="support icon"
          />
          <span>Support</span>
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
            <ul class="btnList" v-if="showSupportDropDown">
              <li v-for="(support, index) in supports" :key="index">
                <button class="btn">{{ support }}</button>
              </li>
            </ul>
          </transition>
        </button>
      </div>

      <router-view v-slot="{ Component }">
        <transition name="fadeFromRight" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style></style>
