<template>
    <div>
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
                            <show-mcq :question-text="item.statement" :options="item.options" :question-number="item.position+1"
                                      :correct-option-index="2" :points="item.points"></show-mcq>
                        </div>

                        <div v-if="item.type === 2">
                            <show-msq :question-text="'Question'" :options="['a','b','c']" :question-number="1"
                                      :correct-option-index="2" :points="4"></show-msq>
                        </div>

                        <div v-if="item.type === 3">
                            <show-fbq :question-text="'Question'" :options="['a','b','c']" :question-number="1"
                                      :correct-option-index="2" :points="4"></show-fbq>
                        </div>

                        <div v-if="item.type === 4">
                            <show-tfq :question-text="'Question'" :question-number="1"
                                      :correct-option-index="1" :points="4"></show-tfq>
                        </div>


                    </div>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>

    import FBQResult from "../DisplayResultQuestions/FBQResult";
    import MCQResult from "../DisplayResultQuestions/MCQResult";
    import TFQResult from "../DisplayResultQuestions/TFQResult";
    import MSQResult from "../DisplayResultQuestions/MSQResult";
    import AccountManager from "../../models/AccountManager";
    import instance from "../../axios";
    import {debugLog} from "../../app-config";

    export default {
        name: "SingleResponse",
        props: ['quiz_id', 'response_id'],
        components: {
            'show-mcq': FBQResult,
            'show-msq': MCQResult,
            'show-fbq': TFQResult,
            'show-tfq': MSQResult,
        },
        data() {
            return {
                questions: ''
            }
        },
        async mounted() {
            const token = await AccountManager.getAccessToken();
            let response = await instance.get(`/submission/id/${this.response_id}`, {
                headers: {
                    authorization: token
                }
            });

            this.questions = response.data.quiz.questions;
            debugLog(response)
        },
        methods: {
            onBackButtonPress() {
                this.$router.push({
                    path: `/home/quiz/all/responses/` + this.quiz_id,
                    query: {quiz_title: this.$route.query.quiz_title}
                })
            }
        }
    }
</script>

<style scoped>

</style>
