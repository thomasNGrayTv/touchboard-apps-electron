<script setup>
import { ref } from "vue";
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
const showCategoryDropDown = ref(false);
</script>

<template>
  <div class="controlsContainer">
    <button
      @click="showCategoryDropDown = !showCategoryDropDown"
      class="btn dropdown categories"
      :class="{ showDropDown: showCategoryDropDown }"
    >
      <span>Categories</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 13.229166 13.229166"
        version="1.1"
        id="svg5"
      >
        <path
          style="
            fill: currentColor;
            stroke: none;
            stroke-width: 1.66639;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          d="m 1.124479,4.630208 h 10.980209 l -2.7014793,3.042708 -2.70148,3.042708 z"
          id="path5454"
        />
      </svg>
      <transition name="fadeFromAbove" mode="out-in">
        <ul class="btnList" v-if="showCategoryDropDown">
          <li v-for="(category, index) in store.categories" :key="index">
            <button class="btn">{{ category }} - 5</button>
          </li>
        </ul>
      </transition>
    </button>
    <button class="btn">
      <span>News Blurb</span>
    </button>
  </div>
</template>

<style></style>
