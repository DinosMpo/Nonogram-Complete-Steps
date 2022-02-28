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