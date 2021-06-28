<template>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <v-card v-if="message" class="mx-auto col-md-4">
                <v-card-subtitle
                    ><h5 class="text-center">{{ message }}</h5></v-card-subtitle
                >
            </v-card>
            <form @submit.prevent="onSubmit">
                <v-text-field
                    label="Login"
                    prepend-icon="mdi-account"
                    type="number"
                    v-model.trim="$v.form.login.$model"
                    :error-messages="loginErrors"
                    :counter="6"
                    required
                    @input="$v.form.login.$touch()"
                    @blur="$v.form.login.$touch()"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model.trim="$v.form.password.$model"
                    :error-messages="passwordErrors"
                    :counter="25"
                    required
                    @input="$v.form.password.$touch()"
                    @blur="$v.form.password.$touch()"
                ></v-text-field>

                <v-btn type="submit" class="mr-4" :disabled="this.isDisabled">
                    Log in
                    <v-progress-circular
                        v-if="isLogging"
                        :size="20"
                        indeterminate
                        color="light-green darken-1"
                        class="ml-2"
                    ></v-progress-circular>
                </v-btn>
                <v-btn @click="clear"> clear </v-btn>
            </form>
        </div>
        <div class="col-md-4"></div>
    </div>
</template>

<script>
import {
    required,
    numeric,
    minLength,
    maxLength,
} from "vuelidate/lib/validators";
import useAccounts from "../modules/accounts";
export default {
    name: "Login",
    data() {
        return {
            form: {
                login: "",
                password: "",
            },
            isLogging: false,
            message: "",
        };
    },
    computed: {
        isDisabled() {
            return this.$v.$invalid;
        },
        loginErrors() {
            const errors = [];
            if (!this.$v.form.login.$dirty) return errors;
            !this.$v.form.login.required && errors.push("Field is required.");
            !this.$v.form.login.numeric &&
                errors.push("Field must be numeric.");
            !this.$v.form.login.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.login.$params.maxLength.max}
                                digits.`);
            !this.$v.form.login.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.login.$params.minLength.min}
                                digits.`);
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.form.password.$dirty) return errors;
            !this.$v.form.password.required &&
                errors.push("Field is required.");
            !this.$v.form.password.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.password.$params.maxLength.max}
                                letters.`);
            !this.$v.form.password.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.password.$params.minLength.min}
                                letters.`);
            return errors;
        },
    },
    validations: {
        form: {
            login: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(6),
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(25),
            },
        },
    },
    methods: {
        clear() {
            this.$v.$reset();
            this.form.login = "";
            this.form.password = "";
        },
        validationStatus(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },
        redirect() {
            this.$router.push({ name: "Dashboard" });
            this.$emit("log-in");
        },
    },
    setup() {
        const { loginAccount } = useAccounts();
        const onSubmit = function () {
            this.isLogging = true;
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) {
                return;
            }
            console.log(this.form);
            loginAccount(this.form).then((response) => {
                localStorage.setItem("user-token", response.data.token);
                this.$http.defaults.headers.common["Authorization"] =
                    "Bearer " + localStorage.getItem("user-token");
                this.message = response.data.message;
                localStorage.setItem("current-user", response.data.user_id);
                setTimeout(this.redirect, 100);
            });
        };

        return {
            onSubmit,
        };
    },
};
</script>
