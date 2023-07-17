// JavaScript variables
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Handle cell clicks
function handleClick() {
    if (!gameActive || this.textContent !== '') return;
    
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);
    
    if (checkWin()) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for a win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        );
    });
}

// Check for a draw
function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

// End the game
function endGame(message) {
    gameActive = false;
    alert(message);
}

// Reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}
