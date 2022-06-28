import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../parent/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../parent/Dashboard.vue"),
    redirect: {
      name: "dashboard-main",
    },
    children: [
      {
        path: "/",
        name: "dashboard-main",
        component: () => import("../pages/dashboard/Main.vue"),
      },
      {
        path: "/dashboard-prelaunch",
        name: "dashboard-prelaunch",
        component: () => import("../pages/dashboard/Prelaunch.vue"),
      },
    ],
  },
  {
    path: "/app-launch",
    name: "app-launch",
    component: () => import("../parent/AppLaunch.vue"),
    redirect: {
      name: "fact-finder",
    },
    children: [
      {
        path: "",
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
      {
        path: "/app-launch/map",
        name: "map",
        component: () => import("../pages/app-launch/Map.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
