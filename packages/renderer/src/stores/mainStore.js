import { defineStore } from "pinia";
import { watch } from "vue";

export const mainStore = defineStore({
  id: "mainStore",
  state: () => {
    return {
      showDraw: false,
      apps: [],
    };
  },
  getters: {
    favoriteApps: (state) => state.apps.filter((app) => app.favorite === true),
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
