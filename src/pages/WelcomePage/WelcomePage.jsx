import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";
import { UserContext } from "../../components/Context/UserContext";

function WelcomePage() {
  const { user, login, register, loginGuest } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const loggedUser = login(username, password);

    if (loggedUser) {
      navigate("/game-selector");
    } else {
      setMessage("Nombre de usuario o contraseña incorrectos.");
    }
  };

  const handleRegister = () => {
    const newUser = register(username, password);

    if (newUser) {
      navigate("/game-selector");
    } else {
      setMessage("Este nombre ya está en uso.");
    }
  };

  const handleGuestLogin = () => {
    loginGuest();
    navigate("/game-selector");
  };

  return (
    <div className={styles.welcomePage}>
      <div className={styles.gameContainer}>
        <h1>Welcome to the Game!</h1>
        <p>Get ready to have fun and challenge yourself.</p>

        {!user ? (
          <div className={styles.loginOptions}>
            <div className={styles.loginBox}>
              <h2>{isRegistering ? "Registrarse" : "Iniciar sesión"}</h2>

              {message && <p className={styles.errorMessage}>{message}</p>}

              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setMessage("");
                }}
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                }}
              />

              <button onClick={isRegistering ? handleRegister : handleLogin}>
                {isRegistering ? "Registrarse" : "Iniciar sesión"}
              </button>

              <p>
                {isRegistering ? (
                  <>
                    ¿Ya tienes cuenta?{" "}
                    <span
                      onClick={() => setIsRegistering(false)}
                      className={styles.link}
                    >
                      Iniciar sesión
                    </span>
                  </>
                ) : (
                  <>
                    ¿No tienes cuenta?{" "}
                    <span
                      onClick={() => setIsRegistering(true)}
                      className={styles.link}
                    >
                      Registrarse
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className={styles.guestBox}>
              <h2>Entrar como invitado</h2>
              <button
                className={styles.guestButton}
                onClick={handleGuestLogin}
              >
                Entrar
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.welcomeMessage}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
