import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsernameComponent } from './username/username.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  { path: '', redirectTo: '/username', pathMatch: 'full' },
  { path: 'username', component: UsernameComponent },
  { path: 'tictactoe', component: TictactoeComponent },
  { path: 'records', component: RecordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
