import ApiService from "@/services/apiServices";
export default {
    getAll() {
        return ApiService.authRequest(`/accounts`, ApiService.get);
    },
    login(data) {
        return ApiService.authRequest(`/login`, ApiService.post, data);
    },
    getAllTransactions(id) {
        return ApiService.authRequest(
            `accounts/${id}/transactions`,
            ApiService.get
        );
    },
    delete(id) {
        return ApiService.authRequest(`/accounts/${id}`, ApiService.delete);
    },
};
