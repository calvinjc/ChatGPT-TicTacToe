import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface UserRecord {
  username: string;
  wins: number;
  losses: number;
  ties: number;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  userRecords: UserRecord[] = [
    { username: 'User1', wins: 3, losses: 1, ties: 2 },
    { username: 'User2', wins: 5, losses: 2, ties: 0 },
    { username: 'User3', wins: 2, losses: 3, ties: 1 },
  ];

  displayedColumns: string[] = ['username', 'wins', 'losses', 'ties'];

  constructor() {}

  ngOnInit(): void {
    // Sort user records by number of wins
    this.userRecords.sort((a, b) => b.wins - a.wins);
  }
}
