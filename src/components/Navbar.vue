<template>
    <div>
        <v-system-bar color="light-green darken-3"></v-system-bar>
        <v-app-bar class="mb-8" color="light-green darken-1" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>

            <v-toolbar-title> {{ $route.name }} </v-toolbar-title>

            <v-spacer></v-spacer>

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
                                <v-list-item-title>{{
                                    user == "" ? "543211" : user
                                }}</v-list-item-title>
                                <v-list-item-subtitle>{{
                                    isAdmin ? "Admin" : "User"
                                }}</v-list-item-subtitle>
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
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-dialog
                            v-model="passwordDialog"
                            persistent
                            max-width="600px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on">
                                    Change password
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{
                                        updateMessage
                                            ? `${updateMessage}!`
                                            : "Set New Password"
                                    }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="New Password"
                                                    hint="password must be 8 digits long"
                                                    persistent-hint
                                                    type="password"
                                                    v-model.trim="
                                                        $v.form.password.$model
                                                    "
                                                    :error-messages="
                                                        passwordErrors
                                                    "
                                                    :counter="25"
                                                    required
                                                    @input="
                                                        $v.form.password.$touch()
                                                    "
                                                    @blur="
                                                        $v.form.password.$touch()
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Confirm Password"
                                                    type="password"
                                                    v-model.trim="
                                                        $v.form.confirmPassword
                                                            .$model
                                                    "
                                                    :error-messages="
                                                        confirmPasswordErrors
                                                    "
                                                    :counter="25"
                                                    required
                                                    @input="
                                                        $v.form.confirmPassword.$touch()
                                                    "
                                                    @blur="
                                                        $v.form.confirmPassword.$touch()
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="clear">
                                        Close
                                    </v-btn>
                                    <v-btn color="primary" text @click="update">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog
                            v-model="pinDialog"
                            persistent
                            max-width="600px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                    color="primary"
                                >
                                    Change Pin
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{
                                        updateMessage
                                            ? updateMessage
                                            : "Set New Pin"
                                    }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="New Pin"
                                                    hint="pin must be 4 digits long"
                                                    persistent-hint
                                                    type="password"
                                                    v-model.trim="
                                                        $v.form.pin.$model
                                                    "
                                                    :error-messages="pinErrors"
                                                    :counter="4"
                                                    required
                                                    @input="
                                                        $v.form.pin.$touch()
                                                    "
                                                    @blur="$v.form.pin.$touch()"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Confirm Pin"
                                                    type="password"
                                                    v-model.trim="
                                                        $v.form.confirmPin
                                                            .$model
                                                    "
                                                    :error-messages="
                                                        confirmPinErrors
                                                    "
                                                    :counter="4"
                                                    required
                                                    @input="
                                                        $v.form.confirmPin.$touch()
                                                    "
                                                    @blur="
                                                        $v.form.confirmPin.$touch()
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="clear">
                                        Close
                                    </v-btn>
                                    <v-btn color="primary" text @click="update">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
                                item.title == "Admin" && isAdmin == 0
                                    ? ""
                                    : item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn @click="logout" block> Logout </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {
    required,
    minLength,
    maxLength,
    sameAs,
} from "vuelidate/lib/validators";
import useAccounts from "../modules/accounts";
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
            passwordDialog: false,
            pinDialog: false,
            form: {
                password: "",
                confirmPassword: "",
                pin: "",
                confirmPin: "",
            },
            updateMessage: "",
            isAdmin: localStorage.getItem("is-admin"),
            user: "",
        };
    },
    computed: {
        passwordErrors() {
            const errors = [];
            if (!this.$v.form.password.$dirty) return errors;
            !this.$v.form.password.required &&
                errors.push("Field is required.");
            !this.$v.form.password.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.password.$params.maxLength.max}
                                digits.`);
            !this.$v.form.password.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.password.$params.minLength.min}
                                digits.`);
            return errors;
        },
        confirmPasswordErrors() {
            const errors = [];
            if (!this.$v.form.confirmPassword.$dirty) return errors;
            !this.$v.form.confirmPassword.required &&
                errors.push("Field is required.");
            !this.$v.form.confirmPassword.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.confirmPassword.$params.maxLength.max}
                                digits.`);
            !this.$v.form.confirmPassword.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.confirmPassword.$params.minLength.min}
                                digits.`);
            !this.$v.form.confirmPassword.sameAsPassword &&
                errors.push("Field must be same as password.");
            return errors;
        },
        pinErrors() {
            const errors = [];
            if (!this.$v.form.pin.$dirty) return errors;
            !this.$v.form.pin.required && errors.push("Field is required.");
            !this.$v.form.pin.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.pin.$params.maxLength.max}
                                digits.`);
            !this.$v.form.pin.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.pin.$params.minLength.min}
                                digits.`);
            return errors;
        },
        confirmPinErrors() {
            const errors = [];
            if (!this.$v.form.confirmPin.$dirty) return errors;
            !this.$v.form.confirmPin.required &&
                errors.push("Field is required.");
            !this.$v.form.confirmPin.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.confirmPin.$params.maxLength.max}
                                digits.`);
            !this.$v.form.confirmPin.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.confirmPin.$params.minLength.min}
                                digits.`);
            !this.$v.form.confirmPin.sameAsPin &&
                errors.push("Field must be same as pin.");
            return errors;
        },
    },
    validations: {
        form: {
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(25),
            },
            confirmPassword: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(25),
                sameAsPassword: sameAs("password"),
            },
            pin: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(4),
            },
            confirmPin: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(4),
                sameAsPin: sameAs("pin"),
            },
        },
    },
    watch: {
        group() {
            this.drawer = false;
        },
    },
    methods: {
        logout() {
            localStorage.removeItem("current-user");
            localStorage.removeItem("user-token");
            localStorage.removeItem("is-admin");
            this.$router.push({ name: "Login" });
            this.$emit("log-out");
        },
        switchDarkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        redirectTo(name) {
            this.$router.push({ name: `${name}` });
        },
        clear() {
            this.$v.$reset();
            (this.updateMessage = ""),
                (this.passwordDialog = false),
                (this.pinDialog = false),
                (this.form.password = "");
            this.form.confirmPassword = "";
            this.form.pin = "";
            this.form.confirmPin = "";
        },
        update() {
            if (this.form.password) {
                this.updatePassword(this.form.password);
            } else if (this.form.pin) {
                this.updatePassword(this.form.pin);
            }
        },
    },
    setup() {
        const { updateUser, getUserById } = useAccounts();

        const updatePassword = function (data) {
            if (data == this.form.password) {
                updateUser(localStorage.getItem("current-user"), {
                    password: data,
                }).then((response) => {
                    this.updateMessage = response.data.message;
                });
            } else {
                updateUser(localStorage.getItem("current-user"), {
                    pin: data,
                }).then((response) => {
                    this.updateMessage = response.data.message;
                });
            }
        };

        const checkAdmin = function () {
            getUserById(localStorage.getItem("current-user")).then(
                (response) => {
                    localStorage.setItem(
                        "is-admin",
                        response.data.data.is_admin
                    );
                    this.user = response.data.data.login;
                }
            );
        };
        checkAdmin();

        return {
            updatePassword,
        };
    },
};
</script>
