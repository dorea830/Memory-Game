let card = document.getElementsByClassName('card');

let cards = [...card];

const deck = document.querySelector('#cardDeck');

let guesses = 0;
let counter = document.querySelector('#guesses');

let gameStarted = false; 

// flipping deck back at restart
function flipDeck(){
	let cards = document.getElementsByClassName("card");
	for(let i = 0; i < cards.length; i++){
		cards[i].classList.toggle('flip'); 
	}
}

// flipping cards
function flipCard(e) {
  e.classList.toggle('flip');
 }

cards.forEach(cards => cards.addEventListener('click', function (e) {
	if(e.target.tagName == 'IMG') clickCard(e.target.parentNode);
	else clickCard(e.target); 
}));

// function that flips a card, and checks for a match if 2 cards
// are clicked
var numClicked = 0;
var clickedCards = [];
var matchedCards = []; 

function clickCard(e) {
	if(!gameStarted || matchedCards.includes(e.id)){
		return;
	} 

	numClicked++;
	if(numClicked == 1){
		flipCard(e);
		clickedCards.push(e); 
		return; 
	}
	else if(numClicked == 2){
		guessesCounter();
		flipCard(e);
		clickedCards.push(e);
		if(clickedCards[0].id == clickedCards[1].id) {
			matchedCards.push(e.id);
			clickedCards = [];
			numClicked = 0;
			if(matchedCards.length == 5){
				endGame();
			}
		} else {
			setTimeout(function(){
				flipCard(clickedCards[0]);
				flipCard(clickedCards[1]);
		clickedCards = [];
		numClicked = 0;
			} , 1500); 
		}
	}
}

// shuffle cards 
  function shuffle(cards) {
  var currentIndex = cards.length, tempValue, randomIndex;

  // While there remain elements to shuffle…
  while (0 ==! currentIndex) {

    // Pick a remaining element…
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = tempValue;
  }

  return cards;
}


// game timer
var second = 0, minute = 0;
var timer = document.querySelector("#timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = "<p>Time: " + minute+"mins "+second+"secs</p>";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


function guessesCounter(){
    guesses++;
    counter.innerHTML = "<p>Guesses:  " + guesses + "</p>";
    }

function startGame(){
    gameStarted = true; 
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
      });
    }
    startTimer();

   guesses = 0;
   counter.innerHTML = '<p>Guesses: ' + guesses + "</p>";
}

function endGame(){
	clearInterval();
	document.getElementById("game").classList.toggle("hide");
	document.getElementById("win").classList.remove("hide");
	document.getElementById("winTime").innerHTML = "<p>Time:  " + minute+"mins  " + second+"secs</p>";
	document.getElementById("winGuesses").innerHTML = "<p>Guesses:  " + guesses + "</p>";
	flipDeck(); 
	startGame(); 
}

function restartGame() {
	//reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector("#timer");
    clearInterval(interval);

    guesses = 0;

    matchedCards = [];

	document.getElementById("winTime").innerHTML = "";
	document.getElementById("winGuesses").innerHTML = "";

    document.getElementById("game").classList.toggle("hide");
    document.getElementById("win").classList.add("hide");

}
















