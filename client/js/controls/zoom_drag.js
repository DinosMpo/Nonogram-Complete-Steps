let originX = 0;
let originY = 0;
let originWidth = 0;
let originHeight = 0;
let scaleFactor = 1;
let translatePos = {x: 0,y: 0};
let myLimit = 300;
let limitTop = myLimit;
let limitLeft = myLimit;
let limitBottom;
let limitRight;
let dragged = 0;
let dragStart = {x:0,y:0};
let activeDragControl;
let topControl = document.getElementById('top');
let leftControl = document.getElementById('left');
let rightControl = document.getElementById('right');
let bottomControl = document.getElementById('bottom');

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
       translatePos.x = (mouseX-originX)/scaleFactor;
      translatePos.y = (mouseY-originY)/scaleFactor;
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
       translatePos.x = (mouseX-originX)/scaleFactor;
       translatePos.y = (mouseY-originY)/scaleFactor;
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
    if(state === "level") {
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
                ctx.moveTo(nonogram.rowNumbersGrid[i].x+3, (nonogram.rowNumbersGrid[i].y + nonogram.blockSize)-3);
                ctx.lineTo((nonogram.rowNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[i].y+3);
            }
        }
        for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
            if(nonogram.columnNumbersGrid[i].value === 1) {    
              ctx.moveTo(nonogram.columnNumbersGrid[i].x+3, (nonogram.columnNumbersGrid[i].y + nonogram.blockSize)-3);
              ctx.lineTo((nonogram.columnNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[i].y+3);
            }
        }
    }else if(state === "multiplayer") {
        for(let i=0; i<nonogram.emptyGrid.length; i++) {
            if(nonogram.emptyGrid[i].value === 1){
                if(nonogram.emptyGrid[i].playerChoice === "yours") {
                    nonogram.drawBlueCell(nonogram.emptyGrid[i]);
                    nonogram.drawPreview(nonogram.emptyGrid[i]);
                }else if(nonogram.emptyGrid[i].playerChoice === "team mate") {
                    nonogram.drawRedCell(nonogram.emptyGrid[i]);
                    nonogram.drawPreview(nonogram.emptyGrid[i]);
                }
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
                ctx.moveTo(nonogram.rowNumbersGrid[i].x+3, (nonogram.rowNumbersGrid[i].y + nonogram.blockSize)-3);
                ctx.lineTo((nonogram.rowNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[i].y+3);
            }
        }
        for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
            if(nonogram.columnNumbersGrid[i].value === 1) {    
              ctx.moveTo(nonogram.columnNumbersGrid[i].x+3, (nonogram.columnNumbersGrid[i].y + nonogram.blockSize)-3);
              ctx.lineTo((nonogram.columnNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[i].y+3);
            }
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    if(scaleFactor !== 1) {
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
    }else{
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
    }
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

function drag(translatePos) {
    clearCanvas();
    ctx.save();
    ctx.translate(translatePos.x,translatePos.y);
    ctx.scale(scaleFactor,scaleFactor);
    nonogram.drawGrid();
    nonogram.drawRowNumbers();
    nonogram.drawColumnNumbers();
    if(state === "level") {
        nonogram.redrawProgress();
    }else if(state === "multiplayer") {
        for(let i=0; i<nonogram.emptyGrid.length; i++) {
            if(nonogram.emptyGrid[i].value === 1){
                if(nonogram.emptyGrid[i].playerChoice === "yours") {
                    nonogram.drawBlueCell(nonogram.emptyGrid[i]);
                    nonogram.drawPreview(nonogram.emptyGrid[i]);
                }else if(nonogram.emptyGrid[i].playerChoice === "team mate") {
                    nonogram.drawRedCell(nonogram.emptyGrid[i]);
                    nonogram.drawPreview(nonogram.emptyGrid[i]);
                }
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
                ctx.moveTo(nonogram.rowNumbersGrid[i].x+3, (nonogram.rowNumbersGrid[i].y + nonogram.blockSize)-3);
                ctx.lineTo((nonogram.rowNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[i].y+3);
            }
        }
        for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
            if(nonogram.columnNumbersGrid[i].value === 1) {    
              ctx.moveTo(nonogram.columnNumbersGrid[i].x+3, (nonogram.columnNumbersGrid[i].y + nonogram.blockSize)-3);
              ctx.lineTo((nonogram.columnNumbersGrid[i].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[i].y+3);
            }
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
};

function dragControl(x,y) {
    translatePos.x = x;
    translatePos.y = y;
    if((limitTop>translatePos.y) && (limitLeft>translatePos.x) && (limitRight<(translatePos.x+(scaleFactor*canvas.width))) && (limitBottom<(translatePos.y+(scaleFactor*canvas.height)))) {
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitTop<=translatePos.y && limitLeft<=translatePos.x) {
        translatePos.x = originX;
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitTop<=translatePos.y && limitRight>=(translatePos.x+(scaleFactor*limitRight))) {
        translatePos.x = originX;
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitRight>=(translatePos.x+(scaleFactor*limitRight)) && limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) {
        translatePos.x = originX;
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom)) && limitLeft<=translatePos.x) {
        translatePos.x = originX;
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitTop<=translatePos.y) {
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitLeft<=translatePos.x) {
        translatePos.x = originX;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitRight>=(translatePos.x+(scaleFactor*canvas.width))) {
        translatePos.x = originX;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) {
        translatePos.y = originY;
        drag(translatePos);
        trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
    }
    else{
        translatePos.x = originX;
        translatePos.y = originY;
    }
};

// --- Drag Controls for mouse
topControl.addEventListener('mousemove', function(event) {
    mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
});

topControl.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
    $(this).hide();
    activeDragControl = "top";
});

leftControl.addEventListener('mousemove', function(event) {
    mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);    
});

leftControl.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);
    $(this).hide();
    activeDragControl = " left";
});

rightControl.addEventListener('mousemove', function(event) {
    mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
});

rightControl.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
    $(this).hide();
    activeDragControl = "right";
});

bottomControl.addEventListener('mousemove', function(event) {
    mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
});

bottomControl.addEventListener('mousedown', function(event) {
    event.preventDefault();
    mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
    mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
    $(this).hide();
    activeDragControl = "bottom";
});

// --- Drag Controls for touch
let touchDragStartX = 0;
let touchDragStartY = 0;

leftControl.addEventListener("touchmove", function(event) {
    if(activeDragControl) {
        touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
        touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
        if(isNaN(translatePos.x)) {
            translatePos.x = 0;
            translatePos.y = 0;
        }
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
        dragControl(touchX, touchY);
    }
});

leftControl.addEventListener('touchstart', function(event) {
    event.preventDefault();
    touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
    touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
    $(this).hide();
    activeDragControl = "left";
});

leftControl.addEventListener("touchend", function(event) {
    if(activeDragControl) { 
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
        activeDragControl = null;
    }
});

topControl.addEventListener("touchmove", function(event) {
    if(activeDragControl) {
        touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
        touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
        if(isNaN(translatePos.x)) {
            translatePos.x = 0;
            translatePos.y = 0;
        }
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
        dragControl(touchX, touchY);
    }
});

topControl.addEventListener('touchstart', function(event) {
    event.preventDefault();
    touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
    touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
    $(this).hide();
    activeDragControl = "top";
});

topControl.addEventListener("touchend", function(event) {
    if(activeDragControl) { 
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
        activeDragControl = null;
    }
});

rightControl.addEventListener("touchmove", function(event) {
    if(activeDragControl) {
        touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
        touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
        if(isNaN(translatePos.x)) {
            translatePos.x = 0;
            translatePos.y = 0;
        }
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
        dragControl(touchX, touchY);
    }
});

rightControl.addEventListener('touchstart', function(event) {
    event.preventDefault();
    touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
    touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
    $(this).hide();
    activeDragControl = "right";
});

rightControl.addEventListener("touchend", function(event) {
    if(activeDragControl) { 
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
        activeDragControl = null;
    }
});


bottomControl.addEventListener("touchmove", function(event) {
    if(activeDragControl) {
        touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - Math.floor(touchDragStartX);
        touchY = Math.floor(event.touches[0].clientY) - touchDragStartY;
        if(isNaN(translatePos.x)) {
            translatePos.x = 0;
            translatePos.y = 0;
        }
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
        dragControl(touchX, touchY);
    }
});

bottomControl.addEventListener('touchstart', function(event) {
    event.preventDefault();
    touchDragStartX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2)) - translatePos.x;
    touchDragStartY = Math.floor(event.touches[0].clientY) - translatePos.y;
    $(this).hide();
    activeDragControl = "bottom";
});

bottomControl.addEventListener("touchend", function(event) {
    if(activeDragControl) { 
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
        activeDragControl = null;
    }
});