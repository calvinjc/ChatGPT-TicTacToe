import { Component } from '@angular/core';
import { UserService } from '../user.service';

export enum Player {
  None = '',
  X = 'X',
  O = 'O',
}

@Component({
  selector: 'app-tictactoe',
  template: `
    <h1>Play TicTacToe</h1>
    <div class="game-container">
      <div class="board" *ngIf="!winner">
        <div class="row" *ngFor="let row of board; let i = index">
          <div class="cell" *ngFor="let cell of row; let j = index" (click)="makeMove(i, j)">
            {{ cell }}
          </div>
        </div>
      </div>
      <div class="result" *ngIf="winner !== null">
        <h2>Game Over</h2>
        <p>Winner: {{ winner }}</p>
        <button mat-raised-button color="primary" (click)="resetGame()">Reset Game</button>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      text-align: center;
    }

    .board {
      display: inline-block;
      margin-top: 1em;
      border: 1px solid black;
    }

    .row {
      display: flex;
    }

    .cell {
      flex: 1;
      border: 1px solid black;
      height: 3em;
      width: 3em;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2em;
      cursor: pointer;
    }

    .result {
      margin-top: 1em;
    }
  `]
})
export class TictactoeComponent {
  board: Player[][];
  currentPlayer: Player = Player.X;
  winner: Player | null | undefined;
  isComputerTurn: boolean = false;

  constructor(private userService: UserService) {
    this.board = [
      [Player.None, Player.None, Player.None],
      [Player.None, Player.None, Player.None],
      [Player.None, Player.None, Player.None],
    ];
  }

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.board = [
      [Player.None, Player.None, Player.None],
      [Player.None, Player.None, Player.None],
      [Player.None, Player.None, Player.None],
    ];
    this.currentPlayer = Player.X;
    this.winner = null;
    this.isComputerTurn = false;
  }

  makeMove(row: number, col: number) {
    if (this.isComputerTurn || this.winner !== null || this.board[row][col] !== Player.None) {
      return;
    }

    this.board[row][col] = this.currentPlayer;
    if (this.checkWin(row, col, this.currentPlayer)) {
      this.winner = this.currentPlayer;
      this.userService.updateUserRecord(this.currentPlayer);
    } else if (this.checkDraw()) {
      this.winner = Player.None;
    } else {
      this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
      if (this.currentPlayer === Player.O) {
        this.isComputerTurn = true;
        setTimeout(() => this.makeComputerMove(), 500);
      }
    }
  }

  makeComputerMove() {
    const bestMove = this.minimax(this.board, Player.O, 0, -Infinity, Infinity);
    this.board[bestMove.row][bestMove.col] = Player.O;
    if (this.checkWin(bestMove.row, bestMove.col, Player.O)) {
      this.winner = Player.O;
      this.userService.updateUserRecord(Player.O);
    } else if (this.checkDraw()) {
      this.winner = Player.None;
    } else {
      this.currentPlayer = Player.X;
    }
    this.isComputerTurn = false;
  }

  minimax(board: Player[][], player: Player, depth: number, alpha: number, beta: number): { row: number, col: number, score: number } {
    if (this.checkWin(-1, -1, Player.X)) {
      return { row: -1, col: -1, score: depth - 10 };
    }
    if (this.checkWin(-1, -1, Player.O)) {
      return { row: -1, col: -1, score: 10 - depth };
    }
    if (this.checkDraw()) {
      return { row: -1, col: -1, score: 0 };
    }

    const availableMoves = this.getAvailableMoves(board);
    const moves: { row: number, col: number, score: number }[] = [];

    for (const move of availableMoves) {
      const newBoard = this.copyBoard(board);
      newBoard[move.row][move.col] = player;

      const score = this.minimax(newBoard, player === Player.X ? Player.O : Player.X, depth + 1, alpha, beta).score;
      move.score = score;

      if (player === Player.O && score > alpha) {
        alpha = score;
      } else if (player === Player.X && score < beta) {
        beta = score;
      }

      if (alpha >= beta) {
        break;
      }

      moves.push(move);
    }

    if (player === Player.O) {
      const bestMove = moves.reduce((a, b) => (a.score > b.score ? a : b));
      return bestMove;
    } else {
      const bestMove = moves.reduce((a, b) => (a.score < b.score ? a : b));
      return bestMove;
    }
  }

  checkWin(row: number, col: number, player: Player): boolean {
    // Check row
    if (
      this.board[row][0] === player &&
      this.board[row][1] === player &&
      this.board[row][2] === player
    ) {
      return true;
    }

    // Check column
    if (
      this.board[0][col] === player &&
      this.board[1][col] === player &&
      this.board[2][col] === player
    ) {
      return true;
    }

    // Check diagonal
    if (
      (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) ||
      (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player)
    ) {
      return true;
    }

    return false;
  }

  checkDraw(): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === Player.None) {
          return false;
        }
      }
    }
    return true;
  }

  resetGame() {
    this.startGame();
  }

  private getAvailableMoves(board: Player[][]): { row: number, col: number, score: number }[] {
    const moves: { row: number, col: number, score: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === Player.None) {
          moves.push({ row, col, score: 0 });
        }
      }
    }
    return moves;
  }

  private copyBoard(board: Player[][]): Player[][] {
    const copy: Player[][] = [];
    for (let row = 0; row < 3; row++) {
      copy[row] = [...board[row]];
    }
    return copy;
  }
}
