<template>

    <v-container>

        <v-card tile :style="[cardStyle]">

            <v-container>
                <p>Question {{questionNumber}}</p>

                <!------------------------------ Question and points input ------------------------>
                <v-layout class="mb-0">
                    <v-row no-gutters>
                        <v-col cols="12" xs="6" sm="8" md="8" lg="9">
                            <v-textarea
                                    rows="1"
                                    v-model="mcqQuestionText"
                                    auto-grow
                                    @input="onDataChange"
                                    label="Multiple Choice Question"
                                    :hint="mcqQuestionText.length < 10 ? 'Question must be greater than 9 characters' : ''"
                                    @keydown="$event.keyCode === 32 && mcqQuestionText .length === 0 ? $event.preventDefault() : false"
                                    outlined
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" xs="6" sm="4" md="4" lg="3" align-self="auto">
                            <v-overflow-btn
                                    solo
                                    flat
                                    class="ml-2"
                                    v-model="points"
                                    @change="onDataChange"
                                    :items="pointsArray"
                                    label="Points"
                            ></v-overflow-btn>
                        </v-col>
                    </v-row>
                </v-layout>


                <!-------------------- Options View ---------------------->

                <v-flex class="ml-4 mt-0" xs12 sm8 offset-sm0>

                    <v-radio-group class="ma-0 mb-0" v-model="radioButtonValue" @change="onDataChange">
                        <v-layout :key="index" v-for="(i,index) in options">
                            <v-radio class="align-start pt-4"
                                     color="primary"
                                     :value="index"
                            ></v-radio>
                            <v-textarea
                                    @input="onDataChange"
                                    rows="1"
                                    auto-grow
                                    class="mb-0 ml-0"
                                    v-model="options[index]"
                                    @keydown="$event.keyCode === 32 && options[index] .length === 0 ? $event.preventDefault() : false"
                                    :placeholder="'Option '"
                                    outlined >

                            </v-textarea>

                            <!-------------------------Icon to remove the last option ---------------------->
                            <div v-if="options.length > minOptions && index === options.length-1 "
                                 class="mt-3 ml-1">
                                <v-btn icon>
                                    <v-icon style="color: red" @click="removeOption(index)" large>mdi-close</v-icon>
                                </v-btn>
                            </div>

                            <!--This div is only to cover the space of cross icon in remaining text fields-->
                            <div v-if="!(options.length > minOptions && index === options.length-1) "
                                 class=" mt-3 ml-1">

                                <v-icon style="color: white" large>mdi-close</v-icon>

                            </div>
                        </v-layout>
                    </v-radio-group>
                </v-flex>

                <!----------------------------------- To add new Option -------------------------->
                <a @click="addOption(options.length)" class="info--text"> Add more option </a>

            </v-container>
        </v-card>

        <!---------------------------------- Snack Bar -------------------------------->
        <v-snackbar
                v-model="snackbar"
        >
            {{ snackbarText }}
            <v-btn
                    color="primary"
                    text
                    @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
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
                minOptions: 2,
                maxOptions: 6,

                options: ["", ""],

                mcqQuestionText: '',

                radioButtonValue: 0,

                validation: false,

                snackbar: false,
                snackbarText: '',

                points: '',
                pointsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

                cardStyle: {
                    'border-left': '8px solid red'
                },
                uid: ''
            }
        }, mounted() {
            this.uid = "mcq" + this.count
        },
        methods: {
            addOption(length) {

                //this variable is to check whether previous options are filled or not
                let optionValidation = true;

                // if any option is empty then validation will false and new option will not be added
                this.options.forEach((item) => {
                    if (item === '') {
                        optionValidation = false
                    }
                });

                // add new option if previous options are not empty and maximum limit is not reached
                if (optionValidation) {
                    if (length < this.maxOptions) {
                        this.options.push('')
                    } else {
                        this.snackbarText = `You can add maximum ${this.maxOptions} options`;
                        this.snackbar = true
                    }
                } else {
                    this.snackbarText = 'Please fill the previous options first';
                    this.snackbar = true
                }
                this.onDataChange()
            },
            removeOption(index) {
                this.options.splice(index, 1);
                if (this.radioButtonValue === index)
                    this.radioButtonValue--;
                this.onDataChange()
            },
            onDataChange() {

                //validating the all text fields of the mcq component
                if (this.mcqQuestionText.length >= 10 && this.radioButtonValue !== undefined && this.points !== '') {

                    this.validation = true;

                    // to check if any option is empty or not
                    this.options.forEach((item) => {
                        if (item === '' || item === undefined) {
                            this.validation = false
                        }
                    })
                } else this.validation = false;

                // To  change the card border border according to the validation
                if (this.validation) {
                    this.cardStyle = {
                        'border-left': '8px solid #34a853'
                    }
                } else {
                    this.cardStyle = {
                        'border-left': '8px solid red'
                    }
                }

                // options property according to the db schema
                let options = [];
                this.options.forEach((item, index) => {
                    if (index === this.radioButtonValue) {
                        options.push({
                            text: item,
                            isCorrect: true,
                            index: index,
                        })
                    } else {
                        options.push({
                            text: item,
                            isCorrect: false,
                            index: index,
                        })
                    }
                });

                // mcq Payload to send to upper level components
                const mcqData = {
                    question: this.mcqQuestionText.trim(),
                    points: this.points,
                    options: options, // options of local scope (created above)
                    answer: this.radioButtonValue,
                    questionType: 'mcq',
                    validation: this.validation,
                    uniqueId: this.uid
                };

                //emitting all values of mcq
                this.$emit("input", mcqData);
            },
        }
    }
</script>
