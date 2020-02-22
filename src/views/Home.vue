<template>
    <v-app>

        <!--------------------------------- Navigation Drawer --------------------------->
        <v-navigation-drawer v-model="nav" mobile-break-point="960" clipped app width="305">

            <v-list-item @click="goToProfilePage" class="pa-1 mb-0">
                <v-list-item-content >
                    <v-list-item-title>
                        {{userName}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Assistant Professor
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider ></v-divider>

            <v-list nav subheader>

                <v-list-group
                        prepend-icon="mdi-alpha-q-box"
                        :value="true"
                        no-action
                >
                    <template v-slot:activator>
                        <v-list-item-title>Quiz</v-list-item-title>
                    </template>

                    <v-list-item
                            v-for="(item, i) in quizItems"
                            :key="i"
                            :to="item.to"
                            style="text-decoration: none"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title">
                            </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>


            </v-list>
        </v-navigation-drawer>

        <!--------------------------- Application Toolbar -------------------------------->
        <v-app-bar app color="primary" clipped-left dark>

            <v-app-bar-nav-icon :hidden="hideAppBarNavIcon" v-on:click="nav = !nav"></v-app-bar-nav-icon>

            <v-toolbar-title>
                Komasters
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon class="mr-4" @click="goToProfilePage">
                <v-icon>mdi-account-circle-outline</v-icon>
            </v-btn>

            <v-btn @click="onLogout" outlined>Log Out</v-btn>
        </v-app-bar>


        <v-content>
            <router-view style="height: 100%;"></router-view>
        </v-content>

        <!------------------ Dialog ------------------->
        <v-dialog v-model="dialog" persistent max-width="290">

            <v-card>
                <v-card-title class="headline">Session Expired!!</v-card-title>
                <v-card-text>Your session is expired. You have to login again to continue.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="onLoginAgainButtonPress" outlined>Login Again</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>

    </v-app>
</template>
<script>

    import AccountManager from "../models/AccountManager";
    import router from "../router";

    export default {
        data: () => ({
            nav: false,
            userName: 'user_name',
            userId: '',
            dialog: false,

            userData: {},
            quizItems: [
                {title: 'All', icon: 'mdi-format-list-checkbox', to: '/home/quiz/all'},
                {title: 'Create', icon: 'mdi-plus-thick', to: '/home/quiz/create'},
            ],


            clientWidth: 0,
        }),

        created() {
            window.addEventListener("resize", this.onWindowResize);

            window.addEventListener('session_expired', () => {
                console.log("Session Expired event fired");
                this.dialog = true
            })

        },

        destroyed() {
            window.removeEventListener("resize", this.onWindowResize);
        },

        mounted() {

            this.userData = AccountManager.getUserData();
            if (this.userData.name != null) {
                this.userName = this.userData.name;
                this.userId = this.userData.id;
            }

            this.onWindowResize();
            if (this.clientWidth >= 960) {
                this.nav = true
            }
        },

        computed: {
            hideAppBarNavIcon() {
                return this.clientWidth >= 946
            }
        },

        methods: {
            onWindowResize() {
                this.clientWidth = document.documentElement.clientWidth;
            },

            onLogout() {
                AccountManager.deleteUserData();
                this.$router.replace('/login');
            },
            onLoginAgainButtonPress() {
                this.$router.replace('Login')
            },
            goToProfilePage(){
                const location = `/home/profile/${this.userId}`;
               router.push(location,()=>{},()=>{})
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
