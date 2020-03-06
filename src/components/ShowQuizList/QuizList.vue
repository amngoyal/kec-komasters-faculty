<template>
    <div>

        <v-app-bar flat>
            <v-toolbar-title>Your Uploaded Quiz</v-toolbar-title>

            <v-spacer/>

            <v-btn depressed tile color="primary" v-if="isQuiz" v-on:click="fetchQuizList">
                <v-icon class="mr-1">mdi-refresh</v-icon>
                Refresh
            </v-btn>

        </v-app-bar>

        <error :state="this.state"></error>

        <div v-if="this.isContent">


            <v-simple-table fixed-header class="px-4 mb-12">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left subtitle-2">S.no</th>
                        <th class="text-left subtitle-2">Title</th>
                        <th class="text-left subtitle-2">Topic</th>
                        <th class="text-center subtitle-2">Duration</th>
                        <th class="text-center subtitle-2">No. of questions</th>
                        <th class="text-center subtitle-2">Max Score</th>
                        <th class="text-left subtitle-2">Created At</th>
                        <th class="text-center subtitle-2">Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in data" :key="item.quizId">
                        <td>{{count+index+1}}</td>
                        <td><p class="primary--text underline-on-hover" v-on:click="onQuizNameClick(item.quizId)">
                            {{item.title}}</p></td>
                        <td>{{ item.topic }}</td>
                        <td class="text-center">{{ item.duration }} min</td>
                        <td class="text-center">{{ item.questionCount }}</td>
                        <td class="text-center">{{ item.maxScore }}</td>
                        <td>{{ item.createdAt }}</td>
                        <td class="text-center">

                            <enable-button :enabled="item.enabled" :position="index"
                                           v-if="item.published" :quiz-id="item.quizId"></enable-button>

                            <p class="red--text underline-on-hover" v-if="!item.published"
                               @click="onQuizNameClick(item.quizId)">*Action
                                Required*</p>

                        </td>


                        <td>
                            <v-btn v-if="item.published" depressed color="#E9E8F6" class="primary--text"
                                   @click="onViewResponseButtonClick(item.quizId,item.title)">View
                                Responses
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <div v-if="true" class="text-center fixed-bottom mb-4">
            <v-pagination
                    dark
                    v-on:input="onPageChange()"
                    color="primary"
                    v-model="page"
                    :length="4"
            ></v-pagination>
        </div>
    </div>
</template>

<script>
    import instance from '../../axios'
    import AccountManager from '../../models/AccountManager'
    import {debugLog, errorLog} from '../../app-config'
    import router from "../../router";
    import {StateContent, StateError, StateLoading, StateRest} from "../../models/State";
    import ErrorComponent from "../ErrorComponent";
    import EnableButton from "../EnableButton";


    export default {
        name: "QuizList",
        components: {'error': ErrorComponent, 'enable-button': EnableButton},
        data() {
            return {
                state: new StateRest(),

                data: [],

                limit: 15,

                isEnabled: [],

                count: 1,

                page: 1,

                isQuiz: false,
                switchValue: [],
                enableButtonLoading: [],

            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
        },
        async mounted() {
            await this.fetchQuizList(0);
        },
        methods: {
            onViewResponseButtonClick(id, title) {
                this.$router.push({path: '/home/quiz/all/responses/' + id, query: {quiz_title: title}})
            },


            onQuizNameClick(id) {
                router.push('/home/quiz/all/' + id);
            },


            async fetchQuizList(offset) {

                this.data = [];

                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/faculty/${AccountManager.user.id}/quiz?limit=${this.limit}&offset=${offset}`, {
                        headers: {
                            authorization: token
                        }
                    });


                    response.data.forEach(item => {
                        this.data.push({
                            quizId: item.id,
                            title: item.title,
                            maxScore: item.maxScore,
                            questionCount: item.questionCount,
                            duration: item.duration,
                            createdAt: item.createdAt,
                            enabled: item.enabled,
                            published: item.published,
                            topic: item.topic.label,
                        });

                        this.enableButtonLoading.push(false)
                    });

                    this.count = (this.page - 1) * this.limit;

                    debugLog(response.data);
                    this.state = new StateContent();
                    this.isQuiz = true;

                } catch (e) {
                    errorLog(e);
                    this.state = new StateError({retryCallback: this.fetchQuizList, message: "No quiz found"});
                    this.isQuiz = false;
                }
            },

            onPageChange() {

                this.fetchQuizList((this.page - 1)*this.limit);
            },
        }
    }
</script>

<style scoped>

    .underline-on-hover:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
