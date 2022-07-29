import React from 'react'
import { NavLink } from "react-router-dom"
import classes from "./NavItem.module.css"

const NavItem = ({text, path}) => {

        // <Link to="/settings"> Settings </Link>
       


  return (
    <li className={classes["nav-item"]}>
        <NavLink
          className={(data) => `${data.isActive ? classes["active-nav"] : ""}`}
          to={path}
        >
          {text}
        </NavLink>
    </li>
  )
}

export default NavItem