$(canvas).on('touchstart', function(event) {
	startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width)/2));
	startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height)/2));
	nonogram.fillCels(startPointTouchX, startPointTouchY);
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

$(canvas).on('touchend', function(event) { 
    isDown = false;
});

$(canvas).on('touchmove', function(event) {
    var touchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width) / 2));
    var touchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height) / 2));

    nonogram.fillMultiCells(touchX-originX, touchY, startPointTouchX, startPointTouchY);
    nonogram.findProgress();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});