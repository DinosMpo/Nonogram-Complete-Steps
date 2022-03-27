//---- Mobile Events
// Global vars to cache touch event state
let evCache = new Array();
let prevDiff = -1;
let touches = 0;
let touchZoom = false;
let gameData;

$(canvas).on('touchstart', function(event) {
    event.preventDefault();
    startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width)/2));
	startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height)/2));
    if(state === 'level') {
        evCache.push(event.touches[touches]);
        touches++;
        if(evCache.length == 2) touchZoom = true;
        if(startPointTouchX<originX) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchY<originY) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchX>originWidth) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchY>originHeight) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else{
            if(evCache.length == 1) {
                isDown = true;
                ctx.save();
                ctx.translate(originX,originY);
                ctx.scale(scaleFactor,scaleFactor);
                nonogram.fillCels((startPointTouchX-originX)/scaleFactor, (startPointTouchY-originY)/scaleFactor);
                ctx.restore();
                $("#info-current-progress").text("");
                $("#info-current-progress").text(nonogram.findProgress() + "%");
                nonogram.findUserChoices();
                store(currentStage, nonogram.userChoices.levelGrid);
                store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
                store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
            }else if(evCache.length == 2) {
                $(".undo").click();
            }
        }
    }else if(state === 'multiplayer') {
        evCache.push(event.touches[touches]);
        touches++;
        if(evCache.length == 2) {
            touchZoom = true;
        }
        if(startPointTouchX<originX) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchY<originY) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchX>originWidth) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }else if(startPointTouchY>originHeight) {
            dragStart.x = startPointTouchX - translatePos.x;
            dragStart.y = startPointTouchY - translatePos.y;
            dragged = true;
        }
    }
});

$(canvas).on('touchend', function(event) {
    if(state === "level") {
        touchup_handler(event);
        touches--;
        isDown = false;
        if(evCache.length == 0 || evCache.length == 1) touchZoom = false;
        if(dragged){
            $(topControl).show();
            $(leftControl).show();
            $(rightControl).show();
            $(bottomControl).show();
            dragged = false;
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
    }else if(state === "multiplayer") {
        touchup_handler(event);
        touches--;
        if(dragged){
            $(topControl).show();
            $(leftControl).show();
            $(rightControl).show();
            $(bottomControl).show();
            dragged = false;
        }

        if(touchZoom) {
            if(evCache.length == 1) {
                return;
            }else if(evCache.length == 0) {
                touchZoom = false;
                return;
            }
        }else {
            if(turn === true) {
                ctx.save();
                ctx.translate(originX,originY);
                ctx.scale(scaleFactor,scaleFactor);
                gameData = nonogram.multiplayerFillCels((startPointTouchX-originX)/scaleFactor, (startPointTouchY-originY)/scaleFactor);
                ctx.restore();
                turn = false;
                $("#info-current-progress").text("");
                $("#info-current-progress").text(nonogram.findProgress() + "%");
                sock.emit('update progress', gameData);
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

$(canvas).on('touchmove', function(event) {
    event.preventDefault();
    var touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
    var touchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height) / 2));
    if(state ==="level") {
        if(evCache.length == 2) touch_zoom_handler(event);
        if(activeDragControl) {
            $(topControl).hide();
            $(leftControl).hide();
            $(rightControl).hide();
            $(bottomControl).hide();
            dragControl(touchX-dragStart.x, touchY-dragStart.y);
        }
        if(dragged) {
            dragControl(touchX-dragStart.x, touchY-dragStart.y);
            $(topControl).hide();
            $(leftControl).hide();
            $(rightControl).hide();
            $(bottomControl).hide();
        }
        if(isDown && evCache.length == 1){
            ctx.save();
            ctx.translate(originX,originY);
            ctx.scale(scaleFactor,scaleFactor);
            nonogram.fillMultiCells((touchX-originX)/scaleFactor, (touchY-originY)/scaleFactor, (startPointTouchX-originX)/scaleFactor, (startPointTouchY-originY)/scaleFactor);
            ctx.restore();
        }
    }else if(state === "multiplayer") {
        if(evCache.length == 2) {
            touch_zoom_handler(event);
        }
        if(activeDragControl) {
            $(topControl).hide();
            $(leftControl).hide();
            $(rightControl).hide();
            $(bottomControl).hide();
            dragControl(touchX-dragStart.x, touchY-dragStart.y);
        }
        if(dragged) {
            dragControl(touchX-dragStart.x, touchY-dragStart.y);
            $(topControl).hide();
            $(leftControl).hide();
            $(rightControl).hide();
            $(bottomControl).hide();
        }
    }
});

function touch_zoom_handler(event) {
    // Find this event in the cache and update its record with this event
    for(var i=0; i<evCache.length; i++) {
        if(event.changedTouches[0].identifier == evCache[i].identifier) {
            evCache[i] = event.changedTouches[0];
            break;
        }
    }
    // If two pointers are down, check for pinch gestures
    if (evCache.length == 2) {
        // Calculate the distance between the two pointers
        var curDiffX = Math.abs(evCache[0].clientX - evCache[1].clientX);
        var curDiffY = Math.abs(evCache[0].clientY - evCache[1].clientY);
        if (prevDiff > 0) {
            if (curDiffX > prevDiff) {
                // The distance between the two pointers has increased
                if(scaleFactor < 2.5) {
                    scaleFactor += 0.1;
                    translatePos.x = ((Math.abs(evCache[0].clientX + evCache[1].clientX)/2) - originX)/scaleFactor;
                    translatePos.y = ((Math.abs(evCache[0].clientY + evCache[1].clientY)/2) - originY)/scaleFactor;
                    zoom(scaleFactor, translatePos);
                    translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
                    translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
                    originX = translatePos.x;
                    originY = translatePos.y;
                    trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
                }
            }
            if (curDiffX < prevDiff) {
                // The distance between the two pointers has decreased
                if(scaleFactor > 1) {
                    scaleFactor -= 0.1;
                    translatePos.x = ((Math.abs(evCache[0].clientX + evCache[1].clientX)/2) - originX)/scaleFactor;
                    translatePos.y = ((Math.abs(evCache[0].clientY + evCache[1].clientY)/2) - originY)/scaleFactor;
                    zoom(scaleFactor, translatePos);
                    translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
                    translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
                    originX = translatePos.x;
                    originY = translatePos.y;
                    trackTransforms(translatePos.x, translatePos.y, translatePos.x+(scaleFactor*canvas.width), translatePos.y+(scaleFactor*canvas.height));
                }
            }
        }
        // Cache the distance for the next move event
        prevDiff = curDiffX;
    }
};

function touchup_handler(event) {
    // Remove this pointer from the cache
    // If the number of pointers down is less than two then reset diff tracker
    if (evCache.length < 2) {
        prevDiff = -1;
    }

    for(var i=0;i<event.changedTouches.length; i++) {
        remove_event(event.changedTouches[i]);
    }
};

// Cache management
function remove_event(event) {
    // Remove this event from the target's cache
    for (var i = 0; i<evCache.length; i++) {
        if(evCache[i].identifier == event.identifier) {
            evCache.splice(i, 1);
            break;
        }
    }
};