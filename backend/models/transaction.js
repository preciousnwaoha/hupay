const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    blockHash: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    mid: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
