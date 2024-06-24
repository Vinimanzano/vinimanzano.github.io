document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".div-container");
    const startButton = document.querySelector(".start");
    const timeDisplay = document.querySelector(".time");
    const containergame = document.querySelector(".containergame");

    let currentPlayer = "X";
    let isGameOver = false;

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        startCountdown();
    });

    function startCountdown() {
        let count = 3;
        const countdownInterval = setInterval(() => {
            timeDisplay.textContent = count;
            count--;

            if (count < 0) {
                clearInterval(countdownInterval);
                timeDisplay.textContent = 'GO!';
                setTimeout(() => {
                    timeDisplay.style.display = 'none';
                    containergame.style.display = 'flex';
                    initializeGame();
                }, 1000);
            }
        }, 1000);
    }

    function initializeGame() {
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                if (!cell.textContent && currentPlayer === "X" && !isGameOver) {
                    cell.textContent = currentPlayer;
                    if (checkWinner(currentPlayer)) {
                        endGame(currentPlayer === "X" ? "Player 1" : "Player 2");
                    } else if (isBoardFull()) {
                        endGame("Empate");
                    } else {
                        currentPlayer = "O";
                        setTimeout(() => {
                            machinePlay();
                        }, 500);
                    }
                }
            });
        });
    }

    function machinePlay() {
        const emptyCells = Array.from(cells).filter((cell) => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            emptyCells[randomIndex].textContent = "O";
            currentPlayer = "X";
            if (checkWinner("O")) {
                endGame("Máquina");
            } else if (isBoardFull()) {
                endGame("Empate");
            }
        }
    }

    function checkWinner(player) {
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
                cells[a].textContent === player &&
                cells[b].textContent === player &&
                cells[c].textContent === player
            );
        });
    }

    function isBoardFull() {
        return Array.from(cells).every((cell) => cell.textContent);
    }

    function endGame(winner) {
        isGameOver = true;
        if (winner === "Empate") {
            alert("O jogo empatou!");
        } else {
            alert(`O vencedor é: ${winner}`);
        }
        resetGame();
    }

    function resetGame() {
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        isGameOver = false;
    }
});
