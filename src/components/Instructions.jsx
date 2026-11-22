
function Instructions({ onClose }) {
  return (
    <div className="instructions-overlay">
      <div className="instructions-box">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>How to Play</h2>

        <p>
          Guess the hidden five-letter word in six attempts.
        </p>

        <h3>Tile Colors</h3>

        <div className="color-example">
          <span className="example-tile correct">A</span>
          <p>Correct letter in the correct position.</p>
        </div>

        <div className="color-example">
          <span className="example-tile present">B</span>
          <p>Correct letter in the wrong position.</p>
        </div>

        <div className="color-example">
          <span className="example-tile absent">C</span>
          <p>Letter is not in the hidden word.</p>
        </div>

        <button className="close-instructions" onClick={onClose}>
          GOT IT
        </button>
      </div>
    </div>
  );
}

export default Instructions;
