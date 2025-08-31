//hooks
import { useEffect, useState } from "react";

//context
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const storedTheme = theme === "dark" ? "light" : "dark";
    setTheme(storedTheme);
    localStorage.setItem("theme", storedTheme);
  };

  useEffect(() => {
    const saveTheme = localStorage.getItem("theme");
    if (saveTheme) {
      setTheme(saveTheme);
    }
  }, []);

  useEffect(() => {
    const isDarkMode = theme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
