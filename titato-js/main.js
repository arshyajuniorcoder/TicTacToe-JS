let statusDisplay = document.querySelector(".game-status");
let counterOneScore = 0,
    counterTwoScore = 0;
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

let winningMessage = () => `Player ${currentPlayer} has won!`;

let drawMessage = () => `Game ended in a draw!`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelector(
    "#player1"
).innerHTML = `Player 1: X = ${counterOneScore}`;

document.querySelector("#player1").style.color = "rgb(30, 71, 253)";

document.querySelector(
    "#player2"
).innerHTML = `Player 2: O = ${counterTwoScore}`;

document.querySelector("#player2").style.color = "rgb(255, 78, 34)";

document
    .querySelectorAll(".cells")
    .forEach((cell) => cell.addEventListener("click", handleCellClick));

function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt(
        clickedCell.getAttribute("data-cell-index")
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 8; i++) {
        let winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === "X" && a === b && b === c) {
            roundWon = true;
            document.querySelector(
                "#player1"
            ).innerHTML = `Player 1: X = ${(counterOneScore =
                counterOneScore + 1)}`;
            break;
        } else if (a === "O" && a === b && b === c) {
            roundWon = true;
            document.querySelector(
                "#player2"
            ).innerHTML = `Player 2: O = ${(counterTwoScore =
                counterTwoScore + 1)}`;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

document
    .querySelector(".reset-btn")
    .addEventListener("click", handleRestartGame);

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document
        .querySelectorAll(".cells")
        .forEach((cell) => (cell.innerHTML = ""));
}
