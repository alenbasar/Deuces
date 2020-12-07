'use strict';

// Selecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let winnerMsg = document.querySelector('.win-msg');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayerHandler = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const openModalHandler = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModalHandler = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const escKeyPress = event => {
  if (event.key === 'Escape') {
    closeModalHandler();
  }
};

// Rolling the dice functionality
btnRoll.addEventListener('click', () => {
  // 1. Generating a random number
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  // 3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    // Switch to next player
    switchPlayerHandler();
  }
});
btnHold.addEventListener('click', () => {
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. check if player's score is >= 100
  // finish the game
  if (scores[activePlayer] >= 100) {
    openModalHandler();
    winnerMsg.textContent = `Player ${activePlayer + 1} wins!`;
    overlay.addEventListener('click', closeModalHandler);
  }
  // Swithc to the next player
  switchPlayerHandler();
});

btnNew.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  const scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
});
