<script setup></script>

<template>
  <div class="rootContainer">
    <img
      id="background-image"
      src="https://touchscreen.gray.tv/modules/grayTouchScreenSetup/uploads/KWCH/b_87_bg_image.jpg"
      alt="background image"
    />
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

* {
  box-sizing: border-box;
}

body {
  margin: 0;
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
