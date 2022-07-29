import { useContext, useLayoutEffect } from "react";
import ThemeContext from "../../context/theme-context";
import classes from "./ThemeButton.module.css"



// Usage
const themeLight = {
    "--primary-700": "#1DA1F2",
    "--primary-400": "#68bdf2",
    "--secondary-700": "#F4B400",
    "--secondary-400": "#f0cd6d",
    "--light-400": "#bfcadd",
    "--light-700": "#d0def5",
    "--light-900": "#ffffff",
    "--dark-400": "#36393e",
    "--dark-700": "#282b30",
    "--dark-900": "#1e2124",
}

const themeDark = {
    "--primary-700": "#1DA1F2",
    "--primary-400": "#68bdf2",
    "--secondary-700": "#F4B400",
    "--secondary-400": "#f0cd6d",
    "--dark-400": "#bfcadd",
    "--dark-700": "#d0def5",
    "--dark-900": "#ffffff",
    "--light-400": "#36393e",
    "--light-700": "#282b30",
    "--light-900": "#1e2124",
}
// if (typeof window !== "undefined") {
 
// }


// Hook
const useTheme = (theme) => {

  
    useLayoutEffect(
      () => {
        // Iterate through each value in theme object
        if (typeof window !== "undefined") {
        for (const key in theme) {
          // Update css variables in document's root element
          const root = document.querySelector(":root")
          root.style.setProperty(`${key}`, theme[key]);
        }   
      }
      },
      [theme] // Only call again if theme object reference changes
    );
  
}



const ThemeButton = () => {
  const themeCtx = useContext(ThemeContext)

    const themeChangeHandler = () => {
      themeCtx.onToggleTheme()
    }


    

    let themeValue;
    let themeClasses = `${classes["theme-button"]}`
    if (themeCtx.theme === "light") {
      themeValue = themeLight;
        themeClasses += ` ${classes["light"]}`;

    }

    if (themeCtx.theme === "dark") {
        themeValue = themeDark;
        themeClasses += ` ${classes["dark"]}`;
    }

    useTheme(themeValue)

    

  return (
    <div className={themeClasses} onClick={themeChangeHandler}>
        <div className={`{}`}></div>
    </div>
  )
}

export default ThemeButton