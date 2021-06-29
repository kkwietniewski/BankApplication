export default class AccountModel {
    accountNumber = "";
    pesel = "";
    login = "";
    birth_date = "";
    address = "";
    zip_code = "";
    city = "";
    phone_number = "";
    email = "";
    balance = "";
    bank = "";

    constructor($data) {
        if ($data) {
            this.accountNumber = $data.account_number;
            this.pesel = $data.pesel;
            this.login = `${$data.first_name} ${$data.last_name}`;
            this.birth_date = $data.birth_date;
            this.address = $data.address;
            this.zip_code = $data.zip_code;
            this.city = $data.city;
            this.phone_number = $data.phone_number;
            this.email = $data.email;
            this.balance = $data.balance;
        }
    }
}
