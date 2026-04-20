import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import { UserContext } from "../../components/Context/UserContext";

function UserProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return <div>No hay usuario disponible.</div>;

  return (
    <div className="user-profile">
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <h2>Nombre: {user.name}</h2>
        <p>Puntuación: {user.maxPoints}</p>
        <p>Partidas Jugadas: {user.numPAdivina + user.numPNombre + user.numPReloj}</p>
        <p>Partidas Adivina el Juego: {user.numPAdivina}</p>
        <p>Partidas Adivina el Título Correcto: {user.numPNombre}</p>
        <p>Partidas A Contra Reloj: {user.numPReloj}</p>
      </div>

      <button onClick={() => navigate('/game-selector')} className="go-back-button">
        Volver a GameSelector
      </button>
    </div>
  );
}

export default UserProfile;
