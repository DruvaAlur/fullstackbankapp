const uuid = require("uuid");
const { Bank } = require("./Bank.js");
const { Accounts } = require("./Account.js");
const { Transaction } = require("./Transaction");
const { Credential } = require("./Credential.js");
const bcrypt = require("bcrypt");
const { DatabaseMongoose } = require("../Repository/Repository");
class Customer {
  static allCustomers = [];

  constructor(firstName, lastName, credential, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customerId = uuid.v4();
    this.totalBalance = 0;
    this.account = null;
    this.credential = credential;
    this.role = role;
    this.isActive = true;
    this.transactions = [];
  }
  static async createCustomer(firstName, lastName, username, password, role) {
    const [flag, message, newCredentialId] = await Credential.createCredential(
      username,
      password
    );
    if (!flag) {
      return false;
    }

    // newCredential.password = await newCredential.getHashOfPassword();

    let newCustomer = new Customer(firstName, lastName, newCredentialId, role);
    const dbs = new DatabaseMongoose();
    await dbs.insertOneCustomer(newCustomer);
    // Customer.allCustomers.push(newCustomer);
    // console.log(newCustomer);
    return newCustomer;
  }
  // static async createAdmin(firstName, lastName, username, password) {
  //   const [flag, message, newCredential] = Credential.createCredential(
  //     username,
  //     password
  //   );
  //   newCredential.password = await newCredential.getHashOfPassword();
  //   if (!flag) {
  //     return message;
  //   }
  //   let newCustomer = new Customer(firstName, lastName, newCredential);
  //   this.allCustomers.push(newCustomer);
  //   return newCustomer;
  // }

  static async findCustomer(username) {
    // console.log(Customer.allCustomers[0]);
    // for (let index = 0; index < Customer.allCustomers.length; index++) {
    //   // console.log(Customer.allCustomers[index].credential.username);
    //   if (Customer.allCustomers[index].credential.username == username) {
    //     return [index, true];
    //   }
    // }
    console.log(username);

    const dbs = new DatabaseMongoose();
    // console.log("_____________________");
    const cred = await dbs.findOneCredential(username);
    if (cred == null) {
      return [null, false];
    }
    // console.log(cred);
    // console.log("-----------------------");
    // console.log(username);
    // console.log(cred);
    const user = await dbs.findOneCustomer(cred._id);
    if (user == null) {
      return [null, false];
    }
    // console.log("Customer not Exists");
    return [user, true];
  }
  static findCustomerByUsername(username) {
    for (let index = 0; index < Customer.allCustomers.length; index++) {
      const customer = Customer.allCustomers[index];
      if (customer.credential.username == username) {
        return [index, true];
      }
    }
    console.log("Customer not Exists");
    return [null, false];
  }

  static async createAccount(customer) {
    // if (!Bank.isBankExist(bankAbbre)) {
    //   return false;
    // }
    // let isAccountExists = this.isAccountExists();
    // if (isAccountExists) {
    //   return false;
    // }
    // let bank = Bank.findBank(bankAbbre);
    // console.log("///////////////////////////***********");
    // console.log(bank);
    let newAccount = new Accounts();
    const dbs = new DatabaseMongoose();
    const account = await dbs.insertOneAccount(newAccount);
    console.log(account);
    const updateCustomer = await dbs.updateAccountOfCustomer(customer, account);
    // this.totalBalance = 1000;
    const newTransaction = Transaction.createNewTransaction(
      "credit",
      1000,
      "self",

      1000
    );
    const transaction = await dbs.insertOneTransaction(newTransaction);
    const updateTransactionOfCustomer = await dbs.updateTransactionOfCustomer(
      customer,
      transaction._id
    );
    // this.transactions.push(newTransaction);
    // this.account = newAccount;
    // this.updateTotalBalance(this.totalBalance + 1000);

    return newAccount;
  }

  static isAccountExists(customer) {
    console.log(customer);
    if (customer.account == null) {
      return false;
    }
    return true;
    //  const dbs=new DatabaseMongoose()
    //  const findAcc=dbs.findAccount()
    // console.log(this);
    // for (let i = 0; i < this.accounts.length; i++) {
    //   if (this.accounts[i].isAccountExists()) {
    //     return [i, true];
    //   }
    // }
    // return [null, false];
  }
  static async findAccount(customer) {}
  static async depositMoney(username, ammount) {
    // if (this.accounts[indexofaccount].balance < ammount) {
    //   console.log("Not Sufficient Balance");
    //   return false;
    // }
    const dbs = new DatabaseMongoose();
    const [customer, isCustomerExist] = await Customer.findCustomer(username);
    if (!isCustomerExist) {
      return flase;
    }
    let isAccountExist = Customer.isAccountExists(customer);
    if (!isAccountExist) {
      console.log("account doesnt exists");
      return false;
    }
    console.log(customer.account);
    const updatedBalance = await dbs.updateBalance(customer.account, ammount);
    // this.account.balance += ammount;
    // this.updateTotalBalance(ammount);

    const newTransaction = Transaction.createNewTransaction(
      "credit",
      ammount,
      "self",

      customer.account.balance + ammount
    );
    // this.transactions.push(newTransaction);
    const transaction = await dbs.insertOneTransaction(newTransaction);
    const transactionUpdateIntoUser = await dbs.updateTransactionOfCustomer(
      customer,
      transaction._id
    );
    // console.log(this.transactions);
    // console.log(this.account.balance);
    return customer;
  }

  static async withdrawMoney(username, ammount) {
    // console.log(amount, bankAbrre);
    // let isAccountexist = this.isAccountExists(bankAbrre);

    // if (isAccountexist == false) return false;
    // console.log(this.account.balance);
    // console.log(amount);
    console.log(username);
    const [customer, isCustomerExist] = await Customer.findCustomer(username);
    if (!isCustomerExist) {
      return flase;
    }
    if (customer.account.balance < ammount) {
      return false;
    }
    const dbs = new DatabaseMongoose();
    const updatedBalance = await dbs.updateBalance(customer.account, -ammount);
    // if (this.account.balance < amount) {
    //   return false;
    // }
    // this.account.balance -= amount;
    // this.updateTotalBalance();

    const newTransaction = Transaction.createNewTransaction(
      "debit",
      ammount,
      "self",

      customer.account.balance - ammount
    );
    const transaction = await dbs.insertOneTransaction(newTransaction);
    const transactionUpdateIntoUser = await dbs.updateTransactionOfCustomer(
      customer,
      transaction._id
    );
    // this.transactions.push(newTransaction);
    // console.log(this.transactions);
    // Transaction.allTransactions.push(newTransaction);
    // console.log(this.account.balance + "Adsdasdasd");
    return true;
  }

  static updateTotalBalance() {
    this.totalBalance = 0;

    this.totalBalance += this.account.balance;
  }
  static async getTransactions() {
    // const isAccountexist = this.isAccountExists();
    // if (isAccountexist == false) return "Acccount Doesnt Exists";
    // return this.transactions;
  }
  static async transfer(ammount, creditCustomerusername, username) {
    // console.log(this);
    // let isdebitAccountExist = this.isAccountExists();
    // if (!isdebitAccountExist) {
    //   return false;
    // }
    // if (this.account.balance < amount) {
    //   console.log();
    //   return false;
    // }
    // console.log(creditCustomerusername);
    console.log("============================");
    console.log(username);
    console.log(creditCustomerusername);
    let [creditCustomer, isCreditCustomerxist] = await Customer.findCustomer(
      creditCustomerusername
    );
    // console.log(creditCustomerId);
    if (!isCreditCustomerxist) {
      return false;
    }
    let isAccExists = Customer.isAccountExists(creditCustomer);
    if (!isAccExists) {
      return false;
    }
    let [debitCustomer, isDebitCustomerxist] = await Customer.findCustomer(
      username
    );
    // console.log(creditCustomerId);
    if (!isDebitCustomerxist) {
      return false;
    }
    isAccExists = Customer.isAccountExists(debitCustomer);
    if (!isAccExists) {
      return false;
    }
    // let iscreditaccountexist =
    //   Customer.allCustomers[creditcustomerindex].isAccountExists();
    // creditBankAbbre
    // ();
    // if (!iscreditaccountexist) {
    //   return false;
    // }
    const dbs = new DatabaseMongoose();
    if (debitCustomer.account.balance < ammount) {
      return false;
    }
    const withdraw = await dbs.updateBalance(debitCustomer.account, -ammount);

    // const withdraw = await Customer.withdrawMoney(username, ammount);
    const deposit = await dbs.updateBalance(creditCustomer.account, ammount);
    // const deposit = await Customer.depositMoney(
    //   creditCustomerusername,
    //   ammount
    // );

    let newTransaction = Transaction.createNewTransaction(
      "transfered from",
      ammount,
      username,

      creditCustomer.account.balance + ammount
    );
    newTransaction = await dbs.insertOneTransaction(newTransaction);
    // console.log(newTransaction);
    // console.log("_______________________++++====");
    // console.log(creditCustomerusername);
    // console.log(newTransaction);
    // const dbs = new DatabaseMongoose();
    const updatedCreditTransaction = await dbs.updateTransactionOfCustomer(
      creditCustomer,
      newTransaction._id
    );
    // console.log(updatedCreditTransaction);
    // // this.transactions[this.transactions.length - 1] = newTransaction;
    // // console.log(this.credential.username);
    newTransaction = Transaction.createNewTransaction(
      "transfered to",
      ammount,

      creditCustomerusername,
      debitCustomer.account.balance - ammount
    );
    newTransaction = await dbs.insertOneTransaction(newTransaction);
    // console.log(debitCustomer._id);
    const updatedDebitTransaction = await dbs.updateTransactionOfCustomer(
      debitCustomer,
      newTransaction._id
    );
    // Customer.allCustomers[creditcustomerindex].transactions[
    //   Customer.allCustomers[creditcustomerindex].transactions.length - 1
    // ] = newTransaction;
    // console.log(updatedDebitTransaction);
    // console.log(Customer.allCustomers[creditcustomerindex].transactions);
    return true;
  }

  // selfTransfer(ammount, debitBankAbbre, creditBankAbbre) {
  //   this.transfer(
  //     ammount,
  //     this.credential.username,
  //     creditBankAbbre,
  //     debitBankAbbre
  //   );
  //   return "self transfer sucess";
  // }

  static async getAllCustomers() {
    const dbs = new DatabaseMongoose();
    const allCustomers = await dbs.getAllCustomers();
    console.log(allCustomers);
    return allCustomers;
    // return Customer.allCustomers;
  }

  static async updateCustomer(customer, propertTobeUpdated, value) {
    const dbs = new DatabaseMongoose();
    const updateCust = await dbs.updateCustomer(
      customer._id,
      propertTobeUpdated,
      value
    );
    console.log(updateCust);
    return true;
    // if (this.isActive == false) {
    //   return [false, this, "invalid contact"];
    // }
    // switch (propertTobeUpdated) {
    //   case "username": {
    //     this.credential.username = value;
    //     return true;
    //   }
    //   case "firstname": {
    //     this.firstName = value;
    //     return true;
    //   }
    //   case "lastname": {
    //     this.lastName = value;
    //     return true;
    //   }
    //   default:
    //     return false;
    // }
  }
}
module.exports = { Customer };
