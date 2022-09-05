// const uuid = require("uuid");
// class Bank {
//   static allBanks = [];
//   constructor(bankName, bankAbbre) {
//     this.bankName = bankName;
//     this.bankAbbre = bankAbbre;
//     this.bankId = uuid.v4();
//   }
//   static createBank(bankName, bankAbbre) {
//     if (Bank.isBankExist(bankAbbre)) {
//       return false;
//     }
//     let newBank = new Bank(bankName, bankAbbre);
//     Bank.allBanks.push(newBank);
//     return newBank;
//   }
//   static isBankExist(bankAbbre) {
//     for (let j = 0; j < Bank.allBanks.length; j++) {
//       if (Bank.allBanks[j].bankAbbre == bankAbbre) {
//         return true;
//       }
//     }
//     return false;
//   }
//   static findBank(bankAbbre) {
//     for (let j = 0; j < Bank.allBanks.length; j++) {
//       if (bankAbbre == Bank.allBanks[j].bankAbbre) {
//         return Bank.allBanks[j];
//       }
//     }
//   }
//   static getAllBanks() {
//     return Bank.allBanks;
//   }
// }
// module.exports = { Bank };
