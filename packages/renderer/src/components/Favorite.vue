<script setup>
const props = defineProps({
  favorite: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link :to="{ name: props.favorite.link }" class="favorites-item">
    <img
      :src="props.favorite.image.favorite"
      :alt="`${props.favorite.name} image`"
    />
    <span>{{ props.favorite.name }}</span>
  </router-link>
</template>

<style></style>
