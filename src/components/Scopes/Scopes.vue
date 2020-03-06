<template>
    <div>
        <!----------------------- Scopes ------------------------->

        <p class="font-weight-bold">Scope:</p>
        <b-form-checkbox
                v-model="all"
                class="mr-9"
                inline
                :value="true"
                v-on:input="onAllSelect"
        >
            All
        </b-form-checkbox>

        <hr>

        <v-row class="justify-center">

            <!------- v-row 1st col----------->
            <v-col xs="12" sm="12" md="6" lg="6">

                <!------------ 1st Year ------------->

                <v-flex>

                    <b-form-checkbox
                            v-model="firstAll"
                            class="mb-1"
                            inline
                            :value="true"
                            v-on:input="onFirstAllSelect"
                    >
                        1st Year
                    </b-form-checkbox>

                    <v-row no-gutters>
                        <v-col cols="12" align-self="center">
                            <b-form-checkbox-group
                                    class="ml-5">
                                <b-form-checkbox
                                        v-for="option in firstYearSectionsArray"
                                        v-model="firstAs"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFirstAllSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </b-form-checkbox-group>
                        </v-col>
                    </v-row>

                </v-flex>

                <!------------ 2nd Year ------------->

                <v-flex class="mt-10">

                    <b-form-checkbox
                            v-model="secondAll"
                            class="mb-1"
                            inline
                            :value="true"
                            v-on:input="onSecondAllSelect()"
                    >
                        2nd Year
                    </b-form-checkbox>

                    <!------------ 2nd Year CSE ------------->
                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="secondCseAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onSecondCseSelect()"
                            >
                                <div style="width: 30px;">CSE:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="ml-2 mb-1">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in secondYearCseSectionsArray"
                                        :key="option.value"
                                        v-model="secondCse"
                                        :value="option.value"
                                        inline
                                        v-on:input="onSecondCseSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 2nd Year IT ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="secondItAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onSecondItSelect"
                            >
                                <div style="width: 30px;">IT:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in secondYearItSectionsArray"
                                        v-model="secondIt"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onSecondItSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 2nd Year ME ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="secondMeAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onSecondMeSelect"
                            >
                                <div style="width: 30px;">ME:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in secondYearMeSectionsArray"
                                        v-model="secondMe"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onSecondMeSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 2nd Year ECE ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="secondEceAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onSecondEceSelect"
                            >
                                <div style="width: 30px;">ECE:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="8" align-self="start">

                                <b-form-checkbox
                                        v-for="option in secondYearEceSectionsArray"
                                        v-model="secondEce"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onSecondEceSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>

                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 2nd Year CIVIL ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="secondCivilAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onSecondCivilSelect"
                            >
                                <div style="width: 30px;">CIVIL:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in secondYearCivilSectionsArray"
                                        v-model="secondCivil"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onSecondCivilSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                </v-flex>

            </v-col>

            <!------- v-row 2nd col----------->
            <v-col xs="12" sm="12" md="6" lg="6">

                <!------------ 3rd Year ------------->

                <v-flex>

                    <b-form-checkbox
                            v-model="thirdAll"
                            class="mb-1"
                            inline
                            :value="true"
                            v-on:input="onThirdAllSelect"
                    >
                        3rd Year
                    </b-form-checkbox>

                    <!------------ 3rd Year CSE ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="thirdCseAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onThirdCseSelect"
                            >
                                <div style="width: 30px;">CSE:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in thirdYearCseSectionsArray"
                                        v-model="thirdCse"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onThirdCseSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 3rd Year IT ------------->
                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="thirdItAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onThirdItSelect"
                            >
                                <div style="width: 30px;">IT:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">

                                <b-form-checkbox
                                        v-for="option in thirdYearItSectionsArray"
                                        v-model="thirdIt"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onThirdItSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>

                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 3rd Year ME ------------->
                    <v-layout>

                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="thirdMeAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onThirdMeSelect"
                            >
                                <div style="width: 30px;">ME:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in thirdYearMeSectionsArray"
                                        v-model="thirdMe"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onThirdMeSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 3rd Year ECE ------------->
                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="thirdEceAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onThirdEceSelect"
                            >
                                <div style="width: 30px;">ECE:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in thirdYearEceSectionsArray"
                                        v-model="thirdEce"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onThirdEceSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 3rd Year CSE ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="thirdCivilAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onThirdCivilSelect"
                            >
                                <div style="width: 30px;">CIVIL:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in thirdYearCivilSectionsArray"
                                        v-model="thirdCivil"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onThirdCivilSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>
                </v-flex>

                <!------------ 4th Year ------------->

                <v-flex class="mt-10">

                    <b-form-checkbox
                            v-model="fourthAll"
                            class="mb-1"
                            inline
                            :value="true"
                            v-on:input="onFourthAllSelect"
                    >
                        4th Year
                    </b-form-checkbox>

                    <!------------ 4th Year CSE ------------->
                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="fourthCseAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onFourthCseSelect"
                            >
                                <div style="width: 30px;">CSE:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in fourthYearCseSectionsArray"
                                        v-model="fourthCse"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFourthCseSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 4th Year IT ------------->
                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="fourthItAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onFourthItSelect"
                            >
                                <div style="width: 30px;">IT:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in fourthYearItSectionsArray"
                                        v-model="fourthIt"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFourthItSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 4th Year ME ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="fourthMeAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onFourthMeSelect"
                            >
                                <div style="width: 30px;">ME:</div>
                            </b-form-checkbox>
                        </div>
                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in fourthYearMeSectionsArray"
                                        v-model="fourthMe"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFourthMeSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 4th Year ECE ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="fourthEceAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onFourthEceSelect"
                            >
                                <div style="width: 30px;">ECE:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="mb-1 ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in fourthYearEceSectionsArray"
                                        v-model="fourthEce"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFourthEceSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                    <!------------ 4th Year CIVIL ------------->

                    <v-layout>
                        <div class="text-no-wrap">
                            <b-form-checkbox
                                    v-model="fourthCivilAll"
                                    class="ml-5"
                                    inline
                                    :value="true"
                                    v-on:input="onFourthCivilSelect"
                            >
                                <div style="width: 30px;">CIVIL:</div>
                            </b-form-checkbox>
                        </div>

                        <v-row no-gutters class="ml-2">
                            <v-col cols="12" align-self="start">
                                <b-form-checkbox
                                        v-for="option in fourthYearCivilSectionsArray"
                                        v-model="fourthCivil"
                                        :key="option.value"
                                        :value="option.value"
                                        inline
                                        v-on:input="onFourthCivilSelect"
                                >
                                    {{ option.section }}
                                </b-form-checkbox>
                            </v-col>
                        </v-row>
                    </v-layout>

                </v-flex>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    export default {
        props: {},
        data() {
            return {
                all: false,

                firstYearSectionsArray:
                    [
                        {section: "A", value: '1A'},
                        {section: "B", value: '1B'},
                        {section: "C", value: '1C'},
                        {section: "D", value: '1D'},
                        {section: "E", value: '1E'},
                        {section: "F", value: '1F'},
                        {section: "G", value: '1G'},
                        {section: "H", value: '1H'},
                        {section: "I", value: '1I'},
                        {section: "J", value: '1J'},
                    ],
                firstAll: false,
                firstAs: [],
                AS: false,

                secondYearCseSectionsArray:
                    [
                        {section: "A", value: '2CSEA'},
                        {section: "B", value: '2CSEB'},
                        {section: "C", value: '2CSEC'},
                        {section: "D", value: '2CSED'},
                        {section: "E", value: '2CSEE'},
                        {section: "F", value: '2CSEF'},
                        {section: "G", value: '2CSEG'},
                        {section: "H", value: '2CSEH'},

                    ],
                secondYearItSectionsArray: [{section: 'A', value: '2ITA'}, {section: 'B', value: '2ITB'}],
                secondYearMeSectionsArray: [{section: 'A', value: '2MEA'}, {section: 'B', value: '2MEB'}],
                secondYearEceSectionsArray: [{section: 'A', value: '2ECEA'}, {section: 'B', value: '2ECEB'}],
                secondYearCivilSectionsArray: [{section: 'A', value: '2CEA'}, {section: 'B', value: '2CEB'}],
                secondAll: false,
                secondCseAll: false,
                secondItAll: false,
                secondMeAll: false,
                secondEceAll: false,
                secondCivilAll: false,
                secondCse: [],
                secondIt: [],
                secondMe: [],
                secondEce: [],
                secondCivil: [],
                CSE2: false,
                IT2: false,
                ME2: false,
                ECE2: false,
                CIVIL2: false,

                thirdYearCseSectionsArray:
                    [
                        {section: "A", value: '3CSEA'},
                        {section: "B", value: '3CSEB'},
                        {section: "C", value: '3CSEC'},
                        {section: "D", value: '3CSED'},
                        {section: "E", value: '3CSEE'},
                        {section: "F", value: '3CSEF'},
                        {section: "G", value: '3CSEG'},
                        {section: "H", value: '3CSEH'},
                    ],
                thirdYearItSectionsArray: [{section: 'A', value: '3ITA'}, {section: 'B', value: '3ITB'}],
                thirdYearMeSectionsArray: [{section: 'A', value: '3MEA'}, {section: 'B', value: '3MEB'}],
                thirdYearEceSectionsArray: [{section: 'A', value: '3ECEA'}, {section: 'B', value: '3ECEB'}],
                thirdYearCivilSectionsArray: [{section: 'A', value: '3CEA'}, {section: 'B', value: '3CEB'}],
                thirdAll: false,
                thirdCseAll: false,
                thirdItAll: false,
                thirdMeAll: false,
                thirdEceAll: false,
                thirdCivilAll: false,
                thirdCse: [],
                thirdIt: [],
                thirdMe: [],
                thirdEce: [],
                thirdCivil: [],
                CSE3: false,
                IT3: false,
                ME3: false,
                ECE3: false,
                CIVIL3: false,

                fourthYearCseSectionsArray:
                    [
                        {section: "A", value: '4CSEA'},
                        {section: "B", value: '4CSEB'},
                        {section: "C", value: '4CSEC'},
                        {section: "D", value: '4CSED'},
                        {section: "E", value: '4CSEE'},
                        {section: "F", value: '4CSEF'},
                        {section: "G", value: '4CSEG'},
                        {section: "H", value: '4CSEH'},
                    ],
                fourthYearItSectionsArray: [{section: 'A', value: '4ITA'},{section: 'B', value: '4ITB'}],
                fourthYearMeSectionsArray: [{section: 'A', value: '4MEA'},{section: 'B', value: '4MEB'}],
                fourthYearEceSectionsArray: [{section: 'A', value: '4ECEA'},{section: 'B', value: '4ECEB'}],
                fourthYearCivilSectionsArray: [{section: 'A', value: '4CEA'},{section: 'B', value: '4CEB'}],
                fourthAll: false,
                fourthCseAll: false,
                fourthItAll: false,
                fourthMeAll: false,
                fourthEceAll: false,
                fourthCivilAll: false,
                fourthCse: [],
                fourthIt: [],
                fourthMe: [],
                fourthEce: [],
                fourthCivil: [],
                CSE4: false,
                IT4: false,
                ME4: false,
                ECE4: false,
                CIVIL4: false,
            }
        },
        methods: {
            onAllSelect() {
                if (this.all) {
                    this.firstAll = true;
                    this.secondAll = true;
                    this.thirdAll = true;
                    this.fourthAll = true;
                } else {
                    if (this.firstAll && this.secondAll && this.thirdAll && this.fourthAll) {
                        this.firstAll = false;
                        this.secondAll = false;
                        this.thirdAll = false;
                        this.fourthAll = false;
                    }
                }
            },
            onFirstAllSelect() {

                if (this.AS) {
                    if (!this.firstAll) {
                        this.firstAs = [];
                        this.AS = false;


                        this.all = false;
                    }

                    if (this.firstAs.length < this.firstYearSectionsArray.length && this.firstAll) {
                        this.firstAll = false;
                        this.AS = false;


                        this.all = false;
                    }
                }

                if (this.firstAll && !this.AS) {
                    this.firstAs = ['1A', '1B', '1C', '1D', '1E', '1F', '1G', '1H', '1I', '1J'];
                    this.AS = true;
                }

                if (this.firstAs.length === this.firstYearSectionsArray.length) {
                    this.firstAll = true;
                    this.AS = true;

                    //Condition for select all checkbox
                    if (this.secondAll && this.thirdAll && this.fourthAll) {
                        this.all = true;
                    }
                }
                this.onDataChange()
            },
            onSecondAllSelect() {
                if (!this.secondAll) {

                    this.all = false;

                    if (this.secondCseAll && this.secondCivilAll && this.secondEceAll && this.secondItAll && this.secondMeAll) {
                        this.secondCivilAll = false;
                        this.secondCseAll = false;
                        this.secondEceAll = false;
                        this.secondMeAll = false;
                        this.secondItAll = false;
                    }
                }

                if (this.secondAll) {
                    this.secondCivilAll = true;
                    this.secondCseAll = true;
                    this.secondEceAll = true;
                    this.secondMeAll = true;
                    this.secondItAll = true;

                    //Condition for select all checkbox
                    if (this.firstAll && this.thirdAll && this.fourthAll) {
                        this.all = true;
                    }
                }
            },
            onSecondCseSelect() {

                if (this.CSE2) {
                    if (!this.secondCseAll) {
                        this.secondCse = [];
                        this.CSE2 = false;
                        this.secondAll = false;
                    }

                    if (this.secondCse.length < this.secondYearCseSectionsArray.length && this.secondCseAll) {
                        this.secondCseAll = false;
                        this.CSE2 = false;
                        this.secondAll = false;

                    }
                }

                if (this.secondCseAll && !this.CSE2) {
                    this.secondCse = ['2CSEA', '2CSEB', '2CSEC', '2CSED', '2CSEE', '2CSEF', '2CSEG', '2CSEH'];
                    this.CSE2 = true;

                }

                if (this.secondCse.length === this.secondYearCseSectionsArray.length) {
                    this.secondCseAll = true;
                    this.CSE2 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.secondMeAll && this.secondItAll && this.secondEceAll && this.secondCivilAll) {
                        this.secondAll = true;
                    }
                }
                this.onDataChange()
            },
            onSecondItSelect() {
                if (this.IT2) {
                    if (!this.secondItAll) {
                        this.secondIt = [];
                        this.IT2 = false;
                        this.secondAll = false;
                    }

                    if (this.secondIt.length < this.secondYearItSectionsArray.length && this.secondItAll) {
                        this.secondItAll = false;
                        this.IT2 = false;
                        this.secondAll = false;
                    }
                }

                if (this.secondItAll && !this.IT2) {
                    this.secondIt = ['2ITA', '2ITB'];
                    this.IT2 = true;
                }

                if (this.secondIt.length === this.secondYearItSectionsArray.length) {
                    this.secondItAll = true;
                    this.IT2 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.secondMeAll && this.secondCseAll && this.secondEceAll && this.secondCivilAll) {
                        this.secondAll = true;
                    }
                }
                this.onDataChange()
            },
            onSecondMeSelect() {
                if (this.ME2) {
                    if (!this.secondMeAll) {
                        this.secondMe = [];
                        this.ME2 = false;
                        this.secondAll = false;
                    }

                    if (this.secondMe.length < this.secondYearMeSectionsArray.length && this.secondMeAll) {
                        this.secondMeAll = false;
                        this.ME2 = false;
                        this.secondAll = false;
                    }
                }

                if (this.secondMeAll && !this.ME2) {
                    this.secondMe = ['2MEA', '2MEB'];
                    this.ME2 = true;
                }

                if (this.secondMe.length === this.secondYearMeSectionsArray.length) {
                    this.secondMeAll = true;
                    this.ME2 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.secondCseAll && this.secondItAll && this.secondEceAll && this.secondCivilAll) {
                        this.secondAll = true;
                    }
                }
                this.onDataChange()
            },
            onSecondEceSelect() {
                if (this.ECE2) {
                    if (!this.secondEceAll) {
                        this.secondEce = [];
                        this.ECE2 = false;
                        this.secondAll = false;
                    }

                    if (this.secondEce.length < this.secondYearEceSectionsArray.length && this.secondEceAll) {
                        this.secondEceAll = false;
                        this.ECE2 = false;
                        this.secondAll = false;
                    }
                }

                if (this.secondEceAll && !this.ECE2) {
                    this.secondEce = ['2ECEA', '2ECEB'];
                    this.ECE2 = true;
                }

                if (this.secondEce.length === this.secondYearEceSectionsArray.length) {
                    this.secondEceAll = true;
                    this.ECE2 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.secondMeAll && this.secondItAll && this.secondCseAll && this.secondCivilAll) {
                        this.secondAll = true;
                    }
                }
                this.onDataChange()
            },
            onSecondCivilSelect() {
                if (this.CIVIL2) {
                    if (!this.secondCivilAll) {
                        this.secondCivil = [];
                        this.CIVIL2 = false;
                        this.secondAll = false;
                    }

                    if (this.secondCivil.length < this.secondYearCivilSectionsArray.length && this.secondCivilAll) {
                        this.secondCivilAll = false;
                        this.CIVIL2 = false;
                        this.secondAll = false;
                    }
                }

                if (this.secondCivilAll && !this.CIVIL2) {
                    this.secondCivil = ['2CEA', '2CEB'];
                    this.CIVIL2 = true;
                }

                if (this.secondCivil.length === this.secondYearCivilSectionsArray.length) {
                    this.secondCivilAll = true;
                    this.CIVIL2 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.secondMeAll && this.secondItAll && this.secondEceAll && this.secondCseAll) {
                        this.secondAll = true;
                    }
                }
                this.onDataChange()
            },


            onThirdAllSelect() {
                if (this.thirdAll) {
                    this.thirdCivilAll = true;
                    this.thirdCseAll = true;
                    this.thirdEceAll = true;
                    this.thirdMeAll = true;
                    this.thirdItAll = true;

                    //Condition for select all checkbox
                    if (this.secondAll && this.firstAll && this.fourthAll) {
                        this.all = true;
                    }
                }

                if (!this.thirdAll) {

                    this.all = false;

                    if (this.thirdCseAll && this.thirdMeAll && this.thirdItAll && this.thirdEceAll && this.thirdCivilAll) {
                        this.thirdCivilAll = false;
                        this.thirdCseAll = false;
                        this.thirdEceAll = false;
                        this.thirdMeAll = false;
                        this.thirdItAll = false;
                    }
                }
            },

            onThirdCseSelect() {

                if (this.CSE3) {
                    if (!this.thirdCseAll) {
                        this.thirdCse = [];
                        this.CSE3 = false;
                        this.thirdAll = false;
                    }

                    if (this.thirdCse.length < this.thirdYearCseSectionsArray.length && this.thirdCseAll) {
                        this.thirdCseAll = false;
                        this.CSE3 = false;
                        this.thirdAll = false;
                    }
                }

                if (this.thirdCseAll && !this.CSE3) {
                    this.thirdCse = ['3CSEA', '3CSEB', '3CSEC', '3CSED','3CSEE', '3CSEF', '3CSEG', '3CSEH'];
                    this.CSE3 = true;
                }

                if (this.thirdCse.length === this.thirdYearCseSectionsArray.length) {
                    this.thirdCseAll = true;
                    this.CSE3 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.thirdMeAll && this.thirdItAll && this.thirdEceAll && this.thirdCivilAll) {
                        this.thirdAll = true;
                    }
                }
                this.onDataChange()
            },
            onThirdItSelect() {
                if (this.IT3) {
                    if (!this.thirdItAll) {
                        this.thirdIt = [];
                        this.IT3 = false;
                        this.thirdAll = false;
                    }

                    if (this.thirdIt.length < this.thirdYearItSectionsArray.length && this.thirdItAll) {
                        this.thirdItAll = false;
                        this.IT3 = false;
                        this.thirdAll = false;
                    }
                }

                if (this.thirdItAll && !this.IT3) {
                    this.thirdIt = ['3ITA', '3ITB'];
                    this.IT3 = true;
                }

                if (this.thirdIt.length === this.thirdYearItSectionsArray.length) {
                    this.thirdItAll = true;
                    this.IT3 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.thirdMeAll && this.thirdCseAll && this.thirdEceAll && this.thirdCivilAll) {
                        this.thirdAll = true;
                    }
                }
                this.onDataChange()
            },
            onThirdMeSelect() {
                if (this.ME3) {
                    if (!this.thirdMeAll) {
                        this.thirdMe = [];
                        this.ME3 = false;
                        this.thirdAll = false;
                    }

                    if (this.thirdMe.length < this.thirdYearMeSectionsArray.length && this.thirdMeAll) {
                        this.thirdMeAll = false;
                        this.ME3 = false;
                        this.thirdAll = false;
                    }
                }

                if (this.thirdMeAll && !this.ME3) {
                    this.thirdMe = ['3MEA', '3MEB'];
                    this.ME3 = true;
                }

                if (this.thirdMe.length === this.thirdYearMeSectionsArray.length) {
                    this.thirdMeAll = true;
                    this.ME3 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.thirdCseAll && this.thirdItAll && this.thirdEceAll && this.thirdCivilAll) {
                        this.thirdAll = true;
                    }
                }
                this.onDataChange()
            },
            onThirdEceSelect() {
                if (this.ECE3) {
                    if (!this.thirdEceAll) {
                        this.thirdEce = [];
                        this.ECE3 = false;
                        this.thirdAll = false;
                    }

                    if (this.thirdEce.length < this.thirdYearEceSectionsArray.length && this.thirdEceAll) {
                        this.thirdEceAll = false;
                        this.ECE3 = false;
                        this.thirdAll = false;
                    }
                }

                if (this.thirdEceAll && !this.ECE3) {
                    this.thirdEce = ['3ECEA', '3ECEB'];
                    this.ECE3 = true;
                }

                if (this.thirdEce.length === this.thirdYearEceSectionsArray.length) {
                    this.thirdEceAll = true;
                    this.ECE3 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.thirdMeAll && this.thirdItAll && this.thirdCseAll && this.thirdCivilAll) {
                        this.thirdAll = true;
                    }
                }
                this.onDataChange()
            },
            onThirdCivilSelect() {
                if (this.CIVIL3) {
                    if (!this.thirdCivilAll) {
                        this.thirdCivil = [];
                        this.CIVIL3 = false;

                        this.thirdAll = false;
                    }

                    if (this.thirdCivil.length < this.thirdYearCivilSectionsArray.length && this.thirdCivilAll) {
                        this.thirdCivilAll = false;
                        this.CIVIL3 = false;
                        this.thirdAll = false;
                    }
                }

                if (this.thirdCivilAll && !this.CIVIL3) {
                    this.thirdCivil = ['3CEA', '3CEB'];
                    this.CIVIL3 = true;
                }

                if (this.thirdCivil.length === this.thirdYearCivilSectionsArray.length) {
                    this.thirdCivilAll = true;
                    this.CIVIL3 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.thirdMeAll && this.thirdItAll && this.thirdEceAll && this.thirdCseAll) {
                        this.thirdAll = true;
                    }
                }
                this.onDataChange()
            },


            onFourthAllSelect() {

                this.all = false;

                if (this.fourthAll) {
                    this.fourthCivilAll = true;
                    this.fourthCseAll = true;
                    this.fourthEceAll = true;
                    this.fourthMeAll = true;
                    this.fourthItAll = true;

                    //Condition for select all checkbox
                    if (this.secondAll && this.thirdAll && this.firstAll) {
                        this.all = true;
                    }
                }

                if (!this.fourthAll) {
                    if (this.fourthCseAll && this.fourthMeAll && this.fourthItAll && this.fourthEceAll && this.fourthCivilAll) {
                        this.fourthCivilAll = false;
                        this.fourthCseAll = false;
                        this.fourthEceAll = false;
                        this.fourthMeAll = false;
                        this.fourthItAll = false;
                    }
                }
            },
            onFourthCseSelect() {

                if (this.CSE4) {
                    if (!this.fourthCseAll) {
                        this.fourthCse = [];
                        this.CSE4 = false;
                        this.fourthAll = false;
                    }

                    if (this.fourthCse.length < this.fourthYearCseSectionsArray.length && this.fourthCseAll) {
                        this.fourthCseAll = false;
                        this.CSE4 = false;
                        this.fourthAll = false;
                    }
                }

                if (this.fourthCseAll && !this.CSE4) {
                    this.fourthCse = ['4CSEA', '4CSEB', '4CSEC', '4CSED','4CSEE', '4CSEF', '4CSEG', '4CSEH'];
                    this.CSE4 = true;
                }

                if (this.fourthCse.length === this.fourthYearCseSectionsArray.length) {
                    this.fourthCseAll = true;
                    this.CSE4 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.fourthMeAll && this.fourthItAll && this.fourthEceAll && this.fourthCivilAll) {
                        this.fourthAll = true;
                    }
                }
                this.onDataChange()
            },
            onFourthItSelect() {
                if (this.IT4) {
                    if (!this.fourthItAll) {
                        this.fourthIt = [];
                        this.IT4 = false;
                        this.fourthAll = false;
                    }

                    if (this.fourthIt.length < this.fourthYearItSectionsArray.length && this.fourthItAll) {
                        this.fourthItAll = false;
                        this.IT4 = false;
                        this.fourthAll = false;
                    }
                }

                if (this.fourthItAll && !this.IT4) {
                    this.fourthIt = ['4ITA', '4ITB'];
                    this.IT4 = true;
                }

                if (this.fourthIt.length === this.fourthYearItSectionsArray.length) {
                    this.fourthItAll = true;
                    this.IT4 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.fourthMeAll && this.fourthCseAll && this.fourthEceAll && this.fourthCivilAll) {
                        this.fourthAll = true;
                    }
                }
                this.onDataChange()
            },
            onFourthMeSelect() {
                if (this.ME4) {
                    if (!this.fourthMeAll) {
                        this.fourthMe = [];
                        this.ME4 = false;
                        this.fourthAll = false;
                    }

                    if (this.fourthMe.length < this.fourthYearMeSectionsArray.length && this.fourthMeAll) {
                        this.fourthMeAll = false;
                        this.ME4 = false;
                        this.fourthAll = false;
                    }
                }

                if (this.fourthMeAll && !this.ME4) {
                    this.fourthMe = ['4MEA', '4MEB'];
                    this.ME4 = true;
                }

                if (this.fourthMe.length === this.fourthYearMeSectionsArray.length) {
                    this.fourthMeAll = true;
                    this.ME4 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.fourthCseAll && this.fourthItAll && this.fourthEceAll && this.fourthCivilAll) {
                        this.fourthAll = true;
                    }
                }
                this.onDataChange()
            },
            onFourthEceSelect() {
                if (this.ECE4) {
                    if (!this.fourthEceAll) {
                        this.fourthEce = [];
                        this.ECE4 = false;
                        this.fourthAll = false;
                    }

                    if (this.fourthEce.length < this.fourthYearEceSectionsArray.length && this.fourthEceAll) {
                        this.fourthEceAll = false;
                        this.ECE4 = false;
                        this.fourthAll = false;
                    }
                }

                if (this.fourthEceAll && !this.ECE4) {
                    this.fourthEce = ['4ECEA', '4ECEB'];
                    this.ECE4 = true;
                }

                if (this.fourthEce.length === this.fourthYearEceSectionsArray.length) {
                    this.fourthEceAll = true;
                    this.ECE4 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.fourthMeAll && this.fourthItAll && this.fourthCseAll && this.fourthCivilAll) {
                        this.fourthAll = true;
                    }
                }
                this.onDataChange()
            },
            onFourthCivilSelect() {
                if (this.CIVIL4) {
                    if (!this.fourthCivilAll) {
                        this.fourthCivil = [];
                        this.CIVIL4 = false;
                        this.fourthAll = false;
                    }

                    if (this.fourthCivil.length < this.fourthYearCivilSectionsArray.length && this.fourthCivilAll) {
                        this.fourthCivilAll = false;
                        this.CIVIL4 = false;
                        this.fourthAll = false;
                    }
                }

                if (this.fourthCivilAll && !this.CIVIL4) {
                    this.fourthCivil = ['4CEA', '4CEB'];
                    this.CIVIL4 = true;
                }

                if (this.fourthCivil.length === this.fourthYearCivilSectionsArray.length) {
                    this.fourthCivilAll = true;
                    this.CIVIL4 = true;

                    //Condition for select all checkbox in 2nd year
                    if (this.fourthMeAll && this.fourthItAll && this.fourthEceAll && this.fourthCseAll) {
                        this.fourthAll = true;
                    }
                }
                this.onDataChange()
            },

            onDataChange() {
                let scopesData = [];
                /************* Condition for All *************/
                if (this.all) {

                    this.$emit("input", {value: ["ALL"]});

                } else {

                    /************* Condition for first year *************/
                    if (this.firstAll) {
                        scopesData.push('1');
                    } else {
                        scopesData = scopesData.concat(this.firstAs);
                    }

                    /************* Condition for second year *************/
                    if (this.secondAll) {
                        scopesData.push('2');
                    } else {
                        // Condition for whole CSE branch 2nd year
                        if (this.secondCseAll) {
                            scopesData.push("2CSE");
                        } else {
                            scopesData = scopesData.concat(this.secondCse);
                        }

                        // Condition for whole ECE branch 2nd year
                        if (this.secondEceAll) {
                            scopesData.push("2ECE");
                        } else {
                            scopesData = scopesData.concat(this.secondEce);
                        }

                        // Condition for whole IT branch 2nd year
                        if (this.secondItAll) {
                            scopesData.push("2IT");
                        } else {
                            scopesData = scopesData.concat(this.secondIt);
                        }

                        // Condition for whole Me branch 2nd year
                        if (this.secondMeAll) {
                            scopesData.push("2ME");
                        } else {
                            scopesData = scopesData.concat(this.secondMe);
                        }

                        // Condition for whole CIVIL branch 2nd year
                        if (this.secondCivilAll) {
                            scopesData.push("2CE");
                        } else {
                            scopesData = scopesData.concat(this.secondCivil);
                        }
                    }


                    /************* Condition for third year *************/
                    if (this.thirdAll) {
                        scopesData.push('3');
                    } else {
                        // Condition for whole CSE branch 3nd year
                        if (this.thirdCseAll) {
                            scopesData.push("3CSE");

                        } else {
                            scopesData = scopesData.concat(this.thirdCse);
                        }

                        // Condition for whole ECE branch 3nd year
                        if (this.thirdEceAll) {
                            scopesData.push("3ECE");
                        } else {
                            scopesData = scopesData.concat(this.thirdEce);
                        }

                        // Condition for whole IT branch 3nd year
                        if (this.thirdItAll) {
                            scopesData.push("3IT");
                        } else {
                            scopesData = scopesData.concat(this.thirdIt);
                        }

                        // Condition for whole Me branch 3nd year
                        if (this.thirdMeAll) {
                            scopesData.push("3ME");
                        } else {
                            scopesData = scopesData.concat(this.thirdMe);
                        }

                        // Condition for whole CIVIL branch 3nd year
                        if (this.thirdCivilAll) {
                            scopesData.push("3CE");
                        } else {
                            scopesData = scopesData.concat(this.thirdCivil);
                        }
                    }


                    /************* Condition for fourth year *************/
                    if (this.fourthAll) {
                        scopesData.push('4');
                    } else {
                        // Condition for whole CSE branch 4nd year
                        if (this.fourthCseAll) {
                            scopesData.push("4CSE");
                        } else {
                            scopesData = scopesData.concat(this.fourthCse);
                        }

                        // Condition for whole ECE branch 4nd year
                        if (this.fourthEceAll) {
                            scopesData.push("4ECE");
                        } else {
                            scopesData = scopesData.concat(this.fourthEce);
                        }

                        // Condition for whole IT branch 4nd year
                        if (this.fourthItAll) {
                            scopesData.push("4IT");
                        } else {
                            scopesData = scopesData.concat(this.fourthIt);
                        }

                        // Condition for whole Me branch 4nd year
                        if (this.fourthMeAll) {
                            scopesData.push("4ME");
                        } else {
                            scopesData = scopesData.concat(this.fourthMe);
                        }

                        // Condition for whole CIVIL branch 4nd year
                        if (this.fourthCivilAll) {
                            scopesData.push("4CE");
                        } else {
                            scopesData = scopesData.concat(this.fourthCivil);
                        }
                    }

                    this.$emit("input", {value: scopesData});
                }

            },

            reset() {

                this.firstAs = [];

                this.secondCse = [];
                this.secondIt = [];
                this.secondMe = [];
                this.secondEce = [];
                this.secondCivil = [];

                this.thirdCse = [];
                this.thirdIt = [];
                this.thirdMe = [];
                this.thirdEce = [];
                this.thirdCivil = [];

                this.fourthCse = [];
                this.fourthIt = [];
                this.fourthMe = [];
                this.fourthEce = [];
                this.fourthCivil = [];


                console.log("Scopes cleared")
            }
        },

    };
</script>
