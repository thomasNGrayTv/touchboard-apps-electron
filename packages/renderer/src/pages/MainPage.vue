<script setup>
import { mainStore } from "../stores/mainStore";
import { ipcRenderer } from "electron";
import useAxiosHandler from "../composables/useAxiosHandler";
import CardStack from "../components/CardStack.vue";
import { onMounted } from "vue";
import quotesLocalData from "../backups/quotes.json";

const store = mainStore();

function addNeededFields(getCardsQuotes) {
  let stringifyData = JSON.stringify(getCardsQuotes);
  let copyData = JSON.parse(stringifyData);

  for (let i = 0; i < copyData.length; i++) {
    if (i === copyData.length - 1) {
      copyData[i].showCard = true;
    } else {
      copyData[i].showCard = false;
    }
    copyData[i].index = i;
    copyData[i].inTrue = false;
    copyData[i].inFalse = false;
  }
  return copyData;
}

async function getQuotes() {
  try {
    const getCardsQuotes = await useAxiosHandler().get("/quotes");
    const results = addNeededFields(getCardsQuotes.data.results);

    store.setCards(results);
  } catch (err) {
    console.log("Error from API: " + err);
  }
}

async function handleSave() {
  let content = "";
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
  // console.log("send: " + content);
  const reply = await ipcRenderer.invoke("create-a-file", content);
  console.log("reply: " + reply);
}

function checkInternetBeforeLoad() {
  store.cards = [];
  if (!window.navigator.onLine) {
    //some notification showing internet is down
    // alert("no internet connection - pulling in local data instead.");
    const results = addNeededFields(quotesLocalData.results);
    store.setCards(results);
  } else {
    getQuotes();
  }
}

onMounted(() => {
  console.log("Initially " + (window.navigator.onLine ? "on" : "off") + "line");

  checkInternetBeforeLoad();

  document
    .getElementById("statusCheck")
    .addEventListener("click", () =>
      alert("internet is " + (window.navigator.onLine ? "on" : "off") + "line")
    );
});
</script>

<template>
  <!-- <router-link class="underline ml-2" :to="{ name: 'saved-quotes' }"
    >True Quotes</router-link
  > -->
  <button v-if="store.cards.length" @click="handleSave()" class="btn-primary">
    Save to File
  </button>
  <button id="statusCheck" class="btn-primary">Status Check</button>
  <button @click="checkInternetBeforeLoad()" class="btn-primary">Reset</button>

  <CardStack></CardStack>
</template>

<style>
button {
  margin: 1em;
}
</style>
