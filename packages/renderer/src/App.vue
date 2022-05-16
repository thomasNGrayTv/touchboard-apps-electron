<script lang="ts" setup></script>

<template>
  <router-link :to="{ name: 'main-page' }">Main Page</router-link>
  <router-link :to="{ name: 'fact-finder' }">Fact Finder</router-link>
  <router-view></router-view>
</template>

<style>
body {
  box-sizing: border-box;
}

body a {
  margin: 1em;
}
</style>
