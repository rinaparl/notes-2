import React, { useEffect } from "react";
import ToggleTheme from "./ToggleTheme";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { BsTranslate } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { LocaleConsumer } from "../../contexts/LocaleContext";
import ThemeContext from "../../contexts/ThemeContext";

function NavBar({ logout, name }) {
  const { pathname } = useLocation();
  // const { theme, toggleTheme } = React.useContext(ThemeContext);

  // useEffect(() => {}, [theme]);

  return (
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
                <ToggleTheme />
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
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavBar;
