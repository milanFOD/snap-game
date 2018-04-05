<template>
  <div>
    <div v-if="handDealt">
      {{ someText }}
      <Card code="NA"/>
      <md-button class="md-raised md-primary" v-on:click="drawCard">D r a w</md-button>
      <md-button class="md-raised md-primary" v-on:click="snapThisBitch">S n a p</md-button>
    </div>
    <div v-else>
      <h2>Patience my friend!</h2>
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'HandB',
  props: {
    hand: {
        type: Object
    }
  },
  data () {
    return {
      someText: 'This is a second pile of cards',
      cardCode: "NA",
      handDealt: false,
      pile: 'pileB'
    }
  },
  components: {
    Card
  },
  watch: {
    hand: function () {
      var i = 0;
      var promises = [];
      var cards = [];
      // deal one card to deck A one card to deck B
      for (i = 0; i < 52; i++) { 
        if (i%2 !== 0) {
          promises.push(
            this.axios.get('https://deckofcardsapi.com/api/deck/'+this.hand.deck_id+'/draw/?count=1')
          )
        }
      }
      var vm = this;
      this.axios.all(promises).then(function(results) {
        results.forEach(function(response) {
            // add cards for pile A
            cards.push(response.data.cards[0].code);
        })
        vm.axios.get(`https://deckofcardsapi.com/api/deck/`+vm.hand.deck_id+`/pile/`+vm.pile+`/add/?cards=`+cards.join())
        .then(response => {
          console.log(response.data);
          vm.handDealt = true;
        })
      })
    }
  },
  methods: {
    snapThisBitch: function () {
      if (this.$store.getters.areTwoLastCardsEqual) {
        // do some funky shit
        // remove from common pile
        this.axios.get(`https://deckofcardsapi.com/api/deck/${this.hand.deck_id}/pile/pileX/draw/?cards=`+this.$store.state.pileXCards.join())
        // add to this pile
        this.axios.get(`https://deckofcardsapi.com/api/deck/${this.hand.deck_id}/pile/${this.pile}/add/?cards=`+this.$store.state.pileXCards.join())
        .then(response => {
          console.log(response.data.piles[this.pile].remaining);
        })
        this.$store.state.pileXCards = [];
        alert('You bloody snapped it!');
      } else {
        alert('More luck next time :(');
      }
    },
    drawCard: function () {
      this.axios.get(`https://deckofcardsapi.com/api/deck/${this.hand.deck_id}/pile/${this.pile}/draw/?count=1`)
      .then(response => {
        console.log(response.data.piles[this.pile].remaining);
        this.cardCode = response.data.cards[0].code;
        this.$emit("putTheCardOnPile", response.data.cards[0].code);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
