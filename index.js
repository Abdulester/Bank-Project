import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
// Customer class
class CustomerService {
    constructor(fName, lName, age, gender, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobile = mob;
        this.accNumber = acc;
    }
}
// class bank
class Bank {
    constructor() {
        this.customer = [];
        this.account = [];
    }
    addCustomer(obj) {
        this.customer.push(obj);
    }
    addAccount(obj) {
        this.account.push(obj);
    }
}
let BeUnitedBank = new Bank();
// customer create
for (let i = 1; i <= 15; i++) {
    let fName = faker.person.firstName('male');
    let lName = faker.person.lastName();
    let num = parseInt(faker.phone.number("3#########"));
    const cus = new CustomerService(fName, lName, 20 * i, "male", num, 1000 + i);
    BeUnitedBank.addCustomer(cus);
    BeUnitedBank.addAccount({ accNumber: cus.accNumber, balance: 1000 * i });
}
//Bank Function
async function bankService(Bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select the Service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"]
    });
    //View Balance
    if (service.select == "View Balance") {
        let res = await inquirer.prompt({
            type: "input",
            name: "Number",
            message: "Please Enter your Account Number",
        });
        let account = BeUnitedBank.account.find((account) => account.accNumber == res.Number);
        if (!account) {
            console.log("Invalid Account Number");
        }
        if (account) {
            let name = BeUnitedBank.customer.find((item) => item.accNumber == account?.accNumber);
            console.log(`Dear ${(name?.firstName)} ${name?.lastName} your Account Balance is ${(account.balance)}`);
        }
    }
    // Cash Withdraw
    if (service.select == "Cash Withdraw") {
        console.log("Cash Withdraw");
    }
    //Cash Deposit
    if (service.select == "Cash Deposit") {
        console.log("Cash Deposit");
    }
}
bankService(BeUnitedBank);
