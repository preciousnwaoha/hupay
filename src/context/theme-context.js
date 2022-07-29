import React, { useState, useEffect, useContext } from "react";

const ThemeContext = React.createContext({
  theme: {},
  onToggleTheme: () => {},
  onSetTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [themeState, setThemeState] = useState("");


  useEffect(() => {
    if (themeState === "") {
      if (typeof window !== "undefined") {
        let themeFromLS = localStorage.getItem("theme");
        if (themeFromLS !== "") {
          setThemeState(themeFromLS);
          // console.log("set from LS as", themeFromLS);
        }

        if (!themeFromLS) {
          setThemeState("light")
          // console.log("had to set as light")
        }
      }
    }
  }, [])

  const toggleThemeHandler = () => {
    if (themeState === "light") {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }
  };

  useEffect(() => {

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeState);
    }
  }, [themeState]);

  return (
    <ThemeContext.Provider
      value={{
        theme: themeState,
        onToggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
