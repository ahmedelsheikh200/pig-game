'use strict';
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
//dice
const dice = document.querySelector(".dice");
//roll dice
const rollDice = document.querySelector(".btn--roll");
//hold
const hold = document.querySelector(".btn--hold");
// new game
const newGame = document.querySelector(".btn--new");

// switch
function switchPlayers() {
    document.getElementById(`current--${activePlayer}`).textContent=0;
    activePlayer = activePlayer === 0 ? 1:0 ;
    currentscore=0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    
    
}


// total first player
const score_0 = document.querySelector("#score--0");
// total second player
const score_1 = document.querySelector("#score--1");

// define initial scores 
let currentscore=0;
let  scores = [0,0];
//active player
let activePlayer =0;

// hidden dice at start of the game 
dice.classList.add("hidden");

//rollind dice;
rollDice.addEventListener("click",function () {
    //generate random number between 1 and six 
    let randomNumber = Math.floor(Math.random()*6)+1;
    // change the image to  image presents random number
    dice.src = `dice-${randomNumber}.png`;
    //showing dice
    dice.classList.remove("hidden");

    // check if number is not one continue else switch player 
    if (randomNumber !== 1){
        //add randomNumber to current score
        currentscore += randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent=currentscore;


    }else {
        switchPlayers();

        

    }

    
})

//holding score 
hold.addEventListener("click",function () {
    scores[activePlayer] += currentscore;
    document.querySelector(`#score--${activePlayer}`).textContent=scores[activePlayer];
    if (scores[activePlayer]>= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        dice.classList.add("hidden");
        hold.disabled=true;
        rollDice.disabled=true;
    }else{
        switchPlayers();
    }
    
})


//reseting the game 
newGame.addEventListener("click",function () {
    hold.disabled=false;
    rollDice.disabled=false;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    currentscore=0;
    scores=[0,0];
    document.querySelector(`.player--0`).classList.add("player--active");
    document.getElementById(`current--${activePlayer}`).textContent=currentscore;
    document.querySelector(`#score--0`).textContent=0;
    document.querySelector(`#score--1`).textContent=0;
    
})