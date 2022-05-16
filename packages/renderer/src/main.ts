import { createApp } from "vue";
import App from "./App.vue";
import "./samples/node-api";

import { createPinia } from "pinia";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main-page",
    component: () => import("./pages/MainPage.vue"),
  },
  {
    path: "/saved-quotes",
    name: "saved-quotes",
    component: () => import("./pages/SavedQuotes.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app").$nextTick(window.removeLoading);
