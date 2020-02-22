<template>
    <v-app style="background-color: #f5f5f5">

        <v-row class="px-7 mt-0" align="center" justify="center">

            <v-col cols="12" lg="8" md="8" sm="8" xs="12" align-self="center">

                <v-card
                        flat
                        outlined
                        style="border-radius: 10px">


                    <v-row no-gutters>

                        <v-col md="6" lg="6" :hidden="hideImageInCard" align-self="center">
                            <v-img
                                    style="border-top-left-radius: 10px;border-bottom-left-radius: 10px; "
                                    src="../assets/hdpi-compressor.png"
                                    height="500" width="500">
                            </v-img>
                        </v-col>

                        <v-col cols="12" lg="6" md="6" sm="12" align-self="center" class="pa-4">

                            <v-card-text class="pa-6">
                                <h1 class="mb-8 text-center">Login</h1>

                                <p>Enter Login Id</p>
                                <v-text-field v-model="kecId"
                                              outlined
                                              prepend-inner-icon="mdi-account"
                                              placeholder="Your ID">

                                </v-text-field>

                                <p>Enter Password</p>
                                <v-text-field v-model="password"
                                              class=""
                                              outlined
                                              type="password"
                                              prepend-inner-icon="mdi-lock-plus"
                                              placeholder="Your Password">
                                </v-text-field>

                                <v-btn block class="mb-5" color="primary" @click="onSubmitButtonClick"
                                       :loading="loading"> Login
                                </v-btn>

                                <a class="blue--text subtitle-1" href="/reset-password"> Reset Password </a>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>


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

    </v-app>
</template>

<script>
    import instance from "../axios";
    import router from "../router";
    import AccountManager from '../models/AccountManager'
    import {debugLog, errorLog} from '../app-config'


    export default {

        beforeRouteEnter(to, from, next) {
            if (AccountManager.isLoggedIn()) {
                next('/home')
            }
            next();
        },

        name: "Login",
        data: () => {
            return {
                loading: false,
                kecId: 'KECF4623',
                password: 'gagan@4632',
                clientWidth: 0,
                clientHeight: 0,

                snackbar: false,
                snackbarText: '',
            }
        },

        mounted() {
            this.onWindowResize()
        },

        created() {
            window.addEventListener("resize", this.onWindowResize);
        },

        destroyed() {
            window.removeEventListener("resize", this.onWindowResize);
        },

        computed: {
            hideImageInCard() {
                return this.clientWidth < 755;
            }
        },

        methods: {

            onWindowResize() {
                this.clientWidth = document.documentElement.clientWidth;
                this.clientHeight = document.documentElement.clientHeight;


            },

            async onSubmitButtonClick() {

                const facultyRegex = /^KECF\d{4}$/;
                const isKecIdValid = facultyRegex.test(this.kecId);
                if (isKecIdValid === false) {
                    this.showSnackbar("Make sure your KEC ID is in the form KECFXXXX where X is a number");
                    return;
                }


                if (this.kecId !== '' && this.password !== '') {

                    this.loading = true;

                    try {
                        const response = await instance.post(`/auth/login`, null, {
                            headers: {
                                authorization: Buffer.from(`${this.kecId}:${this.password}`).toString('base64'),
                            }
                        });

                        debugLog("Login: " + JSON.stringify(response));


                        AccountManager.saveUserData(response.data.accessToken, response.data.refreshToken, response.data.user);

                        this.loading = false;
                        await router.replace('/home');

                    } catch (error) {
                        errorLog(error);

                        this.loading = false;

                        if (error.response != null) {

                            if (error.response.status === 400)
                                this.showSnackbar("You've entered a wrong password");

                            else if (error.response.status === 404)
                                this.showSnackbar("Please enter a valid Kec Id");
                            else
                                this.showSnackbar("Unable to connect with server");

                        } else {
                            this.showSnackbar(error)
                        }
                    }

                } else {
                    this.showSnackbar("Please enter Kec ID and Password to login")
                }
            },
            showSnackbar(msg) {
                this.snackbarText = msg;
                this.snackbar = true;
            },
        }
    }
</script>scoped

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        font-family: Roboto, sans-serif;
    }
</style>
