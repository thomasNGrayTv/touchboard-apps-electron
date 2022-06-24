<script setup></script>

<template>
  <div
    class="background"
    :style="{
      backgroundImage: `url('/src/assets/backgroundImage.jpg')`,
    }"
  ></div>
  <div class="rootContainer">
    <router-view> </router-view>
  </div>
</template>

<style>
@import "./assets/css/dashboardStyles.css";
@import "./assets/css/navStyles.css";
@import "./assets/css/drawStyles.css";
@import "./assets/css/cardStyles.css";
@import "./assets/css/whiteboardStyles.css";
@import "./assets/css/formStyles.css";
@import "./assets/css/screenShare.css";
@import "./assets/css/pollStyles.css";
@import "./assets/css/loginStyles.css";
@import "./assets/css/prelaunchStyles.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
}

body {
  margin: 0;
  color: #062f6e;
}

h1,
h2,
h3 {
  font-weight: 700;
}

::backdrop {
  background-color: transparent;
}

.rootContainer {
  color: var(--primary-color);
}

.rootContainer a,
.rootContainer button {
  color: var(--accent-color);
}

.rootContainer button,
.rootContainer a {
  transition: all 0.43s ease;
  cursor: pointer;
}

.rootContainer button:active:not(.dropdown),
.rootContainer a:active {
  transform: scale(0.98);
}

.background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
}

#background-video,
#background-image {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.95;
}

header {
  position: absolute;
  top: 1px;
  z-index: 9999999;
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
  overflow: hidden;
}

/*ANIMATIONS*/

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fadeZoom-enter-from,
.fadeZoom-leave-to {
  opacity: 0;
  transform: scale(0);
}

.fadeZoom-enter-to,
.fadeZoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fadeZoom-enter-active,
.fadeZoom-leave-active {
  transition: all 0.2s ease;
}

.fadeFromAbove-enter-from,
.fadeFromAbove-leave-to {
  opacity: 0;
  transform: translateY(-3em);
}

.fadeFromAbove-enter-to,
.fadeFromAbove-leave-from {
  opacity: 1;
  transform: translateY(0em);
}

.fadeFromAbove-enter-active,
.fadeFromAbove-leave-active {
  transition: all 0.2s ease;
}

.fadeFromRight-enter-from,
.fadeFromRight-leave-to {
  opacity: 0;
  transform: translateX(3em);
}

.fadeFromRight-enter-to,
.fadeFromRight-leave-from {
  opacity: 1;
  transform: translateX(0em);
}

.fadeFromRight-enter-active,
.fadeFromRight-leave-active {
  transition: all 0.5s ease;
}
</style>
