
function Keyboard({ onKeyPress, keyboardStatuses }) {
  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
  ];

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => (
            <button
              className={`key ${keyboardStatuses[key] || ""}`}
              key={key}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
