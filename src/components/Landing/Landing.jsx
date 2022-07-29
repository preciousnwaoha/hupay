import React from 'react'
import { Link } from "react-router-dom"
import Art from './Art'
import classes from "./Landing.module.css"

const Landing = () => {
  return (
    <div className={classes.landing}>
        <div className={classes.left}>
            <h1>Know who sends you crypto</h1>
            <p>Perform UnAnonymous Transactions, Create Customized Payment Pages, and Watch Your Transactions on the Blockchain with HuPay using Hu Coin (HUC)</p>
            <button type={"button"}><Link to={"/wallet"}>On to Wallet</Link></button>
        </div>
        <div className={classes.right}>
            <Art />
        </div>
    </div>
  )
}

export default Landing