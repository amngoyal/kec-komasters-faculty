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
                    <th class="text-left subtitle-2">Status</th>
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
                    <td>

                        <v-switch color="green" v-if="item.published" v-model="item.enabled" :label="item.enabled ? 'Enabled': 'Disabled'"></v-switch>

                        <a class="red--text" v-if="!item.published" :href="'/home/quiz/all/'+item.id">*Action Required*</a>

                    </td>


                    <td>
                        <v-btn v-if="item.published" depressed color="#E9E8F6" class="primary--text" @click="onViewResponseButtonClick(item.id,item.title)">View
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
                data: [],
                limit: 10,
                offset: 0,
                isEnabled: [],
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
                        topic: item.topic,
                        scopes: item.scopes,
                    })
                });
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
