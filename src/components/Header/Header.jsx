import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

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
              <span className="navbar-user">👤 {user.name}</span>
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

      {/* Menú móvil FUERA del navbar */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        {user && (
          <>
            <span className="navbar-user">👤 {user.name}</span>
            <span className="navbar-points">⭐ {user.maxPoints}</span>
            <button className="navbar-user-btn" onClick={logout}>Salir</button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
