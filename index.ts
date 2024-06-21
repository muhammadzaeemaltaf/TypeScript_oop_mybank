#!/usr/bin/env node

// import Inquirer
import inquirer from "inquirer";
import chalk from "chalk";

// Custumer Class
class Customer {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  mobileNumber: number;
  accountNumber: number;

  constructor(
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    mobileNumber: number,
    accountNumber: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.mobileNumber = mobileNumber;
    this.accountNumber = accountNumber;
  }
}

// Account Interface
interface Account {
  accountNumber: number;
  balance: number;
}

// Class Bank
class Bank {
  customers: Customer[] = [];
  accounts: Account[] = [];

  addCustomer(obj: Customer) {
    this.customers.push(obj);
  }

  addAccount(obj: Account) {
    this.accounts.push(obj);
  }

  transaction(accountUpdate: Account) {
    let account = this.accounts.find(
      (acc) => acc.accountNumber === accountUpdate.accountNumber
    );
    if (account) {
      account.balance = accountUpdate.balance;
    }
  }
}

let myBank = new Bank();

// Create Customers
let customer1 = new Customer("Zaeem", "Altaf", 17, "Male", 923132566798, 1001);
let customer2 = new Customer(
  "Sarah",
  "Fatima",
  24,
  "Female",
  923335375982,
  1002
);
let customer3 = new Customer("Bilal", "Khan", 27, "Male", 923175603464, 1003);

let customers = [customer1, customer2, customer3];

// Add Customer and Account
for (let i: number = 0; i < customers.length; i++) {
  myBank.addCustomer(customers[i]);
  myBank.addAccount({
    accountNumber: customers[i].accountNumber,
    balance: 1000 * (i + 1),
  });
}

async function find() {
  let res = await inquirer.prompt([
    {
      name: "no",
      type: "input",
      message: "Please Enter your Account Number: ",
      validate: async (input) => {
        const parsedInput = parseInt(input);
        if (isNaN(parsedInput) || parsedInput <= 0) {
          return "Please enter a valid ID.";
        }
        return true;
      },
    },
  ]);

  res.no = parseInt(res.no);
  return myBank.accounts.find((acc) => acc.accountNumber === res.no);
}

async function service(bank: Bank) {
  do {
    let service = await inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: "Please select the service: ",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit", "Exit"],
      },
    ]);

    if (service.option == "View Balance") {
      let account = await find();
      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number."));
      }

      if (account) {
        let name = myBank.customers.find(
          (person) => person.accountNumber === account?.accountNumber
        );
        console.log(
          `Dear, ${chalk.green.italic(
            name?.firstName + " " + name?.lastName
          )}! Your Account Balance is ${chalk.bold.blueBright(
            "$" + account.balance
          )}`
        );
      }
    }

    if (service.option == "Cash Withdraw") {
      let account = await find();
      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number."));
      }

      if (account) {
        let name = myBank.customers.find(
          (person) => person.accountNumber === account?.accountNumber
        );

        let ans = await inquirer.prompt([
          {
            name: "ques",
            type: "number",
            message: "Please Enter your Amount: ",
            validate: async (input) => {
              const parsedInput = parseInt(input);
              if (isNaN(parsedInput) || parsedInput <= 0) {
                return "Please enter a valid ID.";
              }
              return true;
            },
          },
        ]);
        if (ans.ques > account.balance) {
          console.log(chalk.red.bold("Insufficent Amount!"));
        } else {
          let newBalance = account.balance - ans.ques;

          //Transaction Method

          myBank.transaction({
            accountNumber: account.accountNumber,
            balance: newBalance,
          });
          console.log(
            `Dear, ${chalk.green.bold.italic(
              name?.firstName + " " + name?.lastName
            )}! Withdrawal of ${
              chalk.blueBright.bold("$" + ans.ques)
            } Successful. Remaining balance: ${
             chalk.blueBright.bold("$" + account.balance)
            }`
          );
  
        }
      }
    }

    if (service.option == "Cash Deposit") {
      let account = await find();

      if (!account) {
        console.log(chalk.red.bold.italic("Invalid Account Number."));
      }

      if (account) {
        let name = myBank.customers.find(
          (person) => person.accountNumber === account?.accountNumber
        );

        let ans = await inquirer.prompt([
          {
            name: "ques",
            type: "number",
            message: "Please Enter your Amount: ",
            validate: async (input) => {
              const parsedInput = parseInt(input);
              if (isNaN(parsedInput) || parsedInput <= 0) {
                return "Please enter a valid ID.";
              }
              return true;
            },
          },
        ]);

        if (ans.ques > 100) {
          ans.ques = ans.ques - 1;
        }

        let newBalance = account?.balance + ans.ques;

        //Transaction Method

        myBank.transaction({
          accountNumber: account.accountNumber,
          balance: newBalance,
        });

        console.log(
          `Dear, ${chalk.green.bold.italic(
            name?.firstName + " " + name?.lastName
          )}! Amount ${
            chalk.blueBright.bold("$" + ans.ques)
          } Successfully Deposit. Remaining balance: ${
           chalk.blueBright.bold("$" + account.balance)
          }`
        );
        if (ans.ques > 100) {
        console.log(`${chalk.blueBright.bold("$1")} deducted`);
        }
      }
    }

    if (service.option == "Exit") {
      console.log("Exiting Bank Program...");
      console.log("\n\tThank you using our bank services. Have a great day!");
      return;
    }
  } while (true);
}

service(myBank);