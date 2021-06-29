<template>
    <div>
        <v-card class="mx-auto col-md-4">
            <v-card-title v-if="!showDialog" class="text-right">
                Admin panel
                <v-spacer></v-spacer>
                <v-card-subtitle>
                    Choose user to edit or check transfers</v-card-subtitle
                >
            </v-card-title>
            <v-card v-if="showDialog" class="menu-container">
                <v-card-title v-if="isSending">{{
                    updateMessage
                }}</v-card-title>
                <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="
                            showDialog = false;
                            isCreateClicked = false;
                            createClear();
                        "
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>
                <form
                    @submit.prevent="
                        isCreateClicked
                            ? _createUser()
                            : editUser(editedUser.id)
                    "
                >
                    <v-text-field
                        label="Login"
                        prepend-icon="mdi-account"
                        type="number"
                        v-model.trim="form.login"
                        :counter="6"
                    ></v-text-field>
                    <v-text-field
                        label="Pasword"
                        prepend-icon="mdi-lead-pencil"
                        v-model.trim="form.password"
                        :counter="25"
                    ></v-text-field>
                    <v-text-field
                        label="Pin"
                        prepend-icon="mdi-lock"
                        v-model.trim="form.pin"
                    ></v-text-field>

                    <v-btn type="submit" class="mr-4">
                        {{ isCreateClicked ? "Create user" : "Edit user" }}
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
            <v-card-actions>
                <v-btn color="primary" text @click="getUsers">
                    Show All Users

                    <v-icon>{{
                        showUsers ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getTransfers">
                    Show All Transfers

                    <v-icon>{{
                        showTransfers ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="showTransfers">
                    <v-list two-line>
                        <v-list-item-group
                            v-model="selected"
                            active-class="primary"
                            multiple
                        >
                            <template v-for="(transfer, index) in transfers">
                                <v-list-item :key="transfer.title">
                                    <template>
                                        <v-list-item-content>
                                            <p>
                                                <v-list-item-title
                                                    ><strong>{{
                                                        transfer.title
                                                    }}</strong>
                                                </v-list-item-title>
                                            </p>
                                            <p>
                                                <v-list-item-subtitle>
                                                    <strong
                                                        >Transfered to:
                                                        {{
                                                            transfer.receiver_data
                                                        }},
                                                        {{
                                                            transfer.receiver_address
                                                        }}</strong
                                                    >
                                                </v-list-item-subtitle>
                                            </p>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text
                                                >{{
                                                    transfer.amount
                                                }}
                                                zł</v-list-item-action-text
                                            >
                                            <v-list-item-action-text
                                                >Transfer date:
                                                {{ transfer.transfer_date }}
                                            </v-list-item-action-text>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                    v-if="index < transfer.length - 1"
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-expand-transition>
            <v-expand-transition>
                <div v-show="showUsers">
                    <v-list two-line>
                        <v-list-item-group
                            v-model="selected"
                            active-class="primary"
                            multiple
                        >
                            <template v-for="(user, index) in users">
                                <v-list-item :key="user.login">
                                    <template>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="user.login"
                                            ></v-list-item-title>

                                            <v-list-item-subtitle
                                                >Created at:
                                                {{
                                                    user.created_at
                                                }}</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <div class="d-flex">
                                                <v-btn
                                                    @click="
                                                        showDialog = true;
                                                        prepareEdit(user);
                                                    "
                                                >
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>

                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    @click="
                                                        _deleteUser(user.id)
                                                    "
                                                >
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                    v-if="index < user.length - 1"
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                    <v-btn
                        @click="
                            showDialog = true;
                            isCreateClicked = true;
                            createClear();
                        "
                    >
                        Create user
                    </v-btn>
                </div>
            </v-expand-transition>
        </v-card>
    </div>
</template>

<script>
import useAccounts from "../modules/accounts";
export default {
    data() {
        return {
            isCreateClicked: false,
            showUsers: false,
            showTransfers: false,
            showDialog: false,
            editedUser: {},
            selected: [],
            users: [
                {
                    header: "Users",
                },
                {
                    divider: false,
                },
            ],
            transfers: [
                {
                    header: "Transfers",
                },
                {
                    divider: false,
                },
            ],
            currentUser: localStorage.getItem("current-user"),
            form: {
                login: "",
                password: "",
                pin: "",
            },
            isSending: false,
            updateMessage: "",
        };
    },
    methods: {
        clear() {
            this.form.login = "";
            this.form.password = "";
            this.form.pin = "";
        },
        createClear() {
            this.form.login = "";
            this.form.password = "";
            this.form.pin = "";
            this.editedUser = {};
        },
        prepareEdit(user) {
            this.editedUser = user;
            this.form.login = user.login;
        },
        showSuccess(response) {
            this.isSending = true;
            this.updateMessage = response;
            setTimeout(() => {
                this.isSending = false;
                this.updateMessage = "";
                this.showDialog = !this.showDialog;
            }, 2000);
        },
    },
    setup() {
        const {
            getAdminTransfers,
            getAllUsers,
            updateUser,
            createUser,
            deleteUser,
        } = useAccounts();

        const getTransfers = function () {
            this.showTransfers = !this.showTransfers;
            this.showUsers = false;
            getAdminTransfers().then((response) => {
                this.transfers = response.data.data;
                console.log(response.data.data);
            });
        };
        const getUsers = function () {
            this.showUsers = !this.showUsers;
            this.showTransfers = false;
            getAllUsers().then((response) => {
                this.users = response.data.data;
                console.log(response.data.data);
            });
        };
        const editUser = function (id) {
            updateUser(id, this.form).then((response) => {
                this.showSuccess(response.data.message);
            });
        };
        const _createUser = function () {
            createUser(this.form).then((response) => {
                this.showSuccess(response.data.message);
                this.showUsers = !this.showUsers;
                this.getUsers();
            });
        };
        const _deleteUser = function (id) {
            deleteUser(id).then(() => {
                this.showUsers = !this.showUsers;
                this.getUsers();
            });
        };
        return {
            getTransfers,
            getUsers,
            editUser,
            _createUser,
            _deleteUser,
        };
    },
};
</script>
