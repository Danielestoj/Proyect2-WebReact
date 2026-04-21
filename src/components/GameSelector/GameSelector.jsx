/*
import React from 'react';
import { useLocation } from 'react-router-dom'; // Para obtener el usuario pasado por la redirección
import './GameSelector.css';

function GameSelector() {
  const location = useLocation();
  const { user } = location.state || {}; // Obtenemos el usuario desde la ubicación
  return (
    <div className="game-selector">
      <div className="game-box">
        <h2>Adivina el juego por la portada</h2>
        <p>Observa la portada del juego y trata de adivinar cuál es. ¡Parece fácil, pero no lo es tanto!</p>
        <button>Empezar juego</button>
      </div>

      <div className="game-box">
        <h2>Adivina el título correcto</h2>
        <p>Aparecerán 4 nombres para la portada que veas y sólo uno será correcto. ¡Adivina bien!</p>
        <button>Empezar juego</button>
      </div>

      <div className="game-box">
        <h2>A contra Reloj</h2>
        <p>Adivina el juego lo antes posible, mientras antes contestes, ¡más puntos ganarás!</p>
        <button>Empezar juego</button>
      </div>
    </div>
  );
}

export default GameSelector;*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameSelector.css';

function GameSelector() {
  const navigate = useNavigate();

  const startGame = (mode) => {
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

      <div className="game-box">
        <h2>A contra Reloj</h2>
        <p>Adivina lo antes posible.</p>
        <button onClick={() => startGame("reloj")}>Empezar juego</button>
      </div>
    </div>
  );
}

export default GameSelector;
