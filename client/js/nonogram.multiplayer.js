const sock = io();

//Client Counter
sock.on('refresh counter', (data) => {
    $('#clients-count').text(data.description);
});

$('#yes').click(function() {
    $('#'+ player +'-choice').addClass('choice-yes');
    let data = {
        player: player,
        choice: 'yes'
    };
    if(player == 'player1') {
        player1Choice = 'yes';
    }else if(player == 'player2Choice') {
        player2Choice = 'yes';
    }
    sock.emit('choice', data);
});

$('#no').click(function() {
    $('#'+ player +'-choice').addClass('choice-no');
    let data = {
        player: player,
        choice: 'no'
    };
    if(player == 'player1') {
        player1Choice = 'no';
    }else if(player == 'player2Choice') {
        player2Choice = 'no';
    }
    sock.emit('choice', data);
});

$("#exit-multiplayer").click(function(){
    $("#container-tools").hide();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    container.style.transform = "none";
    container.style.left = "0%";
    container.style.top = "0%";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.border = "none";
    state = "menu";
    $("#correct-multiplayer").hide();
    $("#levels").show();
    $("#clients-count").show();
});

class NonogramMultiplayer {
    constructor(p1, p2, room) {
        this.player1 = p1;
        this.player2 = p2;
        this.roomId = room;

        this.turn = null;
        this.nonogram = null;
        this.choice = null;
    }
};

let gameRoom;
let multiplayerGame;
let player;
let multiplayerStageIndex;

sock.on('multiplayer', (game) => {
    $('#msg').text("Player found!");
    multiplayerGame = new NonogramMultiplayer(game.player1, game.player2, game.room);
    createMultiplayerStage();
    sock.emit('multiplayer game', multiplayerGame);
});

sock.on('your turn to play', () => {
    wait = false;
    turn = true;
    $("#waiting-screen").hide();
});

sock.on('correct', () => {
    $('#waiting-screen').hide();
    $("#correct-multiplayer").show();
});

sock.on('end-turn', () => {
    $('#waiting-screen').show();
});

sock.on('room', (room) => {
    gameRoom = 'room-'+room;
});

sock.on('player', (number) => {
    player = number;
});

sock.on('multiplayer finished', () => {
    $('#waiting-screen').hide();
    $('#multiplayer-finished-popup').show();
});

sock.on('exit-multiplayer', (data) => {
    if($("#waiting-screen").show()) {
        $("#waiting-screen").hide();
    }
    $('#container-tools').hide();
    $('#player-left-info').text(data);
    $('#player-left').show();
});

$('#player-left-exit-to-menu').click( () => {
    $("#player-left").hide();
    $("#container-tools").hide();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    container.style.transform = "none";
    container.style.left = "0%";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.border = "none";
    state = "menu";
    $("#menu").show();
    $("#clients-count").show();
});

sock.on('player-left', (data) => {
    if($("#waiting-screen").show()) {
        $("#waiting-screen").hide();
    }
    $('#container-tools').hide();
    $('#player-left-info').text(data);
    $('#player-left').show();
    sock.emit('player-left');
});

sock.on('update', () => {
    ctx.save();
    ctx.translate(originX,originY);
    ctx.scale(scaleFactor,scaleFactor);
    if(data.dataType === "fill cell") {
        if(data.fillCellChoice === "default") {
            nonogram.emptyGrid[data.cell].value = data.value;
            if(nonogram.emptyGrid[data.cell].value === 1) {
                nonogram.drawBlackCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }else if(nonogram.emptyGrid[data.cell].value === 2) {
                nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
                nonogram.drawXCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }else{
                nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }
        }else if(data.fillCellChoice === "black") {
            nonogram.emptyGrid[data.cell].value = data.value;
            if(nonogram.emptyGrid[data.cell].value === 1) {
                nonogram.drawBlackCell(nonogram.emptyGrid[data.cell]);;
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }else{
                nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }
        }else if(data.fillCellChoice === "x") {
            nonogram.emptyGrid[data.cell].value = data.value;
            if(nonogram.emptyGrid[data.cell].value === 2) {
                nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
                nonogram.drawXCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }else{
                nonogram.drawWhiteCell(nonogram.emptyGrid[data.cell]);
                nonogram.strokeTeamMateChoice(nonogram.emptyGrid[data.cell]);
                nonogram.drawPreview(nonogram.emptyGrid[data.cell]);
            }
        }else if(data.dataType === "fill cell row numbers grid") {
            nonogram.rowNumbersGrid[data.cell].value = data.value;
            ctx.lineWidth = 3;
            ctx.beginPath();
            if(nonogram.rowNumbersGrid[data.cell].value == 1) {        
                ctx.strokeStyle = "red";
                ctx.moveTo(nonogram.rowNumbersGrid[data.cell].x+3, (nonogram.rowNumbersGrid[data.cell].y + nonogram.blockSize)-3);
                ctx.lineTo((nonogram.rowNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.rowNumbersGrid[data.cell].y+3);
            }else{
                ctx.fillStyle = "#e0e0d1";
                ctx.fillRect(nonogram.rowNumbersGrid[data.cell].x+2, nonogram.rowNumbersGrid[data.cell].y+2, nonogram.rowNumbersGrid[data.cell].w-3, nonogram.rowNumbersGrid[data.cell].h-3);
                ctx.fillStyle = "black";
                ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
                ctx.fillText(nonogram.rowNumbersGrid[data.cell].number, (nonogram.rowNumbersGrid[data.cell].x) + (nonogram.blockSize/3), (nonogram.rowNumbersGrid[data.cell].y) + ((nonogram.blockSize+8)/2));
            }
            ctx.stroke();
            ctx.closePath();
        }else if(data.dataType === "fill cell column numbers grid") {
            nonogram.columnNumbersGrid[data.cell].value = data.value;
            ctx.lineWidth = 3;
            ctx.beginPath();
        }
        if(nonogram.columnNumbersGrid[data.cell].value === 1) {
            ctx.strokeStyle = "red";
            ctx.moveTo(nonogram.columnNumbersGrid[data.cell].x+3, (nonogram.columnNumbersGrid[data.cell].y + nonogram.blockSize)-3);
            ctx.lineTo((nonogram.columnNumbersGrid[data.cell].x + nonogram.blockSize)-3, nonogram.columnNumbersGrid[data.cell].y+3);
        }else{
            ctx.fillStyle = "#e0e0d1";
            ctx.fillRect(nonogram.columnNumbersGrid[data.cell].x+2, nonogram.columnNumbersGrid[data.cell].y+2, nonogram.columnNumbersGrid[data.cell].w-3, nonogram.columnNumbersGrid[data.cell].h-3);
            ctx.fillStyle = "black";
            ctx.font = "bold " + (nonogram.blockSize / 2) + "px Arial";
            ctx.fillText(nonogram.columnNumbersGrid[data.cell].number, (nonogram.columnNumbersGrid[data.cell].x) + (nonogram.blockSize/3), (nonogram.columnNumbersGrid[data.cell].y) + ((nonogram.blockSize+8)/2));
        }
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
});

sock.on('choice', (data) => {
    if(data.player == "player1") {
        player1Choice = data.choice;
        if(player1Choice == 'yes') {
            $('#player1-choice').addClass('choice-yes');
        }else if(player1Choice == 'no') {
            $('#player1-choice').addClass('choice-no');
        }
    }else if(data.player == "player2") {
        player2Choice = data.choice;
        if(player2Choice == 'yes') {
            $('#player2-choice').addClass('choice-yes');
        }else if(player2Choice == 'no') {
            $('#player2-choice').addClass('choice-no');
        }
    }

    if(player1Choice == 'yes' && player2Choice == 'yes') {
        $('#correct-multiplayer').hide();
        multiplayerStageIndex++;
        createNextMultiplayerStage();
        $('#player1-choice').removeClass('choice-yes');
        $('#player2-choice').removeClass('choice-yes');
        player1Choice = "";
        player2Choice = "";
    }
});