const Transaction = require('../models/transaction');

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