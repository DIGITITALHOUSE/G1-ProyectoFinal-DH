import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.add(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white hover:opacity-90 transition"
    >
      {theme === "light" ? "🌙 Oscuro" : "☀️ Claro"}
    </button>
  );
};

export default ThemeToggle;