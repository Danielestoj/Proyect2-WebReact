import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

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
    <footer className={styles.footer}>
      <p>© 2026 Daniel — Proyecto React</p>

      <button
        className={styles.themeToggle}
        onClick={() => setIsLight(!isLight)}
      >
        {isLight ? "🌙 Modo oscuro" : "☀️ Modo claro"}
      </button>
    </footer>
  );
}
