import { Injectable } from '@angular/core';
import { Player } from './tictactoe/tictactoe.component';

export interface UserRecord {
  username: string;
  wins: number;
  losses: number;
  ties: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userRecords: UserRecord[] = [];

  constructor() {}

  registerUser(username?: string) {
    const existingUser = this.userRecords.find(user => user.username === username);
    if (existingUser) {
      return;
    }

    const newUser: UserRecord = {
      username: username!,
      wins: 0,
      losses: 0,
      ties: 0
    };
    this.userRecords.push(newUser);
  }

  updateUserRecord(player: Player) {
    const username = localStorage.getItem('username');
    const user = this.userRecords.find(user => user.username === username);
    if (user) {
      if (player === Player.X) {
        user.wins++;
      } else if (player === Player.O) {
        user.losses++;
      } else {
        user.ties++;
      }
    }
  }

  getUserRecords(): UserRecord[] {
    return this.userRecords.sort((a, b) => b.wins - a.wins);
  }
}
