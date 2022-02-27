function Cell(w, h, x, y, value) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
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
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0));
		}
	}

	this.currentChoice = {
	   cell: []
	};
	this.previousChoice = {
	   active: false,
	   cell: []
	};


};