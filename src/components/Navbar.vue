<template>
    <div>
        <v-system-bar color="light-green darken-3"></v-system-bar>
        <v-app-bar class="mb-8" color="light-green darken-1" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title> {{ $route.name }} </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon> mdi-magnify </v-icon>
            </v-btn>

            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-avatar size="36"
                            ><v-icon> mdi-account-circle </v-icon></v-avatar
                        >
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-icon size="40"> mdi-account-circle </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title
                                    >John Leider</v-list-item-title
                                >
                                <v-list-item-subtitle
                                    >User</v-list-item-subtitle
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list>
                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="message"
                                    color="primary"
                                    @click="switchDarkMode"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Dark Mode</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-action>
                                <v-switch
                                    v-model="hints"
                                    color="primary"
                                ></v-switch>
                            </v-list-item-action>
                            <v-list-item-title>Enable hints</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text @click="menu = false">
                            Change password
                        </v-btn>
                        <v-btn color="primary" text @click="menu = false">
                            Change pin
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute bottom temporary>
            <v-list nav dense>
                <v-list-item-group
                    v-model="group"
                    active-class="light-green--text text--accent-4"
                >
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        @click="redirectTo(item.title)"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn v-if="isLogged" @click="logout" block>
                        Logout
                    </v-btn>
                    <v-btn v-else @click.stop="drawer = !drawer" block>
                        Log in
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    props: {
        isLogged: Boolean,
    },
    data() {
        return {
            drawer: false,
            group: null,
            items: [
                {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                },
                { title: "New Transfer", icon: "mdi-bank-transfer-out" },
                { title: "Admin", icon: "mdi-gavel" },
            ],
            menu: false,
            message: false,
            hints: true,
        };
    },
    watch: {
        group() {
            this.drawer = false;
        },
    },
    methods: {
        logout() {
            this.$router.push({ name: "Login" }); // TODO Authorization, edit this
            this.$emit("log-out");
        },
        switchDarkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        redirectTo(name) {
            this.$router.push({ name: `${name}` });
        },
    },
};
</script>
