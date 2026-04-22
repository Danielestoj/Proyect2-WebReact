import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { UserContext } from "../../components/Context/UserContext";

function WelcomePage() {
  const { user, login, register, loginGuest } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    const loggedUser = login(username, password);

    if (loggedUser) {
      navigate('/game-selector');
    } else {
      setMessage("Nombre de usuario o contraseña incorrectos.");
    }
  };

  const handleRegister = () => {
    const newUser = register(username, password);

    if (newUser) {
      navigate('/game-selector');
    } else {
      setMessage("Este nombre ya está en uso.");
    }
  };

  const handleGuestLogin = () => {
    loginGuest();
    navigate('/game-selector');
  };

  return (
    <div className="welcome-page">
      <div className="game-container">
        <h1>Welcome to the Game!</h1>
        <p>Get ready to have fun and challenge yourself.</p>

        {!user ? (
          <div className="login-options">
            <div className="login-box">
              <h2>{isRegistering ? 'Registrarse' : 'Iniciar sesión'}</h2>
              {message && <p className="error-message">{message}</p>}

              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setMessage(""); // limpiar mensaje al escribir
                }}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage(""); // limpiar mensaje al escribir
                }}
              />

              <button onClick={isRegistering ? handleRegister : handleLogin}>
                {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
              </button>

              <p>
                {isRegistering ? (
                  <>
                    ¿Ya tienes cuenta?{' '}
                    <span onClick={() => setIsRegistering(false)} className="link">
                      Iniciar sesión
                    </span>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{' '}
                    <span onClick={() => setIsRegistering(true)} className="link">
                      Registrarse
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="guest-box">
              <h2>Entrar como invitado</h2>
              <button className="guest-button" onClick={handleGuestLogin}>
                Entrar
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-message">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
