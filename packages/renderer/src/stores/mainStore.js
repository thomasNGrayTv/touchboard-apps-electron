import { defineStore } from "pinia";

export const mainStore = defineStore({
  id: "mainStore",
  state: () => {
    return {
      showDraw: false,
    };
  },
  getters: {},
  actions: {
    toggleDrawView() {
      this.showDraw = !this.showDraw;
    },
  },
});
