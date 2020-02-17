<template>
    <v-container>
        <v-card tile :style="[cardStyle]">

            <!------------------------ Question and points obtained ------------------>
            <v-container>
                <v-layout class="mb-3">
                    <b class="ml-1"  style="font-size: 18px">Question: {{questionNumber}}</b>
                    <v-spacer/>
                    <b class="mr-5" :style="(this.isCorrect) ?'color: darkgreen' : 'color: red'">Points obtained:
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

                <v-flex class="ml-4 mt-1" xs12 sm8 offset-sm0>

                    <v-layout :key="index" v-for="(i,index) in options">
                        <v-textarea
                                rows="1"
                                auto-grow
                                dense
                                :background-color="optionBackgroundColor(index)"
                                v-model="options[index].text"
                                :dark="!!optionBackgroundColor(index)"
                                outlined
                                readonly
                        >
                        </v-textarea>
                    </v-layout>

                    <div v-if="!isCorrect">
                        <b>Correct Answer:</b>
                        <v-layout :key="index" v-for="(i,index) in correctOptionsArray">
                            <v-textarea
                                    rows="1"
                                    auto-grow
                                    dense
                                    background-color="light-green lighten-2"
                                    v-model="correctOptionsArray[index].text"
                                    outlined
                                    readonly
                            >
                            </v-textarea>
                        </v-layout>
                    </div>

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
            selectedOptionIndex: Number,
            isCorrect: Boolean,

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

            this.options.forEach((item) => {
                if (item.isCorrect) {
                    this.correctOptionsArray.push(item);
                }
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
                    if (this.selectedOptionIndex === index) {
                        return 'green'
                    }
                } else {
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
