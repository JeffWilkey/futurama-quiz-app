const QUIZ = [
    {
        body: "In 'Space Pilot 3000' who was the first main character Fry met?",
        image: "http://slurmed.com/fgrabs/01acv01/01acv01_019.jpg",
        answers: ["Zoidberg", "Leela", "Bender", "Farnsworth"],
        correctAnswer: 2
    },
    {
        body: "In 'The Series Has Landed' what was the name of the amusement park on the moon?",
        image: "http://images2.fanpop.com/images/photos/7300000/Futurama-1x02-The-Series-Has-Landed-futurama-7312946-500-333.jpg",
        answers: ["Lunar Park", "Mars University", "Wong Ranch", "Moon Spacefun"],
        correctAnswer: 0
    },
    {
        body: "In 'When Aliens Attack' what planet are the aliens from?",
        image: "http://slurmed.com/fgrabs/01acv12/01acv12_045.jpg",
        answers: ["Omicron Persia 11", "Omicron Persia 8", "Mars", "Amazonia"],
        correctAnswer: 1
    },
    {
        body: "In 'Hell Is Other Robots' where was robot hell?",
        image: "https://horrorpediadotcom.files.wordpress.com/2014/04/robot-hell.png",
        answers: ["Utah", "Alabama", "Texas", "New Jersey"],
        correctAnswer: 3
    },
    {
        body: "In 'Fear of Bot Planet' what fake religious robot holiday did Bender make up?",
        image: "http://images2.fanpop.com/image/photos/12400000/1x05-Fear-of-a-Bot-Planet-futurama-12425237-500-375.jpg",
        answers: ["Bot-Mitvah", "Robanza", "Robonukah", "Robotisam"],
        correctAnswer: 2
    }
]

let correctCount = 0;
let incorrectCount = 0;

function getStartedPage() {
    $(".quiz-container").append(`
        <div class="quiz-page-1">
            <header>
                <img class="quiz-logo" src="images/planet-express.png">
                <h1 class="quiz-title">The Planet Express Quiz</h1>
                <p class="quiz-explain">Welcome to the quiz.<br /> Try to get as many questions right as you can.
                </p>
           </header>
           <button class="quiz-start">Get Started</button>
        </div>
    `);
}

function resultsPage() {
    $(".quiz-container").append(`
        <div class="results-page">
            <header>
                <img class="results-header-img" src="images/planet-express.png" />
                <h1 class="results-header">Results</h1>
            </header>
            <div class="question-divider"></div>
            <img class="results-congrats-image" src="https://media.giphy.com/media/ANbD1CCdA3iI8/giphy.gif" />
            <h2 class="results-numbers">You got ${correctCount} out of ${QUIZ.length} right!</h2>
            <button class="try-again">Try Again</button>
        </div>
    `);
    tryAgain();
}

function tryAgain() {
    $(".quiz-container").on('click', '.try-again', function() {
        $(".results-page").fadeOut(400, function() {
            initializeQuiz();
            $(this).remove();
        });
    });
}


// Add Button Functionality for get started
function onClickGetStarted() {
    $(".quiz-container").on('click', '.quiz-start', function() {
        $(".quiz-page-1").fadeOut(400, function() {
            renderQuestionPage(QUIZ[0]);
            $(this).remove();
        });
    });
}


function renderQuestionPage(question) {
    if ($(".question-container").length < 1) {
        $(".quiz-container").append(`
            <div class="question-container">
                <p class="question-index">Question: ${QUIZ.indexOf(question) + 1} out of ${QUIZ.length}</p>
                <p class="question-current-score">
                    <span class="question-current-score-correct">${correctCount} correct</span> |
                    <span class="question-current-score-incorrect">${incorrectCount} incorrect</span>
                </p>
                <div class="question-divider"></div>
                <img class="question-img" src="${question.image}" />
                <div class="question-form-wrap">
                    <form id="question" class="question-form">
                        <fieldset class="question-fieldset">
                            <legend class="question-legend">${question.body}</legend>
                            <div class="question-divider"></div>
                            <input id="answer-1" type="radio" name="question" value="0" /><label for="answer-1" class="answer">${question.answers[0]}</label><br/>
                            <input id="answer-2" type="radio" name="question" value="1" /><label for="answer-2" class="answer">${question.answers[1]}</label><br/>
                            <input id="answer-3" type="radio" name="question" value="2" /><label for="answer-3" class="answer">${question.answers[2]}</label><br/>
                            <input id="answer-4" type="radio" name="question" value="3" /><label for="answer-4" class="answer">${question.answers[3]}</label><br/>
                        </fieldset>
                        <button class="question-submit" type="submit">Submit</button>
                    </form>
                    <button class="next-question">Next Question</button>
                </div>
            </div>
        `);
        // Reset correct count and incorrect count number and text if quiz is on first question
        scoreCheck(question);
    }
    userSubmitAnswer(question);
}

function userSubmitAnswer(currentQuestion) {
    $(".question-form").submit(function(event) {
        event.preventDefault();
        let userAnswer = $('input[name="question"]:checked').val();
        let nextQuestionIndex = QUIZ.indexOf(currentQuestion) + 1;

        // Check to see if there's a userAnswer and if there's not:
        // let the user know they need to choose an answer
        if (!checkForAnswer(userAnswer)) {
            $(".question-fieldset").after(`
                <p class="answer-none">Oops you forgot to choose an answer</p>
            `)
            $(".answer-none").fadeIn(400, function() {
                $(this).addClass("shake-answer")
            });
        }

        // Reset correct count and incorrect count if quiz is on question 1
        scoreCheck(currentQuestion);

        // If answer is correct
        if (userAnswer.toString() === currentQuestion.correctAnswer.toString()) {
            $(".answer-incorrect").remove();
            $(".answer-none").remove();
            $(".question-fieldset").after(`
                <p class="answer-correct">Correct</p>
            `);
            $(".answer-correct").fadeIn(300, function() {
                $(this).addClass("shake-answer")
            });
            correctCount++
            $(".question-current-score-correct").text(`${correctCount} correct`)
        // If answer is incorrect
        } else {
            $(".answer-correct").remove();
            $(".answer-none").remove();
            $(".question-fieldset").after(`
                <p class="answer-incorrect">Incorrect, the answer was: ${currentQuestion.answers[currentQuestion.correctAnswer]}</p>
            `);
            $(".answer-incorrect").fadeIn(300, function() {
                $(this).addClass("shake-answer")
            });
            incorrectCount++
            $(".question-current-score-incorrect").text(`${incorrectCount} incorrect`)
        }
        // Clean up form and display button to move on
        $(".question-submit").hide();
        $(".next-question").css("display", "block");
        userSelectNextQuestion(nextQuestionIndex);


    });
}

function scoreCheck(question) {
    if (QUIZ.indexOf(question) === 0) {
        correctCount = 0;
        incorrectCount = 0;
        $(".question-current-score-correct").text(`${correctCount} correct`)
        $(".question-current-score-incorrect").text(`${incorrectCount} incorrect`)
    }
}

function checkForAnswer(answer) {
     answer !== undefined ? true : false;
}

function userSelectNextQuestion(nextQuestionIndex) {
    // Check to see if we just finished the last question.
    $(".question-container").on('click', '.next-question', function(event) {
        if(nextQuestionIndex === QUIZ.length) {
            renderResultsPage()
        } else {
            fadeToNext(nextQuestionIndex);
        }
    });
}

// Fade to next question
function fadeToNext(index) {
    $(".question-container").fadeOut(400, function() {
        $(this).remove();
        renderQuestionPage(QUIZ[index]);
    });
}

function renderResultsPage() {
    $(".question-container").fadeOut(400, function() {
        $(this).remove();
        resultsPage();
    });
}


function initializeQuiz() {
    getStartedPage();
    onClickGetStarted();
}

initializeQuiz();
