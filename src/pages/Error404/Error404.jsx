import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Error404.module.css";

function Error404() {
  const navigate = useNavigate();

  const [contador, setContador] = useState(5);

  // Contador regresivo
  useEffect(() => {
    const interval = setInterval(() => {
      setContador((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Redirección automática
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.notfoundContainer}>
      <h1 className={styles.notfoundCode}>404</h1>
      <h2 className={styles.notfoundTitle}>Página no encontrada</h2>

      <p className={styles.notfoundText}>
        Parece que te has perdido. Esta ruta no existe.
      </p>

      <Link to="/" className={styles.notfoundButton}>
        Volver al inicio
      </Link>

      <p className={styles.notfoundAutoredirect}>
        Serás redirigido automáticamente en {contador} segundos…
      </p>
    </div>
  );
}

export default Error404;
