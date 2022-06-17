import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../parent/Dashboard.vue"),
    redirect: {
      name: "login",
    },
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../pages/dashboard/LoginView.vue"),
      },
      {
        path: "/dashboard-main",
        name: "dashboard-main",
        component: () => import("../pages/dashboard/Main.vue"),
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
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
