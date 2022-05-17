<script setup>
import { defineAsyncComponent, ref } from "vue";
import { router } from "./routes";

const showDraw = ref(false);
const showNavMenu = ref(false);

function cancelFullScreen() {
  var el = document;
  var requestMethod =
    el.cancelFullScreen ||
    el.webkitCancelFullScreen ||
    el.mozCancelFullScreen ||
    el.exitFullscreen ||
    el.webkitExitFullscreen;
  if (requestMethod) {
    // cancel full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function requestFullScreen(el) {
  // Supports most browsers and their versions.
  var requestMethod =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
  return false;
}

function toggleFullScreen() {
  var el = document.body; // Make the body go full screen.

  var isInFullScreen =
    (document.fullScreenElement && document.fullScreenElement !== null) ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;

  if (isInFullScreen) {
    cancelFullScreen();
  } else {
    requestFullScreen(el);
  }
  return false;
}

const DrawTool = defineAsyncComponent(() =>
  import("./components/DrawTool.vue")
);
</script>

<template>
  <div class="globalTools">
    <button
      class="navItem"
      @click="showNavMenu = !showNavMenu"
      title="toggle navigation"
    >
      <img src="./assets/nav_hamburger.png" alt="toggle navigation menu" />
    </button>
    <button class="navItem" @click="showDraw = !showDraw" title="draw tool">
      <img src="./assets/pencilIcon.png" alt="draw tool" />
    </button>
    <button class="navItem" @click="toggleFullScreen" title="toggle fullscreen">
      <img src="./assets/expandIcon.png" alt="toggle full screen" />
    </button>
  </div>
  <div v-if="showNavMenu" class="navMenu">
    <button
      @click="router.push({ name: 'main-page' })"
      class="navItem"
      title="home screen"
    >
      <img src="./assets/homeIcon.png" alt="home icon" />
    </button>

    <button
      @click="router.push({ name: 'fact-finder' })"
      class="navItem"
      title="fact finder"
    >
      <img src="./assets/factFinderIcon.png" alt="fact finder icon" />
    </button>
  </div>

  <div class="mainAppContainer">
    <router-view></router-view>
    <DrawTool v-if="showDraw"></DrawTool>
  </div>
</template>

<style>
::backdrop {
  background-color: transparent;
}
body a {
  margin: 1em;
}

.mainAppContainer {
  position: relative;
}

button.navItem {
  cursor: pointer;
  margin: 0.71em;
}

.navItem img {
  z-index: 9999999;
  width: 2em;
  height: 2em;
  display: flex;
}
</style>
