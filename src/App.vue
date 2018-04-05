<template>
  <div id="app">
    
    <md-toolbar class="md-primary">
        <h1 class="md-title">{{ title }}</h1>
    </md-toolbar>
    
    <md-content>
      
      <md-button class="md-raised md-primary" v-if="show" v-on:click="deal">D e a l</md-button>
      <!--list errors if any -->
      <ul v-if="errors.length">
        <li v-for="(bloodyError, index) in bloodyErrors" :key="index">
          {{ bloodyError }}
        </li>
      </ul>
      <!--show stuff after dealing -->
      <div v-else>
        <div class="md-layout md-gutter" v-if="toDealorNotToDeal">
          <HandA class="md-layout-item" @putTheCardOnPile="putTheCardOnPile" v-bind:hand="deck"/>      
          <div class="md-layout-item">
            Big bad pile
            <br />
            <md-icon>arrow_downward</md-icon>
            <Pile class="md-layout-item" v-bind:cardCode="cardCode" v-bind:hand="deck"/>
          </div>       
          <HandB class="md-layout-item" @putTheCardOnPile="putTheCardOnPile" v-bind:hand="deck"/>
        </div>
      </div>

    </md-content>

  </div>
</template>

<script>
import HandA from './components/HandA'
import HandB from './components/HandB'
import Pile from './components/Pile'

export default {
  name: 'App',
  data() {
    return {
      title: 'Bloody Snap game',
      deck: {},
      errors: [],
      toDealorNotToDeal: false,
      show: true,
      cardCode: "NA"
    }
  },
  components: {
    HandA,
    HandB,
    Pile
  },
  methods: {
    deal: function (event) {
      this.axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        this.deck = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
      this.toDealorNotToDeal = true;
      // hide deal button when clicked
      this.show = false;
    },
    putTheCardOnPile: function (code) {
      this.cardCode = code;
      this.$store.state.pileXCards.push(this.cardCode);
      console.log(this.cardCode);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1.md-title {
  text-align:center;
  display: block;
  width: 100%;
}

.md-toolbar {
  margin-bottom: 50px;
}
</style>
