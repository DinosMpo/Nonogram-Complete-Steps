function Cell(w, h, x, y, value, playerChoice) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
	this.playerChoice = playerChoice;
};

function NumberCell(w, h, x, y, value, number) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
	this.number = number;
};

function Nonogram(levelGrid) {
	this.levelGrid = levelGrid;
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let size;

	if(windowWidth > windowHeight) {
		size = windowHeight - 50;
	}else{
		size = windowWidth;
	}

	this.rowNumbers = [];
	for(let i=0;i<this.levelGrid.length;i++) {
		this.rowNumbers[i] = []; //ένας πίνακας για κάθε γραμμή
		this.rowNumbers[i][0] = 0; //δίνουμε μια αρχική τιμή στον πίνακα
	}

	for(let row=0; row<this.levelGrid.length; row++) { // Για κάθε γραμμή
		let counter = 0;
		let depth = 0;
		for(let column=0; column<this.levelGrid[row].length; column++) {
			if(this.levelGrid[row][column] == 1) {
				counter += 1;
				this.rowNumbers[row][depth] = counter;
			}else{
				if(counter != 0) {
					this.rowNumbers[row][depth] = counter;
					counter = 0;
					depth++;
				}
			}
		}
	}

	this.columnNumbers = [];
	for(let i=0; i<this.levelGrid[0].length;i++) {
		this.columnNumbers[i] = [];
		this.columnNumbers[i][0] = 0;
	}
	for(let column=0; column<this.levelGrid[0].length; column++) {
		let counter = 0;
		let depth = 0;
		for(let row = 0; row < this.levelGrid.length; row++) {
			if(this.levelGrid[row][column]==1) {
				counter += 1;
				this.columnNumbers[column][depth] = counter;
			}else{
				if(counter !=0) {
					this.columnNumbers[column][depth] = counter;
					counter = 0;
					depth++;
				}
			}
		}
	}

	this.maxRowNumberSize = 0;
	this.maxColumnNumberSize = 0;

	for(let i=0; i<this.rowNumbers.length; i++) {
		if(this.maxRowNumberSize < this.rowNumbers[i].length) {
			this.maxRowNumberSize = this.rowNumbers[i].length;
		}
	}

	for(let i=0; i<this.columnNumbers.length; i++) {
		if(this.maxColumnNumberSize < this.columnNumbers[i].length) {
			this.maxColumnNumberSize = this.columnNumbers[i].length;
		}
	}

	let maxSize;
	if(this.maxRowNumberSize > this.maxColumnNumberSize) {
		maxSize = this.maxRowNumberSize + this.levelGrid.length;
	}else{
		maxSize = this.maxColumnNumberSize + this.levelGrid.length;
	}

	this.blockSIze = 0;
	this.blockSize = Math.floor((size / maxSize) - 1);

	this.width = 0;
	this.height = 0;

	this.width = (this.levelGrid[0].length + this.maxRowNumberSize) * this.blockSize;
	this.height = (this.levelGrid.length + this.maxColumnNumberSize) * this.blockSize;

	this.rowNumbersGrid = [];
	this.columnNumbersGrid = [];
 	
 	for(var i=0; i<this.rowNumbers.length; i++) {
 		for(var y=0; y<this.rowNumbers[i].length; y++) {
 			this.rowNumbersGrid.push(new NumberCell(this.blockSize, this.blockSize, (y*this.blockSize), ((this.maxColumnNumberSize)*this.blockSize)+(i*this.blockSize), 0, this.rowNumbers[i][y]));
 		}
 	}
 	for(var i=0; i<this.columnNumbers.length; i++) {
 		for(var y=0;y<this.columnNumbers[i].length; y++) {
 			this.columnNumbersGrid.push(new NumberCell(this.blockSize, this.blockSize, ((this.maxRowNumberSize)*this.blockSize)+(i*this.blockSize), (y*this.blockSize), 0, this.columnNumbers[i][y]));
 		}
 	}

 	this.emptyGrid = [];
	for(var i=this.maxColumnNumberSize*this.blockSize; i<this.height; i+=this.blockSize) {
		for(var y=this.maxRowNumberSize*this.blockSize; y<this.width;  y+=this.blockSize) {
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0, ""));
		}
	}

	this.currentChoice = {
	   cell: []
	};
	this.previousChoice = {
	   active: false,
	   cell: []
	};

	this.fillCellChoice = "default";

	this.cellChoices = {
        pastCells: [], newCells : [], index: 0,
        update   : function() {
            if(this.index < this.pastCells.length) {
                let limit = this.pastCells.length;
                for(let i=this.index; i<limit; i++) {
                    this.pastCells.pop();
                    this.newCells.pop();
                }
                this.index = this.pastCells.length;
            }
        }
	};

	this.findProgress = function() {
		let progress = 0;
		for(let i=0; i<this.emptyGrid.length; i++) {
			if(this.emptyGrid[i].value != 0) {
				progress++;
			}
		}
		progress = (progress * 100) / this.emptyGrid.length;
		return Math.floor(progress);
	};

	this.userChoices = {};
	this.userChoices.levelGrid = [];
	this.userChoices.rowNumbersGrid = [];
	this.userChoices.columnNumbersGrid = [];

	this.findUserChoices = function() {
	    for(let i = 0; i < this.emptyGrid.length; i++) {
	        this.userChoices.levelGrid[i] = this.emptyGrid[i].value;
	    }

	    for(let i=0; i<this.rowNumbersGrid.length; i++) {
	        this.userChoices.rowNumbersGrid[i] = this.rowNumbersGrid[i].value;
	    }
	        
	    for(let i=0; i<this.columnNumbersGrid.length; i++) {
	       this.userChoices.columnNumbersGrid[i] = this.columnNumbersGrid[i].value;
	    }
	};

	this.retrieveProgress = function(levelGrid, rowNumbersGrid, columnNumbersGrid) {
	    this.userChoices.levelGrid = levelGrid;
	    this.userChoices.rowNumbersGrid = rowNumbersGrid;
	    this.userChoices.columnNumbersGrid = columnNumbersGrid;
	    for(let i=0; i < this.emptyGrid.length; i++) {
	        this.emptyGrid[i].value = this.userChoices.levelGrid[i];
	    }

	    for(let i=0; i<this.rowNumbersGrid.length; i++) {
	        this.rowNumbersGrid[i].value = this.userChoices.rowNumbersGrid[i];
	    }

	    for(let i=0; i<this.columnNumbersGrid.length; i++) {
	        this.columnNumbersGrid[i].value = this.userChoices.columnNumbersGrid[i];
	    }
	};
	
	this.checkProgress = function() {
		var index = 0;
		for(var i=0;i<this.levelGrid.length;i++) {
			for(var y=0;y<this.levelGrid[i].length;y++) {
				if(this.levelGrid[i][y] == 1 && this.emptyGrid[index].value == 1) {
					this.correct = true;
				}
				else if(this.levelGrid[i][y] == 0 && (this.emptyGrid[index].value == 0 || this.emptyGrid[index].value == 2)){
					this.correct = true;
				}
				else{
					this.correct = false;
					return false;
				}
			index ++;
			}
		}
		if(this.correct == true) {
			return true;
		}
	}
	
	this.previousTeamMateChoice = {
		active: false
	};
	this.previousTeamMateChoice.cell = [];

	this.relocate = function() {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		if(windowWidth > windowHeight) {
			if(windowHeight > 359) {
				size = windowHeight - 50;
			}else{
				size = windowHeight;
			}
		}else{
			size = windowWidth;
		}
		this.blockSize = Math.floor((size / maxSize) - 1);
		this.width = (this.levelGrid[0].length + this.maxRowNumberSize) * this.blockSize;
		this.height = (this.levelGrid.length + this.maxColumnNumberSize) * this.blockSize;
		canvas.width = this.width;
		canvas.height = this.height;
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		this.drawGrid();
		ctx.restore();
		//---recalibrate the coordinates of every cell
		var indexCells = 0;
		for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
			for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) {
				this.emptyGrid[indexCells].w = this.blockSize;
				this.emptyGrid[indexCells].h = this.blockSize;
				this.emptyGrid[indexCells].x = y;
				this.emptyGrid[indexCells].y = i;
				indexCells++;
			}
		}
		//Cell numbers of every row
		var indexRow = 0;
		for (var i = 0; i < this.rowNumbers.length; i ++) {
			for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
				this.rowNumbersGrid[indexRow].w = this.blockSize;
				this.rowNumbersGrid[indexRow].h = this.blockSize;
				this.rowNumbersGrid[indexRow].x = (y * this.blockSize);
				this.rowNumbersGrid[indexRow].y = ( (this.maxColumnNumberSize) * this.blockSize) + (i * this.blockSize);
				indexRow++;
			}
		}
		//Cell numbers of every column
		var indexColumn = 0;
		for (var i = 0; i < this.columnNumbers.length; i ++) {
			for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
				this.columnNumbersGrid[indexColumn].w = this.blockSize;
				this.columnNumbersGrid[indexColumn].h = this.blockSize;
				this.columnNumbersGrid[indexColumn].x = ((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize);
				this.columnNumbersGrid[indexColumn].y = (y * this.blockSize);
				indexColumn++;
			}
		}
		ctx.save();
		ctx.translate(originX,originY);
		ctx.scale(scaleFactor,scaleFactor);
		this.drawRowNumbers();
		this.drawColumnNumbers();
		ctx.restore();
	};
};