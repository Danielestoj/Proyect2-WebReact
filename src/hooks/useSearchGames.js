import { useState, useEffect } from "react";

export function useSearchGames(query, delay = 2000) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchGames = async (text) => {
    if (text.length < 2) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const url = `https://api.rawg.io/api/games?search=${text}&page_size=40&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error buscando juegos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      searchGames(query);
    }, delay);

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading };
}
