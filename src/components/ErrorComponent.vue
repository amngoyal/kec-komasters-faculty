<template>
    <v-app v-if="this.isNotContent">

        <v-row align="center" justify="center">

            <v-col cols="10" lg="4" md="6" sm="10" xs="10">

                <v-card
                        flat
                        outlined
                        class="pa-8 text-center"
                        style="border-radius: 10px">

                    <v-progress-circular
                            v-if="this.isLoading"
                            :size="70"
                            :width="7"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>

                    <h4 class="mb-6" v-if="this.isError">Error in loading components</h4>

                    <v-btn color="primary" v-if="this.isError" @click="retry()">Retry</v-btn>
                </v-card>
            </v-col>
        </v-row>

    </v-app>
</template>

<script>
    import {State, StateError, StateContent, StateLoading, StateRest} from '../models/State'

    export default {
        props: {state: State},
        name: "ErrorComponent",
        data() {
            return {}
        },
        methods: {
            retry() {
                this.state.retryCallback()
            }
        },
        computed: {
            isNotContent() {
                return !(this.state instanceof StateContent) && !(this.state instanceof StateRest)
            },

            isLoading() {
                return this.state instanceof StateLoading
            },

            isError() {
                return this.state instanceof StateError
            }
        },

    }
</script>

<style scoped>

</style>
