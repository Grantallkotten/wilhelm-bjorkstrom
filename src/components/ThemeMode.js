import { useEffect, useState } from "react";

import "../styles/theme-mode.css";

function ThemeMode() {
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <section className="theme-toggle-container">
      <svg
        className="theme-toggle-svg"
        viewBox="0 -1 24 27"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <path d="M19 6.734c0 4.164-3.75 6.98-3.75 10.266h-1.992c.001-2.079.997-3.826 1.968-5.513.912-1.585 1.774-3.083 1.774-4.753 0-3.108-2.517-4.734-5.004-4.734-2.483 0-4.996 1.626-4.996 4.734 0 1.67.862 3.168 1.774 4.753.971 1.687 1.966 3.434 1.967 5.513h-1.991c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4 11.766c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm0 2c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-1.701 3.159c-.19.216-.465.341-.753.341h-1.093c-.288 0-.562-.125-.752-.341l-1.451-1.659h5.5l-1.451 1.659z" />
        ) : (
          <path d="M19 6.734c0 4.164-3.75 6.98-3.75 10.266h-6.5c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4.5 11.266h-5c-.276 0-.5.224-.5.5s.224.5.5.5h5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-5c-.276 0-.5.224-.5.5s.224.5.5.5h5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-5.5l1.451 1.659c.19.216.465.341.753.341h1.093c.288 0 .562-.125.752-.341l1.451-1.659z" />
        )}
      </svg>
    </section>
  );
}

export default ThemeMode;
