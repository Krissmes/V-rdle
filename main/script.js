import { VARDI } from "./words.js";

const NUMBER_OF_GUESSES = 6;           // konstants mainīgais, lai noteiktu minējumu skaitu
let guessesRemaining = NUMBER_OF_GUESSES;       // mainīgais, kas sekos līdzi atlikušajiem minējumiem
let currentGuess = [];      // tiek saglabāti spēlētāja minētie burti
let nextLetter = 0;        // mainīgais, kas seko līdzi nākamā minētā burta indeksam
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]      // tiek izvēlēts random vārds no faila VARDI
console.log(rightGuessString)       // konsolē parāda to random vārdu   

function sakumaLauks() {        // tiek definēta funkcija sakumaLaukums
    let lauks = document.getElementById("speles-lauks");        // iegūst HTML elementu "speles-lauks" un izveido to par mainīgo ar nosaukumus lauks

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {       // iterē caur katru no NUMBER_OF_GUESSES, lai izveidotu rindas
        let row = document.createElement("div")     // izveido jaunu div elementu katrai rindai
        row.className = "letter-row"        // izveido CSS nosaukumu
        
        for (let j = 0; j < 5; j++) {       // iterē katru no 5 lodziņiem pēc kārtas, lai izveidotu burtu lodziņus
            let box = document.createElement("div")     // izveido jaunu div elementu katram burtu lodziņam
            box.className = "letter-box"        // izveido CSS nosaukumu
            row.appendChild(box)        // pievieno rindai burtu lodziņu
        }

        lauks.appendChild(row)      // pievieno rindu spēles laukumam
    }
}

sakumaLauks()       // izsauc funkciju sakumaLauks