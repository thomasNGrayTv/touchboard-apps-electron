<script setup>
import { onMounted, computed, ref } from "vue";
import themes from "./backups/themes.json";
import { themeStore } from "./stores/themeStore";

const primaryColor = ref("");
const secondaryColor = ref("");
const accentColor = ref("");
const background = ref("");
const backgroundType = ref("");

const cssVars = computed(() => {
  return {
    "--primary-color": primaryColor,
    "--secondary-color": secondaryColor,
    "--accent-color": accentColor,
  };
});

//api call brings in themes

//or use backup
const store = themeStore();
store.importThemes(themes);
store.changeTheme(themes[0]);

console.log(store.themeSelected);

primaryColor.value = store.themeSelected.primaryColor;
secondaryColor.value = store.themeSelected.secondaryColor;
accentColor.value = store.themeSelected.accentColor;
background.value = store.themeSelected.background;
backgroundType.value = store.themeSelected.backgroundType;
</script>

<template>
  <div class="rootContainer" :style="cssVars">
    <video
      v-if="backgroundType === 'video'"
      id="background-video"
      autoplay
      loop
      muted
      :poster="background"
    >
      <source :src="background" type="video/mp4" />
    </video>
    <img
      v-else-if="backgroundType === 'image'"
      id="background-image"
      :src="background"
      alt="background image"
    />
    <div
      class="background"
      v-else
      :style="{ backgroundColor: background }"
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

:root {
  --primary-color: blue;
  --secondary-color: red;
  --accent-color: yellow;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

::backdrop {
  background-color: transparent;
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
</style>
