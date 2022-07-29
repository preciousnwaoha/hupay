import { useContext, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import useInput from "../../hooks/use-input";
import ContractContext from "../../context/contract-context";
import classes from "./SendMe.module.css";
import Card from "../UI/Card";
import { formatAmountToBalance, formatBalanceToAmount } from "../../utils/walletUtils";
import Loading from "../UI/Loading";
import TransactionContext from "../../context/trx-context";

const SendMe = ({beneficiaryAddress, beneficiaryName, amount, desc, onExitModal}) => {
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

  const {
    value: enteredAmount,
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: amountResetHandler,
  } = useInput((value) => (value.trim() !== "") && (Number(value) <= formatAmountToBalance(balance)) && (Number(value) > 0));

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

    console.log("submitting");

    if (
      !amountIsValid ||
      !senderNameIsValid ||
      !descIsValid
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

    console.log("transfer started: confim Metamask");
    await contract
      .transfer(beneficiaryAddress, enteredAmount)
      .then(async (tx) => {
        console.log("data: ", tx);

        setSending(true)
        setWaitingForMetamaskConfirmation(false)
        console.log("Transfer Pending");
        await tx
          .wait()
          .then(async receipt => {
            console.log("Transaction Success");

        const receiptToRecord = {
          blockNumber: receipt.blockNumber,
          blockHash: receipt.blockHash,
          transactionHash: receipt.transactionHash,
          success: receipt.success,
          from: receipt.rawReceipt.from,
          mid: receipt.rawReceipt.to,
          to: beneficiaryAddress,
          message: enteredDesc || `Sent cash to ${beneficiaryName}`,
          amount: formatBalanceToAmount(amount),
          senderName: enteredSenderName || "Anonymous",
          timeStamp: `${(+ Date.now())}`,
        };

        console.log("Sending To DB");
        await fetch("https://hupay-backend.herokuapp.com/api/trx/add-trx", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(receiptToRecord),
        })
          .then((res) => {
            if (res.ok) {
              console.log("receipt added to DB");
              return res.json();
            }
          })
          .then((jsonResponse) => {
            console.log(jsonResponse);
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

      await contractCtx.getBalance()
      .then(res => {
        console.log("getting balance: ", res)
      }).catch(err => {
        console.log(err)
      });
    
    setSending(false);

    
    amountResetHandler();
    senderNameResetHandler();
    descResetHandler();
    exitModalHandler();
  };

  console.log("userAddess", userAddress);
  console.log("balance", balance);
  console.log("contract", contract);
  
  const getBalance = () => {
    contractCtx.getBalance()
  };

  return (
    <Card className={classes["send-me"]}>
      <h1 className={classes["title"]}>Send Hu</h1>

      <div className={classes.balance}>
        <p>Balance: {formatBalanceToAmount(balance)} HUC</p>
        <span className={classes["balance-reload"]} onClick={getBalance}>
          <AiOutlineReload />
        </span>
      </div>

      {(!sending && !waitingForMetamaskConfirmation) && <form className={classes["send-me-form"]} onSubmit={submitHandler}>
        <label htmlFor="sendeeAddress">Address</label>
        <div className={classes["filled-input"]}>
            {beneficiaryAddress}
        </div>

        <label htmlFor="sendamount">Amount</label>
        {amount && <div className={classes["filled-input"]}>
            {formatAmountToBalance(amount)} HUC
        </div>}

        {!amount && <input
          type="number"
          value={enteredAmount}
          placeholder="0.23"
          id="sendamount"
          onChange={amountChangeHandler}
          onBlur={amountBlurHandler}
        />}
        {(amountHasError && !amount) && <p className={classes.error}>Invalid Amount</p>}

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
          placeholder={amount ? `Sent cash to ${beneficiaryName}`: "Thanks for the food, Fred!"}
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

export default SendMe;
