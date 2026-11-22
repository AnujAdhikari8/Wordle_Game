
import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Instructions from "./components/Instructions.jsx";
import ResultModal from "./components/ResultModal.jsx";
import checkGuess from "./components/checkGuess.js";
import "./App.css";

const WORD_LIST = [
  "APPLE",
  "GRAPE",
  "PLANT",
  "CRANE",
  "BRAIN",
  "STONE",
  "HOUSE",
  "TRAIN",
  "MOUSE",
  "TIGER"
];

function getRandomWord(previousWord) {
  const availableWords = WORD_LIST.filter(
    (word) => word !== previousWord
  );

  const randomIndex = Math.floor(
    Math.random() * availableWords.length
  );

  return availableWords[randomIndex];
}

function App() {
  const [solutionWord, setSolutionWord] = useState(
    () => getRandomWord()
  );

  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [showInstructions, setShowInstructions] = useState(false);

  function restartGame() {
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setSolutionWord((previous) => getRandomWord(previous));
  }

  function handleKeyPress(key) {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "BACKSPACE") {
      setCurrentGuess((previous) => previous.slice(0, -1));
      return;
    }

    if (key === "ENTER") {
      if (currentGuess.length !== 5) {
        alert("Please enter a 5-letter word!");
        return;
      }

      const newGuesses = [...pastGuesses, currentGuess];

      setPastGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      } else if (newGuesses.length === 6) {
        setGameStatus("LOST");
      }

      return;
    }

    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((previous) => previous + key);
    }
  }

  useEffect(() => {
    function handlePhysicalKeyPress(event) {
      const key = event.key;

      if (key === "Enter") {
        handleKeyPress("ENTER");
      } else if (key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleKeyPress(key.toUpperCase());
      }
    }

    window.addEventListener("keydown", handlePhysicalKeyPress);

    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyPress);
    };
  });

  const guessStatuses = pastGuesses.map((guess) =>
    checkGuess(guess, solutionWord)
  );

  const keyboardStatuses = {};

  pastGuesses.forEach((guess, index) => {
    const statuses = guessStatuses[index];

    guess.split("").forEach((letter, letterIndex) => {
      const newStatus = statuses[letterIndex];
      const oldStatus = keyboardStatuses[letter];

      if (
        newStatus === "correct" ||
        (newStatus === "present" && oldStatus !== "correct") ||
        (!oldStatus && newStatus === "absent")
      ) {
        keyboardStatuses[letter] = newStatus;
      }
    });
  });

  return (
    <div className="app">
      <h1>WORDLE</h1>

      <p className="game-instructions">
        Guess the hidden 5-letter word in 6 attempts.
      </p>

      <button
        className="how-to-play-button"
        onClick={() => setShowInstructions(true)}
      >
        HOW TO PLAY
      </button>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
        guessStatuses={guessStatuses}
      />

      <Keyboard
        onKeyPress={handleKeyPress}
        keyboardStatuses={keyboardStatuses}
      />

      {showInstructions && (
        <Instructions
          onClose={() => setShowInstructions(false)}
        />
      )}

      {gameStatus !== "IN_PROGRESS" && (
        <ResultModal
          gameStatus={gameStatus}
          solutionWord={solutionWord}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default App;
