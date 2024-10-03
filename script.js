//declare the variables for the game start
let cards = []; //array to hold all the cards
let flippedCards = []; //array to hold currently flipped cards
let matchedPairs = 0; //counter for matched pairs

//card symbols
const cardsymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
//Duplicate each symbol to create pairs
cards = cardsymbols.concat(cardsymbols);
//function to suffle the cards array using the fisher yates algorithm
function shuffle(array){
    for(let i = array.length- 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;

}
// function to initialize the game
function initGame() {
    const gameBoard = document.getElementById("game-board"); //get the name board container
    gameBoard.innerHTML = ''; //clear the game board
    cards = shuffle(cards); //shuffle the cards
    matchedPairs = 0; //reset the matched pairs counter
    flippedCards = []; //reset the flipped cards array
    //loop through each card symbol in the shuffled array
    cards.forEach(symbol => {
        //create the new card element
        const card = document.createElement('div');
        card.classList.add('card'); // add 'card' class to the element
        card.dataset.symbol = symbol; // store the symbol in the data attribute

        //create the inner part of the card  that will handle the flip animation
        const cardInner = document.createElement('div');
        cardInner.classList.add("card-inner");

        //create the front face of the card

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        //set the symbol as the card's text content
        cardFront.textContent = symbol;

        //create the back face of the card

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back")

        //append the front and back faces to the card inner element
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);

        //append the card inner element to the card
        card.appendChild(cardInner)
        //add the click even listener to the card to handle the card flips
        card.addEventListener('click', handleCardClick)
        //append the card to the game board

        gameBoard.appendChild(card)




    });

}
//funtion to handle the card click events
function handleCardClick(event){
    const clickedCard = event.currentTarget; //it will get the clicked card element
    //prevent clicking the same card twice or flipping more than two cards simultaneously
    if (flippedCards.length === 2 || clickedCard.classList.contains('flip')){
        return; //exit the function if the conditions are met

    }

    //flip the card by adding the 'flip' class
    clickedCard.classList.add('flip');
    flippedCards.push(clickedCard); //add the clicked cards to the flipped cards array

    //check if two cards have been flipped
    if(flippedCards.length === 2){
        checkForMatch(); //call function to check for the match

    }
}

//function to check if the flipped cards are match
function checkForMatch() {
    const[card1, card2] = flippedCards;
    //check if the symbols on the two cards match

    if (card1.dataset.symbol === card2.dataset.symbol){
        matchedPairs++; //increment the matched pairs counter
        flippedCards = []; //clear the flipped cards array

        //check if all the pairs have been matched

        if (matchedPairs === cardsymbols.length){
            setTimeout(()=> alert('YOU WIN!'), 500); //display the win message after the short delay
        }
    } else {
        //if the cards do not match, flip them back after a short delay
        setTimeout(()=> {
            card1.classList.remove('flip'); //remove the 'flip' class to unflip the card
            card2.classList.remove('flip'); //remove the 'flip' class to unflip the card
            flippedCards = []; //clear the flipped cards array
        }, 1000)
    }
}

//event listener for the restart button to restart the game
document.getElementById('restart-btn').addEventListener('click', initGame)
//automatically start the game when the page loads
window.onload = initGame;