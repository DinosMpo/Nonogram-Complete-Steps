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
	ctx.stroke();
	ctx.closePath();
};

Nonogram.prototype.drawRowNumbers = function() {
	ctx.fillStyle = 'black';
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(this.rowNumbersGrid[i].number < 10) {
			ctx.font = (this.blockSize)+"px Arial";
			ctx.fillText(this.rowNumbersGrid[i].number,
			(this.rowNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
			(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
		}else{
			ctx.font = (this.blockSize-3)+"px Arial";
			ctx.fillText(this.rowNumbersGrid[i].number,
			(this.rowNumbersGrid[i].x),
			(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
		}
	}
};

Nonogram.prototype.drawColumnNumbers = function() {
    ctx.fillStyle = 'black';
    for (var i = 0; i < this.columnNumbersGrid.length; i++) {
    	if(this.columnNumbersGrid[i].number < 10) {
			ctx.font = (this.blockSize)+"px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number,
				(this.columnNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
				(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
		}else{
			ctx.font = (this.blockSize-3)+"px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number,
				(this.columnNumbersGrid[i].x),
				(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
		}
    }
};

Nonogram.prototype.fillCels = function(mouseX, mouseY) {
	//Ορίζουμε το μέγεθος της γραμμής που θέλουμε
	ctx.lineWidth = 3;
	//Ξεκινάμε το "μονοπάτι" που θέλουμε να ζωγραφίσουμε
	ctx.beginPath();
	// κελιά ανά γραμμή
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
	   if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
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
				if(this.rowNumbersGrid[i].number < 10) {
					ctx.font = (this.blockSize)+"px Arial";
					ctx.fillText(this.rowNumbersGrid[i].number, 
						(this.rowNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
						(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
				}else{
					ctx.font = (this.blockSize-3)+"px Arial";
					ctx.fillText(this.rowNumbersGrid[i].number, 
						(this.rowNumbersGrid[i].x),
						(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
				}
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
            		if(this.columnNumbersGrid[i].number < 10) {
						ctx.font = (this.blockSize)+"px Arial";
						ctx.fillText(this.columnNumbersGrid[i].number, 
							(this.columnNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
							(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
					}else{
						ctx.font = (this.blockSize-3)+"px Arial";
						ctx.fillText(this.columnNumbersGrid[i].number, 
							(this.columnNumbersGrid[i].x),
							(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
					}
	                this.columnNumbersGrid[i].value = 0;
	            }
	            break;
	        }
	    }
	ctx.stroke();
	ctx.closePath();
	if(this.fillCellChoice == "default") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y &&  mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value == 0) { //paint the cell black
					this.cellChoices.update();
	              	this.cellChoices.pastCells.push({cell: i, value: 0});
	                this.emptyGrid[i].value = 1;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.drawBlackCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 1});
            		this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
				}else if(this.emptyGrid[i].value == 1) { //fill the cell with an x
					this.cellChoices.update();
	              	this.cellChoices.pastCells.push({cell: i, value: 1});
	                this.emptyGrid[i].value = 2;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.drawXCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 2});
	            	this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
				}else { //Clear the cell
					this.cellChoices.update();
            		this.cellChoices.pastCells.push({cell: i, value: 2});    
	                this.emptyGrid[i].value = 0;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 0});
           			this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
				}
				break; //Για να βγούμε από την for αφού έχουμε  βρεί το κελί
			}
		}
	}else if(this.fillCellChoice == "black"){
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 1) {
               		this.cellChoices.update();
               		if(this.emptyGrid[i].value == 0) {
                   		this.cellChoices.pastCells.push({cell: i, value: 0});
              	 	}else{
                   		this.cellChoices.pastCells.push({cell: i, value: 2});
               		}
	               	this.emptyGrid[i].value = 1;//fil the cell black
	               	this.drawWhiteCell(this.emptyGrid[i]);
	               	this.drawBlackCell(this.emptyGrid[i]);
	               	this.cellChoices.newCells.push({cell: i, value: 1});
	               	this.strokeCurrentChoice(this.emptyGrid[i]);
	               	this.drawPreview(this.emptyGrid[i]);
	               	this.cellChoices.index ++;
				}else{
					this.cellChoices.update();
					this.cellChoices.pastCells.push({cell: i, value: 1});
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.cellChoices.newCells.push({cell: i, value: 0});
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.cellChoices.index ++;
				}
				break; //Για να βγούμε από την for αφού έχουμε  βρεί το κελί
			}
		}
	}else if(this.fillCellChoice == "x") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 2) {
	                this.cellChoices.update();
	                if(this.emptyGrid[i].value == 0) {
	                    this.cellChoices.pastCells.push({cell: i, value: 0});
	                }else{
                    	this.cellChoices.pastCells.push({cell: i, value: 1});
                	}
	                this.emptyGrid[i].value = 2;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.drawXCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 2});
	                this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
	            }else{
	                this.cellChoices.update();
	                this.cellChoices.pastCells.push({cell: i, value: 2});
	                this.emptyGrid[i].value = 0;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 0});
	                this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
	            }
				break; //Για να βγούμε από την for αφού έχουμε  βρεί το κελί
			}
		}
	}else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 0) {
	                this.cellChoices.update();
	                if(this.emptyGrid[i].value == 1) {
	                    this.cellChoices.pastCells.push({cell: i, value: 1});
	                }else{
	                    this.cellChoices.pastCells.push({cell: i, value: 2});
	                }
	                this.emptyGrid[i].value = 0;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.cellChoices.newCells.push({cell: i, value: 0});
	                this.strokeCurrentChoice(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.cellChoices.index ++;
	            }
				break; //Για να βγούμε από την for αφού έχουμε  βρεί το κελί
			}
		}
 	}
};

//Ζωγραφίζει το κελί μαύρο
let drawBlackCellValue = 3; 
Nonogram.prototype.drawBlackCell = function(cell) {
    ctx.fillStyle = 'black';
    ctx.fillRect(cell.x + (drawBlackCellValue/scaleFactor), 
    	cell.y + (drawBlackCellValue/scaleFactor), 
    	cell.w - ((drawBlackCellValue/scaleFactor) * 2), 
    	cell.h - ((drawBlackCellValue/scaleFactor) * 2));
};

//Ζωγραφίζει το κελί άσπρο
let drawWhiteCellValue = 2;
Nonogram.prototype.drawWhiteCell = function(cell) {
    ctx.fillStyle = "white";
    ctx.fillRect(cell.x + (drawWhiteCellValue/scaleFactor), 
    	cell.y + (drawWhiteCellValue/scaleFactor), 
    	cell.w - ((drawWhiteCellValue/scaleFactor) * 2), 
    	cell.h - ((drawWhiteCellValue/scaleFactor) * 2));
};

//Ζωγραφίζει ένα Χ μέσα στο κελί
let drawXCellValue = 3;
Nonogram.prototype.drawXCell = function(cell) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cell.x + (drawXCellValue/scaleFactor), cell.y + (drawXCellValue/scaleFactor));
    ctx.lineTo(cell.x + this.blockSize - (drawXCellValue/scaleFactor), cell.y + this.blockSize - (drawXCellValue/scaleFactor));
    ctx.moveTo(cell.x + this.blockSize - (drawXCellValue/scaleFactor), cell.y + (drawXCellValue/scaleFactor));
    ctx.lineTo(cell.x + (drawXCellValue/scaleFactor), cell.y + this.blockSize - (drawXCellValue/scaleFactor));
    ctx.stroke();
    ctx.closePath();
};

//Ζωγραφίζει το κελί κόκκινο
let drawRedCellValue = 3; 
Nonogram.prototype.drawRedCell = function(cell) {
    ctx.fillStyle = 'red';
    ctx.fillRect(cell.x + (drawBlackCellValue/scaleFactor), 
    	cell.y + (drawBlackCellValue/scaleFactor), 
    	cell.w - ((drawBlackCellValue/scaleFactor) * 2), 
    	cell.h - ((drawBlackCellValue/scaleFactor) * 2));
};

//Ζωγραφίζει το κελί μπλε
let drawBlueCellValue = 3; 
Nonogram.prototype.drawBlueCell = function(cell) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(cell.x + (drawBlackCellValue/scaleFactor), 
    	cell.y + (drawBlackCellValue/scaleFactor), 
    	cell.w - ((drawBlackCellValue/scaleFactor) * 2), 
    	cell.h - ((drawBlackCellValue/scaleFactor) * 2));
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
                this.drawWhiteCell(this.previousChoice.cell[i]);
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

Nonogram.prototype.drawPreview = function(cell) {
    let x = 0; //Οι μεταβλητές x και y αντιπροσωπεύουν τις συντεταγμένες
    let y = 0; //x και y του κελιού που πατήθηκε
    let widthPreview = this.maxRowNumberSize * this.blockSize;
    let heightPreview = this.maxColumnNumberSize * this.blockSize;
    let size; //Το size θα αντιπροσωπεύει το μέγεθος του drawPreview 
    if(widthPreview == heightPreview) {
        size = widthPreview-2;
        x = (Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length));
        y = (Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length));
    }else if(widthPreview > heightPreview){
        size = heightPreview;
        x = Math.floor(((cell.x) - widthPreview) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
        y = Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
    }else{
        size = widthPreview-8;
        x = Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
        y = Math.floor(((cell.y) - heightPreview) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
    }
    let widthCell = Math.floor(size / this.levelGrid[0].length); //328/5
    let heightCell = Math.floor(size / this.levelGrid.length); //328/5
    if(cell.value === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
    }else{
        ctx.fillStyle = "white";
        ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
    }
};

//Επιλογή πολλαπλών κελιών
Nonogram.prototype.fillMultiCells = function(mouseX, mouseY, startPointMouseX, startPointMouseY) {
	var startCellValue = 0;
	var x = 0;
	var y = 0;
	for(var i=0;i<this.emptyGrid.length;i++) {
	  if(startPointMouseX >= this.emptyGrid[i].x && startPointMouseY >=      
	    this.emptyGrid[i].y && startPointMouseX <= (this.emptyGrid[i].x +   
	    this.blockSize) && startPointMouseY <= (this.emptyGrid[i].y +     
	    this.blockSize)) {
	      startCellValue = this.emptyGrid[i].value;
	       x = this.emptyGrid[i].x;
	      y = this.emptyGrid[i].y;
	  }
	}

	if((mouseX > x && (mouseX < x + this.blockSize)) || (mouseY > y && (mouseY < y + this.blockSize))) {
	    for(var i=0;i<this.emptyGrid.length;i++) { 
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX   
			<= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + 
			this.blockSize)) {
				if(this.emptyGrid[i].x == x && this.emptyGrid[i].y == y) {
					return;
				}else if(this.emptyGrid[i].x == this.currentChoice.cell.x &&    
					this.emptyGrid[i].y == this.currentChoice.cell.y) {
					return;
				}
				this.cellChoices.pastCells.push({cell: i, value: this.emptyGrid[i].value});
				this.emptyGrid[i].value = startCellValue;
				if(startCellValue == 1) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, 
					this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.cellChoices.index ++;
				}else if(startCellValue == 2) {
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, 
					this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.cellChoices.index ++;
				}else{
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.currentChoice.cell = this.emptyGrid[i];
					this.previousChoice.cell.push(this.emptyGrid[i]);
					ctx.strokeStyle = "red";
					ctx.lineWidth   = 4;
					ctx.strokeRect(this.currentChoice.cell.x+5, this.currentChoice.cell.y+5, 
					this.blockSize-10, this.blockSize-10);
					this.cellChoices.newCells.push({cell: i, value: 1});
					this.cellChoices.index ++;
				}
			}
		}      
	}
};

Nonogram.prototype.redrawProgress = function() {
    for(let i=0; i<this.emptyGrid.length; i++) {
        if(this.emptyGrid[i].value == 1){
             this.drawBlackCell(this.emptyGrid[i]);
             this.drawPreview(this.emptyGrid[i]);
         }else if(this.emptyGrid[i].value == 2) {
           this.drawWhiteCell(this.emptyGrid[i]);
           this.drawXCell(this.emptyGrid[i]);
           this.drawPreview(this.emptyGrid[i]);
         }
    }
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    for(let i=0; i<this.rowNumbersGrid.length; i++) {
        if(this.rowNumbersGrid[i].value == 1) {
             ctx.moveTo(this.rowNumbersGrid[i].x+3, 
             (this.rowNumbersGrid[i].y + this.blockSize)-3);
           ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, 
             this.rowNumbersGrid[i].y+3);
         }
    }

    for(let i=0; i<this.columnNumbersGrid.length; i++) {
        if(this.columnNumbersGrid[i].value == 1) {    
             ctx.moveTo(this.columnNumbersGrid[i].x+3, 
             (this.columnNumbersGrid[i].y + this.blockSize)-3);
           ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, 
             this.columnNumbersGrid[i].y+3);
         }
   }
   ctx.closePath();
   ctx.stroke();
};

Nonogram.prototype.strokeMultiplayerCurrentChoice = function(cell) {
    if(this.previousChoice.active) {
        ctx.beginPath();
        for(let i=0; i<this.previousChoice.cell.length; i++) {
            if(this.previousChoice.cell[i].value === 1) {
                this.drawWhiteCell(this.previousChoice.cell[i]);
                this.drawBlueCell(this.previousChoice.cell[i]);
            }else if(this.previousChoice.cell[i].value === 2) {
                this.drawWhiteCell(this.previousChoice.cell[i]);
                this.drawXCell(this.previousChoice.cell[i]);
            }else{
                this.drawWhiteCell(this.previousChoice.cell[i]);
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

Nonogram.prototype.strokeTeamMateChoice = function(cell) {
    if(this.previousTeamMateChoice.active) {
        ctx.beginPath();
        for(let i=0; i<this.previousTeamMateChoice.cell.length; i++) {
            if(this.previousTeamMateChoice.cell[i].value === 1) {
                this.drawWhiteCell(this.previousTeamMateChoice.cell[i]);
                this.drawRedCell(this.previousTeamMateChoice.cell[i]);
            }else if(this.previousTeamMateChoice.cell[i].value === 2) {
                this.drawWhiteCell(this.previousTeamMateChoice.cell[i]);
                this.drawXCell(this.previousTeamMateChoice.cell[i]);
            }else{
                ctx.fillStyle = "white";
                ctx.fillRect(this.previousTeamMateChoice.cell[i].x + 2,
                                this.previousTeamMateChoice.cell[i].y + 2,
                                this.previousTeamMateChoice.cell[i].w - 4,
                                this.previousTeamMateChoice.cell[i].h - 4);
            }
        }
        ctx.stroke();
        ctx.closePath();
        this.previousTeamMateChoice.cell = [];
    }
    this.previousTeamMateChoice.cell.push(cell);
    this.previousTeamMateChoice.active = true;
    ctx.strokeStyle = "blue";
    ctx.lineWidth   = 4;
    ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
};

Nonogram.prototype.multiplayerFillCels = function(mouseX, mouseY) {
    var gameData = {
             dataType:       "",
             fillCellChoice: "",
             cell:           0,
             value:          0,
             room:           gameRoom,
             originX:        originX,
             originY:        originY,
             scaleFactor:    scaleFactor
    };
    ctx.lineWidth = 3;
    for(var i=0; i<this.rowNumbersGrid.length; i++) {
        if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && 
            mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && 
            mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
                gameData = nonogram.multiplayerStrokeRowNumbersChoice(i, gameData);
                return gameData;
          }
    }

    for(var i=0; i<this.columnNumbersGrid.length; i++) {
          if(mouseX >= this.columnNumbersGrid[i].x && mouseY >= this.columnNumbersGrid[i].y &&  
           mouseX <= (this.columnNumbersGrid[i].x + this.blockSize) && mouseY <= 
           (this.columnNumbersGrid[i].y + this.blockSize)) {
                 gameData = nonogram.multiplayerStrokeColumnNumbersChoice(i, gameData);
                 return gameData;
          }
    }

    var block = this.blockSize;
    var columnSize = this.maxColumnNumberSize;
    var columnLength = this.levelGrid.length;
    var rowLength = this.levelGrid[0].length;
    var rowSize = this.maxRowNumberSize;

    if(this.fillCellChoice == "default") {
        for(var i=0;i<this.emptyGrid.length;i++) {
            var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
            var value = this.emptyGrid[i].value;
            var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
            var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
            var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;

            if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {
                if(value == 0) {
                      this.emptyGrid[i].value = 1;
                      this.drawBlueCell(this.emptyGrid[i]);
                      this.drawPreview(this.emptyGrid[i]);
                      this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
                      gameData.value  = 1;
                }else if(value == 1) {
                      this.emptyGrid[i].value = 2;
                      this.drawWhiteCell(this.emptyGrid[i]);
                      this.drawXCell(this.emptyGrid[i]);
                      this.drawPreview(this.emptyGrid[i]);
                      this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
                      gameData.value  = 2;
                }else {
                      this.emptyGrid[i].value = 0;
                      ctx.fillStyle = "white";
                    ctx.fillRect(x + 2, y + 2, width - 3, height - 3);
                    this.drawPreview(this.emptyGrid[i]);
                    this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
                      gameData.value  = 0;            
                }
                this.emptyGrid[i].playerChoice = "yours";
                gameData.dataType = "fill cell";
                gameData.fillCellChoice = "default";
                gameData.cell  =  i;
                return gameData;
            }
        }
    }else if(this.fillCellChoice == "black") {
        for(var i=0;i<this.emptyGrid.length;i++) {
            var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
            var value = this.emptyGrid[i].value;
            var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
            var xPos = ((x - (rowSize * block)) / block) * 
                       Math.floor(((rowSize * block) / rowLength)) - 2;
            var yPos = ((y - (columnSize * block)) / block) * 
                       Math.floor(((columnSize * block) / columnLength)) - 2;

            if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {
                if(this.emptyGrid[i].value !== 1) {
                      this.emptyGrid[i].value = 1;
                      this.drawBlueCell(this.emptyGrid[i]);
                      this.drawPreview(this.emptyGrid[i]);
                      this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
                      gameData.value  = 1;
                }else{
                    this.emptyGrid[i].value = 0;
                      this.drawWhiteCell(this.emptyGrid[i]);
                      this.drawPreview(this.emptyGrid[i]);
                      this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
                      gameData.value  = 0;
                }
                this.emptyGrid[i].playerChoice = "yours";
                gameData.dataType = "fill cell";
                gameData.fillCellChoice = "black";
                gameData.cell  =  i;
                return gameData;
            }
        }
    }else if(this.fillCellChoice == "x") {
        for(var i=0;i<this.emptyGrid.length;i++) {
            var value = this.emptyGrid[i].value;
            var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
            var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
            var xPos = ((x - (rowSize * block)) / block) * 
                       Math.floor(((rowSize * block) / rowLength)) - 2;
            var yPos = ((y - (columnSize * block)) / block) * 
                       Math.floor(((columnSize * block) / columnLength)) - 2;
            
            if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {
                if(this.emptyGrid[i].value !== 2) {
                    this.emptyGrid[i].value = 2;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
					gameData.value  = 2;
                }else{
                    this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
					gameData.value  = 0;
                }
                this.emptyGrid[i].playerChoice = "yours";
                gameData.dataType = "fill cell";
                gameData.fillCellChoice = "x";
                gameData.cell  =  i;
                return gameData;
            }
        }
    }else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
	        var value = this.emptyGrid[i].value;
	        var x = this.emptyGrid[i].x, y = this.emptyGrid[i].y;
	        var width = this.emptyGrid[i].w, height = this.emptyGrid[i].h;
	        var xPos = ((x - (rowSize * block)) / block) * Math.floor(((rowSize * block) / rowLength)) - 2;
	        var yPos = ((y - (columnSize * block)) / block) * Math.floor(((columnSize * block) / columnLength)) - 2;
	        
	        if(mouseX >= x && mouseY >= y && mouseX <= (x + block) && mouseY <= (y + block)) {
	            if(this.emptyGrid[i].value !== 0) {
	                this.emptyGrid[i].value = 0;
	                this.drawWhiteCell(this.emptyGrid[i]);
	                this.drawPreview(this.emptyGrid[i]);
	                this.strokeMultiplayerCurrentChoice(this.emptyGrid[i]);
	                gameData.value  = 0;
	            }
	            this.emptyGrid[i].playerChoice = "yours";
	            gameData.dataType = "fill cell";
	            gameData.fillCellChoice = "white";
	            gameData.cell  =  i;
	            return gameData;
	        }
	    }
	}
};

Nonogram.prototype.multiplayerStrokeRowNumbersChoice = function(i, gameData) {
    if(this.rowNumbersGrid[i].value == 0) {
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.moveTo(this.rowNumbersGrid[i].x+3, 
		       (this.rowNumbersGrid[i].y + this.blockSize)-3);
		ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, 
		        this.rowNumbersGrid[i].y+3);
		ctx.stroke();
		ctx.closePath();
		ctx.strokeStyle = "black";
		this.rowNumbersGrid[i].value = 1;
		gameData.dataType = "fill cell row numbers grid";
		gameData.cell  =  i;
		gameData.value  = 1;   
		return gameData;   
    }else{
		ctx.fillStyle = "#e0e0d1";
		ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
		ctx.fillStyle = "black";
		if(this.rowNumbersGrid[i].number < 10) {
			ctx.font = (this.blockSize)+"px Arial";
			ctx.fillText(this.rowNumbersGrid[i].number, 
				(this.rowNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
				(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
		}else{
			ctx.font = (this.blockSize-3)+"px Arial";
			ctx.fillText(this.rowNumbersGrid[i].number, 
				(this.rowNumbersGrid[i].x),
				(this.rowNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
		}
		this.rowNumbersGrid[i].value = 0;
		gameData.dataType = "fill cell row numbers grid";
		gameData.cell  =  i;
		gameData.value  = 0;
		return gameData;
    }
};

Nonogram.prototype.multiplayerStrokeColumnNumbersChoice = function(i, gameData) {
    if(this.columnNumbersGrid[i].value == 0) {
        ctx.beginPath();
          ctx.strokeStyle = "red";
          ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + 
                   this.blockSize)-3);
          ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, 
                    this.columnNumbersGrid[i].y+3);
          ctx.stroke();
          ctx.closePath();
          ctx.strokeStyle = "black";
          this.columnNumbersGrid[i].value = 1;
          gameData.dataType = "fill cell column numbers grid";
          gameData.cell  =  i;
          gameData.value  = 1;
          return gameData;
    }else{
	    ctx.fillStyle = "#e0e0d1";
	    ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
	    ctx.fillStyle = "black";
		if(this.columnNumbersGrid[i].number < 10) {
			ctx.font = (this.blockSize)+"px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number, 
				(this.columnNumbersGrid[i].x+(Math.floor(this.blockSize/4))),
				(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/6))));
		}else{
			ctx.font = (this.blockSize-3)+"px Arial";
			ctx.fillText(this.columnNumbersGrid[i].number, 
				(this.columnNumbersGrid[i].x),
				(this.columnNumbersGrid[i].y+(this.blockSize-Math.floor(this.blockSize/5))));
		}
	    this.columnNumbersGrid[i].value = 0;
		gameData.dataType = "fill cell column numbers grid";
		gameData.cell  =  i;
		gameData.value  = 0;
		return gameData;
    }
};