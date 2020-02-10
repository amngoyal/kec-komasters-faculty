<template>
    <v-app>
        <v-container>

            <v-card tile :style="[cardStyle]">

                <v-container>
                    <p class="text-no-wrap">Question {{questionNumber}}</p>

                    <!-------------------------- input box for text and blanks ----------------------->
                    <v-flex style=" border: 1px solid #999;  padding: 5px; width: 100%; outline: #34a853">

                        <v-container>

                            <!----------------------- One row inside the input box ------------------------>
                            <v-row v-for="(i,index) in blanks" :key="index" no-gutters class="mb-4">

                                <v-col cols="12" xs="12" sm="12" md="6" lg="7">
                                    <v-textarea
                                            rows="1"
                                            auto-grow
                                            :background-color="textFieldBgColor[index]"
                                            v-model="fbText[2*index]"
                                            :placeholder="(index === 0)?'Text before blank '+ (index+1):'text after blank '+ (index)"
                                            @input="onTextInput(index)"
                                            @keydown="$event.keyCode === 32 && fbText[2*index].length === 0 ? $event.preventDefault() : false"
                                            solo
                                    ></v-textarea>
                                </v-col>

                                <v-col cols="12" xs='12' sm="12" md="6" lg="5">
                                    <div class="d-flex flex-wrap">

                                        <!------------------- blank button to add blank with options------------>
                                        <v-menu
                                                v-model="menu[index]"
                                                :close-on-content-click="false"
                                                :close-on-click="false"
                                                :nudge-width="200">

                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                        dark
                                                        :style="[baseStyles[index]]"
                                                        class="ml-2 mr-2 mt-2"
                                                        v-on="on"
                                                        outlined>

                                                    Blank{{index+1}}
                                                </v-btn>
                                            </template>

                                            <!------------ popup menu on clicking the blank button to add blank options-------->
                                            <v-card width="400">
                                                <v-container>
                                                    <v-card-title class="pa-5 headline">Enter options of
                                                        blank{{index+1}}
                                                    </v-card-title>
                                                    <v-radio-group v-model="blanks[index].answer" class="mx-4">

                                                        <v-layout v-for="(i,blankIndex) in blanks[index].options"
                                                                  :key="blankIndex">
                                                            <v-radio :value="blankIndex"
                                                                     class="align-start pt-2 "></v-radio>
                                                            <v-textarea
                                                                    rows="1"
                                                                    auto-grow
                                                                    outlined
                                                                    dense
                                                                    v-model="blanks[index].options[blankIndex]"
                                                                    @keydown="$event.keyCode === 32 && blanks[index].options[blankIndex].length === 0 ? $event.preventDefault() : false"
                                                                    :placeholder="`Option${i}`">
                                                            </v-textarea>
                                                        </v-layout>

                                                    </v-radio-group>

                                                    <v-layout>
                                                        <v-spacer></v-spacer>
                                                        <v-btn v-if="index === (blanks.length-1)"
                                                               class="ma-5 accent ml-2" dark
                                                               @click="cancelButton(index)">
                                                            {{(blanks[index].options[0] !== ''
                                                            || blanks[index].options[1] !== ''
                                                            || blanks[index].options[2] !== '')? 'Remove' :
                                                            'Cancel'}}
                                                        </v-btn>
                                                        <v-btn class="ma-5 accent ml-2" dark
                                                               v-on:click="done(index)">
                                                            Done
                                                        </v-btn>
                                                    </v-layout>
                                                </v-container>
                                            </v-card>
                                        </v-menu>


                                        <!------------------- button to remove last row ----------->
                                        <v-btn icon v-if="index === (blanks.length-1) && index !== 0" class="mt-2"
                                               v-on:click="removeBlank(index)">
                                            <v-icon color="red" large>mdi-close</v-icon>
                                        </v-btn>

                                        <!------------------ this is to show the correct answer of each blank ---------->
                                        <div v-for="(item,i) in blanks" :key="i" class="mt-2 ml-2">
                                        <span v-if="blanks[i].index === (index) && blanks[i].options[blanks[i].answer] !== ''"><strong>Answer:</strong>
                                            {{ blanks[i].options[blanks[i].answer]}}</span>
                                        </div>
                                    </div>
                                </v-col>

                            </v-row>

                        </v-container>
                    </v-flex>


                    <!---------------------- Question text ------------------>
                    <v-flex class="mt-4">
                        <p>Question:</p>
                        <p>{{questionText}}</p>
                    </v-flex>

                    <!------------------- Add text and blank row and points --------------------->
                    <v-row no-gutters>
                        <v-col cols="12" md="6" lg="6">
                            <v-btn class=" mt-4" color="primary" @click="addBlank()">Add Text after blank</v-btn>
                        </v-col>
                        <v-spacer/>
                        <v-col cols="12" md="6" lg="4">
                            <v-overflow-btn
                                    solo
                                    flat
                                    class="mt-4"
                                    v-model="points"
                                    @change="onDataChange"
                                    :items="pointsArray"
                                    label="Points"
                            ></v-overflow-btn>
                        </v-col>
                    </v-row>
                    <p style="color: #696969" class="">Note: Every question must have text
                        and atleast one blank</p>
                </v-container>
            </v-card>


            <!----------------------- Sanackbar ------------------------------>
            <v-snackbar
                    v-model="snackbar"
            >
                {{snackbarText}}
                <v-btn
                        color="primary"
                        text
                        @click="snackbar = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        props: {
            questionNumber: Number,
            count: Number,
        },
        data: () => {
            return {
                questionText: '',

                snackbar: false,
                snackbarText: '',

                fbText: ["", ""],

                blanks: [{
                    index: 0,
                    answer: 0,
                    options: ["", "", ""]
                }],

                numberOfBlanks: 1,

                validation: false,
                menu: [false],

                baseStyles: [{
                    color: '#ccc'
                }],

                textFieldBgColor: ["#ccc"],

                cardStyle: {
                    'border-left': '8px solid red'
                },

                points: '',
                pointsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                uid: ''
            }
        },
        components: {},
        mounted() {
            this.uid = "fbq" + this.count

        },
        methods: {
            addBlank(index) {
                if (this.blanks[this.numberOfBlanks - 1].options[0] !== '') {
                    this.fbText.push("", '');
                    this.numberOfBlanks++;
                    this.blanks.push({
                        index: this.numberOfBlanks - 1,
                        answer: 0,
                        options: ["", "", ""]
                    });
                    this.baseStyles.push({
                        color: '#ccc'
                    });
                    this.textFieldBgColor.push("#ccc")
                } else {
                    //index is for this function call from done button
                    if (index === undefined) {
                        this.snackbarText = "Please enter the values of previous blank first...";
                        this.snackbar = true
                    }
                }
                this.onDataChange()
            },
            done(index) {
                this.blanks[index].options[0] = this.blanks[index].options[0].trim()
                this.blanks[index].options[1] = this.blanks[index].options[1].trim()
                this.blanks[index].options[2] = this.blanks[index].options[2].trim()

                if (this.blanks[index].options[0] !== '' && this.blanks[index].options[1] !== '' && this.blanks[index].options[2] !== '') {
                    this.fbText[(2 * index + 1)] = '________';
                    this.menu.splice(index, 1);
                    this.baseStyles[index] = {
                        color: '#34a853'
                    };
                    this.addBlank(index)
                } else {
                    this.snackbarText = "Please enter all the options and select correct answer...";
                    this.snackbar = true
                }

                this.onDataChange()
            },
            cancelButton(index) {
                this.blanks[index].options = ["", "", ""];
                this.fbText[2 * index + 1] = '';
                this.menu.splice(index, 1);
                this.baseStyles[index] = {
                    color: '#ccc'
                };
                this.onDataChange()
            },
            removeBlank(index) {
                this.blanks.splice(index, 1);
                this.numberOfBlanks--;
                this.fbText.splice(2 * index, 2);
                this.updateQuestionText();
                this.textFieldBgColor.splice(index, 1);
                this.baseStyles.splice(index, 1);
                this.onDataChange()
            },
            onTextInput(index) {
                this.fbText[(2 * index)] = this.fbText[(2 * index)].trim()
                if (this.fbText[(2 * index)] !== '') {
                    this.textFieldBgColor[index] = "#C5E1A5"

                } else {
                    this.textFieldBgColor[index] = "#ccc"
                }
                this.onDataChange()
            },
            onDataChange() {

                this.updateQuestionText();

                let checkBlank = false;
                this.blanks.forEach((item) => {
                    if (item.options[0] !== '') {
                        checkBlank = true
                    }
                });

                let checkText = false;
                this.fbText.forEach((item, index) => {
                    if (index % 2 === 0 && item !== '') {
                        checkText = true
                    }
                });

                this.validation = checkBlank && checkText && this.points !== '';

                if (this.validation) {
                    this.cardStyle = {
                        'border-left': '8px solid #34a853'
                    }
                } else {
                    this.cardStyle = {
                        'border-left': '8px solid red'
                    }
                }

                //creates shallow copy of blanks array
                let blanksArray = Array.from(this.blanks);

                if (blanksArray[this.blanks.length - 1].options[0] === ''
                    && blanksArray[this.blanks.length - 1].options[1] === ''
                    && blanksArray[this.blanks.length - 1].options[2] === '') {

                    blanksArray.splice(this.blanks.length - 1, 1)
                }

                // array of options of blank (acc. to db schema)
                let options = [];

                blanksArray.forEach((blankObject, blankIndex) => {
                    blankObject.options.forEach((optionText, optionIndex) => {

                        options.push({
                            text: optionText,
                            isCorrect: (blankObject.answer === optionIndex),
                            index: blankIndex
                        })

                    })
                });


                const fbqData = {
                    question: this.questionText.trim(),
                    points: this.points,
                    options: options,
                    questionType: 'fbq',
                    validation: this.validation,
                    uniqueId: this.uid
                };

                this.$emit('input', fbqData)

            },
            updateQuestionText() {
                this.questionText = this.fbText.map(Function.prototype.call, String.prototype.trim).join(" ")
            },
        },
    }
</script>
