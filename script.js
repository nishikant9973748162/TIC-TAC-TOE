let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById('status').innerText = '';
        showWinnerPopup(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        document.getElementById('status').innerText = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Current Player: ${currentPlayer}`;
    }
}

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementById('board').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    document.getElementById('status').innerText = `Current Player: ${currentPlayer}`;
}

function showWinnerPopup(winnerText) {
    document.getElementById('winnerText').innerText = winnerText;
    document.getElementById('winnerPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('winnerPopup').style.display = 'none';
}
function playAgain() {
    document.getElementById('winnerPopup').style.display = 'none';
    resetGame();
}