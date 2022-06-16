<script setup>
import themes from "./backups/themes.json";
import { storeToRefs } from "pinia";
import { themeStore } from "./stores/themeStore";

//api call brings in themes

//or use backup
const store = themeStore();
const { themeSelected } = storeToRefs(store);

store.importThemes(themes);
store.changeTheme(themes[0]);
</script>

<template>
  <component is="style">
    :root { --primary-color: {{ themeSelected.primaryColor }};
    --secondary-color: {{ themeSelected.secondaryColor }}; --accent-color:
    {{ themeSelected.accent }}; }
  </component>
  <div class="rootContainer">
    <video
      v-if="themeSelected.backgroundType === 'video'"
      id="background-video"
      autoplay
      loop
      muted
      :poster="themeSelected.background"
    >
      <source :src="themeSelected.background" type="video/mp4" />
    </video>
    <img
      v-else-if="themeSelected.backgroundType === 'image'"
      id="background-image"
      :src="themeSelected.background"
      alt="background image"
    />
    <div
      class="background"
      v-else
      :style="{ backgroundColor: themeSelected.background }"
    ></div>
    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/css/navStyles.css";
@import "./assets/css/drawStyles.css";
@import "./assets/css/cardStyles.css";
@import "./assets/css/whiteboardStyles.css";
@import "./assets/css/formStyles.css";
@import "./assets/css/screenShare.css";
@import "./assets/css/pollStyles.css";

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
