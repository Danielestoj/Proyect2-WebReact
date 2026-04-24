import React, { useState } from "react";

function AnswerSelect({ games, onSubmit }) {
  const [selected, setSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;
    onSubmit(selected);
    setSelected("");
  };

  return (
    <form className="answer-select-form" onSubmit={handleSubmit}>
      <select
        className="answer-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Selecciona un juego</option>

        {games.map((g) => (
          <option key={g.id} value={g.name}>
            {g.name}
          </option>
        ))}
      </select>

      <button className="answer-select-btn" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default AnswerSelect;
