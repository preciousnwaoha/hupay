import React, { useContext, useState } from "react";
import ContractContext from "../../context/contract-context";
import useInput from "../../hooks/use-input";
import { formatAddress, formatBalanceToAmount, textToLink } from "../../utils/walletUtils";
import Card from "../UI/Card";
import classes from "./GetHu.module.css";

const symbols = /[+!?*^%$#&()@~]/

const GetHu = () => {

  const [copied, setCopied] = useState(false);
  const [copiedFixed, setCopiedFixed] = useState(false);
  const [copiedAddr, setCopiedAdrr] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [showCopyFixed, setShowCopyFixed] = useState(false);
  const [copy, setCopy] = useState("");
  const [copyFixed, setCopyFixed] = useState("");
  const contractCtx = useContext(ContractContext);

  const userAddress = contractCtx.userAddress;


  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput((value) => (value.trim() !== "") && (!symbols.test(value)));

  const {
    value: enteredDesc,
    isValid: descIsValid,
    hasError: descHasError,
    valueChangeHandler: descChangeHandler,
    inputBlurHandler: descBlurHandler,
    reset: descResetHandler,
  } = useInput((value) => true);


  const {
    value: enteredNameFixed,
    isValid: nameFixedIsValid,
    hasError: nameFixedHasError,
    valueChangeHandler: nameFixedChangeHandler,
    inputBlurHandler: nameFixedBlurHandler,
    reset: nameFixedResetHandler,
  } = useInput((value) => (value.trim() !== "") && (!symbols.test(value)));

  const {
    value: enteredAmountFixed,
    isValid: amountFixedIsValid,
    hasError: amountFixedHasError,
    valueChangeHandler: amountFixedChangeHandler,
    inputBlurHandler: amountFixedBlurHandler,
    reset: amountFixedResetHandler,
  } = useInput((value) => ((value.trim() !== "") && (!!Number(value))));

  const {
    value: enteredDescFixed,
    isValid: descFixedIsValid,
    hasError: descFixedHasError,
    valueChangeHandler: descFixedChangeHandler,
    inputBlurHandler: descFixedBlurHandler,
    reset: descFixedResetHandler,
  } = useInput((value) => true);

  const copyHandler = (type) => {

    if (type === "copy") {
      navigator.clipboard.writeText(copy);


        setCopied(true)

        setTimeout(() => {
                  setCopied(false)
                  setShowCopy(false)
        }, 3000);
    }

    if (type === "copy-fixed") {
      navigator.clipboard.writeText(copyFixed);


        setCopiedFixed(true)

        setTimeout(() => {
                  setCopiedFixed(false)
                  setShowCopyFixed(false)
        }, 3000);
    }

    if (type === "copy-addr") {
      navigator.clipboard.writeText(copy);


      setCopiedAdrr(true)

        setTimeout(() => {
          setCopiedAdrr(false)
        }, 3000);
    }
    
  }


  
  const submitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid) {
      return
    }

    let link;


    if (typeof window !== undefined) {
      link = `${window.location.origin}/send-me-hu/share/${userAddress}/${textToLink(enteredName)}/?desc=${textToLink(enteredDesc)}`
    }
    else {
      return
    }
    

    setCopy(link)
    setShowCopy(true)

    nameResetHandler();
    descResetHandler();
  }

  const submitHandlerFixed = (e) => {
    e.preventDefault();

    if (!nameFixedIsValid || !amountFixedIsValid) {
      console.log("wrong")
      return
    }

    let link;


    if (typeof window !== undefined) {
      link = `${window.location.origin}/send-me-hu/share-fixed/${userAddress}/${textToLink(enteredNameFixed)}/${formatBalanceToAmount(enteredAmountFixed)}/?desc=${textToLink(enteredDesc)}`
    } else {
      return
    }

    setCopyFixed(link)
    setShowCopyFixed(true)

    nameFixedResetHandler();
    amountFixedResetHandler();
    descFixedResetHandler();

  }


  return (
    <Card>
      <h1 className={classes["title"]}>Get Hu</h1>

      <div className={classes.option}>
        <h4>Share Link</h4>
       {!showCopy && <form onSubmit={submitHandler}>
        <label htmlFor="send-me-name"> 
          Custom Name
        </label>
        <input value={enteredName} type={"text"} placeholder={"Stacy"} id={"send-me-name"} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
        {nameHasError && <p className={classes.error}>Please Input a valid custom name e.g. Precious</p>}
        <label htmlFor="send-me-desc"> 
          Message (optional)
        </label>
        <input value={enteredDesc} type={"text"} placeholder={"Donate to support stacy!"} id={"send-me-desc"} onChange={descChangeHandler} onBlur={descBlurHandler} />
        {descHasError && <p className={classes.error}>Invalid Description</p>}
        <button type="submit" >Create</button>
        </form>}

        {showCopy && <div className={classes.coping}>
            <p>{copy}</p>
            <button type={"button"} onClick={() => copyHandler("copy")}>{`${copied ? "Copied" : "Copy"}`}</button>
          </div>}
      </div>

      <div className={classes.option}>
        <h4>Share Link with Fixed Amount</h4>
        {!showCopyFixed && <form onSubmit={submitHandlerFixed}>
        <label htmlFor="send-me-name"> 
          Custom Name
        </label>
        <input type={"text"} value={enteredNameFixed} placeholder={"Stacy"} id={"send-me-name"} onChange={nameFixedChangeHandler} onBlur={nameFixedBlurHandler} />
        {nameFixedHasError && <p className={classes.error}>Please Input a valid custom name e.g. Precious</p>}
        <label htmlFor="send-me-amount"> 
          Amount
        </label>
        <input type={"text"} value={enteredAmountFixed} placeholder={"0.36789"} id={"send-me-amount"} onChange={amountFixedChangeHandler} onBlur={amountFixedBlurHandler} />
        {amountFixedHasError && <p className={classes.error}>Please Input a valid amount e.g. 300</p>}
        <label htmlFor="send-me-desc"> 
          Message (optional)
        </label>
        <input type={"text"} value={enteredDescFixed} placeholder={"Pay for Rice and Stew"} id={"send-me-desc"} onChange={descFixedChangeHandler} onBlur={descFixedBlurHandler} />
        {descFixedHasError && <p className={classes.error}>Invalid Description</p>}
        <button type="submit" >Create</button>
        </form>}
        {showCopyFixed && <div className={classes.coping}>
            <p>{copyFixed}</p>
            <button type={"button"} onClick={() => copyHandler("copy-fixed")}>{`${copiedFixed ? "Copied" : "Copy"}`}</button>
          </div>}
      </div>

      <div className={classes.option}>
        <h4>Share Wallet Address</h4>
        <div className={classes["copy-address"]}>
        <p>Public Address: {formatAddress(userAddress)}</p>
        <button type="button" onClick={() => copyHandler("copy-addr")} >{`${copiedAddr ? "Copied" : "Copy"}`}</button>
        </div>
        
      </div>

      <p className={classes.thanks}>Thanks for using hupay</p>
    </Card>
  );
};

export default GetHu;
