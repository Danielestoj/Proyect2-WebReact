import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ImageReveal from "./ImageReveal";
import AnswerInput from "./AnswerInput";
import OptionsInput from "./OptionsInput";
import { UserContext } from "../Context/UserContext";
import { GameDataContext } from "../Context/GameDataContext";

import styles from "./Game.module.css";

function Game() {
  const { state } = useLocation();
  const mode = state?.mode || "portada";

  const { user, setUser, updateUserPoints, updateUserStats } =
    useContext(UserContext);

  const { games, game, loading, loadNewGame } = useContext(GameDataContext);

  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(0);
  const [hints, setHints] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [shuffledGames, setShuffledGames] = useState([]);

  const shuffleGames = () => {
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    setShuffledGames(shuffled);
  };

  useEffect(() => {
    if (game) {
      setAttempts(5);
      setMessage("");
      setPoints(0);
      setHints([]);
      setWrongAnswers([]);
      setImageLoaded(false);

      shuffleGames();
    }
  }, [game]);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const addHint = () => {
    if (!game || mode !== "portada") return;

    const nextHintIndex = hints.length;

    const newHint =
      nextHintIndex === 0
        ? `Metacritic: ${game.metacritic ?? "Sin datos"}`
        : nextHintIndex === 1
        ? `Plataformas: ${
            game.platforms?.map((p) => p.platform.name).join(", ") ||
            "Desconocidas"
          }`
        : nextHintIndex === 2
        ? `Géneros: ${
            game.genres?.map((g) => g.name).join(", ") || "Desconocidos"
          }`
        : nextHintIndex === 3
        ? `Año de lanzamiento: ${game.released || "Desconocido"}`
        : nextHintIndex === 4
        ? `El título era: ${game.name}`
        : null;

    if (newHint) setHints([...hints, newHint]);
  };

  const checkAnswer = (answer) => {
    if (!game) return;

    const isCorrect = answer.toLowerCase() === game.name.toLowerCase();

    if (isCorrect) {
      setMessage("¡Correcto!");

      let earned = 0;

      if (mode === "portada") {
        const failedAttempts = 5 - attempts;
        earned = Math.max(0, 100 - failedAttempts * 10);
      }

      if (mode === "titulo") {
        earned = 50;
      }

      const updated = Number(user.maxPoints) + earned;

      setPoints(earned);
      setUser({ ...user, maxPoints: updated });
      updateUserPoints(user.name, updated);

      updateUserStats(user.name, mode);

      setTimeout(() => loadNewGame(), 4000);
      return;
    }

    setMessage("Incorrecto");

    setWrongAnswers((prev) =>
      prev.includes(answer) ? prev : [...prev, answer]
    );

    if (mode === "portada") {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      addHint();

      if (newAttempts === 0) {
        updateUserStats(user.name, mode);
        setTimeout(() => loadNewGame(), 4000);
      }
    }

    if (mode === "titulo") {
      updateUserStats(user.name, mode);
      setTimeout(() => loadNewGame(), 4000);
    }
  };

  if (!game) return <p>Cargando juegos...</p>;

  const filteredGames = shuffledGames.filter(
    (g) => !wrongAnswers.includes(g.name)
  );

  return (
    <div className={styles.gameContainer}>
      {!imageLoaded && (
        <div className={styles.loadingScreen}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      )}

      <ImageReveal
        image={game.background_image}
        attempts={attempts}
        forceClear={message === "¡Correcto!"}
        onLoad={() => {
          setImageLoaded(true);
        }}
      />

      <p className={styles.gamePoints}>Puntuación: {points}</p>

      {mode === "portada" && (
        <>
          <p className={styles.gameAttempts}>Intentos restantes: {attempts}</p>

          <p
            className={`${styles.gameMessage} ${
              message === "¡Correcto!"
                ? styles.correct
                : message === "Incorrecto"
                ? styles.incorrect
                : ""
            }`}
          >
            {message}
          </p>

          <div className={styles.pistasIncorrectas}>
            {hints.length > 0 && (
              <div className={styles.wrongAnswersBox}>
                {hints.map((h, i) => (
                  <p key={i}>
                    {i === 4 ? (
                      <span style={{ color: "#28a745", fontWeight: "bold" }}>
                        {h}
                      </span>
                    ) : (
                      <>
                        <strong>Pista {i + 1}:</strong> {h}
                      </>
                    )}
                  </p>
                ))}
              </div>
            )}

            {wrongAnswers.length > 0 && (
              <div className={styles.wrongAnswersBox}>
                <h3>Respuestas incorrectas:</h3>
                <ul>
                  {wrongAnswers.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <AnswerInput games={filteredGames} onSubmit={checkAnswer} />
        </>
      )}

      {mode === "titulo" && (
        <div className={styles.optionsGrid}>
          <OptionsInput
            key={game.id}
            games={filteredGames}
            correctGame={game}
            onSelect={checkAnswer}
          />
        </div>
      )}
    </div>
  );
}

export default Game;
