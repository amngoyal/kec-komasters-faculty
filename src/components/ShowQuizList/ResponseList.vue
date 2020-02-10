<template>
    <div>

        <v-app-bar>
            <v-app-bar-nav-icon>
                <v-btn icon to="/home/quiz/all/quiz-list">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-app-bar-nav-icon>
            <v-toolbar-title>{{this.$route.query.quiz_title}}</v-toolbar-title>
        </v-app-bar>

        <v-simple-table fixed-header>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left subtitle-2">KecId</th>
                    <th class="text-left subtitle-2">Name</th>
                    <th class="text-center subtitle-2">Class</th>
                    <th class="text-center subtitle-2">Correct Questions</th>
                    <th class="text-center subtitle-2">Score Obtained</th>
                    <th class="text-center subtitle-2">Max Score</th>
                    <th class="text-left subtitle-2">Submitted At</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td>{{item.submittedBy.kecId}}</td>
                    <td>{{item.submittedBy.name }}</td>
                    <td class="text-center">{{'class' }}</td>
                    <td class="text-center">{{item.correctCount }}</td>
                    <td class="text-center">{{item.score }}</td>
                    <td class="text-center">{{ item.quiz.maxScore }}</td>
                    <td>{{item.submittedAt }}</td>
                    <td>
                        <v-btn class="primary" @click="onViewReportButtonClick(item.id,item.submittedBy.name,item.submittedBy.kecId)">View Report
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>

    </div>
</template>

<script>

    import AccountManager from "../../models/AccountManager";
    import instance from "../../axios";
    import {debugLog, errorLog} from "../../app-config";

    export default {
        name: "ResponseList",
        props: ['quiz_id'],
        data() {
            return {
                data: '',
                limit: 10,
                offset: 0,
            }
        },
        async mounted() {

            try {
                const token = await AccountManager.getAccessToken();
                let response = await instance.get(`/submission/quiz/${this.quiz_id}?limit=${this.limit}&offset=${this.offset}`, {
                    headers: {
                        authorization: token
                    }
                });

                this.data = response.data;
                debugLog(response)

            } catch (e) {
                errorLog(e.response)
            }
        },
        methods: {
            onViewReportButtonClick(id,name,kecId) {
                this.$router.push({
                    path: `/home/quiz/all/responses/${this.quiz_id}/${id}`,
                    query: {quiz_title: this.$route.query.quiz_title, name: name, kecId: kecId}
                })
            }
        }
    }
</script>

<style scoped>

</style>
