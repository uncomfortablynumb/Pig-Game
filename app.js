/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, gameSet, winningScore;

init();

// Set player 1/2's current dice point
// - this could only change text content, not HTML, so it can't output italic numbers
// Here if we want to change HMTL:
// - document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// function btn() {
//   // do sth here
// }
// btn();

// call-back function
// document.querySelector('.btn-roll').addEventListener('click',btn);

// click to roll dices
document.querySelector('.btn-roll').addEventListener('click',function() {
  if (gamePlaying && gameSet) {
    // 1. Random number
    // var dice = Math.floor(Math.random() * 6) + 1;

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    
    // querySelector only selects the first element;
    // need to use for loop to implement on several elements with the same class

    // var diceDOM = document.querySelector('.dice');
    // diceDOM.style.display = 'block';

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore; // textContent
    } else {
      // Next player
      nextPlayer();
    }
    // if (lastDice === dice && dice === 6) {
    //   scores[activePlayer] = 0;
    //   // display clearing to 0
    //   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //   nextPlayer();
    // } else {
    //   lastDice = dice;
    // }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying && gameSet) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
      gameSet = false;
    } else {
      // Next player
      nextPlayer();
    }
  }

});

document.querySelector('.btn-set').addEventListener('click',function() {
  var input = document.querySelector('.final-score').value;
  // Verify the input
  if (input > 0 && input <= 999) {
    winningScore = input;
    gameSet = true;
  }
});

function nextPlayer() {
  // Next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  
  // why only the orginal controled?
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  // Eliminate set winning score
  document.querySelector('.final-score').value = '';


}


// document.querySelector('#current-' + activePlayer).textContent = dice;

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

/**
 * 1. rolls two 6 points -> lose entire score
 * (save precious dice roll)
 *  
 * 2.add an input field in HTML to set winning score (JS: .value to read the value)
 * 
 * 3. add another dice, loose current score with 1 dice of point 1(, but can continue with the other one)
 */


