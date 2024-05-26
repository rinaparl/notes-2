import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Link, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import ArchivPage from "./pages/ArchivPage";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import { LocaleProvider } from "./contexts/LocaleContext";
import Navigation from "./components/layout/Navigation";


function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchData();
  }, []);

  const onLoginSuccess = ({ accessToken }) => {
    putAccessToken(accessToken);
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
    });
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const toggleLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  if (initializing) {
    return null;
  }

  return (
    <LocaleProvider value={{ locale, toggleLocale }}>
      <ThemeProvider value={{theme, toggleTheme}}>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
          </h1>
          {authedUser === null ? <Navigation /> : <NavBar logout={onLogout} name={authedUser.name} />}
        </header>
        <main>
          <Routes>
            {authedUser === null ? (
              <>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/archives" element={<ArchivPage />} />
                <Route path="/notes/new" element={<AddPage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </main>
      </div>
      </ ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
