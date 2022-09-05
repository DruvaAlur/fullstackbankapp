const { Customer } = require("../../view/Customer.js");
const { Bank } = require("../../view/Bank.js");
const { JWTPayload } = require("../../view/Authentication.js");

async function createNewAccount(req, resp) {
  // console.log("_____________________________");
  // console.log(Customer.allCustomers);
  // console.log(Bank.allBanks);
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  if (!isValidAdmin) {
    return "please login";
  }

  // const { username, bankAbbre } = req.body;
  const { username } = req.body;
  console.log(
    "_____________________________________________________________________++"
  );
  console.log(username);
  if (username == null) {
    return resp.status(401).send("send all required parameters");
  }
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  // console.log(customer);
  if (!iscustomerexist) {
    return resp.status(401).send("customer doesnt exists");
  }
  const isAccountExists = Customer.isAccountExists(customer);
  if (isAccountExists) {
    return resp.status(401).send("Account already exists");
  }
  // console.log("______________________");
  const tempAcc = await Customer.createAccount(customer);
  if (!tempAcc) {
    return resp.status(401).send("Account already exists");
  }
  // console.log(tempAcc);
  resp.status(200).send(tempAcc);
}
async function getAllAccounts(req, resp) {
  // const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  // if (!isValidCustomer) {
  //   return "please login";
  // }
  const username = req.params.username;
  // const { amount, creditCustomerId, creditBankAbbre, debitBankAbbre } =
  //   req.body;
  if (username == null) {
    return resp.status(401).send("send all required parameters");
  }
  let [customer, iscustomerexist] = await Customer.findCustomer(username);
  if (!iscustomerexist) {
    return resp.status(401).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);
  // console.log(Customer.allCustomers[indexOfCustomer].getAllAccounts());
  resp.status(201).send(customer.account);
}
module.exports = { createNewAccount, getAllAccounts };
