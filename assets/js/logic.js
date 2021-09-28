let timeLeft = 0;
let countDown;
let currentQuestionIndex = 0;
let yourName = "";


// Dom elements
let startBtn = document.querySelector('#start');
let questionsElement = document.querySelector('#questions');
let timer = document.querySelector('#timer');
let questionChoices = document.querySelector('#choices');
let endScreenElement = document.querySelector('#end-screen');
let submitBtn = document.querySelector('#submit');
let userInitials = document.querySelector('#initials');

// Start the quiz
function startQuiz() {
    let startScreen = document.querySelector("#start-screen");
    startScreen.classList.add("hide");

    questionsElement.classList.remove("hide");

    startTimer();
}

function getQuestions() {
    console.log(currentQuestionIndex)
    if (currentQuestionIndex > questions.length - 1) {
        stopTimer()
    } else {
        let currentQuestion = questions[currentQuestionIndex];

        let titleElement = document.querySelector("#question-title");
        titleElement.textContent = currentQuestion.title
        questionChoices.textContent = "";

        for (let i = 0; i < currentQuestion.choice.length; i++) {
            let choiceBtn = document.createElement("button");
            choiceBtn.classList.add("choice")
            choiceBtn.setAttribute("value", currentQuestion.choice[i]);

            choiceBtn.textContent = i + 1 + ".) " + currentQuestion.choice[i];
            questionChoices.appendChild(choiceBtn)

            choiceBtn.addEventListener("click", (event) => {
                if (currentQuestion.answer == event.target.value) {
                    choiceBtn.classList.add("right");
                    setTimeout(() => {
                        // go to next question
                        currentQuestionIndex++;
                        getQuestions();
                    }, 500);
                } else {
                    timeLeft -= 10;
                    choiceBtn.classList.add("wrong")
                    setTimeout(() => {
                        // go to next question
                        currentQuestionIndex++;
                        getQuestions();
                    }, 500);
                }
            });
        }

    }
}


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

function stopTimer() {
    clearInterval(countDown);
    gameOver();
}

function gameOver() {
    questionsElement.classList.add("hide");
    endScreenElement.classList.remove("hide");
    timer.textContent = "Game Over"
    document.getElementById("final-score").textContent = timeLeft;
}

function endGame() { console.log(userInitials)
    if (userInitials === "") {
        alert("Please enter a name");
        return;
    }
    let highScores = JSON.parse(localStorage.getItem("allScores"));

    if (highScores == null) {
        highScores = [];
    }

    highScores.push({
        name: userInitials,
        score: timeLeft
    });

    highScores.sort((x, y) => y.score - x.score);

    localStorage.setItem("allScores", JSON.stringify(highScores));

    window.open("highscores.html", "_self");

}


// Show quiz questions
startBtn.addEventListener("click", startQuiz);
getQuestions();

submitBtn.addEventListener("click", endGame);