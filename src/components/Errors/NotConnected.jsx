import React from 'react'
import Loading from '../UI/Loading'
import classes from "./NotConnected.module.css"

const NotConnected = () => {
  return (
    <div className={classes["not-connected"]}>
        <h1>Connecting to Wallet</h1>
        <div className={classes.metamask}>
            <img src={"MetaMask.png"} alt={"MetaMask"} />
        </div>
        <Loading />

        <div className={classes.steps}>
            <h2>If nothing happens follow these steps:</h2>

            <p>1. Get MetaMask Browser Extension</p>
            <p>2. Open MetaMask and Switch/Connect to <span>Goerli Testnet Network</span></p>
            <p>3. in MetaMask Import Token, with Contract Address <span>0xB27D522C0251CA702058178625747B2481A9De3E</span></p>
            <p>4. Wait a while and then Reload this Page</p>
            
        </div>

        <p className={classes.note}><b>Note: </b>Hupay Wallet is not yet available for Mobile users</p>
    </div>
  )
}

export default NotConnected