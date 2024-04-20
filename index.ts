#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bgYellow.italic.bold(`******************* Welcome To EasyPaisa App ******************`));
console.log("");

const transactionHistory = [];
const start = await inquirer.prompt([
  {
    type: 'password',
    name: 'pincode',
    message: 'Enter your Strong pincode?',
    mask: '*'
  }
]);

if (start.pincode == 550305) {
  console.log(chalk.blue.italic.bold.underline(' ======== correct pincode ==========='));
  console.log("");
  
  let balance = 40000;
  let keepRunning = true;
  while (keepRunning) {
    const operation = await inquirer.prompt([
      {
        type: 'list',
        name: 'input',
        message: 'Select your Desired Operation :',
        choices: ['Available Balance', 'Bank Transfer', 'Money Transfer', 'Transaction History', 'Exit'],
      }
    ]);

    switch (operation.input) {
      case 'Available Balance':
        console.log(chalk.greenBright.italic.bold(`Your Current Balance is ${balance}`));
        console.log("");
        
        break;
      case 'Money Transfer':
      case 'Bank Transfer':
        const transfer = await inquirer.prompt([
          {
            name: 'money',
            type: 'number',
            message: 'Enter Amount You Want To Transfer',
          },
        ]);

        if (transfer.money > balance) {
          console.log(chalk.bgBlueBright.italic.bold('======== Insufficient Balance ================'));
          console.log("");
          
        } else {
          console.log(chalk.bgCyanBright.italic.bold(`Transaction successful! Your Remaining Balance is : ${balance - transfer.money}`));
          console.log("");
          
          transactionHistory.push({
            type: operation.input === 'Money Transfer' ? 'Money Transfer' : 'Bank Transfer',
            amount: transfer.money,
            date: new Date(),
          });
          balance -= transfer.money;
        }
        break;
      case 'Transaction History':
        console.log(chalk.bgBlueBright.italic.bold('========== Transaction History ==========='));
        console.log("");
        
        for (const transaction of transactionHistory) {
          console.log(chalk.bgMagenta.italic.bold(`${transaction.type} - Amount: ${transaction.amount}, Date: ${transaction.date}`));
          console.log("");
          
        };
        break;
      case 'Exit':
        console.log(chalk.bgCyan.italic.bold('******* Thank you for using EasyPaisa App! Kindly Share Your Experience.*********'));
        console.log("");
        
        keepRunning = false;
        break;
    }
  }
} else {
  console.log(chalk.cyan('Invalid Pincode! Please Enter Strong Pincode'));
  console.log("");
  
};

