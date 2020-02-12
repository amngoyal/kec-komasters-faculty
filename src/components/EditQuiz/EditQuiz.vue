<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout>
        <v-flex xs12 sm12 offset-sm0>

            <!--  Quiz Title and description text inputs  -->

            <v-container>

                <!--  Question components rendering   -->

                <div v-for="(i,index) in questions" :key="questions[index].uniqueId">

                    <v-flex v-if="'mcq' === questions[index].questionType">
                        <v-col>
                            <mcq :questionNumber="index+1" :count="count"
                                 v-model="questions[index]"
                                 v-on:input="onDataChange"></mcq>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="removeQuestion(index)" class="error mr-5">Remove</v-btn>
                            </v-layout>
                        </v-col>
                    </v-flex>

                    <v-flex v-if="'msq' === questions[index].questionType">
                        <v-col>
                            <multi-select :questionNumber="index+1" :count="count"
                                          v-model="questions[index]"
                                          v-on:input="onDataChange"></multi-select>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="removeQuestion(index)" class="error mr-5">Remove</v-btn>
                            </v-layout>
                        </v-col>
                    </v-flex>

                    <v-flex v-if="'tfq' === questions[index].questionType">
                        <v-col>
                            <true-false :questionNumber="index+1" :count="count" v-model="questions[index]"
                                        v-on:input="onDataChange"></true-false>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="removeQuestion(index)" class="error mr-5">Remove</v-btn>
                            </v-layout>
                        </v-col>
                    </v-flex>

                    <v-flex v-if="'fbq' === questions[index].questionType">
                        <v-col>
                            <fill-blanks :questionNumber="index+1" :count="count" v-model="questions[index]"
                                         v-on:input="onDataChange"></fill-blanks>
                            <v-layout>
                                <v-spacer></v-spacer>
                                <v-btn @click="removeQuestion(index)" class="error mr-5">Remove</v-btn>
                            </v-layout>
                        </v-col>
                    </v-flex>

                </div>
            </v-container>

            <!--  Plus icon to add the question component  -->

            <v-layout class="mr-4 ">
                <v-spacer></v-spacer>
                <v-menu
                        offset-y
                        bottom
                        right
                >
                    <template v-slot:activator="{ on }">
                        <v-btn class="ma-5" rounded color="primary" v-on="on">
                            <v-icon left large>mdi-plus</v-icon>
                            Add Question
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                                v-for="(item, i) in questionCategories"
                                :key="i"
                                @click="addQuestion(item.id)"
                        >
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import MultiSelect from '../EditQuiz/Questions/EditMultiSelectQuestion'
    import MCQ from '../EditQuiz/Questions/EditMultipleChoiceQuestion'
    import FillBlanks from '../Questions/FillBlanksQuestion'
    import TrueFalse from '../EditQuiz/Questions/EditTrueFalse'

    export default {

        props: {},
        data: () => {
            return {
                questionCategories: [{
                    title: 'Multiple Choice question',
                    id: 1
                }, {
                    title: 'Multi Select Question',
                    id: 2
                }, {
                    title: 'True False',
                    id: 4
                }, {
                    title: 'Fill In The Blank',
                    id: 3
                }],
                quizValidation: false,
                count: 0,
                questions: []
            }
        },
        components: {
            'multi-select': MultiSelect,
            'mcq': MCQ,
            'fill-blanks': FillBlanks,
            'true-false': TrueFalse,
        },
        mounted() {

        },
        methods: {
            addQuestion(questionType) {
                this.count++;

                if (questionType === 1) {
                    this.questions.push({
                        question: '',
                        points: 0,
                        options: '',
                        questionType: 'mcq',
                        validation: false,
                        uniqueId: questionType + this.count

                    })
                }

                if (questionType === 2) {
                    this.questions.push({
                        question: '',
                        options: '',
                        points: 0,
                        questionType: 'msq',
                        validation: false,
                        uniqueId: questionType + this.count
                    })
                }

                if (questionType === 3) {
                    this.questions.push({
                        question: '',
                        points: 0,
                        blanks: '',
                        questionType: 'fbq',
                        validation: false,
                        uniqueId: questionType + this.count
                    })
                }

                if (questionType === 4) {
                    this.questions.push({
                        question: '',
                        points: 0,
                        answer: '',
                        questionType: 'tfq',
                        validation: false,
                        uniqueId: questionType + this.count
                    })
                }


                this.onDataChange()
            },
            removeQuestion(index) {
                this.questions.splice(index, 1);
                this.onDataChange()
            },

            onDataChange() {

                if (this.questions.length !== 0) {
                    this.quizValidation = true;
                    this.questions.forEach((item) => {
                        if (!item.validation) {
                            this.quizValidation = false
                        }
                    })
                } else this.quizValidation = false;

                const quizData = {
                    quizQuestions: this.questions,
                    quizValidation: this.quizValidation
                };

                this.$emit("input", quizData)
            },

            reset() {

                this.questions = [];
                this.quizValidation = false
            }
        },

    }
</script>
