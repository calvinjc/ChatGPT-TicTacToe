import { Component, OnInit } from '@angular/core';
import { UserRecordService } from '../user-record.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  username: string = "Player1";

  cells: string[] = Array(9).fill('');
  currentPlayer: string = 'X';
  gameOver: string | null = null;

  constructor(private userRecordService: UserRecordService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || "Player1";
  }

  handleGameResult(result: 'win' | 'loss' | 'tie'): void {
    this.userRecordService.updateUserRecord(this.username, result);
  }

  handleCellClick(index: number): void {
    if (this.cells[index] !== '' || this.gameOver) return;

    this.cells[index] = this.currentPlayer;
    if (this.checkWin(this.currentPlayer)) {
      this.gameOver = `${this.currentPlayer} wins!`;
      if (this.currentPlayer === 'X') {
        this.handleGameResult('win');
      } else {
        this.handleGameResult('loss');
      }
    } else if (this.checkDraw()) {
      this.gameOver = "It's a draw!";
      this.handleGameResult('tie');
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      if (this.currentPlayer === 'O') {
        setTimeout(() => this.makeComputerMove(), 500);
      }
    }
  }

  checkWin(player: string): boolean {
    const winningCombinations: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return (
        this.cells[a] === player &&
        this.cells[b] === player &&
        this.cells[c] === player
      );
    });
  }

  checkDraw(): boolean {
    return this.cells.every(cell => cell !== '');
  }

  resetGame(): void {
    this.cells = Array(9).fill('');
    this.currentPlayer = 'X';
    this.gameOver = null;
  }

  makeComputerMove(): void {
    if (this.gameOver) return;

    const bestMove = this.getBestMove();
    this.cells[bestMove.index] = this.currentPlayer;

    if (this.checkWin(this.currentPlayer)) {
      this.gameOver = `${this.currentPlayer} wins!`;
      if (this.currentPlayer === 'X') {
        this.handleGameResult('win');
      } else {
        this.handleGameResult('loss');
      }
    } else if (this.checkDraw()) {
      this.gameOver = "It's a draw!";
      this.handleGameResult('tie');
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  getBestMove(): { index: number } {
    const availableMoves: number[] = [];
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] === '') {
        availableMoves.push(i);
      }
    }

    let bestMove: number | null = null;
    let bestScore = -Infinity;
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      this.cells[move] = this.currentPlayer;
      const score = this.minimax(this.cells, 0, false);
      this.cells[move] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { index: bestMove! };
  }

  minimax(cells: string[], depth: number, isMaximizing: boolean): number {
    const scores = {
      X: -10,
      O: 10,
      draw: 0,
    };

    if (this.checkWin('X')) {
      return scores.X - depth;
    } else if (this.checkWin('O')) {
      return scores.O - depth;
    } else if (this.checkDraw()) {
      return scores.draw;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === '') {
          cells[i] = 'O';
          const score = this.minimax(cells, depth + 1, false);
          cells[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === '') {
          cells[i] = 'X';
          const score = this.minimax(cells, depth + 1, true);
          cells[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
}
