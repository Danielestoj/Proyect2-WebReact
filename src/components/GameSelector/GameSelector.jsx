import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameSelector.module.css";
import { GameDataContext } from "../Context/GameDataContext";

function GameSelector() {
  const navigate = useNavigate();
  const { loadGameList } = useContext(GameDataContext);

  const startGame = async (mode) => {
    await loadGameList();
    navigate("/game", { state: { mode } });
  };

  return (
    <div className={styles.gameSelectorBox}>
      <div className={styles.gameSelector}>
        <div className={styles.gameBox}>
          <h2>Adivina el juego por la portada</h2>
          <p>Observa la portada del juego y trata de adivinar cuál es.</p>
          <button onClick={() => startGame("portada")}>Empezar juego</button>
        </div>

        <div className={styles.gameBox}>
          <h2>Adivina el título correcto</h2>
          <p>4 nombres, solo uno correcto.</p>
          <button onClick={() => startGame("titulo")}>Empezar juego</button>
        </div>
      </div>
      <div className={styles.searchButton}>
        <button
          onClick={() => navigate("/game-finder")}
          className={styles.finderButton}
        >
          Buscar videojuegos
        </button>

      </div>
    </div>
  );
}

export default GameSelector;
