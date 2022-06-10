<script setup>
import { ipcRenderer } from "electron";
import { onMounted, onUnmounted, ref } from "vue";

const startShareShow = ref(true);
const stopShareShow = ref(false);
const roomId = ref("");

function startShare() {
  console.log("started sharing");
  ipcRenderer.send("start-share", {});
  startShareShow.value = false;
  stopShareShow.value = true;
}

function stopShare() {
  console.log("stopped sharing");
  ipcRenderer.send("stop-share", {});
  startShareShow.value = true;
  stopShareShow.value = false;
}

onMounted(() => {
  ipcRenderer.on("uuid", (event, data) => {
    //make sure to share this value with others so they can join
    roomId.value = data;
  });
});

onUnmounted(() => {
  stopShare();
});
</script>

<template>
  <div class="pollsPage">
    <!-- <h1>New Gray Polls Page v1.6.5</h1> -->
    <div class="header">Screen Share</div>
    <div id="code" class="code">{{ roomId }}</div>
    <div class="container">
      <button v-if="startShareShow" class="btn" id="start" @click="startShare">
        Start Share
      </button>
      <button v-if="stopShareShow" class="btn" id="stop" @click="stopShare">
        Stop Share
      </button>
    </div>
  </div>
</template>

<style></style>
