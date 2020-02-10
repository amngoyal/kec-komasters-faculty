<template>
    <v-app>
        <main>
            <router-view/>
        </main>
    </v-app>
</template>

<script>

    export default {
        name: 'App',
        data: () => ({
            //
        }),
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        font-family: Roboto, sans-serif;
    }
</style>
