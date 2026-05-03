import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { UserContext } from "../../components/Context/UserContext";

function UserProfile() {
  const { user, setUser, users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return <div>No hay usuario disponible.</div>;

  const params = new URLSearchParams(location.search);
  const userParam = params.get("user");

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (newName.trim() === "") {
      setError("El nombre no puede estar vacío.");
      return;
    }

    if (newName === "Invitado") {
      setError("No puedes usar 'Invitado' como nombre.");
      return;
    }

    const exists = users.some((u) => u.name === newName && u !== user);
    if (exists) {
      setError("Ese nombre ya está en uso.");
      return;
    }

    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);

    const updatedUsers = users.map((u) =>
      u === user ? updatedUser : u
    );
    setUsers(updatedUsers);

    navigate(`/user-profile?user=${newName}`, { replace: true });

    setError("");
    setIsEditing(false);
  };

  return (
    <div className={styles.userProfile}>
      <h1>Perfil de Usuario</h1>

      <div className={styles.profileInfo}>
        <div className={styles.userIdRow}>
          <h2>ID del usuario: </h2>

          {!isEditing ? (
            <>
              <span className={styles.userId}>{user.name}</span>

              {user.name !== "Invitado" && (
                <span
                  className={styles.editIcon}
                  onClick={() => setIsEditing(true)}
                  title="Editar nombre"
                >
                  ✏️
                </span>
              )}
            </>
          ) : (
            <div className={styles.editContainer}>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setError("");
                }}
                className={styles.editInput}
              />

              <div className={styles.editButtons}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  Guardar
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <p>Puntuación: {user.maxPoints}</p>
        <p>Partidas Jugadas: {user.numPAdivina + user.numPNombre}</p>
        <p>Partidas Adivina el Juego: {user.numPAdivina}</p>
        <p>Partidas Adivina el Título Correcto: {user.numPNombre}</p>
      </div>

      <button
        onClick={() => navigate("/game-selector")}
        className={styles.goBackButton}
      >
        Volver a GameSelector
      </button>
    </div>
  );
}

export default UserProfile;
