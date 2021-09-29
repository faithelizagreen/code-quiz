// Global Variables
let timeLeft = 0;
let countDown;
let currentQuestionIndex = 0;
let highScores;

// Dom elements
let startBtn = document.querySelector("#start");
let questionsElement = document.querySelector("#questions");
let timer = document.querySelector("#timer");
let questionChoices = document.querySelector("#choices");
let endScreenElement = document.querySelector("#end-screen");
let submitBtn = document.querySelector("#submit");
let userInitials = document.querySelector("#initials");
let clearHighScores = document.querySelector(".clear");
let savedScoresEl = document.querySelector("#saved-scores");

// Start the quiz
function startQuiz() {
    let startScreen = document.querySelector("#start-screen");
    startScreen.classList.add("hide");

    questionsElement.classList.remove("hide");

    startTimer();
    getQuestions();
}

// Function to get quiz questions
function getQuestions() {
    console.log(currentQuestionIndex);
    if (currentQuestionIndex > questions.length - 1) {
        stopTimer();
    } else {
        let currentQuestion = questions[currentQuestionIndex];

        let titleElement = document.querySelector("#question-title");
        titleElement.textContent = currentQuestion.title;
        questionChoices.textContent = "";

        // For loop to create answer choice button
        for (let i = 0; i < currentQuestion.choice.length; i++) {
            let choiceBtn = document.createElement("button");
            choiceBtn.classList.add("choice");
            choiceBtn.setAttribute("value", currentQuestion.choice[i]);

            choiceBtn.textContent = currentQuestion.choice[i];
            questionChoices.appendChild(choiceBtn);

            // Event listener to check question answers and move to next questions
            choiceBtn.addEventListener("click", (event) => {
                if (currentQuestion.answer == event.target.value) {
                    choiceBtn.classList.add("right");
                    setTimeout(() => {
                        currentQuestionIndex++;
                        getQuestions();
                    }, 500);
                } else {
                    // Display red when wrong and subtract 10 seconds
                    timeLeft -= 10;
                    choiceBtn.classList.add("wrong");
                    setTimeout(() => {
                        currentQuestionIndex++;
                        getQuestions();
                    }, 500);
                }
            });
        }
    }
}

// Function starts timer
function startTimer() {
    if (timer.textContent !== 100) {
        timeLeft = 100;
    }

    countDown = setInterval(function () {
        timer.textContent = `Time: ${timeLeft}`;

        if (timeLeft == 0) {
            stopTimer();
        }
        timeLeft--;
    }, 1000);
}

// Function stops timer
function stopTimer() {
    clearInterval(countDown);
    gameOver();
}
// Function hides questions and displays endscreen where players input scores
function gameOver() {
    questionsElement.classList.add("hide");
    endScreenElement.classList.remove("hide");
    timer.textContent = "Game Over";
    document.getElementById("final-score").textContent = timeLeft;
}

// Function to store scores in local storage upon hitting submit button
function endGame() {
    if (userInitials === "") {
        alert("Please enter a name");
        return;
    }
    highScores = JSON.parse(localStorage.getItem("allScores"));

    if (highScores == null) {
        highScores = [];
    }

    highScores.push({
        initials: userInitials.value,
        score: timeLeft,
    });

    highScores.sort((x, y) => y.score - x.score);

    localStorage.setItem("allScores", JSON.stringify(highScores));
    scoreBoard();
}

// Function to open highscore page
function scoreBoard() {
    window.open("highscores.html", "_self");
}

// If statement to populate highscores on website
if (savedScoresEl !== null) {

    highScores = JSON.parse(localStorage.getItem("allScores"));

    for (let i = 0; i < highScores.length; i++) {
        let scoreList = document.createElement("li");

        scoreList.textContent = `${highScores[i].initials} ${highScores[i].score}`;
        savedScoresEl.appendChild(scoreList);
    }
}

// Function to clear highscores using button
function clearScoreBoard() {
    localStorage.clear();
    savedScoresEl.textContent = "";
}

// Start Quiz Button Event Listener
if (startBtn !== null) {
    startBtn.addEventListener("click", startQuiz);
}

// Submit Score Button Event Listener
if (submitBtn !== null) {
    submitBtn.addEventListener("click", endGame);
}
// Clear Highscores Button Event Listener
if (clearHighScores !== null) {
    clearHighScores.addEventListener("click", clearScoreBoard)
}

