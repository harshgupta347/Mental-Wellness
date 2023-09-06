const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
const scoreDisplay = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

let score = 0;
let gameStarted = false;
let gameTime = 60; // 1 minute in seconds
let timerInterval;
let fallingObjectInterval;
let fallingObjects = [];

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        scoreDisplay.textContent = 'Score: ' + score;
        timerDisplay.textContent = 'Time: ' + gameTime + 's';
        startButton.disabled = true; // Disable the start button during the game
        restartButton.style.display = 'none'; // Hide the restart button
        
        timerInterval = setInterval(() => {
            gameTime--;
            timerDisplay.textContent = 'Time: ' + gameTime + 's';

            if (gameTime <= 0) {
                endGame();
            }
        }, 1000);
        
        // Start creating falling objects
        createFallingObject(); // Create the first falling object
        fallingObjectInterval = setInterval(createFallingObject, 1000); // Create more objects every 1 second
    }
}

function endGame() {
    gameStarted = false;
    clearInterval(timerInterval);
    clearInterval(fallingObjectInterval);
    
    // Determine the user's performance based on the score
    let performance;
    if (score >= 60) {
        performance = 'Excellent!';
    } else if (score >= 55) {
        performance = 'Very Good!';
    } else if (score >= 45) {
        performance = 'Good!';
    } else if (score >= 35) {
        performance = 'Better!';
    } else {
        performance = 'Try Again!';
    }
    
    scoreDisplay.textContent = 'Score: ' + score;
    timerDisplay.textContent = 'Game Over! ' + performance;
    startButton.style.display = 'none'; // Hide the start button
    restartButton.style.display = 'block'; // Show the restart button
}

function restartGame() {
    score = 0;
    gameTime = 60;
    scoreDisplay.textContent = 'Score: ' + score;
    timerDisplay.textContent = 'Time: ' + gameTime + 's';
    startButton.disabled = false; // Enable the start button for a new game
    startButton.style.display = 'block'; // Show the start button
    restartButton.style.display = 'none'; // Hide the restart button
}

function createFallingObject() {
    if (gameStarted) {
        const fallingObject = document.createElement('div');
        fallingObject.classList.add('falling-object');

        // Generate a random horizontal position
        const randomX = Math.random() * (gameContainer.clientWidth - 40);
        fallingObject.style.left = randomX + 'px';

        gameContainer.appendChild(fallingObject);
        fallingObjects.push(fallingObject);

        // Animate the falling object with a longer duration
        const animation = fallingObject.animate([
            { top: '0', opacity: 1 },
            { top: gameContainer.clientHeight + 'px', opacity: 0 }
        ], {
            duration: 4000, // Increase the duration for slower animation
            easing: 'linear'
        });

        animation.onfinish = () => {
            fallingObject.remove();
            fallingObjects.shift(); // Remove the first object from the array
        };

        fallingObject.addEventListener('click', () => {
            fallingObject.remove();
            score++;
            updateScore();
        });
    }
}

function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

// Add click event listeners to the buttons
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
