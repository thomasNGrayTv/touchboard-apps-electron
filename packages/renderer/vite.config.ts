import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import resolve from "vite-plugin-resolve";
import electron from "vite-plugin-electron/renderer";
import pkg from "../../package.json";
import path from "path"; //lmw add 1
const externalGlobals = require("rollup-plugin-external-globals"); //lmw add 2

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    vue(),
    electron(),
    resolve(
      /**
       * Here you can specify other modules
       * 🚧 You have to make sure that your module is in `dependencies` and not in the` devDependencies`,
       *    which will ensure that the electron-builder can package it correctly
       */
      {
        // If you use electron-store, this will work - ESM format code snippets
        "electron-store":
          'const Store = require("electron-store"); export default Store;',
      }
    ),
  ],
  base: "./",
  build: {
    outDir: "../../dist/renderer",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ["cesium"], //lmw add 6 does not allow cesium to be compiled again
      plugins: [
        externalGlobals({
          cesium: "Cesium", //lmw add 7 uses the introduced cesium to correspond to the cesium in the code
        }),
      ],
    },
  },
  resolve: {
    alias: {
      cesium: path.resolve(__dirname, "./public/lib/Cesium/Cesium.js"), //lmw add 3 tells vite how to introduce cesium when it is not compiled
    },
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
    fs: {
      strict: false, //lmw add 4 eliminates the warning of introducing cesium into html files
    },
  },
  optimizeDeps: {
    include: ["cesium"], //lmw add 5 build cesium js
  },
});
