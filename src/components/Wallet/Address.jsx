import React, { useContext, useState } from "react";
import { IoMdCopy } from "react-icons/io"
import { BsFileEarmarkCheckFill } from "react-icons/bs"
import ContractContext from "../../context/contract-context";
import { formatAddress, formatAmountToBalance } from "../../utils/walletUtils";
import classes from "./Address.module.css";

const Address = () => {
  const [copied, setCopied] = useState(false);
  const contractCtx = useContext(ContractContext)


  const pubAddress = formatAddress(contractCtx.userAddress)
  const balance = contractCtx.balance

  const copyHandler = () => {

      navigator.clipboard.writeText(pubAddress);


        setCopied(true)

        setTimeout(() => {
                  setCopied(false)
        }, 3000);
    }

  return (
    <div className={classes.address}>
      <div className={classes.logo}>
        <img src={"/hu.png"} alt={"hucoin"} />
      </div>

      <p className={classes.balance}>{formatAmountToBalance(balance)} HUC</p>
      <div className={classes["pub-address"]}>
        <p className={classes["pub-address-text"]}>
          {pubAddress}
        </p>
        <div className={classes["pub-address-copy"]} onClick={copyHandler}>
          {copied ? <BsFileEarmarkCheckFill /> : <IoMdCopy />}
        </div>
      </div>
    </div>
  );
};

export default Address;
