<script setup>
import Card from "./Card.vue";
import { onMounted } from "vue";
import useAxiosHandler from "../composables/useAxiosHandler";
import { factStore } from "../stores/factStore";

const store = factStore();

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

try {
  const getCardsQuotes = await useAxiosHandler().get("/quotes");
  const results = addNeededFields(getCardsQuotes.data.results);

  store.setCards(results);
} catch (err) {
  console.log("Error from API: " + err);
}

onMounted(() => {
  console.log("Initially " + (window.navigator.onLine ? "on" : "off") + "line");

  document
    .getElementById("statusCheck")
    .addEventListener("click", () =>
      alert("internet is " + (window.navigator.onLine ? "on" : "off") + "line")
    );
});
</script>

<template>
  <div class="cards">
    <div class="zone">
      <h2 class="text-4xl text-center">True</h2>
      <div class="leftCustom1 widthCustom1 hCustom dropzone saveDropZone"></div>
    </div>
    <div class="cardContainer dropzone">
      <Card
        v-for="(card, index) in store.cards"
        :key="card"
        :card="card"
        :data-card="JSON.stringify(card)"
        :style="{
          top: '2em',
          left: '-5px',
          position: 'absolute',
        }"
        :class="{ showCard: card.showCard }"
        :id="'card' + index"
      ></Card>
    </div>
    <div class="zone">
      <h2 class="text-4xl text-center">False</h2>
      <div
        class="leftCustom2 widthCustom2 hCustom dropzone trashDropZone"
      ></div>
    </div>
  </div>
</template>

<style>
.cards {
  top: 2em;
  left: 1em;
  width: 100%;
  min-width: 100em;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.cardContainer {
  position: relative;
  width: 30em;
  height: 100%;
  min-height: 100em;
}

.dropzone:not(.cardContainer) {
  margin: 1em;
  text-align: center;
}

h2 {
  background-color: bisque;
  padding: 1em 2em;
  text-align: center;
}

.widthCustom1 {
  min-width: 29em;
}
.widthCustom2 {
  min-width: 29em;
}
.hCustom {
  height: 100%;
  min-height: 100em;
}
</style>
