'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const WINNING_SCORE = 100;

// Initialize game state variables
let currentScore, scores, activePlayer, isGameActive;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameActive = true;

  // Reset scores and current scores in the UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset player classes and hidden dice
  dice.classList.add('hidden');
  player0.classList.remove('player--winner', 'player--active');
  player1.classList.remove('player--winner', 'player--active');
  player0.classList.add('player--active');
};

init();

// Switch active player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
rollDiceBtn.addEventListener('click', function () {
  if (isGameActive) {
    // Generate a random dice roll between 1 and 6
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    // Display dice and update its image
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;

    // Check if rolled number is 1
    if (randomNumber !== 1) {
      // Add dice value to current score
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold score functionality
holdBtn.addEventListener('click', function () {
  if (isGameActive) {
    // Add current score to the active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= WINNING_SCORE) {
      isGameActive = false;
      dice.classList.add('hidden');

      // Mark the active player as the winner
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Reset game functionality now
newGameBtn.addEventListener('click', init);
