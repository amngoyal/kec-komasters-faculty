<template>
    <div>

        <v-app-bar flat>
            <v-app-bar-nav-icon>
                <v-btn icon to="/home/quiz/all/quiz-list">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-app-bar-nav-icon>
            <v-toolbar-title>{{this.$route.query.quiz_title}}</v-toolbar-title>

            <v-spacer/>

            <div v-if="isSubmission">


                <a id="download" class="mr-12">
                    <v-btn outlined @click="this.downloadReport" :loading="exportBtnLoading" color="primary">Export
                        Excel File
                    </v-btn>
                </a>

                <v-btn color="primary" @click="fetchResponseList(fixedLimit, fixedOffset, true)" tile depressed>
                    <v-icon class="mr-1">mdi-refresh</v-icon>
                    Refresh
                </v-btn>

            </div>

        </v-app-bar>

        <error :state="this.state"></error>

        <div v-if="this.isContent">


            <v-simple-table fixed-header class="mb-12">
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center subtitle-2">S.no</th>
                        <th class="text-left subtitle-2">KecId</th>
                        <th class="text-left subtitle-2">Name</th>
                        <th class="text-center subtitle-2">Year</th>
                        <th class="text-center subtitle-2">Branch</th>
                        <th class="text-center subtitle-2">Section</th>
                        <th class="text-center subtitle-2">Correct Questions</th>
                        <th class="text-center subtitle-2">Score Obtained</th>
                        <th class="text-center subtitle-2">Percentage</th>
                        <th class="text-left subtitle-2">Submitted At</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item) in submissionList" :key="item.id">
                        <td class="text-center">{{item.sno}}</td>
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
                            <v-btn class="primary--text" depressed color="#E9E8F6"
                                   @click="onViewReportButtonClick(item.id,item.name,item.kecId)">
                                View Report
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>

        <div v-if="responseCount !== 0 " class="text-center fixed-bottom mb-4">
            <v-pagination
                    dark
                    v-on:input="onPageChange()"
                    color="primary"
                    v-model="page"
                    :length="Math.ceil(responseCount/limit)"
            ></v-pagination>
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
                fixedLimit: 30,
                fixedOffset: 0,
                limit: 30,
                state: new StateRest(),
                isSubmission: false,
                page: 1,
                responseCount: 0,
                count: 1,
                exportBtnLoading: false,
                allSubmissionList: [],
            }
        },
        computed: {
            isContent() {
                return this.state instanceof StateContent
            },
            excelFileJsonArray() {

                return this.allSubmissionList.map(item => {
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
        mounted() {
            this.fetchResponseList(this.fixedLimit, this.fixedOffset);
        },
        methods: {
            onViewReportButtonClick(id, name, kecId) {
                this.$router.push({
                    path: `/home/quiz/all/responses/${this.quiz_id}/${id}`,
                    query: {quiz_title: this.$route.query.quiz_title, name: name, kecId: kecId}
                })
            },

            async downloadReport() {

                try {

                    this.exportBtnLoading = true;

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/submission/quiz/${this.quiz_id}?limit=2000&offset=0`, {
                        headers: {
                            authorization: token
                        }
                    });

                    this.allSubmissionList = [];

                    response.data.submissions.forEach(item => {

                        let date = new Date(item.submittedAt);


                        this.allSubmissionList.push({
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
                            submittedAt: date.toUTCString().substring(0, date.toUTCString().length - 3),
                        })

                    });


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


                    this.exportBtnLoading = false;

                } catch (e) {
                    errorLog(e)
                    this.exportBtnLoading = false;
                }
            },

            async fetchResponseList(limit, offset, refresh) {

                if (limit == null || offset == null) {
                    limit = this.limit;
                    offset = this.fixedOffset;
                    this.count = 1;

                }

                if (refresh) {
                    this.count = 1;
                    this.page = 1;
                }

                this.submissionList = [];

                try {

                    this.state = new StateLoading();

                    const token = await AccountManager.getAccessToken();
                    let response = await instance.get(`/submission/quiz/${this.quiz_id}?limit=${limit}&offset=${offset}`, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(response);

                    response.data.submissions.forEach((item, index) => {

                        let date = new Date(item.submittedAt);

                        this.submissionList.push({
                            sno: (this.page - 1) * this.limit + index + 1,
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
                            submittedAt: date.toUTCString().substring(0, date.toUTCString().length - 3),
                        })

                    });


                    this.responseCount = response.data.count;
                    this.count = (this.page - 1) * this.limit;

                    this.state = new StateContent();
                    this.isSubmission = true;

                } catch (e) {
                    errorLog(e);
                    if (e.response) {
                        if (e.response.status === 404) {
                            this.state = new StateError({
                                message: "No submissions yet",
                                retryCallback: this.fetchResponseList
                            });
                        }
                    } else
                        this.state = new StateError({retryCallback: this.fetchResponseList});

                }
            },
            onPageChange() {
                this.fetchResponseList(this.limit, (this.page - 1) * this.limit);
            },
        }
    }
</script>

<style scoped>

</style>
