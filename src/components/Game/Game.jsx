import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ImageReveal from "./ImageReveal";
import AnswerInput from "./AnswerInput";
import Score from "./Score";
import OptionsInput from "./OptionsInput";
import { UserContext } from "../Context/UserContext";

function Game() {
  const { state } = useLocation();
  const mode = state?.mode || "portada";

  const { user, setUser, updateUserPoints, updateUserStats } =
    useContext(UserContext);

  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);

  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(0);

  const [loading, setLoading] = useState(true);

  const [hints, setHints] = useState([]);

  // Cargar juegos al inicio
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=30&page=${randomPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);

        const random =
          data.results[Math.floor(Math.random() * data.results.length)];

        setGame(random);
      });
  }, []);

  // Cargar nuevo juego
  const loadNewGame = () => {
    const random = games[Math.floor(Math.random() * games.length)];
    setGame(random);
    setAttempts(5);
    setMessage("");
    setPoints(0);
    setHints([]);
    setLoading(true);
  };

  // Añadir pistas
  const addHint = () => {
    if (!game) return;

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
        : null;

    if (newHint) {
      setHints([...hints, newHint]);
    }
  };

  // Comprobar respuesta
  const checkAnswer = (answer) => {
    if (!game) return;

    const isCorrect = answer.toLowerCase() === game.name.toLowerCase();

    // SI ACIERTA
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

      // SUMAR +1 AL MODO JUGADO
      updateUserStats(user.name, mode);

      // Cambiar de juego tras 4 segundos
      setTimeout(() => loadNewGame(), 4000);
      return;
    }

    // SI FALLA
    setMessage("Incorrecto");

    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (mode === "portada") {
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

  return (
    <div className="game-container">
      <ImageReveal
        image={game.background_image}
        attempts={attempts}
        forceClear={message === "¡Correcto!"}
        onLoad={() => setLoading(false)}
      />

      <p style={{ textAlign: "center" }}>Puntuación: {points}</p>

      {mode === "portada" && (
        <>
          <AnswerInput onSubmit={checkAnswer} />
          <Score attempts={attempts} />

          <div style={{ marginTop: "20px" }}>
            {hints.map((h, i) => (
              <p key={i}>
                <strong>Pista {i + 1}:</strong> {h}
              </p>
            ))}
          </div>
        </>
      )}

      {mode === "titulo" && !loading && (
        <OptionsInput
          key={game.id}
          games={games}
          correctGame={game}
          onSelect={checkAnswer}
        />
      )}

      <p>{message}</p>
    </div>
  );
}

export default Game;
