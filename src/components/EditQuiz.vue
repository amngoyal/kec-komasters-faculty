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
    import MultiSelect from './Questions/MultiSelectQuestion'
    import MCQ from './Questions/MultipleChoiceQuestion'
    import FillBlanks from './Questions/FillBlanksQuestion'
    import TrueFalse from './Questions/TrueFalse'

    export default {

        props: {Questions: Array},
        data: () => {
            return {
                questionCategories: [{
                    title: 'Multiple Choice question',
                    id: 'mcq'
                }, {
                    title: 'Multi Select Question',
                    id: 'msq'
                }, {
                    title: 'True False',
                    id: 'tfq'
                }, {
                    title: 'Fill In The Blank',
                    id: 'fbq'
                }],
                quizValidation: false,
                count: 0,
            }
        },
        components: {
            'multi-select': MultiSelect,
            'mcq': MCQ,
            'fill-blanks': FillBlanks,
            'true-false': TrueFalse,
        },
        methods: {
            addQuestion(questionType) {
                this.count++;

                if (questionType === 'mcq') {
                    this.questions.push({
                        question: '',
                        points: 0,
                        options: '',
                        answer: '',
                        questionType: 'mcq',
                        validation: false,
                        uniqueId: questionType + this.count

                    })
                }

                if (questionType === 'msq') {
                    this.questions.push({
                        question: '',
                        options: '',
                        points: 0,
                        questionType: 'msq',
                        validation: false,
                        uniqueId: questionType + this.count
                    })
                }

                if (questionType === 'tfq') {
                    this.questions.push({
                        question: '',
                        points: 0,
                        answer: '',
                        questionType: 'tfq',
                        validation: false,
                        uniqueId: questionType + this.count
                    })
                }

                if (questionType === 'fbq') {
                    this.questions.push({
                        question: '',
                        points: 0,
                        blanks: '',
                        questionType: 'fbq',
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
