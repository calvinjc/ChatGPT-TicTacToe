import { Component } from '@angular/core';
import { UserService, UserRecord } from '../user.service';

@Component({
  selector: 'app-records',
  template: `
    <h1>User Records</h1>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Ties</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let record of userRecords">
          <td>{{ record.username }}</td>
          <td>{{ record.wins }}</td>
          <td>{{ record.losses }}</td>
          <td>{{ record.ties }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 0.5em;
      text-align: left;
      border-bottom: 1px solid black;
    }
  `]
})
export class RecordsComponent {
  userRecords: UserRecord[];

  constructor(private userService: UserService) {
    this.userRecords = userService.getUserRecords();
  }
}
