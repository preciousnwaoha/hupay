import { useContext, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import {formatAmountToBalance, formatBalanceToAmount } from "../../utils/walletUtils"
import useInput from "../../hooks/use-input";
import ContractContext from "../../context/contract-context";
import classes from "./SendHu.module.css";
import Card from "../UI/Card";
import Loading from "../UI/Loading";
import TransactionContext from "../../context/trx-context";

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

const SendHu = ({onExitModal}) => {
  const contractCtx = useContext(ContractContext);
  const trxCtx = useContext(TransactionContext);
  const [sending, setSending] = useState(false);
  const [waitingForMetamaskConfirmation, setWaitingForMetamaskConfirmation] = useState(false);

  const contract = contractCtx.contract;
  const balance = contractCtx.balance;

  const exitModalHandler = () => {
    onExitModal("")
  }

  // Collect form inputs and trace errors
  const {
    value: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAmount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: amountResetHandler,
  } = useInput((value) => ((value.trim() !== "") && (Number(value) <= formatAmountToBalance(balance)) && (Number(value) > 0) ));

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
      !addressIsValid ||
      !amountIsValid ||
      !senderNameIsValid ||
      !descIsValid
    ) {
      console.log(
        "Invalid input",
        enteredAddress,
        enteredAmount,
        enteredSenderName,
        enteredDesc
      );
      return;
    }
    // waiting for confimation
    setWaitingForMetamaskConfirmation(true);

    // console.log("Send started: confim Metamask");
    // call mint method provided by bunzz sdk
    await contract
      .transfer(enteredAddress, formatBalanceToAmount(enteredAmount))
      .then(async (tx) => {
        // console.log("data: ", tx);
        // Transaction is now Pending and no more waiting for confirmation
        setSending(true)
        setWaitingForMetamaskConfirmation(false)
        // console.log("Transfer Pending");
        await tx
          .wait()
          .then(async (receipt) => {

            // console.log("Transaction Success");

            // Create Schema with Data for Hupay Database
            const receiptToRecord = {
              blockNumber: receipt.blockNumber,
              blockHash: receipt.blockHash,
              transactionHash: receipt.transactionHash,
              success: receipt.success,
              from: receipt.rawReceipt.from,
              mid: receipt.rawReceipt.to,
              to: enteredAddress,
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
                return jsonResponse;

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

      // update balance
    await contractCtx.getBalance()
      .then(res => {
        console.log("getting balance: ", res)
      }).catch(err => {
        console.log(err)
      });
    

    setSending(false);

    // Clear form
    addressResetHandler();
    amountResetHandler();
    senderNameResetHandler();
    descResetHandler();

    // exit Modal
    exitModalHandler();
  };
  
  const getBalanceSor = async () => {
    await contractCtx.getBalance()
  };

  return (
    <Card className={classes["send-hu"]}>
      <h1 className={classes["title"]}>Send Hu</h1>

      <div className={classes.balance} >
        <p>Balance: {formatAmountToBalance(balance)} HUC </p>
        <span className={classes["balance-reload"]} onClick={getBalanceSor}>
          <AiOutlineReload />
        </span>
      </div>

      {(!sending && !waitingForMetamaskConfirmation) && <form className={classes["send-hu-form"]} onSubmit={submitHandler}>
        <label htmlFor="sendeeAddress">Address</label>
        <input
          type="text"
          value={enteredAddress}
          placeholder="0x00000000000"
          id="sendeeAddress"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressHasError && <p className={classes.error}>Invalid address</p>}

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

        <button type="submit">Send</button>
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

export default SendHu;
