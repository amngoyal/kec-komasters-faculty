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

                        <v-text-field
                                v-model="quizScopes"
                                placeholder="quiz_scopes"
                                readonly
                                dense
                                label="Quiz Available For"
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
                    <v-btn :loading="deleteBtnLoading" :disabled="publishBtnLoading" color="primary"
                           class="half-block mr-5" @click="onDeleteButtonCLick">Delete
                    </v-btn>
                    <v-btn :loading="publishBtnLoading" :disabled="deleteBtnLoading" color="primary" class="half-block"
                           depressed @click="onPublishButtonCLick">Publish
                    </v-btn>
                </v-layout>
            </v-container>
        </div>

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

    import ShowMCQ from "../DisplayQuestionComponents/ShowMCQ";
    import ShowMSQ from "../DisplayQuestionComponents/ShowMSQ";
    import ShowFBQ from "../DisplayQuestionComponents/ShowFBQ";
    import ShowTFQ from "../DisplayQuestionComponents/ShowTFQ";
    import instance from "../../axios";
    import AccountManager from "../../models/AccountManager";
    import {debugLog, errorLog} from "../../app-config";
    import ErrorComponent from "../ErrorComponent";
    import {StateContent, StateError, StateLoading, StateRest} from "../../models/State";
    import router from "../../router";

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

                quizId: '',

                quizTitle: '',
                quizTopic: '',
                quizDescription: '',
                quizDuration: '',
                quizScopes: '',

                questions: [],

                published: '',

                count: 0,

                state: new StateRest(),

                deleteBtnLoading: false,
                publishBtnLoading: false,

                snackbar: false,
                snackbarText: '',

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
            showSnackbar(msg) {
                this.snackbarText = msg;
                this.snackbar = true;
            },

            async onPublishButtonCLick() {
                try {

                    this.publishBtnLoading = true;

                    const token = await AccountManager.getAccessToken();
                    let res = await instance.put(`/quiz/${this.quizId}/publish`, null, {
                        headers: {
                            authorization: token
                        }
                    });

                    this.showSnackbar("Quiz Published Successfully!!");
                    await router.replace('/home/quiz/all/quiz-list');

                    debugLog(res)
                } catch (e) {

                    this.publishBtnLoading = false;
                    this.showSnackbar("Error in publishing the quiz. Try again to publish the quiz.");
                    errorLog(e)
                }
            },

            async onDeleteButtonCLick() {
                try {

                    this.deleteBtnLoading = true;

                    const token = await AccountManager.getAccessToken();
                    debugLog(token);
                    let res = await instance.delete(`/quiz/${this.quizId}/`, {
                        headers: {
                            authorization: token
                        }
                    });

                    this.showSnackbar("Quiz Deleted Successfully!!");

                    await router.replace('/home/quiz/all/quiz-list');

                    debugLog(res)


                } catch (e) {

                    this.showSnackbar("Error in deleting quiz. Try again to delete the quiz.");
                    this.deleteBtnLoading = false;

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

                    res.data.scopes.forEach((item, index) => {
                        this.quizScopes += item.label + ((index === res.data.scopes.length - 1) ? "" : ", ");
                    });

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
