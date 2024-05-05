import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function ToggleTheme() {
  const [theme, setTheme] = useState("light");

  const handleToggleTheme = () => {
    setTheme(prevTheme => {
      return prevTheme === "dark" ? "light" : "dark";
    });
  };

  return (
    <button onClick={handleToggleTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}

export default ToggleTheme;
