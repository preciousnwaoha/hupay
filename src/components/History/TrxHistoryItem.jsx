import React from 'react'
import classes from "./TrxHistoryItem.module.css"

const TrxHistoryItem = ({blockNumber, blockHash, transactionHash, success, from, mid, to, message, amount, senderName,}) => {

    
            
  return (
    <div className={classes["trx-history-item"]}>
        Item: {transactionHash}
    </div>
  )
}

export default TrxHistoryItem