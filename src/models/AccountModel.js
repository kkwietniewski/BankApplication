export default class AccountModel {
    pesel = "";
    login = "";
    password = "";
    pin = 0;
    accountNumber = "";
    balance = "";
    bank = 0;

    constructor($data) {
        if ($data) {
            this.pesel = $data.pesel;
            this.login = $data.login;
            this.password = $data.password;
            this.pin = $data.pin;
            this.accountNumber = $data.accountNumber;
            this.balance = $data.balance;
            this.bank = $data.bank;
        }
    }
}
