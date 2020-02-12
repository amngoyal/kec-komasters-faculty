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
                                    v-model="msqQuestionText"
                                    auto-grow
                                    @input="onDataChange"
                                    label="Multi Select Question"
                                    :hint="msqQuestionText.length < 10 ? 'Question must be greater than 9 characters' : ''"
                                    @keydown="$event.keyCode === 32 && msqQuestionText.length === 0 ? $event.preventDefault() : false"
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

                    <v-layout :key="index" v-for="(i,index) in options">
                        <v-checkbox
                                v-model="options[index].isCorrect"
                                color="primary"
                                @change="onDataChange"
                                class=""
                        ></v-checkbox>
                        <v-textarea
                                @input="onDataChange"
                                rows="1"
                                auto-grow
                                class="mt-1 ml-0"
                                v-model="options[index].text"
                                @keydown="$event.keyCode === 32 && options[index] .length === 0 ? $event.preventDefault() : false"
                                :placeholder="'Option '"
                                outlined>

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

                options: [{text: "", isCorrect: false, index: 0}, {text: "", isCorrect: false, index: 1}],

                msqQuestionText: '',

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
        },
        mounted() {
            this.uid = "msq" + this.count
        },
        methods: {
            addOption(length) {

                //this variable is to check whether previous options are filled or not
                let optionValidation = true;

                // if any option is empty then validation will false and new option will not be added
                this.options.forEach((item) => {
                    if (item.text === '') {
                        optionValidation = false
                    }
                });

                // add new option if previous options are not empty and maximum limit is not reached
                if (optionValidation) {
                    if (length < this.maxOptions) {
                        this.options.push({text: "", isCorrect: false, index: length})
                    } else {
                        this.snackbarText = `You can add maximum ${this.maxOptions} options`;
                        this.snackbar = true
                    }
                } else {
                    this.snackbarText = 'Please fill the previous options first';
                    this.snackbar = true
                }

                this.onDataChange()
            }
            ,
            removeOption(index) {
                this.options.splice(index, 1);
                this.onDataChange()
            }
            ,
            onDataChange() {

                //validating the all text fields of the msq component
                if (this.msqQuestionText.length >= 10 && this.points !== '') {

                    this.validation = true;

                    //Using this loop to check if any option is selected or not
                    for (var i = 0; i < this.options.length; i++) {
                        if (this.options[i].isCorrect === true) {
                            this.validation = true;
                            break;
                        } else {
                            this.validation = false;
                        }
                    }

                    // to check if any option is empty or not
                    this.options.forEach((item) => {
                        if (item.text === '' || item.text === undefined) {
                            this.validation = false
                        }
                    });

                } else
                    this.validation = false;

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

                // msq Payload to send to upper level components
                const msqData = {
                    question: this.msqQuestionText.trim(),
                    points: this.points,
                    options: this.options,
                    questionType: 'msq',
                    validation: this.validation,
                    uniqueId: this.uid
                };

                //emitting all values of msq
                this.$emit("input", msqData);
            }
            ,
        }
    }
</script>
