import React from 'react';
import Socials from '../UI/Socials';
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
        <div className={classes["copyright"]}>
            &copy; hupay 2022 | powered by <a href={'https://www.bunzz.dev/'} rel="noreferrer"  target={"_blank"}>bunzz</a>
        </div>
        <Socials className={classes.contact} />
    </footer>
  )
}

export default Footer