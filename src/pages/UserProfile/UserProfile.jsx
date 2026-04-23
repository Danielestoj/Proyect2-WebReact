import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserProfile.css';
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

    // Comprobar si ya existe otro usuario con ese nombre
    const exists = users.some(u => u.name === newName && u !== user);
    if (exists) {
      setError("Ese nombre ya está en uso.");
      return;
    }

    // Actualizar usuario en el contexto
    const updatedUser = { ...user, name: newName };
    setUser(updatedUser);

    // Actualizar lista de usuarios
    const updatedUsers = users.map(u =>
      u === user ? updatedUser : u
    );
    setUsers(updatedUsers);

    //  ACTUALIZAR LA URL CON EL NUEVO NOMBRE
    // Esto hace que la barra del navegador cambie sin recargar la página
    navigate(`/user-profile?user=${newName}`, { replace: true });

    setError("");
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h1>Perfil de Usuario</h1>

      <div className="profile-info">

        {/* ID del usuario */}
        <div className="user-id-row">
          <h2>ID del usuario: </h2>

          {!isEditing ? (
            <>
              {/* MOSTRAR SIEMPRE user.name, NO userParam */}
              <span className="user-id">{user.name}</span>

              {/* Icono solo si NO es Invitado */}
              {user.name !== "Invitado" && (
                <span
                  className="edit-icon"
                  onClick={() => setIsEditing(true)}
                  title="Editar nombre"
                >
                  ✏️
                </span>
              )}
            </>
          ) : (
            <div className="edit-container">
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setError("");
                }}
                className="edit-input"
              />
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>Guardar</button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>

        {error && <p className="error-msg">{error}</p>}

        <p>Puntuación: {user.maxPoints}</p>
        <p>Partidas Jugadas: {user.numPAdivina + user.numPNombre}</p>
        <p>Partidas Adivina el Juego: {user.numPAdivina}</p>
        <p>Partidas Adivina el Título Correcto: {user.numPNombre}</p>
      </div>

      <button onClick={() => navigate('/game-selector')} className="go-back-button">
        Volver a GameSelector
      </button>
    </div>
  );
}

export default UserProfile;
