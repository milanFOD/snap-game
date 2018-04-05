<template>
  <div class="card">
    <img :src="image" :width="width" :height="height" />
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    code: {
      type: String,
      required: true,
      validator(value) {
        return value.length === 2;
      }
    },
    width: {
      type: [String, Number],
      default: 250
    },
    height: {
      type: [String, Number]
    }
  },
  data() {
    return {
      shown: (this.code !== 'NA')
    };
  },
  computed: {
    image() {
      return this.shown
        ? `https://deckofcardsapi.com/static/img/${this.code}.png`
        : "https://i.pinimg.com/originals/6c/a0/16/6ca016115a894f69dea75cc80f95ad92.jpg";
    }
  },
  watch: {
      code: function() {
          this.shown = (this.code !== 'NA')
      }
  },
  methods: {
    flip() {
      this.shown = !this.shown;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
