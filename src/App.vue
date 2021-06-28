<template>
    <v-app>
        <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
            <Navbar />
            <v-main>
                <router-view />
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
};
</script>
