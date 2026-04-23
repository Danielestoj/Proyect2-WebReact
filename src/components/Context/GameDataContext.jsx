// src/components/Context/GameDataContext.jsx
import { createContext, useState } from "react";

export const GameDataContext = createContext();

export function GameDataProvider({ children }) {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);


  //Cargar lista nueva de juegos (se llamará desde GameSelector)
  const loadGameList = async () => {
    setLoading(true);

    const randomPage = Math.floor(Math.random() * 30) + 1;

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=30&page=${randomPage}`
    );
    const data = await res.json();

    setGames(data.results);

    // Elegir un juego aleatorio
    const random = data.results[Math.floor(Math.random() * data.results.length)];
    setGame(random);

    setLoading(false);
  };

  // ⭐ Cambiar a un juego nuevo dentro de la misma lista
  const loadNewGame = () => {
    if (!games.length) return;

    const random = games[Math.floor(Math.random() * games.length)];
    setGame(random);
    setLoading(true);
  };

  return (
    <GameDataContext.Provider
      value={{
        games,
        game,
        loading,
        loadNewGame,
        loadGameList, 
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
}
