<template>
    <v-app>

        <!--------------------------------- Navigation Drawer --------------------------->
        <v-navigation-drawer v-model="nav" mobile-break-point="960" clipped app width="305">

            <v-list-item>
                <v-list-item-content class="pb-0 mt-2">
                    <v-list-item-title>
                        {{userName}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Assistant Professor
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

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

                <v-list-group
                        prepend-icon="mdi-alpha-s-box"
                        :value="false"
                        no-action
                >
                    <template v-slot:activator>
                        <v-list-item-title>Sentimental Analysis</v-list-item-title>
                    </template>

                    <v-list-item
                            v-for="(item, i) in sentimentalAnalysisItems"
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

            <v-btn @click="onLogout" outlined>Log Out</v-btn>
        </v-app-bar>


        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>

    import AccountManager from "../models/AccountManager";

    export default {
        data: () => ({
            nav: false,
            userName: 'user_name',

            userData: {},
            quizItems: [
                {title: 'All', icon: 'mdi-format-list-checkbox', to: '/home/quiz/all'},
                {title: 'Create', icon: 'mdi-plus-thick', to: '/home/quiz/create'},
            ],

            sentimentalAnalysisItems: [
                {title: 'All', icon: 'mdi-format-list-checkbox', to: '/home/sa/all'},
                {title: 'Create', icon: 'mdi-plus-thick', to: '/home/sa/create'},
            ],


            clientWidth: 0,
        }),

        created() {
            window.addEventListener("resize", this.onWindowResize);
        },

        destroyed() {
            window.removeEventListener("resize", this.onWindowResize);
        },

        mounted() {

            this.userData = AccountManager.getUserData();
            if (this.userData.name != null) {
                this.userName = this.userData.name
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
