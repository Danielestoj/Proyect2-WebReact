import React, { useState } from "react";

function AnswerInput({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe el juego"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default AnswerInput;