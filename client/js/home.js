"use strict";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let nonogram = new Nonogram( [[1,0,1,0,1],
		                        [0,1,0,1,0],
		                        [1,0,1,0,1],
		                        [0,1,0,1,0],
		                        [1,0,1,0,1]    ]);

canvas.width = nonogram.width;
canvas.height = nonogram.height;
nonogram.drawGrid();
nonogram.drawRowNumbers();
nonogram.drawColumnNumbers();

console.log("rowNumbers: " + nonogram.rowNumbers);
console.log("columnNumbers: "+ nonogram.columnNumbers);
console.log("blockSize: " + nonogram.blockSize);
console.log("width: " + nonogram.width);
console.log("height: " + nonogram.height);