# User:
Create a web application that allows me to play tic tac toe against the computer

# Response:
To create a web application that allows you to play tic-tac-toe against the computer, you'll need to modify the previous code to include an AI algorithm. Here's an updated version of the code that implements a simple AI using the Minimax algorithm:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Tic Tac Toe</h1>
    <div id="board">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    </div>
    <button id="reset">Reset</button>

    <script src="script.js"></script>
</body>
</html>
```

```css
#board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
}

.cell {
    border: 1px solid black;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
}

button {
    margin-top: 20px;
    font-size: 20px;
}
```

```javascript
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

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && gameActive) {
            setTimeout(makeComputerMove, 500); // Delay computer move for better user experience
        }
    }
}

// Check for a win
function checkWin(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
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

// Make the computer move using the Minimax algorithm
function makeComputerMove() {
    if (!gameActive) return;

    const bestMove = getBestMove();
    const cell = cells[bestMove.index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (checkDraw()) {
        endGame("It's a draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Minimax algorithm for finding the best move
function getBestMove() {
    const availableMoves = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            availableMoves.push(i);
        }
    }

    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        cells[move].textContent = currentPlayer;
        const score = minimax(cells, 0, false);
        cells[move].textContent = '';

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return { index: bestMove };
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -10,
        O: 10,
        draw: 0
    };

    if (checkWin('X')) {
        return scores.X - depth;
    } else if (checkWin('O')) {
        return scores.O - depth;
    } else if (checkDraw()) {
        return scores.draw;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i].textContent === '') {
                board[i].textContent = 'O';
                const score = minimax(board, depth + 1, false);
                board[i].textContent = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i].textContent === '') {
                board[i].textContent = 'X';
                const score = minimax(board, depth + 1, true);
                board[i].textContent = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
```

Save the HTML, CSS, and JavaScript code in their respective files (e.g., `index.html`, `style.css`, and `script.js`). Then, open the `index.html` file in a web browser, and you should be able to play tic-tac-toe against the computer. The computer will make its moves using the Minimax algorithm, ensuring a challenging opponent.