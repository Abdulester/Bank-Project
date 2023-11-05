import { faker } from "@faker-js/faker"
import chalk from "chalk/index.js";
import inquirer from "inquirer";





// Customer class
class CustomerService {
    firstName: string
    lastName: string
    age: number
    gender: string
    mobile: number
    accNumber: number

    constructor(fName: string, lName: string, age: number, gender: string, mob: number, acc: number) {
        this.firstName = fName
        this.lastName = lName
        this.age = age
        this.gender = gender
        this.mobile = mob
        this.accNumber = acc
    }
}

// interface bank account
interface BankAccount {
    accNumber: number,
    balance: number,
}

// class bank

class Bank {
    customer: CustomerService[] = [];
    account: BankAccount[] = [];

    addCustomer(obj: CustomerService) {
        this.customer.push(obj);
    }
    addAccount(obj: BankAccount) {
        this.account.push(obj);

    }
    transaction(accObj:BankAccount){
        let NewAccounts = this.account.filter(acc => acc.accNumber !== accObj.accNumber);
        this.account = [...NewAccounts, accObj];
    }
}

let BeUnitedBank = new Bank();

// customer create
for (let i: number = 1; i <= 15; i++) {
    let fName = faker.person.firstName('male')
    let lName = faker.person.lastName()
    let num = parseInt(faker.phone.number("3#########"));
    const cus = new CustomerService(fName, lName, 20 * i, "male", num, 1000 + i)
    BeUnitedBank.addCustomer(cus);
    BeUnitedBank.addAccount({ accNumber: cus.accNumber, balance: 1000 * i });
}
//Bank Function
async function bankService(Bank: Bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please Select the Service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"]
    });
    //View Balance
   do{ if (service.select == "View Balance") {
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
        console.log(`Dear ${(name?.firstName)} ${name?.lastName} your Account Balance is ${(account.balance)} $`);
    }
}
// Cash Withdraw
if (service.select == "Cash Withdraw") {
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
        let ans = await inquirer.prompt({
            type: "number",
            message: "Please Enter Your Cash.",
            name: "Dollar",
        });
        let newBalance = account.balance - ans.Dollar
        // transaction method
        Bank.transaction({ accNumber: account.accNumber, balance: newBalance });
        console.log(newBalance);
    }
}
//Cash Deposit
if (service.select == "Cash Deposit") {
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
            let ans = await inquirer.prompt({
                type: "number",
                message: "Please Enter Your Cash.",
                name: "Dollar",
            });
            if(ans.Dollar > account.balance){
                console.log("your current balance is insufficient");
                
            }
            let newBalance = account.balance + ans.Dollar
            // transaction method
            Bank.transaction({ accNumber: account.accNumber, balance: newBalance });
            console.log(newBalance);
            
        }
    }
} while(true);
    }

bankService(BeUnitedBank);


