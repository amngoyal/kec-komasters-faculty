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

                        <div v-for="item in questions" :key="item.id">

                            <div v-if="item.type === 1">
                                <show-mcq :question-text="item.statement" :options="item.options"
                                          :question-number="item.position+1"
                                          :correct-option-index="2" :points="item.points"
                                          :is-correct="isCorrect(item.id)"></show-mcq>
                            </div>

                            <div v-if="item.type === 2">
                                <show-msq :question-text="item.statement" :options="['a','b','c']"
                                          :question-number="item.position+1"
                                          :correct-option-index="2" :points="item.points"
                                          :is-correct="isCorrect(item.id)"></show-msq>
                            </div>

                            <div v-if="item.type === 3">
                                <show-fbq :question-text="item.statement" :options="['a','b','c']"
                                          :question-number="item.position+1"
                                          :correct-option-index="2" :points="item.points"
                                          :is-correct="isCorrect(item.id)"></show-fbq>
                            </div>

                            <div v-if="item.type === 4">
                                <show-tfq :question-text="item.statement" :question-number="item.position+1"
                                          :correct-option-index="1" :points="item.points"
                                          :is-correct="isCorrect(item.id)"></show-tfq>
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
                let correct = true;

                for (let i = 0; i < this.answers.length; i++) {
                    if (this.answers[i].question.id === questionId) {
                        correct = false;
                        break;
                    }
                }

                return correct;
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
