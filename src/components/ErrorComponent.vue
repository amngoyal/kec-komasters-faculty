<template>
    <div v-if="this.isNotContent" class="container">
        <v-progress-circular
                v-if="this.isLoading"
                :size="70"
                :width="7"
                color="primary"
                indeterminate
        ></v-progress-circular>

        <p class="mb-7 text-center" style="max-width: 400px; font-size: 18px" v-if="this.isError">{{this.errorText}}</p>

        <v-btn color="primary" class="btn" v-if="this.isError" @click="retry()">Retry</v-btn>
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
            errorText() {
                return this.state.message;
            },
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

    .container {
        display: grid;
        justify-content: center;
        height: 100%;
        align-content: center;
    }

    .btn{
        width: 130px;
        margin: auto;
    }

</style>
