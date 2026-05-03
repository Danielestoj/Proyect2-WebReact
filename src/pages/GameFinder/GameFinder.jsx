import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameFinder.module.css";
import { useSearchGames } from "../../hooks/useSearchGames";

function GameFinder() {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearchGames(query);

  // PAGINACIÓN
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const navigate = useNavigate();

  // ============================
  // RESULTADOS PAGINADOS
  // ============================
  const totalPages = Math.ceil(results.length / pageSize);
  const paginatedResults = results.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.finderContainer}>
      <h1>Buscar videojuegos</h1>

      <input
        type="text"
        className={styles.searchBar}
        placeholder="Escribe el nombre de un juego, automáticamente se buscará después de 2 segundos..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // Reiniciar paginación al escribir
        }}
      />

      {/* MENSAJE DE CARGANDO */}
      {loading && (
        <p style={{ marginTop: "20px", fontSize: "18px", opacity: 0.8 }}>
          Cargando resultados...
        </p>
      )}

      {/* TARJETAS */}
      <div className={styles.resultsGrid}>
        {!loading &&
          paginatedResults.map((game) => (
            <div
              key={game.id}
              className={styles.card}
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
              <p>⭐ {game.rating}</p>
              <p>{game.genres?.map((g) => g.name).join(", ")}</p>
            </div>
          ))}
      </div>

      {/* PAGINACIÓN */}
      {!loading && results.length > pageSize && (
        <div className={styles.paginationContainer}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={styles.pageButton}
          >
            ◀ Anterior
          </button>

          <span style={{ fontSize: "18px" }}>
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={styles.pageButton}
          >
            Siguiente ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default GameFinder;
