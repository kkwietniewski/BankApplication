import accountServices from "../services/accountServices";
// import AccountModel from "../models/AccountModel";

export default function useAccounts() {
    // const account = ref();
    // const accounts = ref();
    // const headers = ref([
    //     "pesel",
    //     "login",
    //     "password",
    //     "pin",
    //     "accountNumber",
    //     "balance",
    //     "bank",
    // ]);
    const loginAccount = async (data) => {
        try {
            return await accountServices.login(data);
        } catch (e) {
            console.log(e);
        }
    };
    const getAllTransactions = async (id) => {
        try {
            return await accountServices.getAllTransactions(id);
        } catch (e) {
            console.log(e);
        }
    };
    return {
        loginAccount,
        getAllTransactions,
    };
}
