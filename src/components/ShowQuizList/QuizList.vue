<template>
    <div>

        <v-app-bar flat>
            <v-toolbar-title>Your Uploaded Quiz</v-toolbar-title>
        </v-app-bar>

        <v-simple-table fixed-header class="px-4">
            <template v-slot:default>
                <thead>
                <tr>
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
                <tr v-for="item in data" :key="item.id">
                    <td><a :href="'/home/quiz/all/'+item.id">{{item.title}}</a></td>
                    <td>{{ item.topic.label }}</td>
                    <td class="text-center">{{ item.duration }} min</td>
                    <td class="text-center">{{ item.questionCount }}</td>
                    <td class="text-center">{{ item.maxScore }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td class="text-center">{{item.disabled?'Disabled':'Enabled'}}</td>
                    <td>
                        <v-btn depressed class="primary" @click="onViewResponseButtonClick(item.id,item.title)">View
                            Responses
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>

    </div>
</template>

<script>
    import instance from '../../axios'
    import AccountManager from '../../models/AccountManager'
    import {debugLog, errorLog} from '../../app-config'

    export default {
        name: "QuizList",
        data() {
            return {
                data: '',
                limit: 10,
                offset: 0
            }
        },
        async mounted() {

            try {

                const token = await AccountManager.getAccessToken();
                let response = await instance.get(`/faculty/${AccountManager.user.id}/quiz?limit=${this.limit}&offset=${this.offset}`, {
                    headers: {
                        authorization: token
                    }
                });

                /* let response = await instance.get(`/submission/quiz/74?limit=10&offset=0`, {
                     headers: {
                         authorization: token
                     }
                 });*/

                /*  let response = await instance.get(`/submission/id/101`, {
                      headers: {
                          authorization: token
                      }
                  });*/

                this.data = response.data;
                debugLog(response.data);

            } catch (e) {
                errorLog(e.response);
            }
        },
        methods: {
            onViewResponseButtonClick(id, title) {
                this.$router.push({path: '/home/quiz/all/responses/' + id, query: {quiz_title: title}})
            }
        }
    }
</script>

<style scoped>

</style>
