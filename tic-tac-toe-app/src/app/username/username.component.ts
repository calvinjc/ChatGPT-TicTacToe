import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-username',
  template: `
    <h1>Change Username</h1>
    <form (ngSubmit)="register()">
      <mat-form-field appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput name="username" [(ngModel)]="username" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Register</button>
    </form>
  `,
  styles: [`
    form {
      max-width: 300px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  `]
})
export class UsernameComponent {
  username?: string;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.username) {
      this.userService.registerUser(this.username);
      localStorage.setItem('username', this.username);
      this.router.navigate(['/tictactoe']);
    }
  }
}
