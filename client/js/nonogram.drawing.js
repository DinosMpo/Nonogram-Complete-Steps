Nonogram.prototype.drawGrid = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.fillStyle = "#e0e0d1";
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height-(this.maxColumnNumberSize * this.blockSize));
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width-(this.maxRowNumberSize * this.blockSize), this.maxColumnNumberSize * this.blockSize);
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.lineWidth = 1;
	for(var i = (this.maxColumnNumberSize)*this.blockSize;i<this.height; i+=this.blockSize) {
		ctx.moveTo(0, i);
		ctx.lineTo(this.width, i);
	}
	for(var y=(this.maxRowNumberSize)*this.blockSize; y<this.width; y+=this.blockSize) {
		ctx.moveTo(y, 0);
		ctx.lineTo(y, this.height);
	}

	for(let i=0; i<this.maxColumnNumberSize; i++) {
		ctx.moveTo((this.maxRowNumberSize)*this.blockSize, (i+1)*this.blockSize);
		ctx.lineTo(this.width, (i+1)*this.blockSize);
	}

	for(let i=0; i<this.maxRowNumberSize; i++) {
		ctx.moveTo((i+1)*this.blockSize, (this.maxColumnNumberSize)*this.blockSize);
		ctx.lineTo((i+1)*this.blockSize, this.height);
	}
	ctx.fillStyle = 'black';
	ctx.lineWidth = 1;
	ctx.strokeRect(0,0,this.width,this.height);
	ctx.stroke();
	ctx.closePath();
};

Nonogram.prototype.drawRowNumbers = function() {
	ctx.fillStyle = 'black';
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		ctx.font = "bold " + (this.blockSize/2)+"px Arial";
		ctx.fillText(this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x)+(this.blockSize/3), (this.rowNumbersGrid[i].y)+((this.blockSize+8)/2));
		console.log(4);
	}
};

Nonogram.prototype.drawColumnNumbers = function() {
    ctx.fillStyle = 'black';
    for (var i = 0; i < this.columnNumbersGrid.length; i++) {
        ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
        ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x)+(this.blockSize/3), (this.columnNumbersGrid[i].y)+((this.blockSize+8)/2));
    }
};

Nonogram.prototype.fillCels = function(mouseX, mouseY) {
	for(var i=0; i<this.emptyGrid.length; i++) {
		if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
			if(this.emptyGrid[i].value == 0) {
				this.emptyGrid[i].value = 1;
				//Καθαρίζουμε το κελί κάνοντας το άσπρο
				this.drawWhiteCell(this.emptyGrid[i]);
				//και το ζωγραφίζουμε μαύρο
				this.drawBlackCell(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value == 1) {
				this.emptyGrid[i].value = 2;
				//Καθαρίζουμε το κελί κάνοντας το άσπρο
				this.drawWhiteCell(this.emptyGrid[i]);
				this.drawXCell(this.emptyGrid[i]);
			}else { 
				this.emptyGrid[i].value = 0;
				this.drawWhiteCell(this.emptyGrid[i]);
			}
		}
	}
};

//Ζωγραφίζει το κελί μαύρο
let drawBlackCellValue = 6; 
Nonogram.prototype.drawBlackCell = function(cell) {
    ctx.fillStyle = 'black';
    ctx.fillRect(cell.x + drawBlackCellValue, cell.y + drawBlackCellValue,      cell.w - (drawBlackCellValue * 2), cell.h - (drawBlackCellValue * 2));
};

//Ζωγραφίζει το κελί άσπρο
let drawWhiteCellValue = 2;
Nonogram.prototype.drawWhiteCell = function(cell) {
    ctx.fillStyle = "white";
    ctx.fillRect(cell.x + drawWhiteCellValue, cell.y + drawWhiteCellValue, cell.w - (drawWhiteCellValue * 2), cell.h - (drawWhiteCellValue * 2));
};

//Ζωγραφίζει ένα Χ μέσα στο κελί
let drawXCellValue = 6;
Nonogram.prototype.drawXCell = function(cell) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cell.x + drawXCellValue, cell.y + drawXCellValue);
    ctx.lineTo(cell.x + this.blockSize - drawXCellValue, cell.y + this.blockSize - drawXCellValue);
    ctx.moveTo(cell.x + this.blockSize - drawXCellValue, cell.y + drawXCellValue);
    ctx.lineTo(cell.x + drawXCellValue, cell.y + this.blockSize - drawXCellValue);
    ctx.stroke();
    ctx.closePath();
};