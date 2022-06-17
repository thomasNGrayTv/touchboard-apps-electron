<script setup>
import CardStack from "../../components/CardStack.vue";
</script>

<template>
  <div id="factFinderContainer">
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
