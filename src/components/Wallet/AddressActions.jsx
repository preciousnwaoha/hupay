import React from 'react'
import classes from "./AddressActions.module.css"

const AddressActions = ({onChangeAction}) => {

  const sendActionHandler = () => {
    onChangeAction("send")
  }

  const receiveActionHandler = () => {
    onChangeAction("receive")
  }

  const mintActionHandler = () => {
    onChangeAction("mint")
  }

  return (
    <div className={classes["address-actions"]}>
        <button type={"button"} onClick={receiveActionHandler} >Get Hu</button>
        <button type={"button"} onClick={sendActionHandler}>Send Hu</button>
        <button type={"button"} onClick={mintActionHandler} >Mint Hu</button>
    </div>
  )
}

export default AddressActions