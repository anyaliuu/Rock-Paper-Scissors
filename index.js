//initialize
const showRounds_div = document.querySelector(".rounds");
const freePlay_btn = document.getElementById("freeplay");
const fiveRounds_btn = document.getElementById("5rounds");
const tenRounds_btn = document.getElementById("10rounds");
const fifteenRounds_btn = document.getElementById("15rounds");
const reset_btn = document.getElementById("reset");
const endOfRound = document.querySelector(".gameEnds-message");
const finalScores_p = document.getElementById("final-scores");
const whoWon_h3 = document.getElementById("who-won");
const gameEndReset = document.getElementById("game-end-reset");
let clickCount = 0;
let rounds = 0;
let user_score = 0;
let comp_score = 0;
const userScore_div = document.getElementById("user-score");
const compScore_div = document.getElementById("comp-score");
const rock_img = document.getElementById("rock");
const paper_img = document.getElementById("paper");
const scissors_img = document.getElementById("scissors");
const outcomeMessage_h2 = document.querySelector(".outcome-message");

freePlay_btn.addEventListener("click", freePlay);
fiveRounds_btn.addEventListener("click", () => startNewGame(5));
tenRounds_btn.addEventListener("click", () => startNewGame(10));
fifteenRounds_btn.addEventListener("click", () => startNewGame(15));
reset_btn.addEventListener("click", reset);
gameEndReset.addEventListener("click", reset);

function freePlay() {
    //when pressed, div goes away and you can play the game
    //div comes back when you click the "reset" button
    startNewGame();
}

function startNewGame(numRounds) {
    reset();
    rounds = numRounds || 0;
    showRounds_div.style.display = "none";
}

function reset() {
    user_score = 0;
    comp_score = 0;
    clickCount = 0;
    rounds = 0;
    userScore_div.childNodes[0].nodeValue = user_score;
    compScore_div.childNodes[0].nodeValue = comp_score;
    showRounds_div.style.display = "block";
    endOfRound.style.display = "none";
    // outcomeMessage_h2.innerHTML = "";
    whoWon_h3.innerHTML = "";
    finalScores_p.innerHTML = "";
}

function compChoice() {
    const choices = ["r", "p", "s"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function convertUserLetter(userChoice) {
    if (userChoice === "r") {
        return "Rock";
    }
    if (userChoice === "p") {
        return "Paper";
    }
    if (userChoice === "s") {
        return "Scissors";
    }
}

function convertCompLetter(compChoice) {
    if (compChoice === "r") {
        return "Rock";
    }
    if (compChoice === "p") {
        return "Paper";
    }
    if (compChoice === "s") {
        return "Scissors";
    }
}

function win(userChoice, compChoice) {
    user_score++;
    userScore_div.childNodes[0].nodeValue = user_score;
    outcomeMessage_h2.innerHTML = convertUserLetter(userChoice) + " beats " + convertCompLetter(compChoice) + ". You win!";
}

function draw(userChoice, compChoice) {
    outcomeMessage_h2.innerHTML = "You both chose " + convertUserLetter(userChoice) + ". It's a draw.";
}

function lose(userChoice, compChoice) {
    comp_score++;
    compScore_div.childNodes[0].nodeValue = comp_score;
    outcomeMessage_h2.innerHTML = convertCompLetter(compChoice) + " beats " + convertUserLetter(userChoice) + ". You lost :(";
}

function game(userChoice, compChoice) {
    //compare r, s, p
    //if user wins, display message and update score
    switch(userChoice + compChoice) {
        case "pr":
        case "rs":
        case "sp":
            win(userChoice, compChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, compChoice);
            break;
        case "rp":
        case "sr":
        case "ps":
            lose(userChoice, compChoice);
            break;
    }
    clickCount++;
    if (rounds && clickCount === rounds) {
        if (user_score > comp_score) {
            whoWon_h3.innerHTML = "You Win!";
        } else if (user_score < comp_score) {
            whoWon_h3.innerHTML = "You lose :(";
        } else {
            whoWon_h3.innerHTML = "It's a draw!";
        }
        finalScores_p.innerHTML = `You: ${user_score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comp: ${comp_score}`;
        endOfRound.style.display = "block";
    }
}

rock_img.addEventListener("click", () => game("r", compChoice()));
paper_img.addEventListener("click", () => game("p", compChoice()));
scissors_img.addEventListener("click", () => game("s", compChoice()));