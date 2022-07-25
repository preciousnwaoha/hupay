import { useContext, useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import ContractContext from "../../context/contract-context";
import classes from "./SendFundsForm.module.css";

/**
 * allowance, approve transfer, transferFrom, decreaseAllowance, increaseAllowance\
 * 0x35B591b0cB23CCf98aD1D930fCd1d129c6ADCE3d
 * 0x5a89D7585EE663c2CE410eEb7070C0749CEA7CA5
 * 0xB27D522C0251CA702058178625747B2481A9De3E
 * P8aMAINLLPC7pBuC
 */

const SendFundsForm = () => {
  const contractCtx = useContext(ContractContext);
  const [check, setCheck] = useState([]);

  const contract = contractCtx.contract;
  const userAddress = contractCtx.userAddress;

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

    console.log("submitting");

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

    console.log("transfer started: confim Metamask");
    const trx = await contract
      .transfer(enteredAddress, enteredAmount)
      .then(async (tx) => {
        console.log("data: ", tx);

        console.log("Transfer Pending");
        const receipt = await tx.wait()
          .then(res => {
            console.log("res", res);
          }).catch(err => {
            console.log(err)
          });

        console.log("Transaction Success");

        const receiptToRecord = {
          blockNumber: receipt.blockNumber,
          blockHash: receipt.blockHash,
          transactionHash: receipt.transactionHash,
          success: receipt.success,
          from: receipt.rawReceipt.from,
          mid: receipt.rawReceipt.to,
          to: enteredAddress,
          message: enteredDesc || "",
          amount: enteredAmount,
          senderName: enteredSenderName || "Anonymous",
        };

        console.log("Sending To DB");
        await fetch("/api/trx/add-trx", {
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

          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("tx: ", trx);

    const ts = await contract.totalSupply();
    const sym = await contract.symbol();
    const dec = await contract.decimals();
    const bo = await contract.balanceOf(userAddress);

    console.log(userAddress, ts, sym, dec, bo);

    console.log("adding trx to db");

    addressResetHandler();
    amountResetHandler();
    senderNameResetHandler();
    descResetHandler();
  };

  return (
    <form className={classes["send-funds-form"]} onSubmit={submitHandler}>
      <label htmlFor="sendeeAddress">Address</label>
      <input
        type="text"
        value={enteredAddress}
        placeholder="0x00000000000"
        id="sendeeAddress"
        onChange={addressChangeHandler}
        onBlur={addressBlurHandler}
      />

      <label htmlFor="sendamount">Amount</label>
      <input
        type="number"
        value={enteredAmount}
        placeholder="0"
        id="sendamount"
        onChange={amountChangeHandler}
        onBlur={amountBlurHandler}
      />

      <label htmlFor="sendername">Name</label>
      <input
        type="text"
        value={enteredSenderName}
        id="senderame"
        onChange={senderNameChangeHandler}
        onBlur={senderNameBlurHandler}
      />

      <label htmlFor="trxdescription">Transaction Description</label>
      <textarea
        id="trxdescription"
        value={enteredDesc || ""}
        onChange={descChangeHandler}
        onBlur={descBlurHandler}
      ></textarea>

      <button type="submit">Send</button>
    </form>
  );
};

export default SendFundsForm;
