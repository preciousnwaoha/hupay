const express = require('express');

const router = express.Router();
const transactionsRoute = require("../controllers/transactionsControllers")




router.post('/add-trx', transactionsRoute.addTrxController);

router.post('/my-trx', transactionsRoute.myTrxController);

router.get('/get-trx', transactionsRoute.getTrxController);

router.get('/all-trx', transactionsRoute.allTrxController);

router.get('/all-trx-chain', transactionsRoute.allTrxFrmBlockchainController);

router.get('/', transactionsRoute.allTrxController);

module.exports = router;