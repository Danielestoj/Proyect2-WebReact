import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSelector.css';
import { GameDataContext } from "../Context/GameDataContext";

function GameSelector() {
  const navigate = useNavigate();
  const { loadGameList } = useContext(GameDataContext);

  const startGame = async (mode) => {
    await loadGameList(); // Cargar lista nueva de juegos
    navigate('/game', { state: { mode } });
  };

  return (
    <div className="game-selector">
      <div className="game-box">
        <h2>Adivina el juego por la portada</h2>
        <p>Observa la portada del juego y trata de adivinar cuál es.</p>
        <button onClick={() => startGame("portada")}>Empezar juego</button>
      </div>

      <div className="game-box">
        <h2>Adivina el título correcto</h2>
        <p>4 nombres, solo uno correcto.</p>
        <button onClick={() => startGame("titulo")}>Empezar juego</button>
      </div>
    </div>
  );
}

export default GameSelector;
