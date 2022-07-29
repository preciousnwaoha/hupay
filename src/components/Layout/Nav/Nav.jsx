import React from 'react';
import ThemeButton from '../../UI/ThemeButton';
import classes from "./Nav.module.css";
import NavItem from './NavItem';

const NAVITEMS = [
    {
        id: "navitem1",
        text: "What's Hu",
        path: "/whats-hu",
    },

    {
        id: "navitem2",
        text: "Wallet",
        path: "/wallet",
    },

    {
        id: "navitem3",
        text: "Activity",
        path: "/transactions",
    },
]

const Nav = () => {
  return (
    <nav className={classes.nav}>
        <ul>
            {NAVITEMS.map(item => (
                <NavItem
                    key={item.id}
                    text={item.text}
                    path={item.path}
                />
            ))}
        </ul>
        <ThemeButton />
    </nav>
  )
}

export default Nav