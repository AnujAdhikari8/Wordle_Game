
import Row from "./Row";

function GameBoard({ currentGuess, pastGuesses, guessStatuses }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    if (i < pastGuesses.length) {
      rows.push({
        letters: pastGuesses[i],
        statuses: guessStatuses[i]
      });
    } else if (i === pastGuesses.length) {
      rows.push({
        letters: currentGuess,
        statuses: []
      });
    } else {
      rows.push({
        letters: "",
        statuses: []
      });
    }
  }

  return (
    <div className="game-board">
      {rows.map((row, index) => (
        <Row
          key={index}
          letters={row.letters}
          statuses={row.statuses}
        />
      ))}
    </div>
  );
}

export default GameBoard;
