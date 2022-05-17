<script setup></script>

<template>
  <h1>Main Page</h1>
  <p>
    <label for="name">Station Name:</label>
    <input type="text" id="name" name="station_name" />
  </p>
  <p>
    <label for="key">API Key:</label>
    <input type="text" id="key" name="station_key" />
  </p>
  <button>Submit</button>
</template>

<style>
label {
  display: block;
}
</style>
