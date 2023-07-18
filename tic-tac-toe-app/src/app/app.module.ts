import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsernameComponent } from './username/username.component';
import { GameComponent } from './game/game.component';
import { RecordsComponent } from './records/records.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { UserRecordService } from './user-record.service';

@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    GameComponent,
    RecordsComponent,
    BoardComponent,
    CellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [UserRecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
