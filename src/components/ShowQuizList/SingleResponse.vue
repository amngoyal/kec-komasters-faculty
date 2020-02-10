<template>
    <div>
        <v-app-bar>
            <v-app-bar-nav-icon>
                <v-btn icon to="/home/quiz/all/quiz-list">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
            </v-app-bar-nav-icon>
            <v-toolbar-title></v-toolbar-title>
        </v-app-bar>

        <v-container>

            <v-card flat outlined class="mb-12" color="grey lighten-3">
                <v-container>

                    <strong>Questions:</strong>

                    <show-mcq :question-text="'Question'" :options="['a','b','c']" :question-number="1"
                              :correct-option-index="2" :points="4"></show-mcq>

                    <show-msq :question-text="'Question'" :options="['a','b','c']" :question-number="1"
                              :correct-option-index="2" :points="4"></show-msq>

                    <show-tfq :question-text="'Question'" :question-number="1"
                              :correct-option-index="1" :points="4"></show-tfq>

                    <show-fbq :question-text="'Question'" :options="['a','b','c']" :question-number="1"
                              :correct-option-index="2" :points="4"></show-fbq>

                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>

    import ShowMCQ from "../DisplayQuestionComponents/ShowMCQ";
    import ShowMSQ from "../DisplayQuestionComponents/ShowMSQ";
    import ShowFBQ from "../DisplayQuestionComponents/ShowFBQ";
    import ShowTFQ from "../DisplayQuestionComponents/ShowTFQ";

    export default {
        name: "ViewQuiz",
        components: {
            'show-mcq': ShowMCQ,
            'show-msq': ShowMSQ,
            'show-fbq': ShowFBQ,
            'show-tfq': ShowTFQ,
        },
        data() {
            return {
                quizTitle: '',
                quizTopic: '',
                quizDescription: '',
                quizDuration: '',
                topicsText: [],
                topicsLoading: false,
            }
        },
        methods: {
            onQuizMetaDataChange() {

            }
        }
    }
</script>

<style scoped>

</style>
