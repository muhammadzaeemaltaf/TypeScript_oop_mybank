# Simple Banking System

This project implements a simple banking system simulation using TypeScript and Inquirer.js. It allows users to perform basic banking operations such as viewing their balance, withdrawing cash, and depositing cash. The system is designed to interactively prompt users for their account details and perform the requested operations while ensuring data validation and user feedback.

## Features

- **Customer Class**: Represents a customer with properties such as first name, last name, age, gender, mobile number, and account number.
- **Account Interface**: Represents a bank account with properties for the account number and balance.
- **Bank Class**: Manages customers and accounts, and provides methods to add customers, add accounts, and perform transactions.
- **Interactive CLI**: Uses Inquirer.js to interactively prompt the user for inputs and perform operations based on user selections.
- **Data Validation**: Ensures valid inputs for account numbers and transaction amounts.
- **Feedback Messages**: Provides informative feedback to the user after each operation using Chalk.js for colored output.

## Instructions

1. **View Balance**: Allows the user to view the balance of their account.
2. **Cash Withdraw**: Allows the user to withdraw a specified amount from their account, ensuring sufficient balance is available.
3. **Cash Deposit**: Allows the user to deposit a specified amount into their account, with a small deduction for deposits over a certain amount.
4. **Exit**: Exits the banking program.

## Installation and Usage

To run the countdown timer, you can use the following `npx` command:

```bash
npx muhammadzaeemaltaf_oop_mybank
