import { defineStore } from "pinia";

export const themeStore = defineStore({
  id: "themeStore",
  state: () => {
    return {
      themes: [],
      themeSelected: {},
    };
  },
  getters: {},
  actions: {
    changeTheme(theme) {
      console.log(theme);
      this.themeSelected = theme;
    },
    importThemes(themes) {
      this.themes = themes;
    },
  },
});
