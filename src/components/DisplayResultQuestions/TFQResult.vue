<template>
    <v-container>

        <!------------------------ Question and points obtained ------------------>
        <v-card tile :style="cardStyle">
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

                <v-flex class="ml-4 mt-1" xs12 sm4 offset-sm0>

                    <v-layout :key="i.value" v-for="i in options">
                        <v-text-field
                                rows="1"
                                auto-grow
                                :background-color="optionBackgroundColor(i.value)"
                                v-model="i.text"
                                solo
                                filled
                                :dark="!!optionBackgroundColor(i.value)"
                                readonly
                        >
                        </v-text-field>
                    </v-layout>

                </v-flex>

            </v-container>
        </v-card>
    </v-container>
</template>
<script>

    export default {
        props: {
            questionNumber: Number,
            questionText: String,
            points: Number,
            selectedOption: Boolean,
            correct: Boolean
        },
        data: () => {
            return {
                options: [{text: "True", value: true}, {text: "False", value: false}],
                cardStyle: {
                    'border-left': '8px solid red'
                },
            }
        },
        mounted() {
            if (this.correct) {
                this.cardStyle = {
                    'border-left': '8px solid green'
                }
            }
        },
        methods: {
            optionBackgroundColor(i) {

                if (this.correct) {
                    if (this.selectedOption === i) {
                        return 'green'
                    }
                } else {
                    if (this.selectedOption === i) {
                        return 'red'
                    }
                    if (!this.selectedOption === i) {
                        return 'green'
                    }
                }

            }

        }
    }
</script>
