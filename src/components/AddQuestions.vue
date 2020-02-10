<template>
    <div>
        <!---------------------  Stepper  ------------------->

        <v-stepper v-model="step" vertical>

            <v-stepper-step :complete="step > 1" step="1" :editable=true>
                Easy Level
                <small>Enter all easy level questions</small>
            </v-stepper-step>

            <v-stepper-content step="1" class=" pa-1 mr-1">

                <v-card flat outlined color="grey lighten-3" class="mb-6">
                    <div class="d-flex justify-center text-center" v-if="easyLevelQuizData.quizQuestions.length === 0">
                        <p class="mt-6 grey--text">There is no question added. Click Add Question button to add
                            questions.</p>
                    </div>

                    <quiz ref="easyQuizComponent" v-model="easyLevelQuizData" v-on:input="createFinalQuizData"></quiz>
                </v-card>

                <v-btn
                        block
                        class="mb-4"
                        style="border-radius: 8px"
                        color="primary"
                        @click="onEasyLevelContinuePress"
                >
                    Continue to Medium level
                </v-btn>

            </v-stepper-content>


            <v-stepper-step :complete="step > 2" step="2" :editable="mediumEditable">
                Medium Level
                <small>Enter all easy level questions</small>
            </v-stepper-step>

            <v-stepper-content step="2" class=" pa-1 mr-1">

                <v-card flat outlined color="grey lighten-3" class="mb-6">
                    <div class="d-flex justify-center text-center"
                         v-if="mediumLevelQuizData.quizQuestions.length === 0">
                        <p class="mt-6 grey--text">There is no question added. Click Add Question button to add
                            questions.</p>
                    </div>

                    <quiz ref="mediumQuizComponent" v-model="mediumLevelQuizData"
                          v-on:input="createFinalQuizData"></quiz>
                </v-card>

                <v-btn
                        block
                        class="h6 mb-4"
                        style="border-radius: 8px"
                        color="primary"
                        @click="onMediumLevelContinuePress"
                >
                    Continue to Hard level
                </v-btn>

            </v-stepper-content>


            <v-stepper-step step="3" :editable="hardEditable">
                Hard Level
                <small>Enter all easy level questions</small>
            </v-stepper-step>

            <v-stepper-content step="3" class=" pa-1 mr-1">

                <v-card flat outlined color="grey lighten-3" class="mb-6">
                    <div class="d-flex justify-center text-center" v-if="hardLevelQuizData.quizQuestions.length === 0">
                        <p class="mt-6 grey--text">There is no question added. Click Add Question button to add
                            questions.</p>
                    </div>

                    <quiz ref="hardQuizComponent" v-model="hardLevelQuizData" v-on:input="createFinalQuizData"></quiz>
                </v-card>

                <v-btn block
                       class="h6 mb-4"
                       style="border-radius: 8px"
                       color="primary"
                       @click="onHardLevelContinuePress"
                >
                    Continue to Submit Quiz
                </v-btn>

            </v-stepper-content>

        </v-stepper>


        <!------------------ Snackbar ------------------->

        <v-snackbar
                v-model="snackbar"

        >
            {{ snackbarText }}
            <v-btn
                    color="primary"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>


    </div>
</template>
<script>
    import Quiz from '../components/Quiz'

    export default {

        data() {
            return {

                step: "1",
                multiLevelQuizScope: {value: ["All"]},

                snackbar: false,
                snackbarText: '',

                easyLevelQuizData: {
                    "quizQuestions": [],
                    "quizValidation": false
                },
                mediumLevelQuizData: {
                    "quizQuestions": [],
                    "quizValidation": false
                },
                hardLevelQuizData: {
                    "quizQuestions": [],
                    "quizValidation": false
                },


                cardStyle: {
                    'border-left': '5px solid red',
                    'border-top': '5px solid red',
                },

                mediumEditable: false,
                hardEditable: false,


                easyLevelPoints: 0,
                mediumLevelPoints: 0,
                hardLevelPoints: 0,

                finalQuizData: "",

            }
        },
        components: {
            quiz: Quiz,
        },
        mounted() {

        },

        methods: {

            onEasyLevelContinuePress() {
                if (this.easyLevelQuizData.quizQuestions.length === 0) {

                    this.showSnackbar("Please Enter atleast one question in Easy level");

                } else {

                    if (this.easyLevelQuizData.quizValidation) {
                        this.step = "2";
                        this.mediumEditable = true;
                    } else {
                        this.showSnackbar("Please check and fill each field of every question in Easy level quiz");
                    }
                }
            },

            onMediumLevelContinuePress() {
                if (this.mediumLevelQuizData.quizQuestions.length === 0) {

                    this.showSnackbar("Please Enter atleast one question in Medium level");

                } else {

                    if (this.mediumLevelQuizData.quizValidation) {
                        this.step = "3";
                        this.hardEditable = true;
                    } else {
                        this.showSnackbar("Please check and fill each field of every question in Medium level quiz");
                    }
                }
            },

            onHardLevelContinuePress() {
                if (this.hardLevelQuizData.quizQuestions.length === 0) {

                    this.showSnackbar("Please Enter atleast one question in Hard level");

                } else {

                    if (this.hardLevelQuizData.quizValidation) {

                        let step = 3;
                        this.$root.$emit("change_step_of_createQuiz", step);

                    } else {
                        this.showSnackbar("Please check and fill each field of every question in Hard level quiz");
                    }
                }
            },

            calculateTotalPoints() {
                this.easyLevelPoints = 0;
                this.mediumLevelPoints = 0;
                this.hardLevelPoints = 0;
                this.easyLevelQuizData.quizQuestions.forEach((item) => {
                    this.easyLevelPoints += item.points
                });

                this.mediumLevelQuizData.quizQuestions.forEach((item) => {
                    this.mediumLevelPoints += item.points
                });

                this.hardLevelQuizData.quizQuestions.forEach((item) => {
                    this.hardLevelPoints += item.points
                });
            },

            createFinalQuizData() {

                this.calculateTotalPoints();

                let questions = [];

                this.easyLevelQuizData.quizQuestions.forEach((item, index) => {

                    if (item.questionType === 'mcq') {

                        questions.push({
                            statement: item.question,
                            position: index,
                            points: item.points,
                            level: 1,
                            type: 1,
                            options: item.options,
                        })
                    }


                    if (item.questionType === 'msq') {

                        questions.push({
                            statement: item.question,
                            position: index,
                            points: item.points,
                            level: 1,
                            type: 2,
                            options: item.options,

                        })
                    }

                    if (item.questionType === 'fbq') {

                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 1,
                            type: 3,
                            options: item.options
                        })
                    }


                    if (item.questionType === 'tfq') {
                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 1,
                            type: 4,
                            options: [
                                {text: 'True', isCorrect: item.answer, index: 0},
                                {text: 'False', isCorrect: !item.answer, index: 1}
                            ]
                        })
                    }

                });

                this.mediumLevelQuizData.quizQuestions.forEach((item, index) => {
                    if (item.questionType === 'mcq') {

                        questions.push({
                            statement: item.question,

                            position: index,
                            points: item.points,
                            level: 2,
                            type: 1,
                            options: item.options,
                        })
                    }


                    if (item.questionType === 'msq') {

                        questions.push({
                            statement: item.question,

                            position: index,
                            points: item.points,
                            level: 2,
                            type: 2,
                            options: item.options,

                        })
                    }

                    if (item.questionType === 'fbq') {


                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 2,
                            type: 3,
                            options: item.options
                        })
                    }


                    if (item.questionType === 'tfq') {
                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 2,
                            type: 4,
                            options: [
                                {text: 'True', isCorrect: item.answer, index: 0},
                                {text: 'False', isCorrect: !item.answer, index: 1}
                            ]
                        })
                    }

                });

                this.hardLevelQuizData.quizQuestions.forEach((item, index) => {
                    if (item.questionType === 'mcq') {

                        questions.push({
                            statement: item.question,

                            position: index,
                            points: item.points,
                            level: 3,
                            type: 1,
                            options: item.options,
                        })
                    }


                    if (item.questionType === 'msq') {

                        questions.push({
                            statement: item.question,

                            position: index,
                            points: item.points,
                            level: 3,
                            type: 2,
                            options: item.options,

                        })
                    }

                    if (item.questionType === 'fbq') {


                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 3,
                            type: 3,
                            options: item.options
                        })
                    }


                    if (item.questionType === 'tfq') {
                        questions.push({
                            statement: item.question,

                            points: item.points,
                            position: index,
                            level: 3,
                            type: 4,
                            options: [
                                {text: 'True', isCorrect: item.answer, index: 0},
                                {text: 'False', isCorrect: !item.answer, index: 1}
                            ]
                        })
                    }

                });

                this.finalQuizData = {
                    numberOfEasyLevelQuestions: this.easyLevelQuizData.quizQuestions.length,
                    numberOfMediumLevelQuestions: this.mediumLevelQuizData.quizQuestions.length,
                    numberOfHardLevelQuestions: this.hardLevelQuizData.quizQuestions.length,

                    totalEasyLevelQuizPoints: this.easyLevelPoints,
                    totalMediumLevelQuizPoints: this.mediumLevelPoints,
                    totalHardLevelQuizPoints: this.hardLevelPoints,

                    validation: (this.easyLevelQuizData.quizValidation && this.mediumLevelQuizData.quizValidation && this.hardLevelQuizData.quizValidation),

                    totalPoints: this.easyLevelPoints + this.mediumLevelPoints + this.hardLevelPoints,
                    totalQuestions: this.easyLevelQuizData.quizQuestions.length + this.mediumLevelQuizData.quizQuestions.length + this.hardLevelQuizData.quizQuestions.length,

                    questions: questions,

                };


                this.$emit("input", this.finalQuizData);

            },


            showSnackbar(msg) {
                this.snackbarText = msg;
                this.snackbar = true;
            },


            reset() {

                this.$refs.easyQuizComponent.reset();
                this.$refs.mediumQuizComponent.reset();
                this.$refs.hardQuizComponent.reset();

                this.step = 1;

                this.finalQuizData = {
                    numberOfEasyLevelQuestions: 0,
                    numberOfMediumLevelQuestions: 0,
                    numberOfHardLevelQuestions: 0,

                    totalEasyLevelQuizPoints: 0,
                    totalMediumLevelQuizPoints: 0,
                    totalHardLevelQuizPoints: 0,
                    validation: false,

                    totalPoints: 0,
                    totalQuestions: 0,

                    questions: [],
                };
                this.$emit("input", this.finalQuizData);

                this.easyLevelQuizData = {
                    quizQuestions: [],
                    quizValidation: false
                };
                this.mediumLevelQuizData = {
                    quizQuestions: [],
                    quizValidation: false
                };
                this.hardLevelQuizData = {
                    quizQuestions: [],
                    quizValidation: false
                };


                this.easyLevelPoints = 0;
                this.hardLevelPoints = 0;
                this.mediumLevelPoints = 0;

                this.hardEditable = false;
                this.mediumEditable = false;


            },
        }

    }
</script>

<style>
</style>
