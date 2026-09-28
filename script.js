const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const restart = document.getElementById("restart");

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "X";
let gameOver = false;

let scores = {
    X: 0,
    O: 0
};

const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];

/* =========================
   PLAYER MOVE
========================= */

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        if (gameOver) return;

        if (board[index] !== "") return;

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(
            currentPlayer === "X" ? "x" : "o"
        );

        checkGame();

    });

});

/* =========================
   CHECK GAME
========================= */

function checkGame() {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            gameOver = true;

            pattern.forEach(index => {
                cells[index].classList.add("win");
            });

            scores[currentPlayer]++;

            scoreX.textContent = scores.X;
            scoreO.textContent = scores.O;

            status.textContent =
                currentPlayer + " WINS! ★";

            return;
        }
    }

    /* DRAW */

    if (!board.includes("")) {

        gameOver = true;

        status.textContent = "DRAW! ★";

        return;
    }

    /* CHANGE PLAYER */

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    status.textContent =
        currentPlayer + "'S TURN";

}

/* =========================
   RESTART
========================= */

restart.addEventListener("click", () => {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "win"
        );

    });

    status.textContent = "X'S TURN";

});
