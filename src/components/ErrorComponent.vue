<template>
    <div v-if="this.isNotContent">
        <v-progress-circular
                v-if="this.isLoading"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
        ></v-progress-circular>

        <h2 v-if="this.isError">Error</h2>

        <v-btn v-if="this.isError" @click="retry()">Retry</v-btn>

    </div>
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
