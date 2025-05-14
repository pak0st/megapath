// Data for words by class and language
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
        ],
    },
};

// Default selection
let selectedClass = "yud";
let selectedLanguage = "russian";

// Start the Flashcards game
function startFlashcards() {
    const gameArea = document.getElementById("game-area");
    const words = wordData[selectedClass][selectedLanguage];
    
    gameArea.innerHTML = `
        <h2>Flashcards</h2>
        <div id="flashcards-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
    `;

    const cards = [];
    words.forEach((word, index) => {
        cards.push({ text: word.hebrew, id: hebrew-${index}, type: "hebrew" });
        cards.push({ text: word.translation, id: translation-${index}, type: "translation" });
    });

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Render cards
    const container = document.getElementById("flashcards-container");
    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = card.id;
        cardElement.textContent = card.text;
        cardElement.style.cssText = `
            width: 100px; height: 50px; border: 1px solid #000;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; background: #f9f9f9;
        `;
        cardElement.addEventListener("click", () => handleFlashcardClick(cardElement, card));
        container.appendChild(cardElement);
    });
}

let firstCard = null;
let secondCard = null;

function handleFlashcardClick(cardElement, card) {
    if (cardElement.classList.contains("matched")) return;

    cardElement.style.background = "#ddd";
    cardElement.classList.add("flipped");

    if (!firstCard) {
        firstCard = { cardElement, card };
    } else {
        secondCard = { cardElement, card };
        checkFlashcardMatch();
    }
}

function checkFlashcardMatch() {
    if (firstCard.card.type !== secondCard.card.type &&
        firstCard.card.id.split("-")[1] === secondCard.card.id.split("-")[1]) {
        firstCard.cardElement.classList.add("matched");
        secondCard.cardElement.classList.add("matched");
    } else {
        setTimeout(() => {
            firstCard.cardElement.style.background = "#f9f9f9";
            secondCard.cardElement.style.background = "#f9f9f9";
            firstCard.cardElement.classList.remove("flipped");
            secondCard.cardElement.classList.remove("flipped");
        }, 1000);
    }
    firstCard = null;
    secondCard = null;
}

// Start the Match Word to Picture game
function startMatchGame() {
    const gameArea = document.getElementById("game-area");
    const words = wordData[selectedClass][selectedLanguage];

    gameArea.innerHTML = `
        <h2>Match Word to Picture</h2>
        <div id="match-game-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
    `;

    const container = document.getElementById("match-game-container");
    words.forEach((word) => {
        const wordElement = document.createElement("div");
        wordElement.textContent = word.hebrew;
        wordElement.style.cssText = `
            width: 100px; height: 50px; border: 1px solid #000;
            text-align: center; display: flex; align-items: center; justify-content: center;
        `;

        const blankSpace = document.createElement("div");
        blankSpace.style.cssText = `width: 100px; height: 50px; border: 1px dashed gray;
        `;

        container.appendChild(wordElement);
        container.appendChild(blankSpace);
    });
}
