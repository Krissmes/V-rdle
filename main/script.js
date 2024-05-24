import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;           // konstants mainīgais, lai noteiktu minējumu skaitu
let guessesRemaining = NUMBER_OF_GUESSES;       // mainīgais, kas sekos līdzi atlikušajiem minējumiem
let currentGuess = [];      // tiek saglabāti spēlētāja minētie burti
let nextLetter = 0;        // mainīgais, kas seko līdzi nākamā minētā burta indeksam
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]      // tiek izvēlēts random vārds no faila VARDI

console.log(rightGuessString)       // konsolē parāda to random vārdu   

function initBoard() {        // tiek definēta funkcija initBoard
    let board = document.getElementById("game-board");        // iegūst HTML elementu "game-board" un izveido to par mainīgo ar nosaukumus board

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {       // iterē caur katru no NUMBER_OF_GUESSES, lai izveidotu rindas
        let row = document.createElement("div")     // izveido jaunu div elementu katrai rindai
        row.className = "letter-row"        // izveido CSS nosaukumu
        
        for (let j = 0; j < 5; j++) {       // iterē katru no 5 lodziņiem pēc kārtas, lai izveidotu burtu lodziņus
            let box = document.createElement("div")     // izveido jaunu div elementu katram burtu lodziņam
            box.className = "letter-box"        // izveido CSS nosaukumu
            row.appendChild(box)        // pievieno rindai burtu lodziņu
        }

        board.appendChild(row)      // pievieno rindu spēles laukumam
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
      if (elem.textContent === letter) {
        let oldColor = elem.style.backgroundColor;
        if (oldColor === "green") {
          return;
        }
  
        if (oldColor === "yellow" && color !== "green") {
          return;
        }
  
        elem.style.backgroundColor = color;
        break;
      }
    }
  }

initBoard();