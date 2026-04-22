import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";   // ← IMPORTANTE
import "./Header.css";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();   // ← NECESARIO PARA NAVEGAR

  const goToProfile = () => {
    navigate("/user-profile");
    setOpen(false); // cerrar menú móvil si estaba abierto
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">GameGuess</Link>
        </div>

        {/* Menú normal (desktop) */}
        <div className="navbar-right">
          {user && (
            <>
              <button className="navbar-user" onClick={goToProfile}>
                👤 {user.name}
              </button>

              <span className="navbar-points">⭐ {user.maxPoints}</span>

              <button className="navbar-user-btn" onClick={logout}>Salir</button>
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

            <button className="navbar-user-btn" onClick={logout}>Salir</button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
