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
      <input style={{ width: "500px" }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe el juego"
      />
      <button style={{ marginTop: "20px", width: "50%" }} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default AnswerInput;