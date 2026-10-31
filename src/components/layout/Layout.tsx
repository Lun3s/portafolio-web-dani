import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("dani-theme") === "dark");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("dani-theme", darkMode ? "dark" : "light");
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    if (location.hash) {
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior });
      });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className={darkMode ? "portfolio dark" : "portfolio"}>
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
