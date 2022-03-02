let isDown = false;
$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX;
	startPointMouseY = event.offsetY;
	isDown = true;
	nonogram.fillCels(startPointMouseX, startPointMouseY);
    nonogram.findProgress();
});

$(canvas).mouseup(function(){
    isDown = false;
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(canvas).mouseout(function(){
    isDown = false;
});

$(canvas).mousemove(function(event){
    mouseX = event.offsetX ;
    mouseY = event.offsetY ;
    if(isDown){
        nonogram.fillMultiCells(mouseX,  
        mouseY, startPointMouseX, 
        startPointMouseY);
        $("#info-current-progress").text("");
        $("#info-current-progress").text(nonogram.findProgress() + "%");
    }
});

