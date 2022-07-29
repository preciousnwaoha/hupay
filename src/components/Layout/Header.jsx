import React from 'react'
import {Link} from "react-router-dom"
import classes from "./Header.module.css"
import Nav from './Nav/Nav'

const Header = () => {
  return (
    <header className={classes.header}>
        <div className={classes.logo}>
          <Link to={"/"} >
            <img src={"/hu.png"} alt={"Hupay"} />
            <p>HUPAY</p>
          </Link>
          </div>
        <Nav />
    </header>
  )
}

export default Header