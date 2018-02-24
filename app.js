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
        });
    });
}


// Add Button Functionality for get started
function onClickGetStarted() {
    $(".quiz-container").on('click', '.quiz-start', function() {
        $(".quiz-page-1").fadeOut(400, function() {
            renderQuestionPage(QUIZ[0]);
        });
    });
}


function renderQuestionPage(question) {
    if ($(".question-container").length < 1) {
        $(".quiz-container").append(`
            <div class="question-container">
                <img class="question-img" src="${question.image}" />
                <p class="question-text">${question.body}</p>
                <div class="question-divider"></div>
                <div class="question-form-wrap">
                    <form id="question" class="question-form">
                        <input type="radio" name="question" value="0" /><p class="answer">${question.answers[0]}</p><br/>
                        <input type="radio" name="question" value="1" /><p class="answer">${question.answers[1]}</p><br/>
                        <input type="radio" name="question" value="2" /><p class="answer">${question.answers[2]}</p><br/>
                        <input type="radio" name="question" value="3" /><p class="answer">${question.answers[3]}</p><br/>
                        <p class="answer-correct">Correct</p>
                        <p class="answer-incorrect">Incorrect, the answer was: ${question.answers[question.correctAnswer]}</p>
                        <button class="question-submit" type="submit">Submit</button>

                    </form>
                    <button class="next-question">Next Question</button>
                </div>
            </div>
        `);
    }
    userSubmitAnswer(question);
}

function userSubmitAnswer(currentQuestion) {
    $(".question-form").submit(function(event) {
        event.preventDefault();
        let userAnswer = $('input[name="question"]:checked').val();
        let nextQuestionIndex = QUIZ.indexOf(currentQuestion) + 1;
        if (userAnswer.toString() === currentQuestion.correctAnswer.toString()) {
            $(".answer-incorrect").hide();
            $(".answer-correct").fadeIn(400, function() {
                $(this).addClass("shake-answer")
            });
            correctCount++
        } else {
            $(".answer-correct").hide();
            $(".answer-incorrect").fadeIn(400, function() {
                $(this).addClass("shake-answer")
            });
        }
        $(".question-submit").hide();
        $(".next-question").css("display", "block");
        userSelectNextQuestion(nextQuestionIndex);
    });
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
    correctCount = 0;
    getStartedPage();
    onClickGetStarted();
}

initializeQuiz();
