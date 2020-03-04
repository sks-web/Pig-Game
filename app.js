/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayers;
activePlayers = 3;
document.querySelector(".dice").style.display = "none";

function newGame() {
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("active");
    scores = [0, 0];
    roundScores = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-roll").disabled = false;
    document.querySelector(".btn-hold").disabled = false;
}

newGame();

document.querySelector(".btn-new").addEventListener("click", function () {
    newGame();
    activePlayers = Math.floor(Math.random() * 2);
    var panel = document.querySelector(".player-" + activePlayers + "-panel");
    panel.classList.add("active");

});

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (activePlayers != 3) {
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector(".dice").style.display = "block";
        var diceDOM = document.querySelector(".dice");
        diceDOM.src = "dice-" + dice + ".png";
        if (dice != 1) {
            roundScores += dice;
        } else {
            roundScores = 0;
            holdFunction();
        }
        document.querySelector("#current-" + activePlayers).textContent = roundScores;
    } else {
        alert("Please click on New Game");
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    scores[activePlayers] += roundScores;
    var temp = scores[activePlayers];
    document.getElementById("score-" + activePlayers).textContent = temp;
    if (scores[activePlayers] >= 100) {
        document.querySelector("#name-" + activePlayers).textContent = "Winner !";
        document.querySelector(".player-"+activePlayers+"-panel").classList.add("winner");
        document.querySelector(".player-"+activePlayers+"-panel").classList.remove("active");
        document.querySelector(".btn-roll").disabled = true;
        document.querySelector(".btn-hold").disabled = true;
        document.querySelector(".dice").style.display = "none";
    } else {
        holdFunction();
    }
});

function holdFunction() {
    roundScores = 0;
    document.querySelector("#current-" + activePlayers).textContent = roundScores;
    if (activePlayers === 0) {
        activePlayers = 1;
    } else {
        activePlayers = 0;
    }
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}