import React, { useContext, useState } from "react";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { formatAddress, formatAmountToBalance } from "../../utils/walletUtils";
import Modal from "../UI/Modal";
import classes from "./TrxHistoryItem.module.css";
import TrxMoreInfo from "./TrxMoreInfo";

const TrxHistoryItem = ({
  blockNumber,
  blockHash,
  transactionHash,
  success,
  from,
  mid,
  to,
  message,
  amount,
  senderName,
  timeStamp,
}) => {
  const contractCtx = useContext(ContractContext);
  const [showMore, setShowMore] = useState(false);

  let isSend =
    from.toLowerCase() === contractCtx.userAddress.toLowerCase() ? true : false;

  const toggleShowMoreHandler = () => {
    setShowMore((prevState) => {
      return !prevState;
    });
  };
  
  let makeMessage = message

  if (!to || (to === contractCtx.userAddress)) {
    makeMessage = "Minting"
  }

  return (
    <>
      <li className={classes["trx-history-item"]} onClick={toggleShowMoreHandler}>
        <div className={classes["hu-info"]}>
          <div className={classes.icon}>
            {isSend ? <BsArrowUpRight /> : <BsArrowDownLeft />}
          </div>

          <div className={classes["hu-info-text"]}>
            <p className={classes["name"]}>{senderName || "Anonymous"}</p>
            <p className={classes["desc"]}>{makeMessage}</p>
          </div>
        </div>

        <div className={classes["chain-info"]}>
          <p className={classes["amount"]}>
            {formatAmountToBalance(amount)
              ? formatAmountToBalance(amount)
              : "XX.XX"}{" "}
            HUC
          </p>

          <p className={classes["to-from"]}>
            {isSend
              ? `To: ${formatAddress(to)}`
              : `From: ${formatAddress(from)}`}
          </p>
        </div>
      </li>
      {showMore && (
        <Modal>
          <div
            className={classes["exit-modal"]}
            onClick={toggleShowMoreHandler}
          >
            &times;
          </div>
          <TrxMoreInfo
            blockNumber={blockNumber}
            blockHash={blockHash}
            transactionHash={transactionHash}
            success={success}
            from={from}
            mid={mid}
            to={to}
            message={makeMessage}
            amount={amount}
            senderName={senderName}
            timeStamp={timeStamp}
           />
        </Modal>
      )}
    </>
  );
};

export default TrxHistoryItem;
