import ApiService from "@/services/apiServices";
export default {
  getAll() {
    return ApiService.authRequest(`/accounts`, ApiService.get);
  },
  delete(id) {
    return ApiService.authRequest(`/accounts/${id}`, ApiService.delete);
  },
};
