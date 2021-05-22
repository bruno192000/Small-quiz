
//questions sectiom


var questions = [
    {
        title: "which data type doesn't belong in this group?:",
        choices: ["numbers","strings", "booleans", "alerts"],
        answer: "alerts"
    },
    {
        title: "when you use 'if' or 'else', the condition is enclose with...",
        choices: ["quotes","parentheses", "curly brackets", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "in javascript,  we use arrays to store...",
        choices: ["strings", "numbers", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "what is the meaning of html?",
        choices: ["hypertext markup language", "hyper turbo mega lines", "helpfull tips for making lines  ", "hypertext markup lasagna"],
        answer: "hypertext markup language"
    },
    {
        title: "which command we use to send new data to our repo in git bash",
        choices: ["git push", "git add ", "git pull", "git commit"],
        answer: "git push"
    },
];




// variables to declare
var score = 0;
var questionin = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

//to display on the screen
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "time's up";
            }
        }, 1000);
    }
    render(questionin);
});


function render(questionin) {
    
    // clears data that exist
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
    
    
    // putting all info in an array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionin].title;
        var userChoices = questions[questionin].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // if answer is correct
        if (element.textContent == questions[questionin].answer) {
            score++;
            createDiv.textContent = "yes, the correct answer is: " + questions[questionin].answer;
            // if answer is incorrect
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "incorrect, the answer was: " + questions[questionin].answer;
        }

    }
    
    questionin++;

    if (questionin >= questions.length) {
        allDone();
        createDiv.textContent = "you answered " + score + "/" + questions.length + " correct";
    } else {
        render(questionin);
    }
    questionsDiv.appendChild(createDiv);

}


// when is done, it will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "the quiz ended"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "your score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

  
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Save your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // initials and local storage 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (!initials) {

            alert("Write your initials");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./index2.html");
        }
    });

}