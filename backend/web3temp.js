const Web3 = require('web3');
require('dotenv').config();

class TransactionChecker {
  web3;
  account;
  accountTxs;

  constructor( account) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/0bbf1434ce7e45faa8106636ef9ca29e"))
    this.account = account.toLowerCase();
    this.accountTxs = [];
  }

  async checkBlock() {
    let block = await this.web3.eth.getBlock('latest');
    // let number = block.number;

    if (block != null && block.transactions != null ) {
      console.log("in if check")
      for(let trxHash of block.transactions) {
        
        const trx = await this.web3.eth.getTransaction(trxHash)
          // .then(trx => {
            // let toTrx = (trx.to == null) ? null : trx.to.toLowerCase();
            // let fromTrx = (trx.from == null) ? null : trx.from.toLowerCase();
            // console.log(toTrx, fromTrx)
            
            // if ((this.account === toTrx) || (this.account === fromTrx)) {
            //   this.accountTxs.push(trx);
            // }
          // }).catch(err => console.log(err));

        console.log(trx.to, trx.from)

        
      }
    }

  }
}

let trxChecker = new TransactionChecker("0xB27D522C0251CA702058178625747B2481A9De3E")

const po = async () => {
  await trxChecker.checkBlock()
  .then(res => console.log("hi"));
}

po();




