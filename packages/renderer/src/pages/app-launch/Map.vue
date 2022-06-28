<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";

onMounted(() => {
  // Your access token can be found at: https://cesium.com/ion/tokens.
  // This is the default access token from your ion account

  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiODQxMTAzYS1jMTQwLTQ2NjgtYmMxNi05NTljNGZiNzAxZTEiLCJpZCI6OTkyMjksImlhdCI6MTY1NjM1MjkyMn0.At7x7Vt7_vdLlSp0IE29Fhmgm4BjjZqyev3PS1E7TOs";

  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: Cesium.createWorldTerrain(),
  });
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = viewer.scene.primitives.add(
    Cesium.createOsmBuildings()
  );
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });
});
</script>

<template>
  <div id="cesiumContainer"></div>
</template>
