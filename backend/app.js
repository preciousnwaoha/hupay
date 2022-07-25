const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transaction');

// express app
const app = express();

require('dotenv').config();

// add body parser
app.use(express.json())

app.use(cors());

// setup backend port
const PORT = process.env.PORT || 5000;

// connect to mongodb
const dbURI = "mongodb+srv://husadmin:P8aMAINLLPC7pBuC@cluster0.nlntgdi.mongodb.net/hupay?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log("connected to db");

        app.listen(PORT, () => {
            const url = `http://localhost:${PORT}/`;
            console.log(`Listening on ${url}`);
        })
    }).catch(err => console.log(err));




// app.use("/api/", require("./routes/helloRoute"));

// mongo sandbox routes
// transactions db actions
app.use('/api/trx', require('./routes/transactionsRoute'));

// // get all recorded transactions in the db
// app.get("/api/trx/all-trx", (req, res) => {
//     Transaction.find()
//         .then((result) => {
//             res.json(result)
//         }).catch(err => {
//             console.log(err)
//         })
// })

// // get single transaction byt id
// app.get("/api/trx/get-trx", (req, res) => {
//     Transaction.findById('62de7add67c504298c40aaab')
//         .then(result => {
//             res.json(result);
//         }).catch(err => {
//             console.log(err);
//         })
// })




