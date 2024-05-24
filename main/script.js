// importē visus vārdus no faila words.js
import { WORDS } from "./words.js";

// minējumu skaits
const NUMBER_OF_GUESSES = 6;
// mainīgais, kas seko līdzi atlikušajiem minējumiem
let guessesRemaining = NUMBER_OF_GUESSES;
// saglabā minējumu
let currentGuess = [];
// seko līdzi nākamajam rakstītajam burtam
let nextLetter = 0;
// mainīgais, lai saglabātu minēto vārdu
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

// konsolē parādas minētais vārds
console.log(rightGuessString);

// funkcija, kas izveido spēles laukumu HTML formātā
function initBoard() {
  let board = document.getElementById("game-board");

  // izveido rindas
  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    // izveido kastītes
    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

// funkcija minētā burta kastītes krāsas mainīšanai
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

// funkcija, lai dzēstu burtu no pašreizējā minējuma
function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

// funkcija, lai pārbaudītu, vai pašreizējais minējums atbilst pareizajam vārdam
function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  // pārbauda minējuma garumu un esamību
  if (guessString.length != 5) {
    toastr.error("Pārāk īss vārds!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Vārds nav sarakstā!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  // pārbaude vai ir pareizs burts
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  }

  // pārbaude vai tas ir pareizais burts, bet nepareizajā kastītē
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == "green") continue;

    for (let j = 0; j < 5; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    }
  }

  // atjaunina spēles laukumu ar krāsainiem lodziņiem, kas attiecīgi attēlo pareizos vai nepareizos minētos burtus
  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      animateCSS(box, "flipInX");
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  // ja minējums ir pareizs, tiek parādīts "Jūs uzminējāt"
  if (guessString === rightGuessString) {
    toastr.success("Jūs uzminējāt!");
    guessesRemaining = 0;
    return;
  } else {
    // samazina attlikušos minējumus 
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    // parāda "Jums beidzās mēģinājumi!", ja beidzās minējumi, kā arī parāda pareizo vārdu
    if (guessesRemaining === 0) {
      toastr.error("Jums beidzās mēģinājumi!");
      toastr.info(`Pareizais vārds bija: "${rightGuessString}"`);
    }
  }
}

// funkcija, kas ievieto burtu kastītē
function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

// funkcija, kas animē CSS klases
const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

// klausās tastatūras ievadi
document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);

   // pārbauda vai uzspiestā poga ir viena no šīm, ja ir, tad burts neparādas
   if (pressedKey === "q" || pressedKey === "w" || pressedKey === "y" || pressedKey === "x") {
    return;
  }

  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  // pārbauda vai ir derīga ievade no tastatūras
  let found = pressedKey.match(/[a-zāčēģīķļņšūž]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

// klausās virtuālas tastatūras ievadi
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

initBoard();
