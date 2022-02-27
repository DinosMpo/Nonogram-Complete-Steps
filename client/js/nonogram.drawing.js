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
	//Ορίζουμε το μέγεθος της γραμμής που θέλουμε
	ctx.lineWidth = 3;
	//Ξεκινάμε το "μονοπάτι" που θέλουμε να ζωγραφίσουμε
	ctx.beginPath();
	// κελιά ανά γραμμή
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
	   if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y                && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
	//Αν το κελί έχει value 0 δηλαδή άμα δεν το είχε επιλέξει ο χρήστης τότε να το μαρκάρει με κόκκινη γραμμή 
	      if(this.rowNumbersGrid[i].value === 0) {
	          ctx.strokeStyle = "red";
	         ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
	          ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
	          this.rowNumbersGrid[i].value = 1;
	       }else{
	//Αν το κελί έχει value διαφορετικό από 0 δηλαδή άμα ο χρήστης το είχε επιλέξει ήδη μια φορά τότε να το ξανά ζωγραφίσει όπως ήτανε 
	          ctx.fillStyle = "#e0e0d1";
	          ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
	          ctx.fillStyle = "black";
	          ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
	         ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
	          this.rowNumbersGrid[i].value = 0;
	       }
	      break;
	   }
	}

	   
	// κελιά ανά στήλη
	for(var i=0; i<this.columnNumbersGrid.length; i++) {
	        if(mouseX >= this.columnNumbersGrid[i].x && mouseY >= this.columnNumbersGrid[i].y && mouseX <= (this.columnNumbersGrid[i].x + this.blockSize) && mouseY <= (this.columnNumbersGrid[i].y + this.blockSize)) {
	            if(this.columnNumbersGrid[i].value === 0) {
	                ctx.strokeStyle = "red";
	                ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
	                ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
	                this.columnNumbersGrid[i].value = 1;
	            }else{
	                ctx.fillStyle = "#e0e0d1";
	                ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
	                ctx.fillStyle = "black";
	                ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
	                ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
	                this.columnNumbersGrid[i].value = 0;
	            }
	            break;
	        }
	    }
	ctx.stroke();
	ctx.closePath();

	for(var i=0; i<this.emptyGrid.length; i++) {
		if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
			if(this.emptyGrid[i].value == 0) {
				this.emptyGrid[i].value = 1;
				//Καθαρίζουμε το κελί κάνοντας το άσπρο
				this.drawWhiteCell(this.emptyGrid[i]);
				//και το ζωγραφίζουμε μαύρο
				this.drawBlackCell(this.emptyGrid[i]);
				this.strokeCurrentChoice(this.emptyGrid[i]);
			}else if(this.emptyGrid[i].value == 1) {
				this.emptyGrid[i].value = 2;
				//Καθαρίζουμε το κελί κάνοντας το άσπρο
				this.drawWhiteCell(this.emptyGrid[i]);
				this.drawXCell(this.emptyGrid[i]);
				this.strokeCurrentChoice(this.emptyGrid[i]);
			}else { 
				this.emptyGrid[i].value = 0;
				this.drawWhiteCell(this.emptyGrid[i]);
				this.strokeCurrentChoice(this.emptyGrid[i]);
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

Nonogram.prototype.strokeCurrentChoice = function(cell) {
    if(this.previousChoice.active) {
        ctx.beginPath();
        for(let i=0; i<this.previousChoice.cell.length; i++) {
            if(this.previousChoice.cell[i].value === 1) {
                this.drawWhiteCell(this.previousChoice.cell[i]);
                this.drawBlackCell(this.previousChoice.cell[i]);
            }else if(this.previousChoice.cell[i].value === 2) {
                this.drawWhiteCell(this.previousChoice.cell[i]);
                this.drawXCell(this.previousChoice.cell[i]);
            }else{
                ctx.fillStyle = "white";
                ctx.fillRect(this.previousChoice.cell[i].x + 2,                                                                     
                   this.previousChoice.cell[i].y + 2, 
                   this.previousChoice.cell[i].w - 4, 
                   this.previousChoice.cell[i].h - 4);
            }
        }
        ctx.stroke();
        ctx.closePath();
        this.previousChoice.cell = []; //Αδειάζουμε των πίνακα
    }
    this.currentChoice.cell = cell;
    this.previousChoice.cell.push(cell);
    this.previousChoice.active = true;
    ctx.strokeStyle = "red";
    ctx.lineWidth   = 4;
    ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
};