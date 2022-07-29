import { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import {formatAmountToBalance, formatBalanceToAmount } from "../../utils/walletUtils"
import { AiOutlineReload } from "react-icons/ai";
import ContractContext from "../../context/contract-context";
import classes from "./MintHu.module.css";
import Card from "../UI/Card";
import Loading from "../UI/Loading";
import TransactionContext from "../../context/trx-context";

/**
 * MintHu - This is the code for minting HUC using bunzz sdk
 * here we are calling contract.mint(_,_)
 */

const MintHu = ({onExitModal}) => {
  const contractCtx = useContext(ContractContext);
  const trxCtx = useContext(TransactionContext);
  const [sending, setSending] = useState(false);
  const [waitingForMetamaskConfirmation, setWaitingForMetamaskConfirmation] = useState(false);

  const contract = contractCtx.contract;
  const userAddress = contractCtx.userAddress;
  const balance = contractCtx.balance;

  const exitModalHandler = () => {
    onExitModal("")
  }

  // Collect form inputs and trace errors
  const {
    value: enteredAmount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: amountResetHandler,
  } = useInput((value) => value > 0);

  const {
    value: enteredSenderName,
    isValid: senderNameIsValid,
    hasError: senderNameHasError,
    valueChangeHandler: senderNameChangeHandler,
    inputBlurHandler: senderNameBlurHandler,
    reset: senderNameResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDesc,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: descResetHandler,
  } = useInput((value) => true);

  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log("submitting");

    // check for errors in input and don't allow mint action if any
    if (
      !amountIsValid ||
      !senderNameIsValid ||
      !descIsValid ||
      !(process.env.REACT_APP_CREATOR === userAddress)
    ) {
      console.log(
        "Invalid input",
        enteredAmount,
        enteredSenderName,
        enteredDesc
      );
      return;
    }

    setWaitingForMetamaskConfirmation(true);

    // console.log("mint started: confim Metamask");
    // call mint method provided by bunzz sdk
    const trx = await contract
      .mint(userAddress, enteredAmount)
      .then(async (tx) => {
        // console.log("data: ", tx);

        // Transaction is now Pending and no more waiting for confirmation
        setSending(true)
        setWaitingForMetamaskConfirmation(false)
        // console.log("Mint Pending");
        await tx
          .wait()
          .then(async receipt => {
            // Mint Successful
            // console.log("Mint Transaction Success");

            // Create Schema with Data for Hupay Database
        const receiptToRecord = {
          blockNumber: receipt.blockNumber,
          blockHash: receipt.blockHash,
          transactionHash: receipt.transactionHash,
          success: receipt.success,
          from: receipt.rawReceipt.from,
          mid: receipt.rawReceipt.to,
          to: userAddress,
          message: enteredDesc || "",
          amount: formatBalanceToAmount(enteredAmount),
          senderName: enteredSenderName || "Anonymous",
          timeStamp: `${(+ Date.now()) / 1000}`,
        };

        // Send Data to DB
        // console.log("Sending To DB");
        await fetch("https://hupay-backend.herokuapp.com/api/trx/add-trx", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receiptToRecord),
        })
          .then((res) => {
            if (res.ok) {
              // console.log("receipt added to DB");
              return res.json();
            }
          })
          .then((jsonResponse) => {
            // console.log(jsonResponse);
            // Update Transactions
            trxCtx.addTransaction(receiptToRecord);
          })
          .catch((err) => {
            console.log(err);
          });
          })
          .catch((err) => {
            console.log(err);
          });

        
      })
      .catch((err) => {
        console.log(err);
      });

      // update Balance
      await contractCtx.getBalance()
      .then(res => {
        console.log("getting balance: ", res)
      }).catch(err => {
        console.log(err)
      });
    

    setSending(false);
    
      // Clear Form
    amountResetHandler();
    senderNameResetHandler();
    descResetHandler();
    // Exit Modal
    exitModalHandler();
  };

  const getBalance = () => {
    contractCtx.getBalance()
  };


  return (
    <Card className={classes["mint-hu"]}>
      <h1 className={classes["title"]}>Mint Hu</h1>

      <div className={classes.balance}>
        <p>Balance: {formatAmountToBalance(balance)} HUC </p>
        <span className={classes["balance-reload"]} onClick={getBalance}>
          <AiOutlineReload />
        </span>
      </div>

      <div className={classes["no-mint"]}>
        <em>Notice: Minting Feature is only allowed by the Token Creator! This 'Mint' Option is only opened for display because of the Bunzz Hackathon.</em>
      </div>

      {(!sending && !waitingForMetamaskConfirmation) && <form className={classes["mint-hu-form"]} onSubmit={submitHandler}>

        <label htmlFor="sendamount">Amount</label>
        <input
          type="number"
          value={enteredAmount}
          placeholder="0.23"
          id="sendamount"
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
        />
        {amountHasError && <p className={classes.error}>Invalid Amount</p>}

        <label htmlFor="sendername">Name</label>
        <input
          type="text"
          value={enteredSenderName}
          id="senderame"
          placeholder="Fred"
          onChange={senderNameChangeHandler}
          onBlur={senderNameBlurHandler}
        />
        {senderNameHasError && <p className={classes.error}>Please Add a Custom Name</p>}

        <label htmlFor="trxdescription">Description</label>
        <textarea
          id="trxdescription"
          placeholder="Thanks for the food!"
          value={enteredDesc || ""}
          onChange={descChangeHandler}
          onBlur={descBlurHandler}
        ></textarea>
        {descHasError && <p className={classes.error}>Invalid message</p>}

        <button type="submit" >Send</button>
      </form>}


      {waitingForMetamaskConfirmation && (
        <div className={classes["waiting-confirmation"]}>
        <div className={classes["metamask-logo"]}>
          <img src={"/MetaMask.png"} alt={"Confirm on Metamask"} />
        </div>
        <Loading text={"MetaMask Should Pupop, Please Confirm on Metamask"} />
        </div>
        
      )}

      {sending && (
        <div className={classes["waiting-confirmation"]}>
        
        <Loading text={"Transaction Pending In Blockchain"} />
        </div>
        
      )}
    </Card>
  );
};

export default MintHu;
