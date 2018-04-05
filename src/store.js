import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    pileXCards: []
  },
  getters: {
      getLastCard: state => {
        if (state.pileXCards.length > 0) {
            return state.pileXCards[state.pileXCards.length-1].slice("")[0];
        } else {
            return "NOLAST"
        }
      },
      getPenultimateCard: state => {
        if (state.pileXCards.length > 1) {
            return state.pileXCards[state.pileXCards.length-2].slice("")[0];
        } else {
            return "NOPENULTIMATE"
        }
      },
      areTwoLastCardsEqual: state => {
        return store.getters.getLastCard === store.getters.getPenultimateCard;
      }
  }
});