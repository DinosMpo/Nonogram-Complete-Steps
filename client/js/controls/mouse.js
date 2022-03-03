let isDown = false;
$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX;
	startPointMouseY = event.offsetY;
	isDown = true;
	nonogram.fillCels(startPointMouseX, startPointMouseY);
    nonogram.findUserChoices();
    store(currentStage, nonogram.userChoices.levelGrid);
    store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
    store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
    nonogram.findProgress();
});

$(canvas).mouseup(function(){
    isDown = false;
    nonogram.findUserChoices();
    store(currentStage, nonogram.userChoices.levelGrid);
    store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
    store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
    if(nonogram.checkProgress()) {
        $("#correct").show();
        store("correct-" + currentStage, 1);
        $(".correct-" + currentStage).show();
    }else{
        $("#correct").hide();
        store("correct-" + currentStage, 0);
        $(".correct-" + currentStage).hide();
    }
});

$(canvas).mouseout(function(){
    isDown = false;
    if(isDown){
        nonogram.findUserChoices();
        store(currentStage, nonogram.userChoices.levelGrid);
        store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
        store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
    }
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

