<script setup>
import { mainStore } from "../../stores/mainStore";

const store = mainStore();
const props = defineProps({
  app: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="app-item--text">
    <button @click.prevent="store.toggleFavorite(index)">
      <transition name="fadeZoom" mode="out-in">
        <svg
          v-if="!props.app.favorite"
          width="50"
          height="50"
          viewBox="0 0 13.229166 13.229166"
        >
          <path
            style="
              fill: currentColor;
              stroke: #ffffff;
              stroke-width: 0.68200075;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            id="path341"
            d="M 8.240201,7.6235866 7.1017999,8.8496026 7.4663855,10.482437 5.9485898,9.7786133 4.5083348,10.629929 4.7086866,8.9689255 3.4539744,7.8622325 5.0955943,7.5395001 5.7603945,6.004211 6.5746197,7.4657545 Z"
            transform="matrix(1.8061444,0.10814132,-0.08179168,1.758371,-3.3113482,-8.5033509)"
          />
        </svg>
        <svg v-else width="50" height="50" viewBox="0 0 13.229166 13.229166">
          <path
            style="
              fill: gold;
              stroke: gold;
              stroke-width: 0.68200075;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            id="path341"
            d="M 8.240201,7.6235866 7.1017999,8.8496026 7.4663855,10.482437 5.9485898,9.7786133 4.5083348,10.629929 4.7086866,8.9689255 3.4539744,7.8622325 5.0955943,7.5395001 5.7603945,6.004211 6.5746197,7.4657545 Z"
            transform="matrix(1.8061444,0.10814132,-0.08179168,1.758371,-3.3113482,-8.5033509)"
          />
        </svg>
      </transition>
    </button>
    <span>{{ props.app.name }}</span>
  </div>
  <img class="app-item--image" :src="props.app.image.preview" alt="map app" />
</template>

<style></style>
