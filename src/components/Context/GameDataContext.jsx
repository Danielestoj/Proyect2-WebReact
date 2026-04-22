// src/components/Context/GameDataContext.jsx
import { createContext, useState, useEffect } from "react";

export const GameDataContext = createContext();

export function GameDataProvider({ children }) {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar juegos al inicio
  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);

    const randomPage = Math.floor(Math.random() * 30) + 1;

    const res = await fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&page_size=30&page=${randomPage}`
    );
    const data = await res.json();
    console.log(data.results);

    setGames(data.results);

    const random = data.results[Math.floor(Math.random() * data.results.length)];
    setGame(random);

    setLoading(false);
  };

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
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
}
