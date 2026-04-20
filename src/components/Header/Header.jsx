import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { UserContext } from "../Context/UserContext";

function NavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isWelcomePage = location.pathname === '/';

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Game</span>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <button onClick={() => navigate('/user-profile')} className="navbar-user-btn">
              {user.name}
            </button>
            <span className="navbar-points">Puntos: {user.maxPoints}</span>
            <button onClick={() => { logout(); navigate('/'); }} className="navbar-logout-btn">
              {user.name === "invitado" ? 'Iniciar sesión' : 'Logout'}
            </button>
          </>
        ) : (
          !isWelcomePage && (
            <button onClick={() => navigate('/')} className="navbar-user-btn">
              Iniciar sesión
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default NavBar;

