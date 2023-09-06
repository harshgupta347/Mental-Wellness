const minNumber = 1;
const maxNumber = 100;

let targetNumber;
let attempts = 0;
let gameActive = false;

const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-button");
const startAgainButton = document.getElementById("start-again-button");
const message = document.getElementById("message");

function startGame() {
    targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    attempts = 0;
    gameActive = true;

    guessInput.value = "";
    message.textContent = "";
    guessInput.disabled = false;
    checkButton.disabled = false;
    startAgainButton.style.display = "none";
}

startGame();

checkButton.addEventListener("click", () => {
    if (!gameActive) return;

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
        message.textContent = "Please enter a valid number between 1 and 100.";
    } else {
        attempts++;

        if (userGuess === targetNumber) {
            message.textContent = `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`;
            guessInput.disabled = true;
            checkButton.disabled = true;
            startAgainButton.style.display = "block";
            gameActive = false;
        } else if (userGuess == targetNumber - 1 || userGuess == targetNumber - 2) {
            message.textContent = "You are close but try a higher number.";
        } else if(userGuess == targetNumber + 1 || userGuess == targetNumber + 2) {
            message.textContent = "You are close but try a lower number.";
        } else if (userGuess < targetNumber) {
            message.textContent = "Try a higher number.";
        } else {
            message.textContent = "Try a lower number.";
        }
    }
});

startAgainButton.addEventListener("click", () => {
    startGame();
});
