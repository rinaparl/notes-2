import React, {useState, useEffect } from "react";
import ToggleTheme from "../components/layout/ToggleTheme";
import { ThemeProvider } from "../contexts/ThemeContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/auth/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";


function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }
  const { locale } = React.useContext(LocaleContext);

  return (
    // <ThemeProvider value={{ theme, ToggleTheme}}>
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Yuk, login untuk menggunakan aplikasi."
          : "Login to use app, please."}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun ?" : "Don't have an account ?"}
        <Link to="/register">
          {locale === "id" ? "Daftar di sini" : "Register here"}
        </Link>
      </p>
    </section>
    // </ThemeProvider>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
