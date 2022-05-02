//Global variables//
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessedLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//Async function//
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Add placeholders for each letter//
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }

    wordInProgress.innerText = placeholderLetters.join("");
};

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
        updatedGuessingRemaining(guess);
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

//Guesses remmaining//
const updatedGuessingRemaining= function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not have a ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yay, the word has a ${guess}`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Oh no! Game over. The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess left`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses left`;
    }
};

//Check if player won//
const winOrLose = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};
