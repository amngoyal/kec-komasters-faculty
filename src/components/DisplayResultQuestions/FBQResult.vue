<template>
    <v-container>
        <v-card tile :style="[cardStyle]">

            <!------------------------ Question and points obtained ------------------>
            <v-container>
                <v-layout class="mb-3">
                    <b class="ml-1" style="font-size: 18px">Question: {{questionNumber}}</b>
                    <v-spacer/>
                    <b class="mr-5" style="font-size: 18px;"
                       :style="(this.isCorrect) ?'color: darkgreen' : 'color: red'">Points obtained:
                        {{pointsObtained}}</b>
                </v-layout>

                <v-textarea
                        rows="1"
                        auto-grow
                        v-model="questionText"
                        outlined
                        readonly
                ></v-textarea>


                <!-------------------- Options View ---------------------->


                <v-flex class="ml-2 mt-1" :key="blankIndex" v-for="(blank,blankIndex) in options" xs12 sm8 offset-sm0>

                    <b>Options for Blank {{blankIndex+1}}</b>

                    <v-textarea
                            v-for="(i) in blank" :key="i.id"
                            rows="1"
                            auto-grow
                            dense
                            :background-color="optionBackgroundColor(i.isCorrect,i.id)"
                            v-model="i.text"
                            outlined
                            :dark="!!optionBackgroundColor(i.isCorrect,i.id)"
                            readonly
                    >
                    </v-textarea>
                </v-flex>

            </v-container>
        </v-card>
    </v-container>

</template>
<script>

    export default {
        props: {
            questionText: String,
            options: Array,
            questionNumber: Number,
            points: Number,
            isCorrect: Boolean,
            isSelected: Array

        },
        data: () => {
            return {

                cardStyle: {
                    'border-left': '8px solid red'
                },
                correctOptionsArray: []
            }
        },
        computed: {
            pointsObtained() {
                return this.isCorrect ? this.points : 0
            }
        },
        mounted() {

            if (this.isCorrect) {
                this.cardStyle = {
                    'border-left': '8px solid green'
                }
            }
        },
        methods: {
            optionBackgroundColor(isCorrect, id) {
                if (isCorrect) {
                    if (this.isCorrect)
                        return 'green'
                    else return 'light-green'
                } else {
                    if (this.isSelected.filter(item => {
                        return item.option.id === id
                    }).length !== 0) {
                        return 'red lighten-1'
                    }
                }
            }

        }

    }
</script>
<style scoped>
</style>
