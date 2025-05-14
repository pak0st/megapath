// Data for words based on class and language
const wordData = {
    yud: {
        russian: [
            { hebrew: "אטום", translation: "атом" },
            { hebrew: "מולקולה", translation: "молекула" },
            { hebrew: "תרכובת", translation: "соединение" },
        ],
        portuguese: [
            { hebrew: "אטום", translation: "átomo" },
            { hebrew: "מולקולה", translation: "molécula" },
            { hebrew: "תרכובת", translation: "composto" },
        ],
        english: [
            { hebrew: "אטום", translation: "atom" },
            { hebrew: "מולקולה", translation: "molecule" },
            { hebrew: "תרכובת", translation: "compound" },
        ]
    },
};

// Variables to store the selected class and language
let selectedClass = "yud";
let selectedLanguage = "russian";

// Start the Flashcards Game
function startFlashcards() {
    const gameArea = document.getElementById('game-area');
    const words = wordData[selectedClass][selectedLanguage];

    gameArea.innerHTML = `
        <h2>Flashcards</h2>
        <p>Match Hebrew words with their translations.</p>
        <div id="flashcards"></div>
    `;

    const flashcardsContainer = document.getElementById('flashcards');
    flashcardsContainer.style.display = "flex";
    flashcardsContainer.style.flexWrap = "wrap";

    const cards = [];
    words.forEach((word, index) => {
        cards.push({ text: word.hebrew, id: hebrew-${index}, type: "hebrew" });
        cards.push({ text: word.translation, id: translation-${index}, type: "translation" });
    });

    cards.sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = card.id;
        cardElement.textContent = card.text;

        cardElement.addEventListener("click", () => handleCardClick(cardElement, card));
        flashcardsContainer.appendChild(cardElement);
    });
}

let firstCard = null;
let secondCard = null;

function handleCardClick(cardElement, card) {
    if (cardElement.classList.contains("matched")) return;

    cardElement.style.background = "#ddd";
    cardElement.classList.add("flipped");

    if (!firstCard) {
        firstCard = { cardElement, card };
    } else {
        secondCard = { cardElement, card };
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.card.type !== secondCard.card.type &&
        firstCard.card.id.split("-")[1] === secondCard.card.id.split("-")[1]) {
        firstCard.cardElement.classList.add("matched");
        secondCard.cardElement.classList.add("matched");
    } else {
        setTimeout(() => {
            firstCard.cardElement.classList.remove("flipped");
            secondCard.cardElement.classList.remove("flipped");
        }, 1000);
    }
    firstCard = null;
    secondCard = null;
}

function startMatchGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Match Word to Picture</h2>
        <p>Drag the Hebrew word to the matching blank space.</p>
        <div id="match-game"></div>
    `;
}
