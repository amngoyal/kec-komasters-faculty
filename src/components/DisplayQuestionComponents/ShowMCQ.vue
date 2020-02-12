<template>
    <v-container>
        <v-card flat outlined>

            <!------------------------ Question and points obtained ------------------>
            <v-container>
                <v-layout>
                    <p class="ml-1">Question: {{questionNumber}}</p>
                    <v-spacer/>
                    <p class="mr-5">Points:
                        {{points}}</p>
                </v-layout>

                <v-textarea
                        rows="1"
                        auto-grow
                        v-model="questionText"
                        outlined
                        readonly
                ></v-textarea>


                <!-------------------- Options View ---------------------->

                <v-flex class="ml-2 mt-1" xs12 sm8 offset-sm0>

                    <v-layout :key="index" v-for="(i,index) in options">
                        <v-textarea
                                rows="1"
                                auto-grow
                                :background-color="optionBackgroundColor(index)"
                                v-model="options[index]"
                                outlined
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
            questionNumber: Number,
            questionText: String,
            points: Number,
            selectedOptionIndex: Number,
            options: Array,
            correctOptionIndex: Number
        },
        data: () => {
            return {
            }
        },

        methods: {
            optionBackgroundColor(index) {

                if (this.correctOptionIndex === index) {
                    return 'green'
                }


            }

        }

    }
</script>
<style scoped>
</style>
