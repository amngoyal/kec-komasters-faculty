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
                        label="Question"
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
                                dense
                                :background-color="options[index].isCorrect? 'green': 'white'"
                                v-model="options[index].text"
                                outlined
                                :dark="options[index].isCorrect"
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
            options: Array,
        },
        data: () => {
            return {}
        },

        methods: {}

    }
</script>
<style scoped>
</style>
