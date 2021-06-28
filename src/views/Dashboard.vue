<template>
    <div>
        <v-card class="mx-auto col-md-4">
            <v-badge inline left :content="`Bank ${account.bank}`"></v-badge>
            <v-card-title class="text-right">
                {{ account.login }}
            </v-card-title>
            <v-card-subtitle> {{ account.accountNumber }} </v-card-subtitle>

            <v-card-subtitle class="text-right"> Balance </v-card-subtitle>

            <v-card-subtitle class="text-right">
                <h2>{{ account.balance }} zł</h2>
            </v-card-subtitle>

            <v-card-actions>
                <v-btn
                    color="primary"
                    @click="$router.push({ name: 'New Transfer' })"
                >
                    Make transfer
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getCredits">
                    Show credits

                    <v-icon>{{
                        showCredits ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="showCredits">
                    <v-list two-line>
                        <v-list-item-group
                            v-model="selected"
                            active-class="primary"
                            multiple
                        >
                            <template v-for="(credit, index) in credits">
                                <v-list-item :key="credit.title">
                                    <template>
                                        <v-list-item-content>
                                            <p>
                                                <v-list-item-title
                                                    ><strong
                                                        >Credit #{{
                                                            ++index
                                                        }}</strong
                                                    >
                                                </v-list-item-title>
                                            </p>
                                            <p>
                                                <v-list-item-subtitle>
                                                    Next payment:
                                                    <strong>{{
                                                        credit.next_instalment_date
                                                    }}</strong>
                                                </v-list-item-subtitle>

                                                <v-list-item-subtitle
                                                    >Final payment:
                                                    <strong>{{
                                                        credit.final_instalment_date
                                                    }}</strong></v-list-item-subtitle
                                                >
                                            </p>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text
                                                >{{ credit.remaining_funds }}/{{
                                                    credit.debt
                                                }}
                                                zł</v-list-item-action-text
                                            >
                                            <v-list-item-action-text
                                                >Minimal instalment:
                                                {{ credit.minimal_instalment }}
                                                zł</v-list-item-action-text
                                            >
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                    v-if="index < credit.length - 1"
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-expand-transition>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getTransfers">
                    Show transfers

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
                                                    <strong>{{
                                                        transfer.receiver_id ==
                                                        currentUser
                                                            ? `Incoming transfer`
                                                            : `Outcoming transfer to ${transfer.receiver_data}`
                                                    }}</strong>
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
        </v-card>
    </div>
</template>

<script>
import useAccounts from "../modules/accounts";
export default {
    data() {
        return {
            showCredits: false,
            showTransfers: false,
            selected: [],
            credits: [
                {
                    header: "Credits",
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
        };
    },
    setup() {
        const { getAllTransfers, getById, account, getAccountCredits } =
            useAccounts();

        const getTransfers = function () {
            this.showTransfers = !this.showTransfers;
            getAllTransfers(this.currentUser).then((response) => {
                this.transfers = response.data.data;
                console.log(response.data.data);
            }); //TODO user id
        };

        const getAccount = function () {
            getById(localStorage.getItem("current-user"));
        };
        getAccount();

        const getCredits = function () {
            this.showCredits = !this.showCredits;
            getAccountCredits(this.currentUser).then((response) => {
                this.credits = response.data.data;
            });
        };
        return {
            getTransfers,
            getAccount,
            account,
            getCredits,
        };
    },
};
</script>
