import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { CellComponent } from '../cell/cell.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent, CellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the board component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty board at the start', () => {
    expect(component.cells).toEqual(['', '', '', '', '', '', '', '', '']);
  });

  it('should switch players after each move', () => {
    const cell1 = fixture.nativeElement.querySelector('.cell:nth-child(1)');
    const cell2 = fixture.nativeElement.querySelector('.cell:nth-child(2)');

    cell1.click();
    fixture.detectChanges();
    expect(cell1.textContent).toBe('X');
    expect(cell2.textContent).toBe('');

    cell2.click();
    fixture.detectChanges();
    expect(cell1.textContent).toBe('X');
    expect(cell2.textContent).toBe('O');
  });

  it('should declare a winner when a player wins', () => {
    const cells = fixture.nativeElement.querySelectorAll('.cell');
    cells[0].click(); // X
    cells[3].click(); // O
    cells[1].click(); // X
    cells[4].click(); // O
    cells[2].click(); // X
    fixture.detectChanges();

    const gameOverText = fixture.nativeElement.querySelector('p');
    expect(gameOverText.textContent).toContain('X wins!');
  });

  it('should declare a draw when there are no more moves', () => {
    const cells = fixture.nativeElement.querySelectorAll('.cell');
    cells[0].click(); // X
    cells[1].click(); // O
    cells[2].click(); // X
    cells[3].click(); // O
    cells[4].click(); // X
    cells[5].click(); // O
    cells[7].click(); // X
    cells[6].click(); // O
    cells[8].click(); // X
    fixture.detectChanges();

    const gameOverText = fixture.nativeElement.querySelector('p');
    expect(gameOverText.textContent).toContain("It's a draw!");
  });

  it('should reset the game when reset button is clicked', () => {
    const cells = fixture.nativeElement.querySelectorAll('.cell');
    cells[0].click();
    cells[1].click();
    cells[2].click();
    fixture.detectChanges();

    const resetButton = fixture.nativeElement.querySelector('button');
    resetButton.click();
    fixture.detectChanges();

    expect(component.cells).toEqual(['', '', '', '', '', '', '', '', '']);
  });
});
