import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./GameDetail.module.css";
import { useGameDetail } from "../../hooks/useGameDetail";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Custom hook
  const { game, screenshots, loading } = useGameDetail(id);

  // Modal
  const [modalImage, setModalImage] = useState(null);
  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  if (loading) {
    return (
      <div className={styles.loading}>
        Cargando información del juego...
      </div>
    );
  }

  if (!game) {
    return <div className={styles.error}>No se encontró el juego.</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate("/game-finder")}>
        ◀ Volver
      </button>

      <h1 className={styles.title}>{game.name}</h1>

      <img src={game.background_image} className={styles.mainImage} />

      <div className={styles.infoBox}>
        <p><strong>Rating:</strong> ⭐ {game.rating}</p>
        <p><strong>Metacritic:</strong> {game.metacritic || "N/A"}</p>
        <p><strong>Fecha de lanzamiento:</strong> {game.released}</p>
        <p><strong>Géneros:</strong> {game.genres?.map(g => g.name).join(", ")}</p>
        <p><strong>Plataformas:</strong> {game.platforms?.map(p => p.platform.name).join(", ")}</p>
      </div>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: game.description }}
      />

      <h2 className={styles.subtitle}>Imágenes</h2>
      <div className={styles.gallery}>
        {screenshots.map((s) => (
          <img
            key={s.id}
            src={s.image}
            alt="screenshot"
            onClick={() => openModal(s.image)}
            className={styles.galleryImage}
          />
        ))}
      </div>

      {/* MODAL */}
      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>✖</button>
            <img src={modalImage} className={styles.modalImage} />
          </div>
        </div>
      )}

      <h2 className={styles.subtitle}>Dónde comprar</h2>
      <ul className={styles.storeList}>
        {game.stores?.map((s) => (
          <li key={s.id}>{s.store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameDetail;
