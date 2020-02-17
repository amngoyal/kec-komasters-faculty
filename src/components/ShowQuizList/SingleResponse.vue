<template>
    <div>

        <error :state="this.state"></error>

        <div v-if="this.isContent">

            <v-app-bar>
                <v-app-bar-nav-icon>
                    <v-btn icon @click="onBackButtonPress">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
                <v-toolbar-title>{{this.$route.query.name +" - "+this.$route.query.quiz_title}}</v-toolbar-title>
            </v-app-bar>

            <v-container>

                <v-card flat outlined class="mb-12" color="grey lighten-3">
                    <v-container>

                        <strong>Questions:</strong>

                        <div v-for="(item,index) in questions" :key="item.id">

                            <div v-if="item.type === 1">
                                <show-mcq :question-text="item.statement"
                                          :options="item.options"
                                          :question-number="item.position+1"
                                          :points="item.points"
                                          :is-correct="isCorrect(item.id)"
                                          :selected-option-index="mcqSelectedOptionIndex(item.id,index)"

                                ></show-mcq>
                            </div>

                            <div v-if="item.type === 2">
                                <show-msq :question-text="item.statement"
                                          :options="item.options"
                                          :question-number="item.position+1"
                                          :points="item.points"
                                          :is-correct="isCorrect(item.id)"
                                          :selected-option-index="msqSelectedOptionIndex(item.id,index)"
                                ></show-msq>
                            </div>

                            <div v-if="item.type === 3">
                                <show-fbq :question-text="item.statement"
                                          :options="fbqOptionsArray(item.id,index)"
                                          :is-selected="fbqSelectedOptionIndex(item.id)"
                                          :question-number="item.position+1"
                                          :points="item.points"
                                          :is-correct="isCorrect(item.id)"></show-fbq>
                            </div>

                            <div v-if="item.type === 4">
                                <show-tfq :question-text="item.statement"
                                          :options="item.options"
                                          :question-number="item.position+1"
                                          :points="item.points"
                                          :is-correct="isCorrect(item.id)"
                                          :selected-option-index="mcqSelectedOptionIndex(item.id,index)"
                                ></show-tfq>
                            </div>


                        </div>
                    </v-container>
                </v-card>
            </v-container>
        </div>
    </div>
</template>

<script>

    import FBQResult from "../DisplayResultQuestions/FBQResult";
    import MCQResult from "../DisplayResultQuestions/MCQResult";
    import TFQResult from "../DisplayResultQuestions/TFQResult";
    import MSQResult from "../DisplayResultQuestions/MSQResult";
    import AccountManager from "../../models/AccountManager";
    import instance from "../../axios";
    import {debugLog, errorLog} from "../../app-config";
    import {StateContent, StateError, StateLoading, StateRest} from "../../models/State";
    import ErrorComponent from "../ErrorComponent";

    export default {
        name: "SingleResponse",
        props: ['quiz_id', 'response_id'],
        components: {
            'show-mcq': MCQResult,
            'show-msq': MSQResult,
            'show-fbq': FBQResult,
            'show-tfq': TFQResult,
            error: ErrorComponent,
        },
        data() {
            return {
                questions: '',
                answers: '',
                state: new StateRest(),
                questionMap: new Map(),
            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
        },
        async mounted() {
            await this.fetchSingleResponseData();
        },
        methods: {
            onBackButtonPress() {
                this.$router.push({
                    path: `/home/quiz/all/responses/` + this.quiz_id,
                    query: {quiz_title: this.$route.query.quiz_title}
                })
            },

            isCorrect(questionId) {

                return this.questionMap.get(questionId).length === 0;

            },

            mcqSelectedOptionIndex(id, questionIndex) {

                let selectedIndex;

                if (this.isCorrect(id)) {

                    this.questions[questionIndex].options.forEach((item, optionIndex) => {
                        if (item.isCorrect) {
                            selectedIndex = optionIndex
                        }
                    })
                } else {
                    this.answers.forEach((answerItem) => {
                        if (answerItem.question.id === id) {

                            this.questions[questionIndex].options.forEach((optionItem, optionIndex) => {
                                if (answerItem.option.id === optionItem.id) {
                                    selectedIndex = optionIndex
                                }
                            })

                        }
                    })
                }
                return selectedIndex;
            },

            msqSelectedOptionIndex(id, questionIndex) {

                let selectedIndex = [];

                if (this.isCorrect(id)) {

                    this.questions[questionIndex].options.forEach((item, optionIndex) => {
                        if (item.isCorrect) {
                            selectedIndex.push(optionIndex)
                        }
                    })
                } else {
                    this.answers.forEach((answerItem) => {
                        if (answerItem.question.id === id) {

                            this.questions[questionIndex].options.forEach((optionItem, optionIndex) => {
                                if (answerItem.option.id === optionItem.id) {
                                    selectedIndex.push(optionIndex)
                                }
                            })

                        }
                    })
                }
                return selectedIndex;
            },


            fbqOptionsArray(id, questionIndex) {
                let options = this.questions[questionIndex].options;
                let distinctIndexes = [];
                let blanks = [];

                options.forEach((item) => {
                    if (!distinctIndexes.includes(item.index)) {
                        distinctIndexes.push(item.index);
                    }

                });

                distinctIndexes.sort((a, b) => a - b).forEach((distinctIndex) => {
                    let arr = options.filter((item) => item.index === distinctIndex);
                    blanks.push(arr)
                });

                debugLog(`Number of blanks: ${blanks.length}`);
                debugLog(`blanks: ${JSON.stringify(blanks, null, 2)}`);

                return blanks;

            },

            fbqSelectedOptionIndex(id) {
                return this.questionMap.get(id)
            },


            async fetchSingleResponseData() {

                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/submission?submissionId=${this.response_id}`, {
                        headers: {
                            authorization: token
                        }
                    });

                    this.questions = response.data.quiz.questions;
                    this.answers = response.data.answers;

                    // Map to map question id with wrong answers
                    this.questions.forEach((ques) => {

                        this.questionMap.set(ques.id, this.answers.filter(ans => {
                            return ques.id === ans.question.id
                        }))

                    });

                    debugLog(response);

                    this.state = new StateContent();

                } catch (e) {

                    this.state = new StateError({retryCallback: this.fetchSingleResponseData});

                    errorLog(e)
                }
            }
        },
    }
</script>

<style scoped>

</style>
