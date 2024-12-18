const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startbtn = document.querySelector('.startbtn');
const timer = document.querySelector('.timer');





// Correct quiz array structure (array of objects)
const quiz = [
    {
        question: 'Q. What is the correct way to declare a JavaScript variable?',
        choices: ['var myVar;', 'variable myVar;', 'v myVar;', 'let:myVar;'],
        answer: 'var myVar;'
    },
    {
        question: 'Q. Which built-in method is used to sort the elements of an array?',
        choices: ['sort()', 'order()', 'arrange()', 'align()'],
        answer: 'sort()'
    },
    {
        question: 'Q. How do you create a function in JavaScript?',
        choices: ['function = myFunction()', 'function myFunction()', 'create myFunction()', 'define myFunction()'],
        answer: 'function myFunction()'
    },
    {
        question: 'Q. Which of the following is a falsy value in JavaScript?',
        choices: ['1', '"false"', '0', '[]'],
        answer: '0'
    },
    {
        question: 'Q. How do you call a function named "myFunction"?',
        choices: ['call myFunction()', 'myFunction()', 'run.myFunction()', 'call:myFunction()'],
        answer: 'myFunction()'
    },
    {
        question: 'Q. What is the purpose of the `push` method in an array?',
        choices: [
            'Adds a new element to the beginning of an array',
            'Removes the last element of an array',
            'Adds a new element to the end of an array',
            'Removes the first element of an array'
        ],
        answer: 'Adds a new element to the end of an array'
    },
    {
        question: 'Q. What does the `===` operator do in JavaScript?',
        choices: [
            'Assigns a value to a variable',
            'Compares both value and type',
            'Checks only the value',
            'Performs a bitwise operation'
        ],
        answer: 'Compares both value and type'
    },
    {
        question: 'Q. How can you add a single-line comment in JavaScript?',
        choices: ['<!-- This is a comment -->', '// This is a comment', '/* This is a comment */', '## This is a comment'],
        answer: '// This is a comment'
    },
    {
        question: 'Q. What is the output of `typeof NaN`?',
        choices: ['"number"', '"NaN"', '"undefined"', '"object"'],
        answer: '"number"'
    },
    {
        question: 'Q. Which of the following methods can be used to remove the last element from an array?',
        choices: ['pop()', 'shift()', 'remove()', 'delete()'],
        answer: 'pop()'
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

const showquestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = ''; // Clear previous choices
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.classList.add('choice');
        choiceDiv.textContent = currentChoice;
        choicesBox.appendChild(choiceDiv);

        // Add event listener for selecting a choice
        choiceDiv.addEventListener('click', () => {
            // Toggle selected class
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                // Deselect other choices
                const allChoices = document.querySelectorAll('.choice');
                allChoices.forEach(choice => choice.classList.remove('selected'));
                choiceDiv.classList.add('selected');
            }
        });
    } if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
};

// function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice) {
        const selectedAnswer = selectedChoice.textContent;
        const correctAnswer = quiz[currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            // alert("Correct Answer!");
            displayAlert("Correct Answer!");
            score++
        } else {
            // alert("Wrong Answer!");
            displayAlert(`Wrong Answer!  Correct Answer is: ${correctAnswer}`);
        }
    };
    timeLeft = 15;
};


const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

const startquiz = () => {
    currentQuestionIndex = 0; // Reset to the first question
    score = 0; // Reset the score
    quizOver = false; // Reset the quiz-over flag
    timeLeft = 15; // Reset the timer
    timer.style.display = "flex"; // Show the timer
    nextBtn.textContent = "Next"; // Reset the button text
    scoreCard.style.display = "none"; // Hide the score card
    container.style.display = "block"; // Ensure the quiz container is visible
    shuffelQuestions();     // Display the first question
    startTimer(); // Restart the timer
};


// add eventlister in startbtn
startbtn.addEventListener('click', () => {
    container.style.display = "block";
    startbtn.style.display = "none";
    startquiz();
})

// function to starttimer
const startTimer = () => {
    clearInterval(timerId); // Clear any existing timer
    timer.textContent = `${timeLeft}s`;
   const countDown = () => {
        timeLeft--;
        timer.textContent = `${timeLeft}s`;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to restart the quiz?");
            if (confirmUser) {
                timeLeft = 15;
                startquiz();
            } else {
                startbtn.style.display = "block";
                container.style.display = "none";
                clearInterval(countDown);
            }
        }
    };
    timerId = setInterval(countDown, 1000);
};

// function timerId
const stoptimer = () => {
    clearInterval(timerId);
    
}

const shuffelQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showquestions();
}

// function to show score
const showScore = () => {
    questionBox.textContent = ""; // Clear question text
    choicesBox.textContent = "";
    timer.style.display = "none"; // Clear choices text
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed the quiz!")
    nextBtn.textContent = "Play Again";
    scoreCard.style.display = "block";
    quizOver = true;
};

// Add event listener to next button
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Please select an answer."); // Alert if no choice is selected
        return;
    } else if (nextBtn.textContent === "Play Again") {
        startquiz(); // Restart the quiz
    } else if (nextBtn.textContent === "Next") {
        checkAnswer(); // Check the current answer
    }

    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++; // Move to the next question
        showquestions();
    } else {
        showScore(); // Display the final score
        stoptimer(); // Stop the timer
        quizOver = true; // Mark the quiz as over
    }
});

// Initialize the first question
// showquestions();
