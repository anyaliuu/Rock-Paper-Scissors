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
const title = document.getElementById("title");
const userScore_div = document.getElementById("user-score");
const compScore_div = document.getElementById("comp-score");
const userLabel_div = document.getElementById("user-label");
const compLabel_div = document.getElementById("comp-label");
const rock_img = document.getElementById("rock");
const paper_img = document.getElementById("paper");
const scissors_img = document.getElementById("scissors");
const outcomeMessage_h2 = document.querySelector(".outcome-message");

freePlay_btn.addEventListener("click", startNewGame);
fiveRounds_btn.addEventListener("click", () => startNewGame(5));
tenRounds_btn.addEventListener("click", () => startNewGame(10));
fifteenRounds_btn.addEventListener("click", () => startNewGame(15));
reset_btn.addEventListener("click", reset);
gameEndReset.addEventListener("click", reset);

function playStyles() {
    userScore_div.style.color = "black";
    compScore_div.style.color = "black";
    userScore_div.style.borderColor = "black";
    compScore_div.style.borderColor = "black";
    rock_img.style.opacity = 1;
    paper_img.style.opacity = 1;
    scissors_img.style.opacity = 1;
    outcomeMessage_h2.style.color = "black";
    title.style.color = "black";
    reset_btn.style.color = "black";
    reset_btn.style.borderColor = "black";
    userLabel_div.style.color = "black";
    compLabel_div.style.color = "black";
}

function pauseStyles() {
    userScore_div.style.color = "grey";
    compScore_div.style.color = "grey";
    userScore_div.style.borderColor = "grey";
    compScore_div.style.borderColor = "grey";
    rock_img.style.opacity = .3;
    paper_img.style.opacity = .3;
    scissors_img.style.opacity = .3;
    outcomeMessage_h2.style.color = "grey";
    title.style.color = "grey";
    reset_btn.style.color = "grey";
    reset_btn.style.borderColor = "grey";
    userLabel_div.style.color = "grey";
    compLabel_div.style.color = "grey";

}

function startNewGame(numRounds) {
    reset();
    start();
    rounds = numRounds || 0;
    showRounds_div.style.display = "none";
}

function reset() {
    pauseStyles();
    user_score = 0;
    comp_score = 0;
    clickCount = 0;
    rounds = 0;
    userScore_div.childNodes[0].nodeValue = user_score;
    compScore_div.childNodes[0].nodeValue = comp_score;
    showRounds_div.style.display = "block";
    endOfRound.style.display = "none";
    whoWon_h3.innerHTML = "";
    finalScores_p.innerHTML = "";
}




function start() {
    playStyles();

    const rockClick = () => game("r", compChoice());
    const paperClick = () => game("p", compChoice());
    const scissorsClick = () => game("s", compChoice());
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
            rock_img.removeEventListener("click", rockClick);
            paper_img.removeEventListener("click", paperClick);
            scissors_img.removeEventListener("click", scissorsClick);
            pauseStyles();
        }
        reset_btn.onclick = function() {
            rock_img.removeEventListener("click", rockClick);
            paper_img.removeEventListener("click", paperClick);
            scissors_img.removeEventListener("click", scissorsClick);
        }
    }
    
    rock_img.addEventListener("click", rockClick);
    paper_img.addEventListener("click", paperClick);
    scissors_img.addEventListener("click", scissorsClick);
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