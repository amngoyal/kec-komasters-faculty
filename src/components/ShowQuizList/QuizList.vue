<template>
    <div>

        <v-app-bar flat>
            <v-toolbar-title>Your Uploaded Quiz</v-toolbar-title>

            <v-spacer/>

            <v-btn depressed tile color="primary" v-if="isQuiz" v-on:click="fetchQuizList">
                <v-icon class="mr-1">mdi-refresh</v-icon>Refresh</v-btn>

        </v-app-bar>

        <error :state="this.state"></error>

        <div v-if="this.isContent">


            <v-simple-table fixed-header class="px-4">
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
                        <th class="text-left subtitle-2">Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in data" :key="item.id">
                        <td>{{index+1 }}</td>
                        <td><p class="primary--text underline-on-hover" v-on:click="onQuizNameClick(item.id)">
                            {{item.title}}</p></td>
                        <td>{{ item.topic }}</td>
                        <td class="text-center">{{ item.duration }} min</td>
                        <td class="text-center">{{ item.questionCount }}</td>
                        <td class="text-center">{{ item.maxScore }}</td>
                        <td>{{ item.createdAt }}</td>
                        <td>

                            <v-switch color="green" v-if="item.published" v-model="item.enabled"
                                      v-on:change="onSwitchStateChange(item.id, item.enabled,index)"

                                      :label="item.enabled ? 'Enabled': 'Disabled'"></v-switch>

                            <p class="red--text underline-on-hover" v-if="!item.published"
                               @click="onQuizNameClick(item.id)">*Action
                                Required*</p>

                        </td>


                        <td>
                            <v-btn v-if="item.published" depressed color="#E9E8F6" class="primary--text"
                                   @click="onViewResponseButtonClick(item.id,item.title)">View
                                Responses
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
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

    export default {
        name: "QuizList",
        components: {'error': ErrorComponent},
        data() {
            return {
                state: new StateRest(),
                data: [],
                limit: 50,
                offset: 0,
                isEnabled: [],
                isQuiz: false

            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
        },
        async mounted() {
            await this.fetchQuizList();
        },
        methods: {
            onViewResponseButtonClick(id, title) {
                this.$router.push({path: '/home/quiz/all/responses/' + id, query: {quiz_title: title}})
            },

            async onSwitchStateChange(id, action, index) {

                try {

                    const token = await AccountManager.getAccessToken();
                    const response = await instance.put(`/quiz/${id}/enable?action=${action ? '1' : '0'}`, null, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(response);

                } catch (e) {

                    debugLog(this.data[index].enabled);
                    this.data[index].enabled = !this.data[index].enabled;
                    errorLog(e);
                }
            },
            onQuizNameClick(id) {
                router.push('/home/quiz/all/' + id);
            },
            async fetchQuizList() {

                this.data = [];

                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/faculty/${AccountManager.user.id}/quiz?limit=${this.limit}&offset=${this.offset}`, {
                        headers: {
                            authorization: token
                        }
                    });


                    response.data.forEach(item => {
                        this.data.push({
                            id: item.id,
                            title: item.title,
                            maxScore: item.maxScore,
                            questionCount: item.questionCount,
                            duration: item.duration,
                            createdAt: item.createdAt,
                            enabled: item.enabled,
                            published: item.published,
                            topic: item.topic.label,
                            scopes: item.scopes,
                        })
                    });
                    debugLog(response.data);
                    this.state = new StateContent();
                    this.isQuiz = true;

                } catch (e) {
                    errorLog(e);
                    this.state = new StateError({retryCallback: this.fetchQuizList});
                    this.isQuiz = false;
                }
            }
        }
    }
</script>

<style scoped>

    .underline-on-hover:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>
