<template>
    <div>
        <v-stepper v-model="parentStepper">

            <!----------------------------------- stepper header ---------------------------->
            <v-stepper-header>
                <v-stepper-step editable step="1">Details of Quiz</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :editable="editableStepTwo" step="2">Questions of Quiz</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :editable="editableStepThree" v-on:click="onStepperStepThreeClick" step="3">Submit
                    Quiz
                </v-stepper-step>

            </v-stepper-header>


            <!------------------------------------ stepper items --------------------------------------------->
            <v-stepper-items>

                <!---------------------------- step 1 -------------------------------------->

                <v-stepper-content step="1">

                    <v-card flat outlined class="mb-12" color="grey lighten-3">
                        <v-container>
                            <v-textarea
                                    rows="1"
                                    auto-grow
                                    :hint="(quizTitle.length < 10)?'Title should be greater than 10 characters.' : ''"
                                    @input="onQuizMetaDataChange"
                                    v-model="quizTitle"
                                    @keydown="$event.keyCode === 32 && quizTitle.length === 0 ? $event.preventDefault() : false"
                                    placeholder="Enter Title of Quiz"
                                    background-color="white"
                                    outlined>

                            </v-textarea>

                            <v-textarea
                                    rows="1"
                                    auto-grow
                                    :hint="(quizDescription.length < 10)?'Description should be greater than 10 characters.' : ''"
                                    @input="onQuizMetaDataChange"
                                    v-model="quizDescription"
                                    @keydown="$event.keyCode === 32 && quizDescription.length === 0 ? $event.preventDefault() : false"
                                    placeholder="Enter Description of Quiz"
                                    background-color="white"
                                    outlined>

                            </v-textarea>

                            <v-text-field
                                    v-model="quizDuration"
                                    @input="onQuizMetaDataChange"
                                    @keydown="$event.keyCode === 110 || $event.keyCode === 109 ||  $event.keyCode === 107 || $event.keyCode === 190 || $event.keyCode === 69  ? $event.preventDefault() : false"
                                    placeholder="Enter Time Limit of Quiz (in minutes)"
                                    type="number"
                                    background-color="white"
                                    outlined>

                            </v-text-field>

                            <v-overflow-btn
                                    solo
                                    flat
                                    :loading="topicsLoading"
                                    @input="onQuizMetaDataChange"
                                    background-color="white"
                                    v-model="quizTopic"
                                    :items="topicsText"
                                    label="Topic"
                            ></v-overflow-btn>


                            <scopes ref="scopeComponent" v-model="quizScopes" @input="onQuizMetaDataChange"
                                    class="pa-4"></scopes>

                        </v-container>
                    </v-card>

                    <v-btn @click="() => { this.parentStepper = 2; this.editableStepTwo = true; }"
                           :disabled="disableStepOneContinueButton"
                           color="primary">
                        Continue to Add Questions
                    </v-btn>

                </v-stepper-content>


                <!---------------------------- step 2 -------------------------------------->

                <v-stepper-content step="2" class="pa-1" style="background-color: #f5f5f5">

                    <add-questions ref="addQuestionsComponent" v-model="finalQuizData"
                                   v-on:input="onQuizDataChange()"></add-questions>

                </v-stepper-content>


                <!---------------------------- step 3 -------------------------------------->

                <v-stepper-content step="3">

                    <v-card flat outlined class="mb-12" color="grey lighten-3">
                        <v-container>
                            <strong>Quiz Title:</strong>&ensp;{{quizTitle}} <br>
                            <strong>Quiz Description:</strong>&ensp;{{quizDescription}} <br>
                            <strong>Quiz Duration:</strong>&ensp;{{quizDuration}} <br>
                            <strong>Quiz Topic:</strong>&ensp;{{quizTopic}} <br>
                            <hr>
                            <strong>Easy Level Quiz:</strong> <br>
                            Questions:&ensp;{{totalEasyLevelQuestions}},&emsp; Points:&ensp;{{totalEasyLevelQuizPoints}}
                            <br>
                            <hr>
                            <strong>Medium Level Quiz:</strong><br>
                            Questions:&ensp;{{totalMediumLevelQuestions}},&emsp; Points:&ensp;{{totalMediumLevelQuizPoints}}<br>
                            <hr>
                            <strong>Hard Level Quiz:</strong><br>
                            Questions:&ensp;{{totalHardLevelQuestions}},&emsp; Points:&ensp;{{totalHardLevelQuizPoints}}<br>
                            <hr>
                            <strong>Total Questions:</strong>&ensp;{{totalQuestions}}<br>
                            <strong>Total Points:</strong>&ensp;{{totalPoints}}
                            <hr>
                            <strong>Scopes:</strong>&ensp;{{quizScopes.value}}
                            <hr>

                            <v-checkbox
                                    v-model="checkbox"
                                    label="Quiz cannot be changed once submitted"
                            ></v-checkbox>

                        </v-container>

                    </v-card>

                    <v-btn color="primary" :disabled="!checkbox" :loading="loading" @click="submitQuiz()"> Submit Quiz
                    </v-btn>

                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>

            </v-stepper-items>
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

        <!------------------ Dialog ------------------->
        <v-dialog v-model="dialog" persistent max-width="290">

            <v-card>
                <v-card-title class="headline">Session Expired!!</v-card-title>
                <v-card-text>Your session is expired. You have to login again to continue.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="onLoginAgainButtonPress" outlined>Login Again</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

    </div>
</template>

<script>
    import AddQuestions from "../components/AddQuestions";
    import Scopes from "../components/Scopes/Scopes";
    import instance from "../axios";
    import AccountManager from "../models/AccountManager";
    import {debugLog} from '../app-config'

    export default {

        beforeRouteLeave(to, from, next) {

            if (this.quizTitle !== '' || this.quizTopic !== '' || this.quizDuration !== '' || this.quizDescription !== '') {
                const answer = window.confirm('Do you really want to leave? you will lose all entered data!');
                if (answer) {
                    next()
                } else {
                    next(false)
                }
            } else {

                next();
            }
        },

        name: "CreateQuiz",
        components: {
            'add-questions': AddQuestions,
            scopes: Scopes
        },
        async mounted() {


            try {
                const token = await AccountManager.getAccessToken();
                let topics = await instance.get('/topic', {
                    headers: {
                        Authorization: token
                    }
                });

                this.topics = topics.data;

                this.topics.forEach((topic) => {
                    this.topicsText.push(topic.label);
                });
                this.topicsLoading = false


            } catch (e) {

                if (e.response != null) {

                    debugLog(e);
                    if (e.response.status === 401) {
                        this.dialog = true;
                        AccountManager.deleteUserData();
                    } else {
                        this.showSnackbar("Error in connecting with server")
                    }

                }
            }
        },
        data() {
            return {
                quizTitle: '',
                quizTopic: '',
                quizDescription: '',
                quizDuration: '',
                quizScopes: {value: []},


                topics: [],
                topicsText: [],
                topicsLoading: true,

                snackbar: false,
                snackbarText: '',

                dialog: false,

                loading: false,

                disableStepOneContinueButton: true,

                parentStepper: 1,

                checkbox: false,

                editableStepTwo: false,
                editableStepThree: false,

                finalQuizData: {
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
                },

                quizPayload: {},

            }
        },

        computed: {
            quizDetailsValidation() {
                return this.quizTitle.length >= 10 && this.quizDescription.length >= 10 && this.quizDuration !== ''
                    && this.quizTopic !== '' && this.quizScopes.value.length !== 0;
            },
            quizValidation() {
                return this.finalQuizData.validation;
            },
            totalQuestions() {
                return this.finalQuizData.totalQuestions;
            },
            totalPoints() {
                return this.finalQuizData.totalPoints;
            },
            totalEasyLevelQuizPoints() {
                return this.finalQuizData.totalEasyLevelQuizPoints;
            },
            totalMediumLevelQuizPoints() {
                return this.finalQuizData.totalMediumLevelQuizPoints;
            },
            totalHardLevelQuizPoints() {
                return this.finalQuizData.totalHardLevelQuizPoints;
            },
            totalEasyLevelQuestions() {
                return this.finalQuizData.numberOfEasyLevelQuestions;
            },
            totalMediumLevelQuestions() {
                return this.finalQuizData.numberOfMediumLevelQuestions;
            },
            totalHardLevelQuestions() {
                return this.finalQuizData.numberOfHardLevelQuestions;
            },

        },

        methods: {

            onLoginAgainButtonPress() {
                this.$router.replace('Login')
            },

            /*------------------------------ observes the data change in quiz questions -------------------------- */
            onQuizDataChange() {

                this.$root.$on("change_step_of_createQuiz", (step) => {
                    if (this.quizDetailsValidation) {

                        if (this.quizValidation) {
                            this.parentStepper = step;
                            this.editableStepThree = true;
                        } else {
                            this.showSnackbar("Each level should have atleast one question and Every question must be completed (green card)")
                        }

                    } else {
                        this.editableStepThree = false;
                        this.showSnackbar("Please check and fill complete details in previous step of quiz to continue");
                    }
                });

                if (!this.quizValidation) {
                    this.editableStepThree = false;
                } else {
                    if (this.quizDetailsValidation) {
                        this.editableStepThree = true;
                    }
                }
            },


            /*--------------------------- submit quiz depends on data validation --------------------------------*/

            onStepperStepThreeClick() {
                if (this.quizDetailsValidation) {

                    if (this.totalQuestions !== 0) {

                        if (!this.quizValidation) {
                            this.editableStepThree = false;
                            this.showSnackbar("Please check and complete each question in each level of Quiz");
                        }
                    } else {
                        this.showSnackbar("Please Enter Questions in Quiz");
                    }

                } else {
                    this.editableStepThree = false;
                    this.showSnackbar("Please check and fill complete details of quiz");

                }

            },


            /*------------------------------------ to observe the changes in details of quiz ----------------------------*/
            onQuizMetaDataChange() {

                if (this.quizDetailsValidation) {
                    this.disableStepOneContinueButton = false;
                    if (this.quizValidation) {
                        this.editableStepThree = true;
                    }

                } else {
                    this.disableStepOneContinueButton = true;
                    this.editableStepThree = false;
                }
            },


            async submitQuiz() {

                if (this.quizValidation && this.quizDetailsValidation) {

                    this.loading = true;

                    this.quizPayload = {
                        title: this.quizTitle,
                        description: this.quizDescription,
                        maxScore: this.totalPoints,
                        questionCount: this.totalQuestions,
                        duration: this.quizDuration,

                        topic: this.topics.find((item) => {
                            if (item.label === this.quizTopic) return item;
                        }).id,

                        scopes: this.quizScopes.value,
                        questions: this.finalQuizData.questions

                    };

                    try {
                        const token = await AccountManager.getAccessToken();
                        let response = await instance.post('/quiz/new', this.quizPayload, {
                            headers: {
                                Authorization: token
                            }
                        });

                        this.showSnackbar("Quiz uploaded successfully!! Check and publish it from all quiz section.");
                        debugLog(response);

                        this.reset();

                    } catch (error) {

                        this.loading = false;

                        debugLog(this.quizPayload);
                        this.showSnackbar("Error in uploading Quiz");
                        if (error.response) {
                            debugLog(error.response);
                        }
                    }
                }

            },

            reset() {

                this.$refs.scopeComponent.reset();
                this.$refs.addQuestionsComponent.reset();

                this.quizTitle = '';
                this.quizTopic = '';
                this.quizDescription = '';
                this.quizDuration = '';
                this.loading = false;
                this.disableStepOneContinueButton = true;
                this.parentStepper = 1;
                this.checkbox = false;
                this.editableStepTwo = false;
                this.editableStepThree = false;

                this.quizScopes = {value: []};

                this.quizPayload = {}

            },

            showSnackbar(msg) {
                this.snackbarText = msg;
                this.snackbar = true;
            },
        }
    }
</script>

<style>

</style>
