import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";

import { createPinia } from "pinia";

import { createRouter, createWebHashHistory } from "vue-router";

import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app").$nextTick(window.removeLoading);
