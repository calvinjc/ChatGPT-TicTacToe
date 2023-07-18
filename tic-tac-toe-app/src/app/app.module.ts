import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UsernameComponent } from './username/username.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { RecordsComponent } from './records/records.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    UsernameComponent,
    TictactoeComponent,
    RecordsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
