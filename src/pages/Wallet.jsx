import React, { useContext, useState } from 'react';
import TrxHistory from '../components/Transactions/TrxHistory';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Address from '../components/Wallet/Address';
import AddressActions from '../components/Wallet/AddressActions';
import classes from "./Wallet.module.css"
import Modal from '../components/UI/Modal';
import SendHu from '../components/Actions/SendHu';
import MintHu from '../components/Actions/MintHu';
import GetHu from '../components/Actions/GetHu';
import ContractContext from '../context/contract-context';
import NotConnected from '../components/Errors/NotConnected';

const Wallet = () => {
  const contractCtx = useContext(ContractContext);

  const [action, setAction] = useState("");

  const changeAction = (act) => {
    setAction(act);
  }

  const exitModalHandler = () => {
    setAction("");
  } 

  if (!contractCtx.connected) {
    return (
      <section className={classes.wallet}>
    <Header />
        <div className={classes["wallet-main"]}>
          <NotConnected />
        </div>
        
    <Footer />
    </section>
    )
  }

  return (
    <section className={classes.wallet}>


    <Header />
        <div className={classes["wallet-main"]}>
        <Address />
        <AddressActions onChangeAction={changeAction} />
        <h2 className={classes["activity-title"]}>
          Activity
        </h2>
        <TrxHistory />
        </div>
        {!!action && <Modal>
          <div className={classes["exit-modal"]} onClick={exitModalHandler}>
            &times;
          </div>
          {(action === "send") && <SendHu onExitModal={changeAction} />}
          {(action === "mint") && <MintHu onExitModal={changeAction} />}
          {(action === "receive") && <GetHu onExitModal={changeAction} />}
        </Modal>}
    <Footer />
    </section>
  )
}

export default Wallet