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
                    <th class="text-center">Attempts</th>
                    <th class="text-left">Created On</th>
                    <th class="text-center">Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data" :key="item.quiz_id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.topics }}</td>
                    <td class="text-center">{{ item.duration }} minutes</td>
                    <td class="text-center">{{ item.questions }}</td>
                    <td class="text-center">{{ item.points }}</td>
                    <td class="text-center">{{ item.attempts }}</td>
                    <td>{{ item.date }}</td>
                    <td class="text-center">Enabled</td>
                    <td>
                        <v-btn class="primary" :to="'/home/quiz/all/view-quiz/'+item.quiz_id">View</v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>

</template>

<script>
    export default {
        name: "QuizList",
        data() {
            return {
                data: [
                    {
                        "quiz_id": "5d9f0052a70ccfc6b17fd875",
                        "title": "Fowlerville",
                        "topics": "English",
                        "duration": 20,
                        "questions": 5,
                        "attempts": 9,
                        "points": 10,
                        "date": "Mon Jul 16 1990 18:25:09 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052eaeddce0e2f0a7e3",
                        "title": "Sardis",
                        "topics": "English",
                        "duration": 20,
                        "questions": 10,
                        "attempts": 7,
                        "points": 0,
                        "date": "Mon Mar 10 1975 10:17:23 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f00522b1a8936f53d5f9d",
                        "title": "Holtville",
                        "topics": "English",
                        "duration": 20,
                        "questions": 9,
                        "attempts": 4,
                        "points": 8,
                        "date": "Mon Feb 14 2005 17:37:43 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052c4b41538ef1a4ee5",
                        "title": "Katonah",
                        "topics": "English",
                        "duration": 20,
                        "questions": 4,
                        "attempts": 10,
                        "points": 10,
                        "date": "Wed Nov 13 1991 21:11:23 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052bb798379e65bff73",
                        "title": "Abrams",
                        "topics": "English",
                        "duration": 20,
                        "questions": 10,
                        "attempts": 2,
                        "points": 4,
                        "date": "Wed Apr 22 1992 05:46:51 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f005278ac178bf9c17888",
                        "title": "Ryderwood",
                        "topics": "English",
                        "duration": 20,
                        "questions": 3,
                        "attempts": 5,
                        "points": 2,
                        "date": "Mon Mar 30 2009 17:34:38 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052d9e6e9cc85322bde",
                        "title": "Dalton",
                        "topics": "English",
                        "duration": 20,
                        "questions": 6,
                        "attempts": 3,
                        "points": 6,
                        "date": "Wed Apr 05 2006 11:16:56 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052d8f1d698d8172575",
                        "title": "Hollymead",
                        "topics": "English",
                        "duration": 20,
                        "questions": 0,
                        "attempts": 0,
                        "points": 0,
                        "date": "Mon Mar 21 2011 14:59:32 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052c6f45d725c167568",
                        "title": "Drummond",
                        "topics": "English",
                        "duration": 20,
                        "questions": 0,
                        "attempts": 6,
                        "points": 4,
                        "date": "Sat Aug 03 1985 23:16:20 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052cefddecfb7444951",
                        "title": "Elizaville",
                        "topics": "English",
                        "duration": 20,
                        "questions": 10,
                        "attempts": 10,
                        "points": 9,
                        "date": "Mon Apr 24 1978 03:57:31 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052ead0d545c491ddbf",
                        "title": "Richmond",
                        "topics": "English",
                        "duration": 20,
                        "questions": 4,
                        "attempts": 8,
                        "points": 4,
                        "date": "Fri Jun 06 2003 23:11:21 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f0052c61229542bf83534",
                        "title": "Fairacres",
                        "topics": "English",
                        "duration": 20,
                        "questions": 3,
                        "attempts": 1,
                        "points": 10,
                        "date": "Wed Jun 30 2004 11:23:51 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f00528e46d03d6f349d73",
                        "title": "Topanga",
                        "topics": "English",
                        "duration": 20,
                        "questions": 1,
                        "attempts": 2,
                        "points": 10,
                        "date": "Tue Jul 27 1982 16:58:00 GMT+0530 (India Standard Time)"
                    },
                    {
                        "quiz_id": "5d9f005263582459a04c3884",
                        "title": "Jardine",
                        "topics": "English",
                        "duration": 20,
                        "questions": 1,
                        "attempts": 7,
                        "points": 8,
                        "date": "Fri Aug 02 1985 20:49:33 GMT+0530 (India Standard Time)"
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
