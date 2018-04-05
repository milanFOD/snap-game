<template>
    <div>
        <Card :code="code"></Card>
    </div>
</template>

<script>
import Card from './Card'

    export default {
        name: 'Pile',
        data() {
            return {
                code: "NA",
                pile: 'pileX'
            }
        },
        props: {
            cardCode: {
                type: String,
                default: null
            },
            hand: {
                type: Object
            }
        },
        components: {
            Card
        },
        watch: {
            cardCode: function() {
                this.code = this.cardCode;
                this.axios.get(`https://deckofcardsapi.com/api/deck/${this.hand.deck_id}/pile/`+this.pile+`/add/?cards=`+this.code)
                    .then(response => {
                    console.log(response.data.piles);
                })
            }
        }
    }
</script>

<style scoped>

</style>