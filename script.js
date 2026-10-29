
const studyButton = document.getElementById("study-cards-tabs");
const allQuestionsButton = document.getElementById("all-question-tabs");
const addQuestionButton = document.getElementById("add-questions-tabs");

const app = document.querySelector("main");

const questions = [
    {
        question: "What is the full form of HTML?",
        answer: "HyperText Markup Language"
    },
    {
        question: "How do you know about Semantic HTML?",
        answer: "Semantic HTML uses meaningful tags like header, main, and footer."
    },
    {
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheets"
    },
    {
        question: "What are the extensions of HTML and CSS?",
        answer: "HTML uses .html and CSS uses .css."
    },
    {
        question: "Why do we use CSS in web development?",
        answer: "CSS styles web pages and controls their appearance."
    },
    {
        question: "Why do we use !DOCTYPE in HTML?",
        answer: "It tells the browser to use HTML5 standards."
    },
    {
        question: "What is the difference between HTML and CSS?",
        answer: "HTML creates structure; CSS controls appearance."
    },
    {
        question: "What is the difference between Flexbox and Grid?",
        answer: "Flexbox is mainly one-dimensional; Grid is two-dimensional."
    },
    {
        question: "What type of language is HTML?",
        answer: "HTML is a markup language."
    },
    {
        question: "What is the difference between display:none, visibility:hidden and opacity:0 in CSS?",
        answer: "display:none removes layout space; visibility:hidden keeps space; opacity:0 makes an element transparent."
    }
];

// Show All Questions
function showAllQuestions() {
    app.innerHTML = `
        <section class="content-view active-view">
            <h2>All Questions</h2>
            <p class="description-text">Every Question in the app</p>
            <ul id="all-questions-list" class="questions-container">
                ${questions.map(item =>
                    `<li>${item.question}</li>`
                ).join("")}
            </ul>
        </section>
    `;
}

// Show Study Cards
function showStudyCards() {
    let currentIndex = 0;

    function displayCard() {
        const item = questions[currentIndex];

        app.innerHTML = `
            <section class="content-view active-view">
                <h2>Study Cards</h2>

                <div class="study-card">
                    <h3>${item.question}</h3>
                    <p id="answer" hidden>${item.answer}</p>
                    <button id="reveal-answer">Show Answer</button>
                </div>

                <button id="previous-card"
                    ${currentIndex === 0 ? "disabled" : ""}>
                    Previous
                </button>

                <button id="next-card"
                    ${currentIndex === questions.length - 1 ? "disabled" : ""}>
                    Next
                </button>

                <p>Card ${currentIndex + 1} of ${questions.length}</p>
            </section>
        `;

        document.getElementById("reveal-answer")
            .addEventListener("click", function () {
                const answer = document.getElementById("answer");
                answer.hidden = !answer.hidden;
                this.textContent = answer.hidden
                    ? "Show Answer"
                    : "Hide Answer";
            });

        document.getElementById("previous-card")
            .addEventListener("click", function () {
                if (currentIndex > 0) {
                    currentIndex--;
                    displayCard();
                }
            });

        document.getElementById("next-card")
            .addEventListener("click", function () {
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    displayCard();
                }
            });
    }

    displayCard();
}

// Show Add Questions
function showAddQuestions() {
    app.innerHTML = `
        <section class="content-view active-view">
            <h2>Add Questions</h2>

            <input
                type="text"
                id="question-input"
                placeholder="Enter your question"
            >

            <input
                type="text"
                id="answer-input"
                placeholder="Enter your answer"
            >

            <button id="save-question">Save Question</button>
            <p id="message"></p>
        </section>
    `;

    document.getElementById("save-question")
        .addEventListener("click", function () {
            const questionInput =
                document.getElementById("question-input");
            const answerInput =
                document.getElementById("answer-input");
            const message = document.getElementById("message");

            const question = questionInput.value.trim();
            const answer = answerInput.value.trim();

            if (!question || !answer) {
                message.textContent =
                    "Please enter both question and answer.";
                return;
            }

            questions.push({ question, answer });

            message.textContent = "Question added successfully!";
            questionInput.value = "";
            answerInput.value = "";
        });
}

// Button Events
studyButton.addEventListener("click", showStudyCards);
allQuestionsButton.addEventListener("click", showAllQuestions);
addQuestionButton.addEventListener("click", showAddQuestions);

// Show All Questions when the page opens
showAllQuestions();
