<template>
    <v-app>
        <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
            <Navbar :isLogged="isLogged" @log-out="changeLoginStatus" />
            <v-main>
                <router-view @log-in="changeLoginStatus" />
            </v-main>
        </v-card>
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",
    components: {
        Navbar,
    },
    data() {
        return {
            isLogged: false,
        };
    },
    methods: {
        changeLoginStatus() {
            this.isLogged = !this.isLogged;
        },
    },
};
</script>

<style scoped></style>
