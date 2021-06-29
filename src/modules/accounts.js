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
    const updateUser = async (id, data) => {
        try {
            return await accountServices.updateUser(id, data);
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
    const getUserById = async (id) => {
        try {
            return await accountServices.getUserById(id);
        } catch (e) {
            console.log(e);
        }
    };
    const getAllUsers = async () => {
        try {
            return await accountServices.getAllUsers();
        } catch (e) {
            console.log(e);
        }
    };
    const getAdminTransfers = async () => {
        try {
            return await accountServices.getAdminTransfers();
        } catch (e) {
            console.log(e);
        }
    };
    const createUser = async (data) => {
        try {
            return await accountServices.createUser(data);
        } catch (e) {
            console.log(e);
        }
    };
    const deleteUser = async (id) => {
        try {
            return await accountServices.deleteUser(id);
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
        updateUser,
        createAccountTransfer,
        getUserById,
        getAllUsers,
        getAdminTransfers,
        createUser,
        deleteUser,
    };
}
