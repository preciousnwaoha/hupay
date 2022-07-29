import React, { useContext, } from "react";
import { Link } from "react-router-dom";
// import { MdOutlineCallMade } from "react-icons/md";
import TransactionContext from "../../context/trx-context";
import classes from "./TrxHistory.module.css";
import TrxHistoryItem from "./TrxHistoryItem";

const TrxHistory = ( { isTransactionsPage=false}) => {
  const trxCtx = useContext(TransactionContext);

  let trxList;
  

  if (trxCtx.transactions.length === 0) {
    return <div className={classes["no-trx-history"]}>No transactions</div>;
  }

  if (!isTransactionsPage) {
    trxList = trxCtx.transactions.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)).slice(0, 3)
  } else {
    trxList = [...trxCtx.transactions].sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
  }

  return (
    <div className={classes["trx-history"]}>
      <ul>
        {trxList.map((trx) => (
          <TrxHistoryItem
            key={trx.transactionHash}
            blockNumber={trx.blockNumber}
            blockHash={trx.blockHash}
            transactionHash={trx.transactionHash}
            success={trx.success}
            from={trx.from}
            mid={trx.mid}
            to={trx.to}
            message={trx.message}
            amount={trx.amount}
            senderName={trx.senderName}
            timeStamp={trx.timeStamp || 'Unknown'}
          />
        ))}
      </ul>

      {!isTransactionsPage && <button type={"button"} className={classes["view-all"]}>
        <Link to={"/transactions"}>View All</Link>
      </button>}
    </div>
  );
};

export default TrxHistory;
