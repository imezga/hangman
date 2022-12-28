const wordEl = document.querySelector(".word");
const wrongEl = document.querySelector(".wrong");
const wrongLetters = document.querySelector("#wrong-letters");

const words = ["program", "application", "javascript", "frontend", "backend"];
const hangmanParts = [
  "head",
  "body",
  "left-hand",
  "right-hand",
  "left-leg",
  "right-leg",
];

const entered = [];
const enteredWrong = [];
let counter = 0;
let correct = 0;
let word;

const initHandler = () => {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  let template = "";
  word.split("").forEach((char) => {
    const letter = `<div class='letter' data-char='${char}' data-letter></div>`;
    template += letter;
  });
  wordEl.innerHTML = template;
};

const wrongLetterhandler = (key) => {
  document
    .querySelector(`.${hangmanParts[counter]}`)
    .classList.remove("hidden");
  counter++;

  if (counter > 0) {
    wrongEl.classList.remove("hidden");
    enteredWrong.push(key);
    wrongLetters.textContent = enteredWrong.toString();
  }

  if (counter === hangmanParts.length) {
    setTimeout(() => {
      gameOverHandler("GAME OVER");
    }, 50);
  }
};

const gameOverHandler = (message) => {
  alert(message);
  location.reload();
};

const gameHandler = (event) => {
  const key = event.key.toUpperCase();
  if (entered.some((char) => char === key)) {
    console.log("That letter was entered");
    return;
  }

  if (!/^[a-zA-Z]+$/.test(key)) {
    return;
  }

  entered.push(key);
  if (word.includes(key)) {
    document.querySelectorAll(`[data-char='${key}']`).forEach((element) => {
      correct++;
      element.dataset.letter = key;
    });

    if (correct === word.length) {
      setTimeout(() => {
        gameOverHandler("YOU WON");
      }, 100);
    }
  } else {
    wrongLetterhandler(key);
  }
};

document.addEventListener("keyup", gameHandler);
document.addEventListener("DOMContentLoaded", initHandler);
