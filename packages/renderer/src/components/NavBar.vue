<script setup>
import { ref } from "vue";
import { mainStore } from "../stores/mainStore";

const store = mainStore();
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
</script>

<template>
  <header>
    <div class="globalTools">
      <a
        class="navItem"
        @touchstart.prevent="showNavMenu = !showNavMenu"
        @click.prevent="showNavMenu = !showNavMenu"
        title="toggle navigation"
      >
        <img src="../assets/nav_hamburger.png" alt="toggle navigation menu" />
      </a>
      <a class="navItem" @click="store.toggleDrawView()" title="draw tool">
        <img src="../assets/pencilIcon.png" alt="draw tool" />
      </a>
      <a class="navItem" @click="toggleFullScreen" title="toggle fullscreen">
        <img src="../assets/expandIcon.png" alt="toggle full screen" />
      </a>
      <router-link
        :to="{ name: 'dashboard-main' }"
        class="navItem"
        title="dashboard"
      >
        <img src="../assets/homeIcon.png" alt="home icon" />
      </router-link>
    </div>
    <div v-if="showNavMenu" class="navMenu">
      <router-link
        v-for="(app, index) in store.apps"
        :key="index"
        :to="{ name: app.link }"
        class="navItem"
        :title="app.name"
      >
        <img :src="app.image.nav" alt="app icon" />
      </router-link>
    </div>
  </header>
</template>

<style></style>
