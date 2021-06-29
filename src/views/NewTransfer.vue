<template>
    <v-card class="mx-auto col-md-4">
        <v-badge inline :content="`Bank ${account.bank}`"></v-badge>
        <v-card-title class="text-right">
            {{ account.login }}
            <v-spacer></v-spacer>
            <v-card-subtitle class="text-right"> Balance: </v-card-subtitle>
            {{ account.balance }}
        </v-card-title>
        <v-card-subtitle> {{ account.accountNumber }} </v-card-subtitle>

        <form @submit.prevent="onSubmit">
            <v-text-field
                label="Account Number*"
                prepend-icon="mdi-account"
                type="number"
                v-model.trim="$v.form.account_number.$model"
                :error-messages="accountNumberErrors"
                :counter="16"
                required
                @input="$v.form.account_number.$touch()"
                @blur="$v.form.account_number.$touch()"
            ></v-text-field>
            <v-text-field
                label="Title*"
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
                v-model.trim="$v.form.receiver_address.$model"
                @input="$v.form.receiver_address.$touch()"
                @blur="$v.form.receiver_address.$touch()"
            ></v-text-field>
            <v-text-field
                label="Amount*"
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
                        label="Date*"
                        prepend-icon="mdi-calendar"
                        v-model.trim="$v.form.transfer_date.$model"
                        :error-messages="dateErrors"
                        required
                        readonly
                        @input="$v.form.transfer_date.$touch()"
                        @blur="$v.form.transfer_date.$touch()"
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model.trim="$v.form.transfer_date.$model"
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
    decimal,
    minLength,
    maxLength,
} from "vuelidate/lib/validators";
import useAccounts from "../modules/accounts";
export default {
    name: "NewTransfer",
    data() {
        return {
            form: {
                account_number: "",
                title: "",
                receiver_address: "",
                amount: "",
                transfer_date: new Date(
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
            if (!this.$v.form.account_number.$dirty) return errors;
            !this.$v.form.account_number.required &&
                errors.push("Field is required.");
            !this.$v.form.account_number.numeric &&
                errors.push("Field must be numeric.");
            !this.$v.form.account_number.maxLength &&
                errors.push(`You must not have greater then
                                ${this.$v.form.account_number.$params.maxLength.max}
                                digits.`);
            !this.$v.form.account_number.minLength &&
                errors.push(`You must not have at least
                                ${this.$v.form.account_number.$params.minLength.min}
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
            !this.$v.form.amount.decimal &&
                errors.push("Field must be decimal.");
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
            if (!this.$v.form.transfer_date.$dirty) return errors;
            !this.$v.form.transfer_date.required &&
                errors.push("Field is required.");
            !this.$v.form.transfer_date.minValue &&
                errors.push("Date cannot be in the past.");
            return errors;
        },
    },
    validations: {
        form: {
            account_number: {
                required,
                numeric,
                minLength: minLength(16),
                maxLength: maxLength(16),
            },
            title: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(40),
            },
            receiver_address: {},
            amount: {
                required,
                decimal,
                minLength: minLength(1),
                maxLength: maxLength(20),
            },
            transfer_date: {
                required,
                minValue: (value) => value > new Date().toISOString(),
            },
        },
    },
    methods: {
        clear() {
            this.$v.$reset();
            this.form.account_number = "";
            this.form.title = "";
            this.form.receiver_address = "";
            this.form.amount = "";
        },
    },
    setup() {
        const { createAccountTransfer, getById, account } = useAccounts();

        const onSubmit = function () {
            this.isSending = true;
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) {
                return;
            }
            console.log(this.form);
            createAccountTransfer(this.form).then((response) => {
                console.log(response.data.message);
            });
            this.$router.push({ name: "Dashboard" });
        };
        const getAccount = function () {
            getById(localStorage.getItem("current-user"));
        };
        getAccount();

        return {
            onSubmit,
            account,
        };
    },
};
</script>
