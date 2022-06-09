<script setup>
import { router } from "../routes";
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
    <!-- <h2 class="navTitle">Nav Bar</h2> -->
    <div class="globalTools">
      <button
        class="navItem"
        @touchstart.prevent="showNavMenu = !showNavMenu"
        @click.prevent="showNavMenu = !showNavMenu"
        title="toggle navigation"
      >
        <img src="../assets/nav_hamburger.png" alt="toggle navigation menu" />
      </button>
      <button class="navItem" @click="store.toggleDrawView()" title="draw tool">
        <img src="../assets/pencilIcon.png" alt="draw tool" />
      </button>
      <button
        class="navItem"
        @click="toggleFullScreen"
        title="toggle fullscreen"
      >
        <img src="../assets/expandIcon.png" alt="toggle full screen" />
      </button>
    </div>
    <div v-if="showNavMenu" class="navMenu">
      <button
        @touchstart.prevent="router.push({ name: 'main-page' })"
        @click.prevent="router.push({ name: 'main-page' })"
        class="navItem"
        title="home screen"
      >
        <img src="../assets/homeIcon.png" alt="home icon" />
      </button>

      <button
        @touchstart.prevent="router.push({ name: 'fact-finder' })"
        @click.prevent="router.push({ name: 'fact-finder' })"
        class="navItem"
        title="fact finder"
      >
        <img src="../assets/factFinderIcon.png" alt="fact finder icon" />
      </button>
      <button
        @touchstart.prevent="router.push({ name: 'g-poll' })"
        @click.prevent="router.push({ name: 'g-poll' })"
        class="navItem"
        title="gray polls"
      >
        <img src="../assets/gpollIcon.png" alt="poll icon" />
      </button>
      <button
        @touchstart.prevent="router.push({ name: 'whiteboard' })"
        @click.prevent="router.push({ name: 'whiteboard' })"
        class="navItem"
        title="whiteboard"
      >
        <img src="../assets/white_board.png" alt="whiteboard icon" />
      </button>
    </div>
  </header>
</template>

<style></style>
