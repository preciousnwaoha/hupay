import React, { useContext } from "react";
import { IoMdCopy} from "react-icons/io"
import ContractContext from "../../context/contract-context";
import { formatAddress, formatAmountToBalance } from "../../utils/walletUtils";
import classes from "./Address.module.css";

const Address = () => {
  const contractCtx = useContext(ContractContext)


  const pubAddress = formatAddress(contractCtx.userAddress)
  const balance = contractCtx.balance

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
        <div className={classes["pub-address-copy"]}>
          <IoMdCopy />
        </div>
      </div>
    </div>
  );
};

export default Address;
