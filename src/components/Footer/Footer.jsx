import { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLight]);

  return (
    <footer className="footer">
      <p className="footer-text">© 2026 Daniel — Proyecto React</p>

      <button
        className="theme-toggle"
        onClick={() => setIsLight(!isLight)}
      >
        {isLight ? "🌙 Modo oscuro" : "☀️ Modo claro"}
      </button>
    </footer>
  );
}
