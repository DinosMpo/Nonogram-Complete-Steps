$(canvas).mousedown(function(event) {
	startPointMouseX = event.offsetX;
	startPointMouseY = event.offsetY;
	nonogram.fillCels(startPointMouseX, startPointMouseY);
});