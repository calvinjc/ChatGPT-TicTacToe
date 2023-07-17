import { Component, OnInit } from '@angular/core';
import { UserRecordService } from '../user-record.service';
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
  userRecords: UserRecord[] = [];

  displayedColumns: string[] = ['username', 'wins', 'losses', 'ties'];

  constructor(private userRecordService: UserRecordService) {}

  ngOnInit(): void {
    this.userRecords = this.userRecordService.getAllUserRecords();
    this.sortUserRecords();
  }

  sortUserRecords(): void {
    this.userRecords.sort((a, b) => b.wins - a.wins);
  }
}
