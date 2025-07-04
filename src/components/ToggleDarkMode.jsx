
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons/Icons";

export default function ToggleDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState();

  // Detecta el modo inicial
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Si no hay preferencia guardada, usa la preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
        <div className="relative ml-1 mr-1">

    <button
      id="theme-toggle-btn"
      className="appearance-none border-none flex hover:scale-125 transition"
      onClick={toggleDarkMode}
      type="button"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
    </button> </div>
  );
}