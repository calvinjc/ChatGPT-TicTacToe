import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() value: string = '';
  @Output() cellClicked = new EventEmitter<void>();

  handleClick(): void {
    this.cellClicked.emit();
  }
}
