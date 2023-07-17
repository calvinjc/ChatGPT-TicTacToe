# User:
Update the application to use angular material and look better than it does currently

# Notes

# Response:
To update the Tic Tac Toe application to use Angular Material and improve the visual appearance, you'll need to make a few modifications to the code and add Angular Material dependencies. Here's a step-by-step guide to help you achieve that:

1. **Install Angular Material**: Open a terminal or command prompt, navigate to the project directory, and run the following command to install Angular Material and its required dependencies:

```
ng add @angular/material
```

2. **Import Angular Material Modules**: Open the `app.module.ts` file and import the necessary Angular Material modules. Update the file as follows:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, CellComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

3. **Update HTML Templates**: Update the HTML templates to use Angular Material components and styling. Modify the `board.component.html` and `cell.component.html` files as follows:

**board.component.html**:
```html
<h1>Tic Tac Toe</h1>
<div id="board">
  <app-cell
    *ngFor="let cell of cells; let i = index"
    [value]="cell"
    (cellClicked)="handleCellClick(i)"
    matRipple
  ></app-cell>
</div>
<button mat-raised-button color="primary" (click)="resetGame()">Reset</button>
<p class="game-over" *ngIf="gameOver">{{ gameOver }}</p>
```

**cell.component.html**:
```html
<div class="cell" (click)="handleClick()" [ngClass]="value" matRipple>{{ value }}</div>
```

4. **Update CSS Styling**: Add custom CSS styles to enhance the visual appearance. Update the `board.component.css` and `cell.component.css` files as follows:

**board.component.css**:
```css
h1 {
  text-align: center;
  margin-bottom: 20px;
}

#board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

button {
  display: block;
  margin: 20px auto;
}

.game-over {
  text-align: center;
  font-weight: bold;
}
```

**cell.component.css**:
```css
.cell {
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  cursor: pointer;
}

.cell.X {
  color: #f44336;
}

.cell.O {
  color: #2196f3;
}
```

5. **Add Angular Material Icons**: Open the `index.html` file and add the following `<link>` tag inside the `<head>` section to include the Angular Material icon font:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

6. **Update Component Classes**: In the `board.component.ts` and `cell.component.ts` files, add the necessary imports for Angular Material components and remove unused imports. Modify the files as follows:

**board.component.ts**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  // Existing component code...
}
```

**cell.component.ts**:
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  // Existing component code...
}
```

7. **Update the App Component**: In the `app.component.html` file, replace the existing content with the `<app-board></app-board>` element wrapped in a `<main>` tag to provide a container. Modify the file as follows:

```html
<main>
  <app-board></app-board>
</main>
```

8. **Run the Application**: Start the Angular development server by running the command `ng serve` in the terminal. Open your web browser and navigate to `http://localhost:4200`. The updated Tic Tac Toe application with Angular Material styling should now be displayed.

By following these steps, you've incorporated Angular Material into the Tic Tac Toe application and enhanced its visual appearance. The buttons and cells will have Material Design styling, improving the overall look and feel of the game. Feel free to further customize the styling or explore additional Angular Material components as per your preference.