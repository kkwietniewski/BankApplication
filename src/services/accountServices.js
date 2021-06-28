import ApiService from "@/services/apiServices";
export default {
    getAll() {
        return ApiService.authRequest(`/accounts`, ApiService.get);
    },
    getById(id) {
        return ApiService.authRequest(`/accounts/${id}`, ApiService.get);
    },
    getBankByAccountId(id) {
        return ApiService.authRequest(`/accounts/${id}/bank`, ApiService.get);
    },
    getAccountCredits(id) {
        return ApiService.authRequest(
            `/accounts/${id}/credits`,
            ApiService.get
        );
    },
    updateAccountPassword(id, data) {
        return ApiService.authRequest(`/users/${id}`, ApiService.put, data);
    },
    login(data) {
        return ApiService.authRequest(`/login`, ApiService.post, data);
    },
    getAllTransfers(id) {
        return ApiService.authRequest(
            `accounts/${id}/transfers`,
            ApiService.get
        );
    },
    createAccountTransfer(data) {
        return ApiService.authRequest(`transfers`, ApiService.post, data);
    },
    checkIsAdmin(id) {
        return ApiService.authRequest(`users/${id}`, ApiService.get);
    },
    delete(id) {
        return ApiService.authRequest(`/accounts/${id}`, ApiService.delete);
    },
};
