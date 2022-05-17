import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main-page",
    component: () => import("../pages/MainPage.vue"),
  },
  {
    path: "/fact-finder",
    name: "fact-finder",
    component: () => import("../pages/FactFinder.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
