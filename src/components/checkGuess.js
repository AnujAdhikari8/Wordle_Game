
function checkGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const remainingLetters = {};

  // First, identify letters in the correct position
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
    } else {
      remainingLetters[solution[i]] =
        (remainingLetters[solution[i]] || 0) + 1;
    }
  }

  // Next, identify letters in the wrong position
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;

    if (remainingLetters[guess[i]] > 0) {
      result[i] = "present";
      remainingLetters[guess[i]]--;
    }
  }

  return result;
}

export default checkGuess;
