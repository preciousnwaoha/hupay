import React from "react";
import { timeConverter } from "../../utils/trxUtils";
import { formatAddress, formatAmountToBalance } from "../../utils/walletUtils";
import classes from "./TrxMoreInfo.module.css";

const TrxMoreInfo = ({
  blockNumber,
  blockHash,
  transactionHash,
  success,
  from,
  mid,
  to,
  message,
  amount,
  timeStamp,
  senderName,
}) => {
  return (
    <div className={`${classes["trx-more"]}`}>
        <div className={classes["trx-more-main"]}>
            <div className={classes["status"]}>
        <h4>Status</h4>
        <p>{success ? "Confirmed" : "Pending"}</p>
      </div>

      <div className={classes["trx-id"]}>
        <h4>Transaction Hash</h4>
        <p>{formatAddress(transactionHash)}</p>
      </div>

      <div className={classes["to-from"]}>
        <div className={classes["to"]}>
          <h4>To</h4>
          <p className={classes.name}>{senderName || "Anonymous"}</p>
          <p className={classes.addr}>{formatAddress(to)}</p>
        </div>

        <div className={classes["from"]}>
          <h4>From</h4>
          <p className={classes.name}>{"Anonymous"}</p>
          <p className={classes.addr}>{formatAddress(from)}</p>
        </div>
      </div>

      <div className={classes["transaction"]}>
        <h4>Transaction</h4>
        <div className={classes["trx-item"]}>
          <h5>Message: </h5>
          <p>{message || "Nothing"}</p>
        </div>
        <div className={classes["trx-item"]}>
          <h5>Time: </h5>
          <p>{timeConverter(timeStamp) || "Unknown"}</p>
        </div>

        <div className={classes["trx-item"]}>
          <h5>Block Hash: </h5>
          <p>{formatAddress(blockHash)}</p>
        </div>
        <div className={classes["trx-item"]}>
          <h5>Block Number: </h5>
          <p>{blockNumber}</p>
        </div>

        <div className={classes["trx-item"]}>
          <h5>Amount: </h5>
          <p>{amount ? formatAmountToBalance(amount):  "XXXX"} HUC</p>
        </div>

        <div className={classes["trx-item"]}>
          <h5>Through: </h5>
          <p>{formatAddress(mid) ||  "XXXX"}</p>
        </div>
      </div>
        </div>
      
      <div className={classes["hide-scroller"]}></div>
        <div className={classes["hide-scroller"]}></div>
    </div>
  );
};

export default TrxMoreInfo;
