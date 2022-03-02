function createSinglePlayerTools() {
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['redo_undo', 'clear', 'help', 'home'];
	const tools = document.getElementById("tools");
	const singleplayer = document.createElement('div');
	singleplayer.id = "singleplayer-tools";
	tools.appendChild(singleplayer);
	for(let i=0; i<singlePlayerTools.length; i++) {
		//Δημιουργούμε ένα li tag element και του ορίζουμε την class tool.
		var li = document.createElement('li');
		li.classList.add("tool");
		//Δημιουργούμε ένα div tag element και του ορίζουμε σαν class το όνομα του εργαλείου που θα αντιπροσωπεύει π.χ default. 
		var div = document.createElement('div');
		div.className = singlePlayerTools[i];
		//Δημιουργούμε ένα img tag element και του ορίζουμε το source μονοπάτι για την εικόνα του εργαλείου που θα αντιπροσωπεύει.
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerTools[i] + ".png";
		//Τέλος κάνουμε append το img tag στο li tag και το li tag στο singleplayer tag.
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	for(let i=0; i<singlePlayerExtraTools.length; i++) {   
		var li = document.createElement('li');
		li.classList.add("extra-tool");
		var div = document.createElement('div');
		div.className = singlePlayerExtraTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	singleplayer.firstElementChild.classList.add("active");

	let expandRedoUndoTool = ["undo", "redo"];
	let redo_undo_tool = document.getElementsByClassName("redo_undo")[0];
	//Δημιουργούμε ένα καινούριο div element για την προέκταση του εργαλειου
	let expand_redo_undo = document.createElement('div');
	expand_redo_undo.className = 'expand';
	for(let i=0; i<expandRedoUndoTool.length; i++) {
		let div = document.createElement('div');
		div.className = expandRedoUndoTool[i];
		let img = document.createElement('img');
		img.src = "img/" + expandRedoUndoTool[i] + ".png";
		div.appendChild(img);
		expand_redo_undo.appendChild(div)
	}
	redo_undo_tool.appendChild(expand_redo_undo);
};

createSinglePlayerTools();

let singleplayer = document.getElementById("singleplayer-tools");
let singleplayerTools = singleplayer.getElementsByClassName("tool");

for (let i = 0; i < singleplayerTools.length; i++) {
  singleplayerTools[i].addEventListener("click", function() {
    let current = singleplayer.getElementsByClassName("active");
    if(typeof current[0] !== 'undefined') {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}

function resetTools(toolContainer) {
  let singleplayer = document.getElementById("singleplayer-tools");
  let currentTool;
  let tools;

  if(toolContainer === "singleplayer") {
    currentTool = singleplayer.getElementsByClassName("active");
    tools = singleplayer.getElementsByClassName("tool");
    currentTool[0].className = currentTool[0].className.replace(" active", "");
    tools[0].className += " active";
  }
}

$(".default").click(function(){
    if(nonogram.fillCellChoice !== "default") {
        nonogram.fillCellChoice = "default";
    }
});

$(".black").click(function(){
    if(nonogram.fillCellChoice !== "black") {
        nonogram.fillCellChoice = "black";
    }
});

$(".x").click(function(){
    if(nonogram.fillCellChoice !== "x") {
        nonogram.fillCellChoice = "x";
    }
});

$(".white").click(function(){
    if(nonogram.fillCellChoice !== "white") {
        nonogram.fillCellChoice = "white";
    }
});

$(".redo_undo").click(function() {
    if($(".expand").is(":hidden")) {
        $(".redo_undo").css({"background": "linear-gradient(to bottom right, grey, #999966)"});
        $(".expand").show();
    }else{
        $(".expand").hide();
        $(".redo_undo").css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
    }
});

$(".undo").click(function(event){
    event.stopPropagation();
      if(nonogram.cellChoices.index == 0) {
        return;
    }
    let index = nonogram.cellChoices.index-1;
    let cell = nonogram.cellChoices.pastCells[index].cell;
    if(nonogram.cellChoices.pastCells[index].value == 0) {
        //white cell
        nonogram.emptyGrid[cell].value = 0;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index --;
    }else if(nonogram.cellChoices.pastCells[index].value == 1) {
        //black cell
        nonogram.emptyGrid[cell].value = 1;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index --;
    }else if(nonogram.cellChoices.pastCells[index].value == 2) {
        //x cell
        nonogram.emptyGrid[cell].value = 2;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawXCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index --;
    }
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(".redo").click(function(event){
    event.stopPropagation();    
    if(nonogram.cellChoices.index == nonogram.cellChoices.newCells.length) {
        return;
    }
    let index;
    index = nonogram.cellChoices.index;
    let cell = nonogram.cellChoices.newCells[index].cell;
    if(nonogram.cellChoices.newCells[index].value == 0) {
        //white cell
        nonogram.emptyGrid[cell].value = 0;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index ++;
    }else if(nonogram.cellChoices.newCells[index].value == 1) {
        //black cell
        nonogram.emptyGrid[cell].value = 1;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index ++;
    }else if(nonogram.cellChoices.newCells[index].value == 2) {
        //x cell
        nonogram.emptyGrid[cell].value = 2;
        nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
        nonogram.drawXCell(nonogram.emptyGrid[cell]);
        nonogram.drawPreview(nonogram.emptyGrid[cell]);
        nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
        nonogram.cellChoices.index ++;
    }
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(".clear").click(function() {
    for(let i=0; i<nonogram.emptyGrid.length; i++) {
        nonogram.emptyGrid[i].value = 0;
    }
    for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
        nonogram.rowNumbersGrid[i].value = 0;
    }
    for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
        nonogram.columnNumbersGrid[i].value = 0;
    }
    clearCanvas();
    nonogram.drawGrid();
    nonogram.drawRowNumbers();
    nonogram.drawColumnNumbers();
    nonogram.cellChoices.index = 0;
    nonogram.cellChoices.update();
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(".help").click(function() {
    let helpChoices = { wrong: [], correct: [], index: [] };
    for(let i=0; i<nonogram.levelGrid.length; i++) {
        for(let y=0; y<nonogram.levelGrid[i].length; y++) {
             if(nonogram.levelGrid[i][y] === 1 && 
            nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 2) {                                  
       helpChoices.wrong.push(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);
                helpChoices.correct.push(nonogram.levelGrid[i][y]);
                helpChoices.index.push(i*nonogram.levelGrid[0].length+y);
            }else if(nonogram.levelGrid[i][y] === 0 && nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 1) {                helpChoices.wrong.push(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);
                helpChoices.correct.push(nonogram.levelGrid[i][y]);
                helpChoices.index.push(i*nonogram.levelGrid[0].length+y);
            }
        }
    }
    let randomChoice = Math.floor(Math.random() * helpChoices.index.length);
    if(helpChoices.correct[randomChoice] === 0 && helpChoices.wrong[randomChoice].value === 1) {        
        nonogram.emptyGrid[helpChoices.index[randomChoice]].value = 2;
        ctx.strokeStyle = "green";
        ctx.lineWidth   = 4;
        ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        setTimeout( function() {
            nonogram.drawWhiteCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
            ctx.strokeStyle = "green";
            ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        }, 500);
        setTimeout( function() {
            nonogram.drawXCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
            ctx.strokeStyle = "green";
            ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5,nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        }, 1000 );
        nonogram.drawPreview(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
        ctx.strokeStyle = "black";
    }else if(helpChoices.correct[randomChoice] === 1 && helpChoices.wrong[randomChoice].value === 2) {        
        nonogram.emptyGrid[helpChoices.index[randomChoice]].value = 1;
        ctx.strokeStyle = "green";
        ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        setTimeout( function() {
            nonogram.drawWhiteCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
            ctx.strokeStyle = "green";
            ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        }, 500);
        setTimeout( function() {
            nonogram.drawBlackCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
            ctx.strokeStyle = "green";
            ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
        }, 1000 );
        nonogram.drawPreview(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
        ctx.strokeStyle = "black";
    }
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(".home").click(function(){
    $("#container-tools").hide();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    container.style.transform = "none";
    container.style.left = "0%";
    container.style.top = "0%";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.border = "none";
    state = "menu";
    $("#menu").show();
});