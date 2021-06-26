<template>
    <v-card class="mx-auto col-md-4">
        <v-badge inline content="Bank Name"></v-badge>
        <v-card-title class="text-right"> Account Name </v-card-title>
        <v-card-subtitle> 9257-5830-9942-1524-722-8 </v-card-subtitle>

        <form @submit.prevent="onSubmit">
            <v-text-field
                label="Account Number"
                prepend-icon="mdi-account"
                type="number"
                v-model.trim="$v.form.accountNumber.$model"
                :error-messages="accountNumberErrors"
                :counter="20"
                required
                @input="$v.form.accountNumber.$touch()"
                @blur="$v.form.accountNumber.$touch()"
            ></v-text-field>
            <v-text-field
                label="Title"
                prepend-icon="mdi-lead-pencil"
                v-model.trim="$v.form.title.$model"
                :error-messages="titleErrors"
                :counter="40"
                required
                @input="$v.form.title.$touch()"
                @blur="$v.form.title.$touch()"
            ></v-text-field>
            <v-text-field
                label="Address (optional)"
                prepend-icon="mdi-map-marker"
                v-model.trim="$v.form.address.$model"
                @input="$v.form.address.$touch()"
                @blur="$v.form.address.$touch()"
            ></v-text-field>
            <v-text-field
                label="Amount"
                prepend-icon="mdi-currency-usd"
                v-model.trim="$v.form.amount.$model"
                :error-messages="amountErrors"
                required
                @input="$v.form.amount.$touch()"
                @blur="$v.form.amount.$touch()"
            ></v-text-field>
            <v-menu
                v-model="isDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        label="Date"
                        prepend-icon="mdi-calendar"
                        v-model.trim="$v.form.date.$model"
                        :error-messages="dateErrors"
                        required
                        readonly
                        @input="$v.form.date.$touch()"
                        @blur="$v.form.date.$touch()"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model.trim="$v.form.date.$model"
                    @input="isDatePicker = false"
                ></v-date-picker>
            </v-menu>

            <v-btn type="submit" class="mr-4" :disabled="this.isDisabled">
                Send
                <v-progress-circular
                    v-if="isSending"
                    :size="20"
                    indeterminate
                    color="light-green darken-1"
                    class="ml-2"
                ></v-progress-circular>
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
        </form>
    </v-card>
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
    name: "NewTransfer",
    data() {
        return {
            form: {
                accountNumber: "",
                title: "",
                address: "",
                amount: "",
                date: new Date(
                    Date.now() - new Date().getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .substr(0, 10),
            },
            isSending: false,
            isDatePicker: false,
        };
    },
    computed: {
        isDisabled() {
            return this.$v.$invalid;
        },
        accountNumberErrors() {
            const errors = [];
            if (!this.$v.form.accountNumber.$dirty) return errors;
            !this.$v.form.accountNumber.required &&
                errors.push("Field is required.");
            !this.$v.form.accountNumber.numeric &&
                errors.push("Field must be numeric.");
            !this.$v.form.accountNumber.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.accountNumber.$params.maxLength.max}
                                digits.`);
            !this.$v.form.accountNumber.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.accountNumber.$params.minLength.min}
                                digits.`);
            return errors;
        },
        titleErrors() {
            const errors = [];
            if (!this.$v.form.title.$dirty) return errors;
            !this.$v.form.title.required && errors.push("Field is required.");
            !this.$v.form.title.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.title.$params.maxLength.max}
                                letters.`);
            !this.$v.form.title.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.title.$params.minLength.min}
                                letters.`);
            return errors;
        },
        amountErrors() {
            const errors = [];
            if (!this.$v.form.amount.$dirty) return errors;
            !this.$v.form.amount.required && errors.push("Field is required.");
            !this.$v.form.amount.numeric &&
                errors.push("Field must be numeric.");
            !this.$v.form.amount.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.title.$params.maxLength.max}
                                digits.`);
            !this.$v.form.amount.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.title.$params.minLength.min}
                                digits.`);
            return errors;
        },
        dateErrors() {
            const errors = [];
            if (!this.$v.form.date.$dirty) return errors;
            !this.$v.form.date.required && errors.push("Field is required.");
            !this.$v.form.date.minValue &&
                errors.push("Date cannot be in the past.");
            return errors;
        },
    },
    validations: {
        form: {
            accountNumber: {
                required,
                numeric,
                minLength: minLength(20),
                maxLength: maxLength(20),
            },
            title: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(40),
            },
            address: {},
            amount: {
                required,
                numeric,
                minLength: minLength(1),
                maxLength: maxLength(20),
            },
            date: {
                required,
                minValue: (value) => value > new Date().toISOString(),
            },
        },
    },
    methods: {
        clear() {
            this.$v.$reset();
            this.form.login = "";
            this.form.password = "";
        },
    },
    setup() {
        const { loginAccount } = useAccounts(); // TODO Transactions add method

        const onSubmit = function () {
            this.isSending = true;
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) {
                return;
            }
            console.log(this.form);
            loginAccount(this.form).then((response) => {
                // TODO addTransaction
                console.log(response.token);
            });
            this.$router.push({ name: "Dashboard" }); // TODO Authorization, edit this
            this.$emit("sended");
        };

        return {
            onSubmit,
        };
    },
};
</script>
