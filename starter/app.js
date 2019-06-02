/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var globalScore, roundScore, activePlayer, gamePlaying;

//intialise all the above parameter values
init();

/****** ROLL BUTTON FUNCTION ******/
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. generate random number
    var diceValue = Math.floor(Math.random() * 6) + 1;

    //2. Display the disk block and result in DICE image
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + diceValue + ".png";

    //3.Update the score of local and global IF rolled value not 1
    if (diceValue !== 1) {
      roundScore += diceValue;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
});

/****** HOLD BUTTON FUNCTION ******/
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //ADD  current score to global score
    globalScore[activePlayer] += roundScore;
    //update in UI
    document.querySelector("#score-" + activePlayer).textContent =
      globalScore[activePlayer];
    //check if player won
    if (globalScore[activePlayer] >= 50) {
      document.getElementById("name-" + activePlayer).textContent =
        "WINNER !!!";
      document.querySelector(".dice").style.display = "none"; //if any player wins remove the dice
      //utilising winner css class
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  //update currentscore as 0, when hit 1
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-0").textContent = 0;

  //move the active panel to other player:: here toggle can change the class, remove from one place and add in another
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //hide the dice when player switch
  document.querySelector(".dice").style.display = "none";
}

/****** NEW BUTTON FUNCTION ******/
document.querySelector(".btn-new").addEventListener("click", init);

/****** COLLAPSE BUTTON FUNCTION 
var collps = document.getElementsByClassName()******/

function init() {
  globalScore = [0, 0];
  roundScore = 0;
  activePlayer = 0; // player1 = 0   player2 = 1
  gamePlaying = true;

  //hiding the dice block at the start of game
  document.querySelector(".dice").style.display = "none";

  //intialising all the global and current score of the players
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
