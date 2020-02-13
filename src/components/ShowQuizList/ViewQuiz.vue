<template>
    <div>

        <error :state="this.state"></error>

        <div v-if="this.isContent">
            <v-app-bar>
                <v-app-bar-nav-icon>
                    <v-btn icon to="/home/quiz/all/quiz-list">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-app-bar-nav-icon>
                <v-toolbar-title>{{quizTitle}}</v-toolbar-title>
            </v-app-bar>

            <v-container>

                <v-card flat outlined class="mb-12" color="grey lighten-3">
                    <v-container>
                        <v-textarea
                                rows="1"
                                auto-grow
                                dense
                                label="Title"
                                v-model="quizTitle"
                                placeholder="quiz_title"
                                readonly
                                background-color="white"
                                outlined>

                        </v-textarea>

                        <v-textarea
                                rows="1"
                                auto-grow
                                v-model="quizDescription"
                                readonly
                                dense
                                label="Quiz Description"
                                placeholder="quiz_Description"
                                background-color="white"
                                outlined>

                        </v-textarea>

                        <v-text-field
                                v-model="quizDuration"
                                placeholder="quiz_duration"
                                type="number"
                                dense
                                readonly
                                label="Quiz Duration"
                                background-color="white"
                                outlined>

                        </v-text-field>

                        <v-text-field
                                v-model="quizTopic"
                                placeholder="quiz_topic"
                                readonly
                                dense
                                label="Topic"
                                background-color="white"
                                outlined>

                        </v-text-field>


                        <strong>Questions:</strong>

                        <div v-for="(i) in questions" :key="i.uniqueId">

                            <div v-if="i.questionType === 1">
                                <show-mcq :question-text="i.question" :options="i.options" :question-number="i.position"
                                          :points="i.points"></show-mcq>
                            </div>

                            <div v-if="i.questionType === 2">
                                <show-msq :question-text="i.question" :options="i.options" :question-number="i.position"
                                          :points="i.points"></show-msq>
                            </div>

                            <div v-if="i.questionType === 3">
                                <show-fbq :question-text="i.question" :question-number="i.position"
                                          :options="i.options" :points="i.points"></show-fbq>
                            </div>

                            <div v-if="i.questionType === 4">
                                <show-tfq :question-text="i.question" :question-number="i.position"
                                          :options="i.options" :points="i.points"></show-tfq>
                            </div>

                        </div>
                    </v-container>

                </v-card>

                <v-layout class="mb-10" v-if="!published">
                    <v-btn color="primary" class="half-block mr-5" @click="onDeleteButtonCLick">Delete</v-btn>
                    <v-btn color="primary" class="half-block" depressed @click="onPublishButtonCLick">Publish</v-btn>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>

    import ShowMCQ from "../DisplayQuestionComponents/ShowMCQ";
    import ShowMSQ from "../DisplayQuestionComponents/ShowMSQ";
    import ShowFBQ from "../DisplayQuestionComponents/ShowFBQ";
    import ShowTFQ from "../DisplayQuestionComponents/ShowTFQ";
    import instance from "../../axios";
    import AccountManager from "../../models/AccountManager";
    import {debugLog, errorLog} from "../../app-config";
    import ErrorComponent from "../ErrorComponent";
    import {StateContent, StateError, StateLoading, StateRest} from "../../models/State";

    export default {
        props: ['quiz_id'],
        name: "ViewQuiz",
        components: {
            'show-mcq': ShowMCQ,
            'show-msq': ShowMSQ,
            'show-fbq': ShowFBQ,
            'show-tfq': ShowTFQ,
            error: ErrorComponent,
        },
        data() {
            return {
                quizTitle: '',
                quizId: '',
                published: '',
                quizTopic: '',
                quizDescription: '',
                quizDuration: '',
                topicsText: [],
                questions: [],
                readOnly: false,
                count: 0,
                state: new StateRest(),
            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
        },
        async mounted() {
            this.fetchSingleQuizData();
        },
        methods: {
            async onPublishButtonCLick() {
                try {
                    const token = await AccountManager.getAccessToken();
                    let res = await instance.put(`/quiz/${this.quizId}/publish`, null, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(res)
                } catch (e) {
                    errorLog(e)
                }
            },
            async onDeleteButtonCLick() {
                try {
                    const token = await AccountManager.getAccessToken();
                    debugLog(token);
                    let res = await instance.delete(`/quiz/${this.quizId}/`, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(res)
                } catch (e) {
                    errorLog(e);
                }
            },
            async fetchSingleQuizData() {

                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    const res = await instance.get(`/faculty/${AccountManager.user.id}/quiz/${this.quiz_id}`, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(res);

                    this.quizTitle = res.data.title;
                    this.quizDescription = res.data.description;
                    this.quizDuration = res.data.duration;
                    this.quizTopic = res.data.topic.label;
                    this.published = res.data.published;
                    this.quizId = res.data.id;

                    res.data.questions.forEach(item => {
                        if (item.type === 1) {

                            this.questions.push({
                                question: item.statement,
                                points: item.points,
                                options: item.options,
                                questionType: 1,
                                uniqueId: this.count++,
                                position: item.position + 1,

                            })
                        }

                        if (item.type === 2) {


                            this.questions.push({
                                question: item.statement,
                                points: item.points,
                                options: item.options,
                                questionType: 2,
                                uniqueId: this.count++,
                                position: item.position + 1,
                            })
                        }

                        if (item.type === 3) {
                            this.questions.push({
                                question: item.statement,
                                points: item.points,
                                options: item.options,
                                questionType: 3,
                                uniqueId: this.count++,
                                position: item.position + 1,
                            })
                        }

                        if (item.type === 4) {

                            this.questions.push({
                                question: item.statement,
                                points: item.points,
                                questionType: 4,
                                options: item.options,
                                uniqueId: this.count++,
                                position: item.position + 1,
                            })
                        }

                    });

                    this.state = new StateContent();

                    debugLog(res);

                } catch (e) {

                    this.state = new StateError({retryCallback: this.fetchSingleQuizData});

                    errorLog(e)
                }
            }
        }
    }
</script>

<style scoped>

    .half-block {
        width: 49%;
    }

</style>
