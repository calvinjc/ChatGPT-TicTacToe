import { Component } from '@angular/core';
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
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  userRecords: MatTableDataSource<UserRecord>;
  displayedColumns: string[] = ['username', 'wins', 'losses', 'ties'];

  constructor(private userRecordService: UserRecordService) {
    this.userRecords = new MatTableDataSource<UserRecord>(this.userRecordService.getUserRecords());
    this.userRecords.sort = new MatSort();
  }
}
