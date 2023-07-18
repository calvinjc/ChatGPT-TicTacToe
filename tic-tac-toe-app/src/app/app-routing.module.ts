import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsernameComponent } from './username/username.component';
import { GameComponent } from './game/game.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  { path: '', redirectTo: '/username', pathMatch: 'full' },
  { path: 'username', component: UsernameComponent },
  { path: 'game', component: GameComponent },
  { path: 'records', component: RecordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
