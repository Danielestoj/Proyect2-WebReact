import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Error404.css";

function Error404() {
  const navigate = useNavigate();

  const [contador, useContador] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      useContador((prev) => prev - 1);
    }, 1000);
    }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // ← WelcomePage
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Página no encontrada</h2>
      <p className="notfound-text">
        Parece que te has perdido. Esta ruta no existe.
      </p>

      <Link to="/" className="notfound-button">
        Volver al inicio
      </Link>

      <p className="notfound-autoredirect">
        Serás redirigido automáticamente en {contador} segundos…
      </p>
    </div>
  );
}

export default Error404;
