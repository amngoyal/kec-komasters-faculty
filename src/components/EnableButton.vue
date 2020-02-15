<template>

    <div>
        <v-btn outlined class="underline-on-hover"

               :color="color" :loading="isLoading"
               v-on:click="onEnableButtonClick(); loader = 'loading2'"
        >{{enabled ? 'Enabled': 'Disabled'}}
            <template v-slot:loader>
                <span>{{enabled ? 'Disabling..': 'Enabling..'}}</span>
            </template>
        </v-btn>

        <!------------------ Snackbar ------------------->

        <v-snackbar
                v-model="snackbar"

        >
            {{ snackbarText }}
            <v-btn
                    color="primary"
                    text
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import AccountManager from "../models/AccountManager";
    import instance from "../axios";
    import {debugLog, errorLog} from "../app-config";

    export default {
        props: {
            position: Number, enabled: Boolean, quizId: Number
        },
        name: "EnableButton",
        data() {
            return {
                isLoading: false,
                snackbar: false,
                snackbarText: '',
            }
        },
        computed: {
            color() {
                return this.enabled ? 'success' : 'error'
            }
        },
        methods: {

            showSnackbar(msg) {
                this.snackbar = true;
                this.snackbarText = msg
            },

            async onEnableButtonClick() {

                this.isLoading = true;

                try {
                    const token = await AccountManager.getAccessToken();
                    const response = await instance.put(`/quiz/${this.quizId}/enable?action=${this.enabled ? '0' : '1'}`, null, {
                        headers: {
                            authorization: token
                        }
                    });

                    debugLog(response);

                    this.enabled = !this.enabled;
                    this.isLoading = false;

                } catch (e) {
                    this.showSnackbar("Couldn't update the quiz");
                    this.isLoading = false;
                    errorLog(e);
                }
            },
        }
    }
</script>

<style scoped>

</style>
