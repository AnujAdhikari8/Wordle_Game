
import Tile from "./Tile";

function Row({ letters, statuses }) {
  return (
    <div className="game-row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={letters[index] || ""}
          status={statuses[index] || ""}
        />
      ))}
    </div>
  );
}

export default Row;
