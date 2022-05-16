import { defineStore } from "pinia";

export const mainStore = defineStore({
  id: "mainStore",
  state: () => {
    return {
      cards: [],
      savedCards: [],
      falseCards: [],
      currentZ: 20,
    };
  },
  getters: {},
  actions: {
    incrementZ() {
      this.currentZ++;
    },
    setCards(cards) {
      this.cards = cards;
    },
    addToSavedCards(card) {
      const index = card.index;
      this.cards[index].inTrue = true;

      const alreadyThere = this.cards.some(
        (c) => c.showCard === true && c.inFalse === false && c.inTrue === false
      );
      if (!alreadyThere) {
        const found = this.cards.find(
          (c) => c.index !== index && c.showCard === false
        );

        if (found !== undefined && this.cards[found.index] !== undefined) {
          this.cards[found.index].showCard = true;
        }
      }

      // if (!this.savedCards.some((c) => c._id == card._id)) {
      //   this.savedCards.push(card);
      //   // this.cards = this.cards.filter((c) => c._id !== card._id);
      // }
    },
    addToCards(card) {
      const index = card.index;
      const indexFound = this.cards.findIndex(
        (c) =>
          c.index !== index && c.showCard == true && !c.inTrue && !c.inFalse
      );

      console.log("drag index: " + index);
      console.log("Found: " + indexFound);

      if (indexFound !== undefined && indexFound !== index && indexFound >= 0) {
        this.cards[indexFound].showCard = false;
      }

      this.cards[index].inTrue = false;
      this.cards[index].inFalse = false;
    },
    removeFromCards(card) {
      const index = card.index;
      this.cards[index].inFalse = true;
      const alreadyThere = this.cards.some(
        (c) => c.showCard === true && c.inFalse === false && c.inTrue === false
      );
      if (!alreadyThere) {
        const found = this.cards.find(
          (c) => c.index !== index && c.showCard === false
        );
        if (found !== undefined) {
          this.cards[found.index].showCard = true;
        }
      }

      // if (!this.falseCards.some((c) => c._id == card._id)) {
      //   this.falseCards.push(card);
      // }
      // this.cards = this.cards.filter((c) => c._id !== card.id);
    },
  },
});
