<script setup>
import { factStore } from "../../stores/factStore";
import { ipcRenderer } from "electron";
import CardStack from "../../components/CardStack.vue";

const store = factStore();

async function handleSave() {
  let content = "";
  console.log(store.cards);
  for (var i = 0; i < store.cards.length; i++) {
    if (store.cards[i].inTrue) {
      content += `TRUE: \r\n`;
      content += `"${store.cards[i].content}" \r\n`;
      content += `- ${store.cards[i].author} \r\n \r\n`;
    } else if (store.cards[i].inFalse) {
      content += `FALSE: \r\n`;
      content += `"${store.cards[i].content}" \r\n`;
      content += `- ${store.cards[i].author} \r\n \r\n`;
    }
  }

  console.log(content);

  const reply = await ipcRenderer.invoke("create-a-file", content);
  console.log("reply: " + reply);
}
</script>

<template>
  <div id="factFinderContainer">
    <button
      v-if="store.cards.length"
      @touchstart.prevent="handleSave()"
      @click.prevent="handleSave()"
      class="btn-primary"
    >
      Save to File
    </button>
    <button id="statusCheck" class="btn-primary">Status Check</button>

    <Suspense>
      <template #default>
        <CardStack></CardStack>
      </template>
      <template #fallback>
        <div class="loaderContainer">Loading Quotes....</div>
      </template>
    </Suspense>
  </div>
</template>

<style></style>
