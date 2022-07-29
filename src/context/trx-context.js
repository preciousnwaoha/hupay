import React, { useEffect, useState, useContext } from "react";
import { formatTransactions, mergeTransactionsChainAndDB } from "../utils/trxUtils";
import ContractContext from "./contract-context";

const TransactionContext = React.createContext({
  transactions: [],
  isFromChain: false,
  addTransaction: () => {},
});

export const TransactionContextProvider = ({ children }) => {
  const contractCtx = useContext(ContractContext);
  const [transactions, setTransactions] = useState([]);
  const [isFromChain, setIsFromChain] = useState(false);

  const userAddress = contractCtx.userAddress;

  useEffect(() => {
    const getTransactions = async () => {
      console.log("gettingData");
      const responseFromBlockchain = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_MAIN_TOKEN}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
      )
        .then((res) => {
          return res.json();
        })
        .then((jsonResponse) => {
          return jsonResponse;
        })
        .catch((err) => console.log(err));

        console.log("responseFromBlockchain",  responseFromBlockchain);

        const transactionsFromBlockchain = [...responseFromBlockchain.result];

        // format chain transactions to look like db transactions
      const formattedTransactionsFromBlockchain = formatTransactions(
        transactionsFromBlockchain
      );

      console.log(formattedTransactionsFromBlockchain);

      // get db transactions
      const transactionsFromDB = await fetch("/api/trx/my-trx", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: userAddress }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonResponse) => {
          return jsonResponse;
        });

        // if blockchain getting was successfull then merge with db
        // else just use db only
      if (responseFromBlockchain.status === "1") {
        console.log("merging db and chain")
        const mergedTransactions = mergeTransactionsChainAndDB(formattedTransactionsFromBlockchain, transactionsFromDB)

        

        setTransactions(mergedTransactions);
        setIsFromChain(true);
      } else {
        console.log("decided to use just db")
        setTransactions(transactionsFromDB);
        setIsFromChain(false);
      }
    };

    getTransactions();




  }, [userAddress]);

  const addTransaction = (trx) => {
    const newTransactions = [...transactions, trx];

    setTransactions(newTransactions)
  }

  console.log(transactions, isFromChain);



  return (
    <TransactionContext.Provider
      value={{
        transactions: transactions,
        isFromChain: isFromChain,
        addTransaction: addTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
