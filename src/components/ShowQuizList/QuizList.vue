<template>

    <v-container>
        <v-simple-table fixed-header>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Topic</th>
                    <th class="text-center">Duration</th>
                    <th class="text-center">No. of questions</th>
                    <th class="text-center">Points</th>
                    <th class="text-left">Created On</th>
                    <th class="text-center">Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data" :key="item.quiz_id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.topic.label }}</td>
                    <td class="text-center">{{ item.duration }} minutes</td>
                    <td class="text-center">{{ item.questionCount }}</td>
                    <td class="text-center">{{ item.maxScore }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td class="text-center">Enabled</td>
                    <td>
                        <v-btn class="primary" :to="'/home/quiz/all/view-quiz/'+item.id">View</v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>

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
                let response = await instance.get(`/faculty/${AccountManager.user.id}/quiz?${this.limit}&${this.offset}`, {
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
        }
    }
</script>

<style scoped>

</style>
