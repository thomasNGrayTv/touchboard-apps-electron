<script setup>
import CardStack from "../../components/CardStack.vue";
import themes from "../../backups/themes.json";
import { storeToRefs } from "pinia";
import { themeStore } from "../../stores/themeStore";

const themesStore = themeStore();
const { themeSelected } = storeToRefs(themesStore);

themesStore.importThemes(themes);
//hard coded for now, but this would be a prop passed in from pre-launch
themesStore.changeTheme(themes[0]);
</script>

<template>
  <component is="style">
    .pollsPage { --primary-color: {{ themeSelected.primaryColor }};
    --secondary-color: {{ themeSelected.secondaryColor }}; --accent-color:
    {{ themeSelected.accent }}; }
  </component>
  <div
    class="background"
    :style="{ backgroundColor: themeSelected.background }"
  ></div>
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
