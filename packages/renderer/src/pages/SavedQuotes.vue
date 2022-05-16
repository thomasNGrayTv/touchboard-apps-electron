<script setup>
import { mainStore } from "../stores/mainStore";
import { ref } from "vue";
import { ipcRenderer } from "electron";
// import { ipcRenderer } from "electron";
import Card from "../components/Card.vue";
defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const store = mainStore();

let content = ref("");

for (var i = 0; i < store.savedCards.length; i++) {
  content.value += `"${store.savedCards[i].content}" \r\n`;
  content.value += `- ${store.savedCards[i].author} \r\n`;
}

async function handleSave(content) {
  // console.log("send: " + content);
  const reply = await ipcRenderer.invoke("create-a-file", content);
  console.log("reply: " + reply);
  // ipcRenderer.on("eventFromCreateFile", (event, arg) => {
  //   console.log("response: " + arg);
  // });
}
</script>

<template>
  <router-link class="underline ml-2" :to="{ name: 'main-page' }"
    >Main Page</router-link
  >
  <button
    v-if="store.savedCards.length"
    @click="handleSave(content)"
    class="btn-primary block m-2"
  >
    Save to File
  </button>
  <div class="trueContain flex flex-wrap w-full h-full ml-4">
    <Card
      v-for="(card, index) in store.savedCards"
      :key="card"
      :card="card"
      :is-current="index === store.savedCards.length - 1"
      :style="{ position: 'relative', top: '1em' }"
    ></Card>
  </div>
</template>

<style>
.trueContain {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-left: 1em;
}
</style>
