let originX = 0;
let originY = 0;
let originWidth = 0;
let originHeight = 0;
let scaleFactor = 1;
let translatePos = {x: 0,y: 0};

function trackTransforms(x, y, w, h) {
    originX = x;
    originY = y;
    originWidth = w;
    originHeight = h;
};

function handleScroll(value) {
  if(value == -3 || value == -100) { //zoom in
    if(scaleFactor < 2.5) {
      scaleFactor += 0.1;
       translatePos.x = mouseX;
      translatePos.y = mouseY;
       zoom(scaleFactor, translatePos);
       translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
       translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
       originX = translatePos.x;
       originY = translatePos.y;
       trackTransforms(translatePos.x, translatePos.y,  
                      translatePos.x+(scaleFactor*canvas.width),    
                       translatePos.y+(scaleFactor*canvas.height));
    }
  }else if(value == 3 || value == 100) { //zoom out
    if(scaleFactor > 1) {
      scaleFactor -= 0.1;
       translatePos.x = mouseX;
       translatePos.y = mouseY;
       zoom(scaleFactor, translatePos);
       translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
       translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
       originX = translatePos.x;
       originY = translatePos.y;
       trackTransforms(translatePos.x, translatePos.y,   
                      translatePos.x+(scaleFactor*canvas.width), 
                      translatePos.y+(scaleFactor*canvas.height));
    }
  }
};

trackTransforms(0,0,canvas.width, canvas.height);

function zoom(scaleFactor, translatePos) {
    clearCanvas();
    ctx.save();
    ctx.translate(translatePos.x, translatePos.y);
    ctx.scale(scaleFactor,scaleFactor);
    ctx.translate(-translatePos.x, -translatePos.y);
    nonogram.drawGrid();
    nonogram.drawRowNumbers();
    nonogram.drawColumnNumbers();
    for(let i=0; i<nonogram.emptyGrid.length; i++) {
        if(nonogram.emptyGrid[i].value === 1){
          nonogram.drawBlackCell(nonogram.emptyGrid[i]);
          nonogram.drawPreview(nonogram.emptyGrid[i]);
        }else if(nonogram.emptyGrid[i].value === 2) {
          nonogram.drawXCell(nonogram.emptyGrid[i]);
          nonogram.drawPreview(nonogram.emptyGrid[i]);
        }
    }
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
        if(nonogram.rowNumbersGrid[i].value === 1) {
          ctx.moveTo(nonogram.rowNumbersGrid[i].x+3, 
                   (nonogram.rowNumbersGrid[i].y + nonogram.blockSize)-3);
          ctx.lineTo((nonogram.rowNumbersGrid[i].x + nonogram.blockSize)-3, 
                   nonogram.rowNumbersGrid[i].y+3);
        }
    }
    for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
        if(nonogram.columnNumbersGrid[i].value === 1) {    
          ctx.moveTo(nonogram.columnNumbersGrid[i].x+3, 
                   (nonogram.columnNumbersGrid[i].y + nonogram.blockSize)-3);
          ctx.lineTo((nonogram.columnNumbersGrid[i].x + nonogram.blockSize)-3, 
                   nonogram.columnNumbersGrid[i].y+3);
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};

$(canvas).bind('mousewheel', function(event) {
    if(state === "level" || state === "multiplayer") {
        handleScroll(event.originalEvent.deltaY);
    }
});

$(canvas).bind('DOMMouseScroll', function(event) {
    if(state === "level" || state === "multiplayer") {
        handleScroll(event.detail);
    }
});