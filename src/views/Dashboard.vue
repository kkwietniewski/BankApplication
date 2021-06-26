<template>
    <div>
        <v-card class="mx-auto col-md-4">
            <v-badge inline left content="Bank Name"></v-badge>
            <v-card-title class="text-right"> Account Name </v-card-title>
            <v-card-subtitle> 9257-5830-9942-1524-722-8 </v-card-subtitle>

            <v-card-subtitle class="text-right"> Balance </v-card-subtitle>

            <v-card-subtitle class="text-right">
                <h2>2,569 zł</h2>
            </v-card-subtitle>

            <v-card-actions>
                <v-btn
                    color="primary"
                    @click="$router.push({ name: 'New Transfer' })"
                >
                    Make transfer
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getTransactions">
                    Show transactions

                    <v-icon>{{
                        showTransactions ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="showTransactions">
                    <v-list two-line>
                        <v-list-item-group
                            v-model="selected"
                            active-class="primary"
                            multiple
                        >
                            <template
                                v-for="(transaction, index) in transactions"
                            >
                                <v-list-item :key="transaction.title">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="transaction.title"
                                            ></v-list-item-title>
                                            <v-list-item-subtitle
                                                class="text--primary"
                                                v-text="
                                                    transaction.transfer_date
                                                "
                                            ></v-list-item-subtitle>

                                            <v-list-item-subtitle
                                                v-text="
                                                    transaction.from_account
                                                "
                                            ></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text
                                                >{{ transaction.amount }}
                                                {{
                                                    transaction.currency
                                                }}</v-list-item-action-text
                                            >

                                            <v-icon
                                                v-if="!active"
                                                color="grey lighten-1"
                                            >
                                                mdi-star-outline
                                            </v-icon>

                                            <v-icon
                                                v-else
                                                color="yellow darken-3"
                                            >
                                                mdi-star
                                            </v-icon>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                    v-if="index < transactions.length - 1"
                                    :key="index"
                                ></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                </div>
            </v-expand-transition>
        </v-card>
        <v-card class="mx-auto col-md-4 mt-4">
            <v-badge inline left content="Bank Name"></v-badge>
            <v-card-title class="text-right"> Account Name </v-card-title>
            <v-card-subtitle> 9257-5830-9942-1524-722-8 </v-card-subtitle>

            <v-card-subtitle class="text-right"> Balance </v-card-subtitle>

            <v-card-subtitle class="text-right">
                <h2>2,569 zł</h2>
            </v-card-subtitle>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="getTransactions">
                    Show transactions

                    <v-icon>{{
                        showTransactions ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="showTransactions">
                    <v-list two-line>
                        <v-list-item-group
                            v-model="selected"
                            active-class="primary"
                            multiple
                        >
                            <template
                                v-for="(transaction, index) in transactions"
                            >
                                <v-list-item :key="transaction.title">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="transaction.title"
                                            ></v-list-item-title>
                                            <v-list-item-subtitle
                                                class="text--primary"
                                                v-text="
                                                    transaction.transfer_date
                                                "
                                            ></v-list-item-subtitle>

                                            <v-list-item-subtitle
                                                v-text="
                                                    transaction.from_account
                                                "
                                            ></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text
                                                >{{ transaction.amount }}
                                                {{
                                                    transaction.currency
                                                }}</v-list-item-action-text
                                            >

                                            <v-icon
                                                v-if="!active"
                                                color="grey lighten-1"
                                            >
                                                mdi-star-outline
                                            </v-icon>

                                            <v-icon
                                                v-else
                                                color="yellow darken-3"
                                            >
                                                mdi-star
                                            </v-icon>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider
                                    v-if="index < transactions.length - 1"
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
            showTransactions: false,
            selected: [1],
            transactions: [
                {
                    header: "Transactions",
                },
                {
                    divider: false,
                },
            ],
        };
    },
    setup() {
        const { getAllTransactions } = useAccounts();

        const getTransactions = function () {
            this.showTransactions = !this.showTransactions;
            getAllTransactions(28).then((response) => {
                this.transactions = response.data.data;
                console.log(response.data.data);
            }); //TODO user id
        };

        return {
            getTransactions,
        };
    },
};
</script>
