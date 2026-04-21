import React, { useEffect, useState, useMemo } from "react";

function OptionsInput({ games, correctGame, onSelect }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setSelected(null);
    setLocked(false);
  }, [correctGame?.id]);

  const options = useMemo(() => {
    if (!games.length || !correctGame) return [];

    const others = games
      .filter((g) => g.id !== correctGame.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return [...others, correctGame].sort(() => 0.5 - Math.random());
  }, [games, correctGame]);

  const handleClick = (name) => {
    if (locked) return;

    setSelected(name);
    setLocked(true);
    onSelect(name);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {options.map((g) => {
        let bg = "#f5f5f5";

        if (locked) {
          if (g.name === correctGame.name) bg = "#4CAF50";
          else if (selected === g.name) bg = "#E53935";
        }

        return (
          <button
            key={g.id}
            onClick={() => handleClick(g.name)}
            disabled={locked}
            style={{
              width: "48%",
              minHeight: "40px",          // Permite crecer si el texto es largo
              padding: "8px 10px",
              fontSize: "14px",
              cursor: locked ? "default" : "pointer",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: bg,
              color: locked ? "white" : "black",
              transition: "0.2s",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              whiteSpace: "normal",       // Permite saltos de línea
              wordBreak: "break-word",    // Evita romper el layout
            }}
          >
            {g.name}
          </button>
        );
      })}
    </div>
  );
}

export default OptionsInput;
