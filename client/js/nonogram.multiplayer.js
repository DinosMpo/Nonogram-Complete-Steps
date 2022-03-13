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