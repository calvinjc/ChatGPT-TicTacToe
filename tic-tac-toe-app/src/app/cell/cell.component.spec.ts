import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the cell component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the cell value', () => {
    component.value = 'X';
    fixture.detectChanges();

    const cellElement = fixture.nativeElement.querySelector('.cell');
    expect(cellElement.textContent).toBe('X');
  });

  it('should emit the cellClicked event on click', () => {
    spyOn(component.cellClicked, 'emit');
    const cellElement = fixture.nativeElement.querySelector('.cell');

    cellElement.click();
    fixture.detectChanges();

    expect(component.cellClicked.emit).toHaveBeenCalled();
  });
});
