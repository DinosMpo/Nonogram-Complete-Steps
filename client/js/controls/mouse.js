let isDown = false;
$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
    startPointMouseY = event.offsetY || (event.pageY - canvas.offsetTop);
    if(state === "level") {
        if(startPointMouseX<originX) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseY<originY) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseX>originWidth) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseY>originHeight) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else{
            isDown = true;
            ctx.save();
            ctx.translate(originX,originY);
            ctx.scale(scaleFactor,scaleFactor);
            nonogram.fillCels((startPointMouseX-originX)/scaleFactor, (startPointMouseY-originY)/scaleFactor);
            ctx.restore();
            nonogram.findUserChoices();
            store(currentStage, nonogram.userChoices.levelGrid);
            store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
            store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
            nonogram.findProgress();
        }
    }else if(state === "multiplayer") {
        if(startPointMouseX<originX) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseY<originY) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseX>originWidth) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else if(startPointMouseY>originHeight) {
            dragStart.x = startPointMouseX - translatePos.x;
            dragStart.y = startPointMouseY - translatePos.y;
            dragged = true;
        }else{
            if(turn === true) {
                ctx.save();
                ctx.translate(originX,originY);
                ctx.scale(scaleFactor,scaleFactor);
                var gameData = nonogram.multiplayerFillCels((startPointMouseX-originX)/scaleFactor, (startPointMouseY-originY)/scaleFactor);
                ctx.restore();
                sock.emit('update progress', gameData);
                turn = false;
                $("#info-current-progress").text("");
                $("#info-current-progress").text(nonogram.findProgress() + "%");
                if(nonogram.checkProgress()) {
                    if(multiplayerStageIndex == (multiplayerStagesNames.length-1)) {
                        $('#multiplayer-finished-popup').show();
                        sock.emit('multiplayer finished');
                    }else{
                        sock.emit('correct' , multiplayerGame);
                    }
                }else{
                    $("#correct-multiplayer").hide();
                    sock.emit('end-turn');
                }
            }
        }
    }
});

$(canvas).mouseup(function(){
    if(state === "level") {
        isDown = false;
        if(dragged){
            $(topControl).show();
            $(leftControl).show();
            $(rightControl).show();
            $(bottomControl).show();
            dragged = false;
        }
        if(activeDragControl) {
            activeDragControl = null;
        }
        if(nonogram.checkProgress()) {
            $("#correct-singleplayer").show();
            store("correct-" + currentStage, 1);
            $(".correct-" + currentStage).show();
        }else{
            $("#correct-singleplayer").hide();
            store("correct-" + currentStage, 0);
            $(".correct-" + currentStage).hide();
        }
        nonogram.findUserChoices();
        store(currentStage, nonogram.userChoices.levelGrid);
        store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
        store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);    
        $("#info-current-progress").text("");
        $("#info-current-progress").text(nonogram.findProgress() + "%");
    }
});

$(canvas).mouseout(function(){
    isDown = false;
    if(dragged) {
        activeDragControl = false;
        dragged = false;
        $(topControl).show();
        $(leftControl).show();
        $(rightControl).show();
        $(bottomControl).show();
    }
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
        ctx.save();
        ctx.translate(originX,originY);
        ctx.scale(scaleFactor,scaleFactor);
        nonogram.fillMultiCells((mouseX-originX)/scaleFactor, (mouseY-originY)/scaleFactor, (startPointMouseX-originX)/scaleFactor, (startPointMouseY-originY)/scaleFactor);
        ctx.restore();
        $("#info-current-progress").text("");
        $("#info-current-progress").text(nonogram.findProgress() + "%");
    }
    if(dragged){
        dragControl(mouseX-dragStart.x, mouseY-dragStart.y);
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
    }
    if(activeDragControl) {
        $(topControl).hide();
        $(leftControl).hide();
        $(rightControl).hide();
        $(bottomControl).hide();
        dragControl(mouseX-dragStart.x, mouseY-dragStart.y);
    }
});

canvas.addEventListener("mouseover", function(evt) {
    if(activeDragControl) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        if(isNaN(translatePos.x)) {
            translatePos.x = 0;
            translatePos.y = 0;
        }
        dragStart.x = lastX - translatePos.x;
        dragStart.y = lastY - translatePos.y;
        dragged = true;
    }

},false);