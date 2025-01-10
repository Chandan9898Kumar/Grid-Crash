import React, { createContext, useContext, useState, useEffect } from "react";

const LightDarkTheme = createContext();

export const ChangeTheme = () => {
  return useContext(LightDarkTheme);
};

const ThemeManager = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isThemeDark ? "dark" : "light"
    );
  }, [isThemeDark]);

  return (
    <>
      <LightDarkTheme.Provider value={{ isThemeDark, setIsThemeDark }}>
        {children}
      </LightDarkTheme.Provider>
    </>
  );
};

export default ThemeManager;
