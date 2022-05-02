//Global variables//
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//Add placeholders for each letter//
const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Add Event listener for Guess button//
guessedLettersButton.addEventListener("click", function(e) {
    e.preventDefault();

    const guess = letterInput.value;
    letterInput.value ="";
    message.innerText ="";
    
    const goodGuess = playerInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
});

//Check player's input//
const playerInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter"}
        else if (!input.match(acceptedLetter)) {
            message.innerText = "Please select a letter A-Z, no special characters or numbers";}
            else {return input;};
};

//Capture player's input//
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already chose that letter. Try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updatedWordInProgress(guessedLetters);
    }
};

//Create letter word bank after selecting them//
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//Update word in progress//
const updatedWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const  revealWord = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    winOrLose();
};

//Check if player won//
const winOrLose = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};