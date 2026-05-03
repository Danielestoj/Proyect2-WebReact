import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const goHome = () => {
    if (user) {
      navigate("/game-selector");
    } else {
      navigate("/");
    }
    setOpen(false);
  };

  const goToProfile = () => {
    navigate(`/user-profile?user=${user.name}`);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <span className={styles.navbarLogo} onClick={goHome}>
            GameGuess
          </span>
        </div>

        {/* Menú normal (desktop) */}
        <div className={styles.navbarRight}>
          {user && (
            <>
              <button className={styles.navbarUser} onClick={goToProfile}>
                👤 {user.name}
              </button>

              <span className={styles.navbarPoints}>⭐ {user.maxPoints}</span>

              <button className={styles.navbarUserBtn} onClick={handleLogout}>
                Salir
              </button>
            </>
          )}
        </div>

        {/* Hamburguesa */}
        <div className={styles.hamburger} onClick={() => setOpen(!open)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`${styles.mobileMenu} ${open ? styles.show : ""}`}
      >
        {user && (
          <>
            <button className={styles.navbarUser} onClick={goToProfile}>
              👤 {user.name}
            </button>

            <span className={styles.navbarPoints}>⭐ {user.maxPoints}</span>

            <button className={styles.navbarUserBtn} onClick={handleLogout}>
              Salir
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
