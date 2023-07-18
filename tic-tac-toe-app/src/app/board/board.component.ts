import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Output() gameResult = new EventEmitter<'win' | 'loss' | 'tie'>();
  currentPlayer: 'X' | 'O' = 'X';
  board: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  winner: string | null = null;
  isGameOver = false;

  handleCellClick(row: number, col: number): void {
    if (!this.board[row][col] && !this.winner && !this.isGameOver) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner();
      this.togglePlayer();
      this.checkGameOver();
    }
  }

  togglePlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner(): void {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]], // Top row
      [[1, 0], [1, 1], [1, 2]], // Middle row
      [[2, 0], [2, 1], [2, 2]], // Bottom row
      [[0, 0], [1, 0], [2, 0]], // Left column
      [[0, 1], [1, 1], [2, 1]], // Middle column
      [[0, 2], [1, 2], [2, 2]], // Right column
      [[0, 0], [1, 1], [2, 2]], // Diagonal top-left to bottom-right
      [[0, 2], [1, 1], [2, 0]]  // Diagonal top-right to bottom-left
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a[0]][a[1]] &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      ) {
        this.winner = this.board[a[0]][a[1]];
        if (this.winner === 'X') {
          this.gameResult.emit('win');
        } else {
          this.gameResult.emit('loss');
        }
        break;
      }
    }
  }

  checkGameOver(): void {
    if (
      this.board.every(row => row.every(cell => cell !== '')) &&
      !this.winner
    ) {
      this.isGameOver = true;
      this.gameResult.emit('tie');
    }
  }

  restartGame(): void {
    this.currentPlayer = 'X';
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.winner = null;
    this.isGameOver = false;
  }
}
