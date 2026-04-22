import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";   
import "./Header.css";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();   //

    // Navegación al pulsar GameGuess
  const goHome = () => {
    if (user) {
      navigate("/game-selector");   // Usuario registrado → selector de juegos
    } else {
      navigate("/");                // Invitado → WelcomePage
    }
    setOpen(false);
  };

  const goToProfile = () => {
    navigate("/user-profile");
    setOpen(false); // cerrar menú móvil si estaba abierto
  };

  const handleLogout = () => {
    logout();
    navigate("/");   // Volver a WelcomePage
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-logo" onClick={goHome}>
            GameGuess
          </Link>
        </div>

        {/* Menú normal (desktop) */}
        <div className="navbar-right">
          {user && (
            <>
              <button className="navbar-user" onClick={goToProfile}>
                👤 {user.name}
              </button>

              <span className="navbar-points">⭐ {user.maxPoints}</span>

              <button className="navbar-user-btn" onClick={handleLogout}>
                Salir
              </button>
            </>
          )}
        </div>

        {/* Hamburguesa (móvil) */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        {user && (
          <>
            <button className="navbar-user" onClick={goToProfile}>
              👤 {user.name}
            </button>

            <span className="navbar-points">⭐ {user.maxPoints}</span>

            <button className="navbar-user-btn" onClick={handleLogout}>Salir</button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
