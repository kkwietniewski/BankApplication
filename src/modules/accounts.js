import { ref } from "@vue/composition-api";
import accountServices from "../services/accountServices";
import AccountModel from "../models/AccountModel";

export default function useAccounts() {
    const account = ref(null);

    const loginAccount = async (data) => {
        try {
            return await accountServices.login(data);
        } catch (e) {
            console.log(e);
        }
    };
    const getById = function (id) {
        if (id) {
            let bankName = "";
            accountServices.getBankByAccountId(id).then((response) => {
                bankName = response.data.data.bank_name;
            });
            accountServices.getById(id).then((response) => {
                const accountModel = new AccountModel(response.data.data);
                accountModel.bank = bankName;
                account.value = accountModel;
            });
        }
    };
    const getAccountCredits = async (id) => {
        try {
            return await accountServices.getAccountCredits(id);
        } catch (e) {
            console.log(e);
        }
    };
    const getAllTransfers = async (id) => {
        try {
            return await accountServices.getAllTransfers(id);
        } catch (e) {
            console.log(e);
        }
    };
    const updateAccountPassword = async (id, data) => {
        try {
            return await accountServices.updateAccountPassword(id, data);
        } catch (e) {
            console.log(e);
        }
    };
    const createAccountTransfer = async (data) => {
        try {
            return await accountServices.createAccountTransfer(data);
        } catch (e) {
            console.log(e);
        }
    };
    const checkIsAdmin = async (id) => {
        try {
            return await accountServices.checkIsAdmin(id);
        } catch (e) {
            console.log(e);
        }
    };
    return {
        loginAccount,
        getAllTransfers,
        getById,
        account,
        getAccountCredits,
        updateAccountPassword,
        createAccountTransfer,
        checkIsAdmin,
    };
}
