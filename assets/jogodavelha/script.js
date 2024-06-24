document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".div-container");
    let currentPlayer = "X";

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                if (checkWinner()) {
                    alert("Player " + (currentPlayer === "X" ? "Player 2" : "Player 1") + " venceu!");
                    resetGame();
                } else if (isBoardFull()) {
                    alert("O jogo empatou!");
                    resetGame();
                }
            }
        });
    });

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some((combination) => {
            const [a, b, c] = combination;
            return (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[b].textContent === cells[c].textContent
            );
        });
    }

    function isBoardFull() {
        return Array.from(cells).every((cell) => cell.textContent);
    }

    function resetGame() {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        currentPlayer = "X";
    }
});

const startpage = document.querySelector(".start")
const containergame = document.querySelector(".containergame")
const timeStartGame = document.querySelector(".time")
var timeStart = 3

startpage.addEventListener('click', () => {
    startpage.style.display = 'none';
    timeStartGame.style.display = 'flex';

    setTimeout(() => {
        timeStartGame.innerHTML = timeStart;
        setInterval(() => {
            timeStart--
            timeStartGame.innerHTML = timeStart;

            if(timeStart == 0) {
                timeStartGame.innerHTML = 'GO';
            }
        }, 1000);
    }, 500);

    setTimeout(() => {
        timeStartGame.style.display = 'none'
        containergame.style.display = 'flex';
        game();
    }, 4000)
})


