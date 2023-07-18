import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {
  username?: string;

  constructor(private router: Router) { }

  saveUsername(): void {
    if (this.username && this.username.trim() !== '') {
      localStorage.setItem('username', this.username);
      this.router.navigateByUrl('/game');
    }
  }
}
