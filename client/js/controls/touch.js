$(canvas).on('touchstart', function(event) {
	startPointTouchX = Math.floor(event.touches[0].clientX - ((window.innerWidth - canvas.width)/2));
	startPointTouchY = Math.floor(event.touches[0].clientY - ((window.innerHeight - canvas.height)/2));
	nonogram.fillCels(startPointTouchX, startPointTouchY);
});