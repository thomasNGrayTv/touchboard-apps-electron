import { defineStore } from "pinia";

export const pollStore = defineStore({
  id: "pollStore",
  state: () => {
    return {
      pollData: [],
    };
  },
  getters: {},
  actions: {
    setPollData(data) {
      this.pollData = data;
    },
    updatePollData(index, data) {
      const bar = this.pollData[index];
      console.log(this.pollData);
      bar.percent = data;
      console.log(bar);
      this.pollData.splice(index, 1, bar);
    },
  },
});
