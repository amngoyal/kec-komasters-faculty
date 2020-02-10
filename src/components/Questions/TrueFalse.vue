<template>
    <v-container>
        <v-card tile :style="cardStyle">

            <v-container>
                <p>Question {{questionNumber}}</p>

                <v-row class="mb-0" no-gutters>

                    <v-col cols="12" xs="12" sm="7" md="8" lg="9">
                        <v-textarea
                                rows="1"
                                @input="onOptionSelect"
                                label="True False Question"
                                auto-grow
                                @keydown="$event.keyCode === 32 && tfQuestionText.length === 0 ? $event.preventDefault() : false"
                                v-model="tfQuestionText"
                                :hint="tfQuestionText.length < 10 ? 'Question must be greater than 9 characters' : ''"
                                outlined
                        ></v-textarea>
                    </v-col>

                    <v-col cols="12" xs="12" sm="5" md="4" lg="3" align-self="auto">
                        <v-overflow-btn
                                solo
                                flat
                                class=" ml-2"
                                v-model="points"
                                @change="onOptionSelect"
                                :items="pointsArray"
                                label="Points"
                        ></v-overflow-btn>
                    </v-col>
                </v-row>

                <v-radio-group v-model="radioButtonValue" @change="onOptionSelect" class="mt-0">
                    <v-radio class="pa-1 ml-4" label="True" :value='true' color="primary"></v-radio>
                    <v-radio class="pa-1 ml-4" label="False" color="primary"
                             :value='false'></v-radio>
                </v-radio-group>
            </v-container>
        </v-card>
    </v-container>
</template>
<script>

    export default {
        props: {
            questionNumber: Number,
            count: Number,
        },
        data: () => {
            return {

                tfQuestionText: '',
                points: '',
                radioButtonValue: true,
                validation: false,
                pointsArray:  [1,2,3,4,5,6,7,8,9,10],
                cardStyle: {
                    'border-left': '8px solid red'
                },
                uid: ""
            }
        },
        mounted() {
            this.uid = "tfq" + this.count;

        },
        methods: {
            onOptionSelect() {

                this.validation = this.tfQuestionText.length >= 10 && this.points !== '';

                if (this.validation) {
                    this.cardStyle = {
                        'border-left': '8px solid #34a853'
                    }
                } else {
                    this.cardStyle = {
                        'border-left': '8px solid red'
                    }
                }

                const trueFalseQuestion = {
                    question: this.tfQuestionText.trim(),
                    points: this.points,
                    answer: this.radioButtonValue,
                    questionType: 'tfq',
                    validation: this.validation,
                    uniqueId: this.uid
                };


                this.$emit("input", trueFalseQuestion)
            }
        }
    }
</script>
