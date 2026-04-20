import React, { useEffect, useState } from "react";
import ImageReveal from "./ImageReveal";
import AnswerInput from "./AnswerInput";
import Score from "./Score";

function Game() {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);

  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState("");

  // 🔵 1. Cargar datos de la API
  useEffect(() => {
    fetch(
      /*`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2019-01-01,2019-12-31&page_size=10`*/
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
        console.log(data.results);

        // elegir juego aleatorio
        const random =
          data.results[Math.floor(Math.random() * data.results.length)];

        setGame(random);
      });
  }, []);

  // 🔵 2. comprobar respuesta
  const checkAnswer = (answer) => {
    if (!game) return;

    if (answer.toLowerCase() === game.name.toLowerCase()) {
      setMessage("¡Correcto!");
    } else {
      setAttempts(attempts - 1);
      setMessage("Incorrecto");
    }
  };

  // 🔵 3. loading
  if (!game) return <p>Cargando juegos...</p>;

  return (
    <div className="game-container">
      <h1>Adivina el videojuego 🎮</h1>

      <ImageReveal image={game.background_image} attempts={attempts} />

      <AnswerInput onSubmit={checkAnswer} />
      <Score attempts={attempts} />

      <p>{message}</p>
    </div>
  );
}

export default Game;