# User:
Your css is incorrect.  The .cell class is in the cell component but you put the css for that class in the board.component.css file

# Response:
Apologies for the confusion. You're correct that the `.cell` class should be in the `cell.component.css` file. Here's the corrected version:

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
}
```

Please move the `.cell` CSS rules from `board.component.css` to `cell.component.css`. That way, the styles will be applied correctly to the `CellComponent`.