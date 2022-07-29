import React from 'react'
import {Link} from "react-router-dom"
import classes from "./Error404.module.css"

const Error404 = () => {
  return (
    <div className={classes["error-404"]}>
      <div  className={classes["error-404-main"]}>
      <h1>Page Not Found</h1>
      <h4>Something might be wrong with your Url</h4>
      <button>
        <Link to="/wallet">
          Go to Wallet
        </Link>
      </button>
      </div>
      
    </div>
  )
}

export default Error404