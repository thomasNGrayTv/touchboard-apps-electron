import { defineStore } from "pinia";
import { watch } from "vue";

export const mainStore = defineStore({
  id: "mainStore",
  state: () => {
    return {
      showDraw: false,
      apps: [],
      sideBarControls: "main",
      appUpdates: [
        {
          type: "outage",
          description: "Closings app is down. IT is aware of the problem",
        },
        {
          type: "new app",
          description: "Check out the new app we have for on-air polls!",
        },
      ],
    };
  },
  getters: {
    favoriteApps: (state) => state.apps.filter((app) => app.favorite === true),
    newerApps: (state) =>
      state.apps.filter((app) => {
        const newStartDate = new Date("2022-01-01");
        const appDate = new Date(app.created_at);
        if (appDate.setHours(0, 0, 0, 0) >= newStartDate.setHours(0, 0, 0, 0)) {
          return true;
        }
        return false;
      }),
    categories: (state) => {
      const categoriesArrays = state.apps.map((app) => app.categories);
      const categoriesUnique = [];

      categoriesArrays.forEach((cat) => {
        console.log(cat);
        cat.forEach((catInner) => {
          console.log(catInner);
          if (categoriesUnique.indexOf(catInner) === -1) {
            categoriesUnique.push(catInner);
          }
        });
      });
      categoriesUnique.push("Alphabetical");
      return categoriesUnique;
    },
  },
  actions: {
    toggleDrawView() {
      this.showDraw = !this.showDraw;
    },
    setApps(apps) {
      this.apps = apps;
    },
    toggleFavorite(index) {
      this.apps[index].favorite = !this.apps[index].favorite;
    },
    updateSideBar(page) {
      this.sideBarControls = page;
    },
  },
});

// watch(
//   mainStore.state,
//   (state) => {
//     localStorage.setItem("mainStore", JSON.stringify(state));
//   },
//   { deep: true }
// );

// const state = localStorage.getItem("mainStore");

// if (state) {
//   mainStore.state = JSON.parse(state);
// }
