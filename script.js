const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

const sounds = {
  red: new Audio("sounds/red.mp3"),
  green: new Audio("sounds/green.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
};

// Elementi del DOM
const squares = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  yellow: document.getElementById("yellow")
};
const startButton = document.getElementById("start-button");
const levelTitle = document.getElementById("level-title");

// Inizio gioco
startButton.addEventListener("click", startGame);

// Avvia il gioco
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextRound();
}

// Passaggio al livello successivo
function nextRound() {
  acceptingInput = false;
  playerSequence = [];
  level++;
  levelTitle.textContent = `Livello ${level}`;
  
  // Aggiunge un colore casuale alla sequenza
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(nextColor);

  // Mostra la sequenza
  playSequence();
}

// Mostra la sequenza con animazioni
function playSequence() {
  let delay = 500;

  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, delay * (index + 1));
  });

  // Abilita input dopo la sequenza
  setTimeout(() => {
    acceptingInput = true;
  }, delay * (sequence.length + 1));
}

// Evidenzia il colore
function flashColor(color) {
  const square = squares[color];
  square.classList.add("active");

  sounds[color].currentTime = 0; // Riavvia il suono se era già in riproduzione
  sounds[color].play();

  setTimeout(() => {
    square.classList.remove("active");
  }, 300);
}

// Gestisce il click del giocatore
Object.keys(squares).forEach(color => {
  squares[color].addEventListener("click", () => {
    if (!acceptingInput) return;

    playerSequence.push(color);
    flashColor(color);

    const currentStep = playerSequence.length - 1;

    if (playerSequence[currentStep] !== sequence[currentStep]) {
      gameOver();
      return;
    }

    if (playerSequence.length === sequence.length) {
      acceptingInput = false;
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  });
});

// Game over
function gameOver() {
  errorSound = new Audio("sounds/wrong.mp3");
  errorSound.play();
  levelTitle.textContent = `Game Over! Hai raggiunto il livello ${level}`;
  acceptingInput = false;
  document.body.classList.add("game-over");

  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 1000);
}