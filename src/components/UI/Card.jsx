import React from 'react'
import classes from "./Card.module.css"

const Card = ({children, className}) => {
  return (
    <div className={`${classes.card} ${className || ""}`}>

      <div className={classes["card-main"]}>
      {children}
      </div>
        

        <div className={classes["hide-scroller"]}></div>
        <div className={classes["hide-scroller"]}></div>
    </div>
  )
}

export default Card