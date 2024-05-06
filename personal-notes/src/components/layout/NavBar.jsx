import React, { useState, useEffect } from "react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LocaleConsumer } from "../../contexts/LocaleContext";
import { FaMoon, FaSun } from "react-icons/fa";


function NavBar({ logout, name }) {
  const { pathname } = useLocation();
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
                  {pathname !== "/archives" ? (
                    <Link to="/archives" title="home">
                      Terarsip
                    </Link>
                  ) : (
                    <Link to="/" title="Archive">
                      Home
                    </Link>
                  )}
                </li>
                <li>
                  <button onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                  </button>
                </li>
                <li>
                  <button onClick={toggleLocale}>
                    <BsTranslate />
                  </button>
                </li>
                <li>
                  <button onClick={logout}>
                    {name}
                    <FiLogOut />
                  </button>
                </li>
              </ul>
            </nav>
          );
        }}
      </LocaleConsumer>
    </ThemeProvider>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavBar;
