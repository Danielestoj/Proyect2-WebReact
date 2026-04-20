import React from "react";

function ImageReveal({ image, attempts }) {
  // Calculamos cuánto blur aplicar (menos intentos = menos blur)
  const maxAttempts = 5;
  const blurLevel = (attempts / maxAttempts ) * 10;

  return (
    <div>
      <img
        src={image}
        alt="juego"
        style={{
          filter: `blur(${blurLevel}px)`,
          transition: "filter 0.5s ease"
        }}
      />
    </div>
  );
}

export default ImageReveal;