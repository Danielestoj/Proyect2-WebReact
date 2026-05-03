import { useState, useEffect } from "react";

export function useGameDetail(id) {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const data = await res.json();
        setGame(data);

        const res2 = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
        );
        const data2 = await res2.json();
        setScreenshots(data2.results || []);
      } catch (err) {
        console.error("Error cargando juego:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  return { game, screenshots, loading };
}
