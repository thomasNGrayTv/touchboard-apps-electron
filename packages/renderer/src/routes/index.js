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
  {
    path: "/g-poll",
    name: "g-poll",
    component: () => import("../pages/GrayPoll.vue"),
  },
  {
    path: "/whiteboard",
    name: "whiteboard",
    component: () => import("../pages/Whiteboard.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
