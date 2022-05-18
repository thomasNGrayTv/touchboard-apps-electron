<script setup>
import { defineAsyncComponent, ref } from "vue";
import { router } from "./routes";
import { ipcRenderer } from "electron";

const showDraw = ref(false);
const showNavMenu = ref(false);

const notification = document.getElementById("notification");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

ipcRenderer.on("update_available", () => {
  ipcRenderer.removeAllListeners("update_available");
  message.innerText = "A new update is available. Downloading now...";
  notification.classList.remove("hidden");
});
ipcRenderer.on("update_downloaded", () => {
  ipcRenderer.removeAllListeners("update_downloaded");
  message.innerText =
    "Update Downloaded. It will be installed on restart. Restart now?";
  restartButton.classList.remove("hidden");
  notification.classList.remove("hidden");
});

function closeNotification() {
  notification.classList.add("hidden");
}
function restartApp() {
  ipcRenderer.send("restart_app");
}

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
  <header>
    <div id="notification" class="hidden">
      <p id="message"></p>
      <button id="close-button" @click="closeNotification()">Close</button>
      <button id="restart-button" @click="restartApp()" class="hidden">
        Restart
      </button>
    </div>
    <div class="globalTools">
      <button
        class="navItem"
        @touchstart.prevent="showNavMenu = !showNavMenu"
        @click.prevent="showNavMenu = !showNavMenu"
        title="toggle navigation"
      >
        <img src="./assets/nav_hamburger.png" alt="toggle navigation menu" />
      </button>
      <button class="navItem" @click="showDraw = !showDraw" title="draw tool">
        <img src="./assets/pencilIcon.png" alt="draw tool" />
      </button>
      <button
        class="navItem"
        @click="toggleFullScreen"
        title="toggle fullscreen"
      >
        <img src="./assets/expandIcon.png" alt="toggle full screen" />
      </button>
    </div>
    <div v-if="showNavMenu" class="navMenu">
      <button
        @touchstart.prevent="router.push({ name: 'main-page' })"
        @click.prevent="router.push({ name: 'main-page' })"
        class="navItem"
        title="home screen"
      >
        <img src="./assets/homeIcon.png" alt="home icon" />
      </button>

      <button
        @touchstart.prevent="router.push({ name: 'fact-finder' })"
        @click.prevent="router.push({ name: 'fact-finder' })"
        class="navItem"
        title="fact finder"
      >
        <img src="./assets/factFinderIcon.png" alt="fact finder icon" />
      </button>
    </div>
  </header>

  <div class="mainAppContainer">
    <router-view></router-view>
    <DrawTool v-if="showDraw"></DrawTool>
  </div>
</template>

<style>
@import "./assets/css/drawStyles.css";
@import "./assets/css/cardStyles.css";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

::backdrop {
  background-color: transparent;
}

header {
  background-color: darkgray;
}

.mainPageContainer {
  margin: 1em;
}

button.btn-primary {
  margin: 1em;
}
.loaderContainer {
  position: relative;
  top: 2em;
  left: 1em;
}

label {
  display: block;
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

#notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.hidden {
  display: none;
}
</style>
