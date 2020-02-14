<template>
    <v-container>
        <v-card tile :style="[cardStyle]">

            <!------------------------ Question and points obtained ------------------>
            <v-container>
                <v-layout>
                    <p class="ml-1">Question {{questionNumber}}</p>
                    <v-spacer/>
                    <p class="mr-5" :style="(this.correct) ?'color: darkgreen' : 'color: red'">Points obtained:
                        {{points}}</p>
                </v-layout>

                <v-textarea
                        rows="1"
                        auto-grow
                        v-model="questionText"
                        solo
                        readonly
                ></v-textarea>


                <!-------------------- Options View ---------------------->

                <v-flex class="ml-4 mt-1" xs12 sm8 offset-sm0>

                    <v-layout :key="index" v-for="(i,index) in options">
                        <v-textarea
                                rows="1"
                                auto-grow
                                :background-color="optionBackgroundColor(index)"
                                v-model="optionsText[index]"
                                solo
                                filled
                                :dark="!!optionBackgroundColor(index)"
                                readonly
                        >
                        </v-textarea>
                    </v-layout>

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
            selectedOptionIndex: Array,
            isCorrect: Boolean
        },
        data: () => {
            return {
                correct: '',
                cardStyle: {
                    'border-left': '8px solid red'
                },
                optionsText: []
            }
        },
        mounted() {

            this.options.forEach((item,index)=>{
                this.optionsText.push(item.text);
                if(item.isCorrect)
                    this.correctOptionIndex = index
            });

            if (this.isCorrect) {
                this.cardStyle = {
                    'border-left': '8px solid green'
                }
            }
        },
        methods: {
            optionBackgroundColor(index) {
                if (this.isCorrect) {
                    if (this.correctOptionIndex === index) {
                        return 'green'
                    }
                } else {
                    if (this.correctOptionIndex === index) {
                        return 'green'
                    }
                    if (this.selectedOptionIndex === index) {
                        return 'red'
                    }
                }

            }

        }

    }
</script>
<style scoped>
</style>
