import React, { useContext } from 'react'
import NotConnected from '../components/Errors/NotConnected'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import TrxHistory from '../components/Transactions/TrxHistory'
import ContractContext from '../context/contract-context'
import classes from "./Transactions.module.css"

const Transactions = () => {
  const contractCtx = useContext(ContractContext)


  if (!contractCtx.connected) {
    return (
      <section className={classes.trx}>
    <Header />
        <div className={classes["trx-main"]}>
          <NotConnected />
        </div>
        
    <Footer />
    </section>
    )
  }

  return (
    <section className={classes.trx}>
        <Header />
        
            <div className={classes["trx-main"]}>
              <h1 className={classes.title}>Transactions</h1>
            <h2 className={classes["activity-title"]}>
          Activity
        </h2>
                <TrxHistory isTransactionsPage={true} />
            </div>
        <Footer />
    </section>
  )
}

export default Transactions