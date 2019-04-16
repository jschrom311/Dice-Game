/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Additions:
-Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
-Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

//gameplaying is state variable so game cannot be played once there's a winner

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

//document.querySelector('#current-' + activePlayer).textContent = dice;
//Another way to manipulate dom below
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//Another way to check in console for getter (getting value)
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
    //Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        //Functionality below if second dice removed to update score to 0 if 6 rolled twice
        /*if (dice === 6 && lastDice === 6) {
            //player loses score
            scores[activePlayer] = 0;
            //update DOM with score
            document.querySelector('#score' + activePlayer).textContent = '0';
            nextPlayer();
        }*/
        //Update round score if rolled number not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent
        }
        else {
            //next player
            nextPlayer();
        }
        //storing variable
        lastDice = dice;

    }
});

//event listener for button hold

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
            //add current score to global score
        scores[activePlayer] += roundScore;
        
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        //Undefined, 0, null, or "" are COERCED to false; anything else COERCED to true
        if(input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        //check if player won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init());

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
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
}