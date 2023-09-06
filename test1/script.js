let startTime, endTime;
let gameActive = false;

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayTarget() {
    const target = document.getElementById("target");
    target.style.display = "block";
    target.style.backgroundColor = "red";

    const delay = getRandomDelay(1000, 5000); // Random delay between 1s and 5s
    setTimeout(() => {
        target.style.backgroundColor = "green";
        startTime = Date.now();
        document.getElementById("instructions").textContent = "Click now!";
        gameActive = true;
    }, delay);
}

document.getElementById("start-button").addEventListener("click", () => {
    if (!gameActive) {
        document.getElementById("instructions").textContent = "Click the target!";
        document.getElementById("start-button").style.display = "none"; // Hide the start button
        document.getElementById("reaction-time").style.display = "none"; // Hide the reaction time
        displayTarget();
    }
});

document.getElementById("target").addEventListener("click", () => {
    if (gameActive && startTime) {
        endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000; // Convert to seconds
        document.getElementById("reaction-time").textContent = `Your reaction time: ${reactionTime.toFixed(2)} seconds`;
        document.getElementById("instructions").textContent = "Click the 'Restart' button to play again";
        startTime = null;
        document.getElementById("target").style.display = "none";
        gameActive = false;
        document.getElementById("restart-button").style.display = "block"; // Show the restart button
        document.getElementById("reaction-time").style.display = "block"; // Show the reaction time
    }
});

document.getElementById("restart-button").addEventListener("click", () => {
    if (!gameActive) {
        document.getElementById("instructions").textContent = "Click the 'Start' button to begin";
        document.getElementById("reaction-time").textContent = "";
        document.getElementById("restart-button").style.display = "none"; // Hide the restart button
        document.getElementById("start-button").style.display = "block"; // Show the start button
    }
});
