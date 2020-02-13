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
                <v-toolbar-title>{{this.$route.query.quiz_title}}</v-toolbar-title>
                <v-spacer/>

                <v-btn outlined @click="this.downloadReport">
                    <a id="download">Export Excel File</a>
                </v-btn>

            </v-app-bar>

            <v-simple-table fixed-header>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left subtitle-2">KecId</th>
                        <th class="text-left subtitle-2">Name</th>
                        <th class="text-left subtitle-2">Year</th>
                        <th class="text-left subtitle-2">Branch</th>
                        <th class="text-left subtitle-2">Section</th>
                        <th class="text-center subtitle-2">Correct Questions</th>
                        <th class="text-center subtitle-2">Score Obtained</th>
                        <th class="text-center subtitle-2">Percentage</th>
                        <th class="text-left subtitle-2">Submitted At</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in submissionList" :key="item.id">
                        <td>{{item.kecId}}</td>
                        <td>{{item.name}}</td>
                        <td class="text-center">{{item.year}}</td>
                        <td class="text-center">{{item.branch}}</td>
                        <td class="text-center">{{item.section}}</td>
                        <td class="text-center">{{item.correctCount}} / {{item.questionCount}}</td>
                        <td class="text-center">{{item.score}} / {{item.maxScore}}</td>
                        <td class="text-center">{{item.percentage}}</td>
                        <td>{{item.submittedAt}}</td>
                        <td>
                            <v-btn class="primary"
                                   @click="onViewReportButtonClick(item.id,item.name,item.kecId)">
                                View Report
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

    import AccountManager from "../../models/AccountManager";
    import instance from "../../axios";
    import {debugLog, errorLog} from "../../app-config";
    import json2xls from 'json2xls';
    import {StateContent, StateError, StateLoading, StateRest} from "../../models/State";
    import ErrorComponent from "../ErrorComponent";


    export default {
        name: "ResponseList",
        props: ['quiz_id'],
        components: {'error': ErrorComponent},
        data() {
            return {
                submissionList: [],
                limit: 10,
                offset: 0,
                state: new StateRest(),
            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
            excelFileJsonArray() {
                return this.submissionList.map(item => {
                    return {
                        'Time': item.submittedAt,
                        'Kec Id': item.kecId,
                        'Name': item.name,
                        'Year': item.year,
                        'Branch': item.branch,
                        'Section': item.section,
                        'Score': `${item.score}/${item.maxScore}`,
                        'Correct': `${item.correctCount}/${item.questionCount}`,
                        'Percentage': item.percentage,

                    }
                });
            }
        },
        async mounted() {
            await this.fetchResponseList();
        },
        methods: {
            onViewReportButtonClick(id, name, kecId) {
                this.$router.push({
                    path: `/home/quiz/all/responses/${this.quiz_id}/${id}`,
                    query: {quiz_title: this.$route.query.quiz_title, name: name, kecId: kecId}
                })
            },

            downloadReport() {
                let res = json2xls(this.excelFileJsonArray);

                const buf = new ArrayBuffer(res.length);
                const view = new Uint8Array(buf);
                for (let i = 0; i !== res.length; ++i) view[i] = res.charCodeAt(i) & 0xFF;
                const blob = new Blob([buf], {
                    type: 'application/octet-stream'
                });
                const blobUrl = URL.createObjectURL(blob, {
                    type: 'data:attachment/xlsx'
                });
                const a = document.getElementById('download');
                a.download = this.$route.query.quiz_title + '.xlsx';
                a.href = blobUrl;
            },

            async fetchResponseList() {
                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/submission/quiz/${this.quiz_id}?limit=${this.limit}&offset=${this.offset}`, {
                        headers: {
                            authorization: token
                        }
                    });


                    response.data.forEach(item => {

                        let date = new Date(item.submittedAt);

                        this.submissionList.push({
                            id: item.id,
                            kecId: item.submittedBy.kecId,
                            name: item.submittedBy.name,
                            year: item.submittedBy.cls.year,
                            branch: item.submittedBy.cls.branch.label,
                            section: item.submittedBy.cls.section,
                            correctCount: item.correctCount,
                            score: item.score,
                            percentage: parseFloat(((item.score * 100) / item.quiz.maxScore)).toFixed(1),
                            maxScore: item.quiz.maxScore,
                            questionCount: item.quiz.questionCount,
                            submittedAt: date.toString().substring(0, date.toString().length - 30),
                        })
                    });

                    this.state = new StateContent();
                    debugLog(response)

                } catch (e) {
                    this.state = new StateError({retryCallback: this.fetchResponseList});
                    errorLog(e.response)
                }
            }
        }
    }
</script>

<style scoped>

</style>
