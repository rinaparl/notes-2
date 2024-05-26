import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import { LocaleConsumer } from "../../contexts/LocaleContext";


function Navigation() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
  <LocaleConsumer>
    {({ locale, toggleLocale }) => {
      return (
        <nav className="navigation">
          <ul>
            <li>
              <button onClick={toggleLocale}> <BsTranslate /> </button> 
            </li>
            <li>
              <button onClick={toggleTheme}>
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            </li>
          </ul>
        </nav>
      );
    }}
  </LocaleConsumer>
</ThemeProvider>

    )
}



export default Navigation;