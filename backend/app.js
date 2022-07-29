const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Transaction = require('./models/transaction');

// express app
const app = express();

require('dotenv').config();

// add body parser
app.use(express.json())

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

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



app.get("/", (req, res) => {
    res.send("This is the backend server of hupay")
})



