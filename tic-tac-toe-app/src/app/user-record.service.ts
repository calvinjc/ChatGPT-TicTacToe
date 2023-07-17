import { Injectable } from '@angular/core';

interface UserRecord {
  username: string;
  wins: number;
  losses: number;
  ties: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserRecordService {
  private userRecords: UserRecord[] = [];

  constructor() {}

  getAllUserRecords(): UserRecord[] {
    return this.userRecords;
  }

  getUserRecordByUsername(username: string): UserRecord {
    const record = this.userRecords.find(
      (userRecord) => userRecord.username === username
    );

    if (!record) {
      return {
        username: username,
        wins: 0,
        losses: 0,
        ties: 0,
      };
    }

    return record;
  }

  updateUserRecord(username: string, result: 'win' | 'loss' | 'tie'): void {
    const recordIndex = this.userRecords.findIndex(
      (userRecord) => userRecord.username === username
    );

    if (recordIndex !== -1) {
      if (result === 'win') {
        this.userRecords[recordIndex].wins++;
      } else if (result === 'loss') {
        this.userRecords[recordIndex].losses++;
      } else {
        this.userRecords[recordIndex].ties++;
      }
    } else {
      const newRecord: UserRecord = {
        username: username,
        wins: result === 'win' ? 1 : 0,
        losses: result === 'loss' ? 1 : 0,
        ties: result === 'tie' ? 1 : 0,
      };
      this.userRecords.push(newRecord);
    }
  }
}
