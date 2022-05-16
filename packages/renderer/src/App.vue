<script lang="ts" setup>
import MainPage from "./pages/MainPage.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <MainPage></MainPage>
    </template>
    <template #fallback>
      <div class="loaderContainer relative flex w-24 h-7">
        Loading Cards....
      </div>
    </template>
  </Suspense>
</template>

<style>
body {
  box-sizing: border-box;
}
.loaderContainer {
  top: 2em;
  left: 1em;
  width: 98%;
  height: 100%;
}
</style>
