import React, { useState } from "react";

function ImageReveal({ image, attempts, onLoad, forceClear }) {
  const [loaded, setLoaded] = useState(false);

  const maxAttempts = 5;

  // Si forceClear es true, blur = 0
  const blurLevel = forceClear
    ? 0
    : (attempts / maxAttempts) * 10;

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        width: "100%"
      }}>
      <img
        src={image}
        alt="juego"
        onLoad={handleLoad}
        style={{
          maxWidth: "900px",
          maxHeight: "500px",
          width: "100%",
          filter: `blur(${blurLevel}px)`,
          transition: "filter 0.5s ease",
          opacity: loaded ? 1 : 0,   // Oculta la imagen hasta que cargue
        }}
      />
    </div>
  );
}

export default ImageReveal;

