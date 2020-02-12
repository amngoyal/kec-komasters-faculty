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
                    <v-textarea
                            rows="1"
                            auto-grow
                            label="Title"
                            v-model="quizTitle"
                            placeholder="quiz_title"
                            readonly
                            background-color="white"
                            outlined>

                    </v-textarea>

                    <v-textarea
                            rows="1"
                            auto-grow
                            v-model="quizDescription"
                            readonly
                            label="Quiz Description"
                            placeholder="quiz_Description"
                            background-color="white"
                            outlined>

                    </v-textarea>

                    <v-text-field
                            v-model="quizDuration"
                            placeholder="quiz_duration"
                            type="number"
                            readonly
                            label="Quiz Duration"
                            background-color="white"
                            outlined>

                    </v-text-field>

                    <v-text-field
                            v-model="quizTopic"
                            placeholder="quiz_topic"
                            readonly
                            label="Topic"
                            background-color="white"
                            outlined>

                    </v-text-field>


                    <strong>Questions:</strong>

                    <div v-for="(i) in questions" :key="i.uniqueId">

                        <div v-if="i.questionType === 1">
                            <show-mcq :question-text="i.question" :options="i.optionsText" :question-number="i.position"
                                      :correct-option-index="i.correctOptionIndex" :points="i.points"></show-mcq>
                        </div>

                        <div v-if="i.questionType === 2">
                            <show-msq :question-text="i.question" :options="i.optionsText" :question-number="i.position"
                                      :correct-option-index="i.correctOptionIndex" :points="i.points"></show-msq>
                        </div>

                        <div v-if="i.questionType === 3">
                            <show-fbq></show-fbq>
                        </div>

                        <div v-if="i.questionType === 4">
                            <show-tfq :question-text="i.question"  :question-number="i.position"
                                      :correct-option-index="i.correctOptionIndex" :points="i.points"></show-tfq>
                        </div>

                    </div>
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
    import instance from "../../axios";
    import AccountManager from "../../models/AccountManager";
    import {debugLog, errorLog} from "../../app-config";

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
                questions: [],
                readOnly: false,
                count: 0,
            }
        },
        async mounted() {

            try {

                const token = await AccountManager.getAccessToken();
                const res = await instance.get(`/faculty/${AccountManager.user.id}/quiz/74`, {
                    headers: {
                        authorization: token
                    }
                });

                debugLog(res);

                this.quizTitle = res.data.title;
                this.quizDescription = res.data.description;
                this.quizDuration = res.data.duration;
                this.quizTopic = res.data.topic.label;

                res.data.questions.forEach(item => {
                    if (item.type === 1) {

                        const optionsText = [];
                        let correctOption = 0;

                        item.options.forEach((item, index) => {
                            optionsText.push(item.text);
                            if (item.isCorrect)
                                correctOption = index;
                        });

                        this.questions.push({
                            question: item.statement,
                            points: item.points,
                            optionsText: optionsText,
                            correctOptionIndex: correctOption,
                            questionType: 1,
                            validation: true,
                            uniqueId: this.count++,
                            position: item.position+1,

                        })
                    }

                    if (item.type === 2) {

                        const optionsText = [];
                        let correctOption = [];

                        item.options.forEach((item, index) => {
                            optionsText.push(item.text);
                            if (item.isCorrect)
                                correctOption.push(index);
                        });

                        this.questions.push({
                            question: item.statement,
                            points: item.points,
                            optionsText: optionsText,
                            correctOptionIndex: correctOption,
                            questionType: 2,
                            validation: true,
                            uniqueId: this.count++,
                            position: item.position+1,
                        })
                    }

                    if (item.type === 3) {
                        this.questions.push({
                            question: '',
                            points: 0,
                            blanks: '',
                            questionType: 3,
                            validation: true,
                            uniqueId: this.count++,
                            position: item.position+1,
                        })
                    }

                    if (item.type === 4) {

                        this.questions.push({
                            question: item.statement,
                            points: item.points,
                            correctOptionIndex: item.options[0].isCorrect ? 0 : 1,
                            questionType: 4,
                            validation: true,
                            uniqueId: this.count++,
                            position: item.position+1,
                        })
                    }

                })
            } catch (e) {
                errorLog(e)
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
