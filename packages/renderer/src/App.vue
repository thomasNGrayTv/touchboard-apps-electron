<script setup>
import { defineAsyncComponent } from "vue";
import NavBar from "./components/NavBar.vue";
import { mainStore } from "./stores/mainStore";

const store = mainStore();

const DrawTool = defineAsyncComponent(() =>
  import("./components/DrawTool.vue")
);
</script>

<template>
  <NavBar></NavBar>
  <div class="mainAppContainer">
    <router-view></router-view>
    <DrawTool v-if="store.showDraw"></DrawTool>
  </div>
</template>

<style>
@import "./assets/css/navStyles.css";
@import "./assets/css/drawStyles.css";
@import "./assets/css/cardStyles.css";
@import "./assets/css/whiteboardStyles.css";

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
</style>
