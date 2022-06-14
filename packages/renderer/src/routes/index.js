import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../parent/Dashboard.vue"),
    children: [
      {
        path: "/dashboard/themes",
        name: "themes",
        component: () => import("../pages/dashboard/Themes.vue"),
      },
      {
        path: "/dashboard/screen-share",
        name: "screen-share",
        component: () => import("../pages/dashboard/ScreenShare.vue"),
      },
    ],
  },
  {
    path: "/app-launch",
    name: "app-launch",
    component: () => import("../parent/AppLaunch.vue"),
    redirect: {
      name: "test-app",
    },
    children: [
      {
        path: "",
        name: "test-app",
        component: () => import("../pages/app-launch/MainPage.vue"),
      },
      {
        path: "/app-launch/fact-finder",
        name: "fact-finder",
        component: () => import("../pages/app-launch/FactFinder.vue"),
      },
      {
        path: "/app-launch/g-poll",
        name: "g-poll",
        component: () => import("../pages/app-launch/GrayPoll.vue"),
      },
      {
        path: "/app-launch/whiteboard",
        name: "whiteboard",
        component: () => import("../pages/app-launch/Whiteboard.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
