
function ResultModal({ gameStatus, solutionWord, onRestart }) {
  return (
    <div className="result-overlay">
      <div className="result-box">
        {gameStatus === "WON" ? (
          <>
            <h2>Congratulations!</h2>
            <p>You guessed the correct word!</p>
            <div className="result-word"> {solutionWord} </div>
          </>
        ) : (
          <>
            <h2>Game Over!</h2>
            <p>Better luck next time!</p>
            <p>The correct word was:</p>
            <div className="result-word">{solutionWord}</div>
          </>
        )}

        <button className="restart-button" onClick={onRestart}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
