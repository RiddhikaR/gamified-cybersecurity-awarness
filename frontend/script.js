function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let shuffledWordList = shuffleArray([...wordList]);
let currentWordIndex = 0;


const keyboard = document.querySelector(".keyboard");
const h4 = document.querySelector("h4");
const wordDisplay = document.querySelector(".word-display");
const chance = document.querySelector(".chance");
const img = document.querySelector(".img");

const gameover = document.querySelector(".GameOver");
const gameoverimg = document.querySelector(".gameoverImg");
const answer = document.querySelector(".answer");
const h3 = document.querySelector("h3");
const h6 = document.querySelector("h6");
let questionCount = 0;
let score = 0;
let maxQuestions = 5;


let count = 0;

const randomIndex = Math.floor(Math.random() * wordList.length);
let word,hint = wordList[randomIndex];

for (var i = 97; i < 122; i++) {

  let button = document.createElement("button");
  button.classList.add("btn");
  button.innerHTML = String.fromCharCode(i);
  keyboard.appendChild(button);
}

const gameOver = (lost) => {
  gameover.classList.add("show");
  document.querySelector(".game").style.opacity = 0.8;
  answer.innerText = word;

  if (!lost) {
    gameoverimg.src = "victory.gif";
    h3.innerText = "Congrats!";
    h6.innerText = "You Guessed The Correct Answer!";
    score++; // increase score only if user wins
  }

  questionCount++;

  if (questionCount >= maxQuestions) {
    setTimeout(() => showFinalScore(), 1500);
  } else {
    setTimeout(() => resetGame(), 1500);
  }
};


const gameOverwin = () => {
  const letterElem = document.querySelectorAll(".letter");
  var matchLetter = "";

  letterElem.forEach((v) => {
    matchLetter += v.innerText.toLowerCase();
  });
  if (matchLetter === word) {
    gameOver(false);
  }
};
const showFinalScore = () => {
  gameover.classList.add("show");
  document.querySelector(".game").style.display = "none";
  gameoverimg.src = "/images/victory.gif";
  h3.innerText = "Game Over!";
  h6.innerHTML = `You answered ${score} out of ${maxQuestions} correctly.`;
  
};
const resetGame = () => {
  // Reset everything
  wordDisplay.innerHTML = "";
  keyboard.innerHTML = "";
  count = 0;
  chance.innerText = "0/6";
  img.src = "hangman-0.svg";
  gameover.classList.remove("show");
  document.querySelector(".game").style.opacity = 1;

  // Pick a new random word
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const { word: newWord, hint: newHint } = wordList[randomIndex];
  word = newWord;
  hint = newHint;

  loadQuestion();
};


const matchWord = (val) => {
  const matches = [];
  console.log(word);
  word.split("").forEach((el, index) => {
    if (el === val.toLowerCase()) {
      matches.push(index);
    }
  });

  if (matches.length === 0) {
    count++;
    chance.innerText = `${count}/6`;
  } else {
    matches.forEach((v) => {
      const letterElem = document.querySelectorAll(".letter");
      letterElem[v].innerText = val;
      letterElem[v].classList.add("guess");
    });
  }
};

const loadQuestion = () => {
  keyboard.innerHTML = "";        
  wordDisplay.innerHTML = "";     
  count = 0;                      
  chance.innerText = "0/6";       
  img.src = "images/hangman-0.svg"; 

  if (currentWordIndex >= shuffledWordList.length) {
    shuffledWordList = shuffleArray([...wordList]);
    currentWordIndex = 0;
  }
  ({ word, hint } = shuffledWordList[currentWordIndex]);
  currentWordIndex++;

  h4.innerText = `Hint: ${hint}`;

  for (let i = 0; i < word.length; i++) {
    let liTag = document.createElement("li");
    liTag.classList.add("letter");
    wordDisplay.appendChild(liTag);
  }

  for (let i = 97; i < 123; i++) {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = String.fromCharCode(i);
    keyboard.appendChild(button);
  }

  const buttonTag = document.querySelectorAll(".btn");

  buttonTag.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const letter = e.target.innerText;
  
      // Disable the button and change style
      btn.disabled = true;
      btn.style.backgroundColor = "#ccc";
      btn.style.color = "#666";
      btn.style.cursor = "not-allowed";
  
      matchWord(letter);
  
      if (count === 1) img.src = "hangman-1.svg";
      else if (count === 2) img.src = "hangman-2.svg";
      else if (count === 3) img.src = "hangman-4.svg";
      else if (count === 4) img.src = "hangman-5.svg";
      else if (count >= 6) {
        img.src = "hangman-6.svg";
        setTimeout(() => gameOver(true), 200);
      }
  
      gameOverwin();
    });
  });
  
};


loadQuestion();

    let button = document.createElement("button");
    button.classList.add("btn")
        button.innerHTML = String.fromCharCode(i);
        keyboard.appendChild(button);

      function finishQuiz() {
          const email = localStorage.getItem("userEmail");
          if (!email) {
              alert("User not logged in. Score not saved.");
              return;
          }
          fetch('https://web-project-8.onrender.com/game1/score/save-score', {  // Use relative URL for production
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, game: "hangman", score }),
          })
          .then(response => response.json())
          .then(data => alert("Your score has been saved!"))
          .catch(error => console.error('Error saving score:', error));
      }








