$("#play").click(function(){
    $("#menu").hide();
    $("#levels").show();
});

$('#how-to-play').click(function() {
    $('#menu').hide();
    $('#instructions').show();
});

$("#close-levels").click(function(){
    $("#menu").show();
    $("#levels").hide();
});

$(".level5x5").click(function(){
    $("#levels5x5").show();
    $("#levels").hide();
});

$(".level10x10").click(function(){
    $("#levels10x10").show();
    $("#levels").hide();
});

$(".level15x15").click(function(){
    $("#levels15x15").show();
    $("#levels").hide();
});

$("#close-instructions").click(function() {
    $(this).parent().hide();
    $('#menu').show();
});

$(".close-levels5x5").click(function(){
    $("#levels5x5").hide();
    $("#levels").show();
});

$(".close-levels10x10").click(function(){
    $("#levels10x10").hide();
    $("#levels").show();
});

$(".close-levels15x15").click(function(){
    $("#levels15x15").hide();
    $("#levels").show();
});

$(".stage").click(function(){
    $("#levels5x5").hide();
    $("#levels10x10").hide();
    $("#levels15x15").hide();
    $("#container-tools").show();
});

for(let i=0; i<allStages.length; i++) {
    if(isCorrect("correct-" + allStages[i])) {
            $(".correct-" + allStages[i]).show();
    }
}

$('#multiplayer').click(function() {
    $('#menu').hide();
    $('#game-lobbie').show();
    $('#exit-multiplayer-waiting-lobby').show();
    sock.emit('multiplayer', "User looking for a team mate");
});

$('#exit-multiplayer-waiting-lobby').click(function() {
    $('#menu').show();
    $('#game-lobbie').hide();
    sock.emit('exit multiplayer waiting lobby', 'Player left the lobby');
});

$('#close-multiplayer').click(function() {
    $("#container-tools").hide();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    container.style.transform = "none";
    container.style.left = "0%";
    container.style.top = "0%";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.border = "none";
    state = "menu";
    $("#multiplayer-finished-popup").hide();
    $("#menu").show();
    $("#clients-count").show();
});