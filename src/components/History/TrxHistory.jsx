import React, { useContext, useEffect, useState } from 'react'
import ContractContext from '../../context/contract-context'
import classes from "./TrxHistory.module.css"
import TrxHistoryItem from './TrxHistoryItem';


const TrxHistory = () => {

    const contractCtx = useContext(ContractContext);
    const [trxList, setTrxList] = useState([]);

    const userAddress = contractCtx.userAddress;

    useEffect(() => {
        const getTrxListFromDB = async () => {
            await fetch("/api/trx/my-trx", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({userAddress: userAddress})
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonResponse => {
                setTrxList(jsonResponse);
            })
        }

        getTrxListFromDB();
    }, [userAddress])


    if (trxList.length === 0) {
        return (
          <div>
            No Transactions
          </div>
        )
      }

  return (
    <div className={classes["trx-history"]}>
          {trxList.map(trx => <TrxHistoryItem key={trx.transactionHash}
            blockNumber={trx.blockNumber}
            blockHash= {trx.blockHash}
            transactionHash= {trx.transactionHash}
            success= {trx.success}
            from= {trx.from}
            mid= {trx.mid}
            to= {trx.to}
            message= {trx.message}
            amount= {trx.amount}
            senderName= {trx.senderName}
           /> )}
    </div>
  )
}

export default TrxHistory