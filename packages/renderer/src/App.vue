<script setup></script>

<template>
  <div class="rootContainer">
    <router-view></router-view>
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

@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
}

body {
  margin: 0;
  color: #062f6e;
  overflow: hidden;
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

.rootContainer button:active:not(.categories),
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
  /* background-color: darkgray; */
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
</style>
