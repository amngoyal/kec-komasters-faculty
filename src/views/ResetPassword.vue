<template>
    <v-app style="background-color: #f5f5f5">

        <v-row align="center" justify="center">

            <v-col cols="10" lg="4" md="6" sm="10" xs="10">


                <v-card
                        flat
                        outlined
                        class="pa-8"
                        style="border-radius: 10px">

                    <v-container>

                        <h1 class="mb-8 justify-center d-flex">Reset Password</h1>

                        <p>Enter your KEC Id</p>
                        <v-text-field v-model="kecId"
                                      class="mb-0"
                                      outlined
                                      :readonly="!infoCard"
                                      prepend-inner-icon="mdi-account"
                                      placeholder="Your Kec Id">
                        </v-text-field>

                        <v-btn :hidden="!infoCard" block color="primary" @click="onSubmit" :loading='loading'>
                            Continue
                        </v-btn>

                        <v-card color="success" :hidden="infoCard">
                            <v-card-text class="white--text subtitle-1">
                                We have sent a password reset link to your email account associated with your
                                Kec Id "{{kecId}}".
                                Go through the link to change your password.
                            </v-card-text>

                        </v-card>
                    </v-container>
                </v-card>

            </v-col>
        </v-row>
    </v-app>

</template>

<script>

    import instance from "../axios";

    export default {
        name: "ResetPassword",
        data() {
            return {
                kecId: 'KECF4623',
                infoCard: true,
                loading: false
            }
        },
        methods: {
            async onSubmit() {
                const facultyRegex = /^KECF\d{4}$/;
                const isKecIdValid = facultyRegex.test(this.kecId);
                if (isKecIdValid === false) {
                    alert("Make sure your KEC ID is in the form KECFXXXX where X is a number");
                    return;
                }

                if (this.kecId !== '') {

                    this.loading = true;

                    try {

                        await instance.get(`/auth/reset-password?kecId=${this.kecId}`);

                        this.infoCard = false;
                        this.loading = false

                    } catch (e) {

                        this.loading = false;
                        alert("Error in requesting reset password link. " + e)

                    }

                }
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        font-family: Roboto, sans-serif;
    }
</style>
