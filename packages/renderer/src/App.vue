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
  <header>
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

/* draw tool */
.svg-icon {
  width: 1em;
  height: 1em;
  opacity: 1;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #4691f6;
}

button:disabled .svg-icon {
  opacity: 0.5;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 1;
}
.draw-app-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
}
.draw-app-wrapper button,
input {
  font-size: 14px;
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 500;
}

.text-faded {
  opacity: 0.5;
}

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid rgb(30, 30, 30);
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 1s;
  display: none;
}

canvas {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: transparent;
  /* cursor: none; */
}

canvas:hover + .cursor {
  opacity: 1;
}
canvas:active + .cursor {
  border-color: rgb(60, 60, 60);
}

.draw-app-wrapper .controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(10, 10, 10);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.draw-app-wrapper .stat {
  font-size: 20px;
  margin-bottom: 15px;
}

.draw-app-wrapper .btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}

.draw-app-wrapper .popup {
  position: absolute;
  width: 300px;
  bottom: 80px;
  padding: 30px;
  left: calc(50% - 150px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  color: rgb(30, 30, 30);
  border-radius: 10px 10px 0 0;
  border: 1px solid rgb(220, 220, 220);
  border-bottom-width: 0;
  opacity: 0;
  animation: popup 0.5s forwards cubic-bezier(0.2, 2, 0.4, 1);
  z-index: 2;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
}

.draw-app-wrapper .popup .popup-title {
  flex: 0 0 100%;
  text-align: center;
  font-size: 16px;
  color: black;
  opacity: 0.5;
  margin-bottom: 10px;
}

.draw-app-wrapper button {
  height: 80px;
  width: 80px;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
}

.draw-app-wrapper button i {
  display: block;
  font-size: 30px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.2);
}

.draw-app-wrapper button.disabled {
  color: rgba(0, 0, 0, 0.2);
}

.draw-app-wrapper button.disabled i {
  color: rgba(0, 0, 0, 0.1);
}

.draw-app-wrapper button.active,
.draw-app-wrapper button:active {
  color: rgba(0, 0, 0, 0.4);
}

.draw-app-wrapper button.active i,
.draw-app-wrapper button:active i {
  color: rgb(0, 149, 255);
}

@keyframes popup {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.draw-app-wrapper .welcome-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: rgb(0, 149, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.draw-app-wrapper .fade-up {
  opacity: 0;
  animation: fade-up 1s forwards cubic-bezier(0.2, 2, 0.4, 1);
}

.draw-app-wrapper .btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 4px;
  background-color: rgb(0, 149, 255);
  color: white;
  animation-delay: 1s;
  transition: all 0.15s;
  cursor: pointer;
}

.draw-app-wrapper .btn:hover {
  background-color: lighten(rgb(0, 149, 255), 10%);
}

.welcome {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.welcome h1.fade-up {
  font-weight: 300;
  font-size: 40px;
  animation-delay: 0.25s;
}

.welcome h2.fade-up {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  animation-delay: 0.5s;
}

.welcome a.fade-up {
  color: rgba(255, 255, 255, 0.5);
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  animation-delay: 0.75s;
}

.welcome .btn.fade-up {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  margin-top: 60px;
}
.welcome .btn.fade-up:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

@keyframes fade-up {
  from {
    transform: translateY(80px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.form {
  flex: 0 0 100%;
}

.form input {
  display: block;
  appearance: none;
  border: 0;
  box-shadow: 0;
  outline: 0;
  background-color: rgb(240, 240, 240);
  border-radius: 4px;
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 4px;
}

.draw-app-wrapper button {
  appearance: none;
  border: 0;
  border-radius: 0;
  box-shadow: 0;
  width: 40px;
  height: 60px;
  display: inline-block;
  background-color: transparent;
  color: rgb(140, 140, 140);
  font-size: 22px;
  transition: all 0.15s;
  cursor: pointer;
  outline: 0;
  position: relative;
}

.draw-app-wrapper button .size-icon,
.draw-app-wrapper button .color-icon {
  position: absolute;
  top: 10px;
  right: 0;
}

.draw-app-wrapper button .color-icon {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.draw-app-wrapper button .size-icon {
  font-size: 6px;
  text-align: right;
}

.draw-app-wrapper button:hover {
  opacity: 0.8;
}

.draw-app-wrapper button:active,
.draw-app-wrapper button.active {
  color: white;
}

.draw-app-wrapper button.disabled {
  color: rgb(50, 50, 50);
  cursor: not-allowed;
}

.history {
  width: 30px;
  height: 30px;
  background-color: rgb(30, 30, 30);
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  color: rgb(140, 140, 140);
}

.color-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.color-item input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.color-item input:checked + .color {
  opacity: 1;
  border: 2px solid rgb(0, 149, 255);
}

.color-item .color {
  display: block;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
}

.color-item .color:hover {
  opacity: 0.8;
}

@keyframes pulsate {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale(1.15);
  }
}

.size-item {
  width: 40px;
  height: 60px;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  cursor: pointer;
}

.size-item input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}

.size-item .size {
  background-color: rgb(140, 140, 140);
  display: inline-block;
  border-radius: 50%;
  transition: all 0.15s;
  transform: translate(-50%, -50%) scale(0.6);
  position: absolute;
  top: 50%;
  left: 50%;
}

.size-item .size:hover {
  opacity: 0.8;
}

.size-item input:checked + .size {
  background-color: rgb(0, 149, 255);
}

.saves {
  flex: 0 0 calc(100% + 60px);
  margin: 30px -30px -30px;
  padding: 30px;
  background-color: rgb(240, 240, 240);
  max-height: 250px;
  overflow-y: auto;
}
.saves .save-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* cards */
.cards {
  top: 2em;
  left: 1em;
  width: 100%;
  min-width: 100em;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.cardContainer {
  position: relative;
  width: 30em;
  height: 100%;
  min-height: 100em;
}

.dropzone:not(.cardContainer) {
  margin: 1em;
  text-align: center;
}

h2 {
  background-color: bisque;
  padding: 1em 2em;
  text-align: center;
}

.widthCustom1 {
  min-width: 29em;
}
.widthCustom2 {
  min-width: 29em;
}
.hCustom {
  height: 100%;
  min-height: 100em;
}

.card {
  min-width: 25em;
  touch-action: none;
  background: blue;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 1em 2em;
  color: white;
  border-radius: 10px;
  opacity: 0;
  z-index: -1;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.card.showCard,
.card.placedCard {
  opacity: 1;
  z-index: 20;
}

.card.bg-green-200 {
  background-color: rgb(43 200 43);
}

.card.bg-red-300 {
  background-color: rgb(213, 8, 8);
}
</style>
