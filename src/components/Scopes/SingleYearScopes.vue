<template>
    <div>
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
    </div>
</template>

<script>
    export default {
        name: "SingleYearScopes",
        data(){
            return{
                fourthYearCseSectionsArray:
                    [
                        {section: "A", value: '4CSEA'},
                        {section: "B", value: '4CSEB'},
                        {section: "C", value: '4CSEC'},
                        {section: "D", value: '4CSED'}
                    ],
                fourthYearItSectionsArray: [{section: 'A', value: '4ITA'}],
                fourthYearMeSectionsArray: [{section: 'A', value: '4MEA'}],
                fourthYearEceSectionsArray: [{section: 'A', value: '4ECEA'}],
                fourthYearCivilSectionsArray: [{section: 'A', value: '4CIVILA'}],
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
        }
    }
</script>

<style scoped>

</style>
