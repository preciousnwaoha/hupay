const axios = require('axios').default;
const Transaction = require('../models/transaction');
require('dotenv').config();

/**
 * allowance, approve transfer, transferFrom, decreaseAllowance, increaseAllowance\
 * 0x35B591b0cB23CCf98aD1D930fCd1d129c6ADCE3d
 * 0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5
 * 0xB27D522C0251CA702058178625747B2481A9De3E
 * P8aMAINLLPC7pBuC
 * https://api-goerli.etherscan.io/
 * UEIXVPFM2FIWHD5D7FGSZQFGEJ5SGWYRJF
 * https://api-goerli.etherscan.io/api?module=account&action=txlist&address=0xB27D522C0251CA702058178625747B2481A9De3E&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
 */


// get all transactions from etherscan
exports.allTrxFrmBlockchainController = async (req, res) => {
    await axios.get(`https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${process.env.MAIN_TOKEN}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`)
      .then(result => {
        return res.json(result);
      })
      .catch(err => console.log(err));

}


// mongo sandbox routes
// transactions db actions
exports.addTrxController = (req, res) => {
    const receipt = req.body

    const transaction = new Transaction({
        ...receipt,
    })

    transaction.save()
        .then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
}

// get my recorded transactions in the db
exports.myTrxController = (req, res) => {
    const userAddress = req.body.userAddress;

    Transaction.find()
        .then((result) => {
            const myTrx = result.filter(trx => {
                if ((trx.from === userAddress) || (trx.to === userAddress)) {
                    return true;
                }
                return false;
            })
            res.json(myTrx)
        }).catch(err => {
            console.log(err)
        })
}

// get all recorded transactions in the db
exports.allTrxController = (req, res) => {
    Transaction.find()
        .then((result) => {
            res.json(result)
        }).catch(err => {
            console.log(err)
        })
}

// get single transaction byt id
exports.getTrxController = (req, res) => {
    Transaction.findById('62de7add67c504298c40aaab')
        .then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        })
        
}