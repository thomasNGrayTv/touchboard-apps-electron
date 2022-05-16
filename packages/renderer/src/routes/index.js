export const routes = [
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
