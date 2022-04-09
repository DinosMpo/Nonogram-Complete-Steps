let turn = false;
let wait = false;

function createMultiplayerStage() {
    $("#singleplayer-tools").hide();
    multiplayerStageIndex = 0;
    $("#exit-multiplayer-waiting-lobby").hide();
    setTimeout(function(){
        state = "multiplayer";
        $('#game-lobbie').hide();
        $('#msg').text("Searching for player...");
        $("#container-tools").show();
        $("#multiplayer-tools").show();
        clearCanvas();
        container.style.left = "50%";    
        container.style.top = "50%";
        container.style.transform = "translate(-50%, -50%)";
        nonogram = new Nonogram(multiplayerStages[multiplayerStagesNames[multiplayerStageIndex]]);
        canvas.width = nonogram.width;
        canvas.height = nonogram.height;
        canvas.style.border = "1px solid black";
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        nonogram.drawGrid();
        nonogram.drawRowNumbers();
        nonogram.drawColumnNumbers();
        if(turn === false) {
            $("#waiting-screen").show();
        }
        resetTools("multiplayer");
        $("#info-current-progress").text("");
        $("#info-current-progress").text(nonogram.findProgress() + "%");
        limitBottom = nonogram.height-myLimit;
        limitRight = nonogram.width-myLimit;
        $("#clients-count").hide();
    }, 3000);
};

function createNextMultiplayerStage() {
    $('#multiplayer-next-stage-popup').show();
    setTimeout(function(){
        $('#multiplayer-next-stage-popup').hide();
        nonogram = new Nonogram(multiplayerStages[multiplayerStagesNames[multiplayerStageIndex]]);
        canvas.width = nonogram.width;
        canvas.height = nonogram.height;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        nonogram.drawGrid();
        nonogram.drawRowNumbers();
        nonogram.drawColumnNumbers();

        resetTools("multiplayer");
        $("#info-current-progress").text("");
        $("#info-current-progress").text(nonogram.findProgress() + "%");
        if(player == 'player1') {
            wait = false;
            turn = true;
        }else {
            wait = false;
            turn = false;
            $('#waiting-screen').show();
        }

    }, 3000);
};

let multiplayerStagesNames = ['android', 'cuppa', 'skull', 'clown', 'candle'];
let multiplayerStages = {
    'android': [[0,1,1,1,0],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [1,1,1,1,1],]
                ,
                
    'cuppa'    : [[0,0,1,0,1,0,1,0,0,0],
               [0,0,1,0,1,0,1,0,0,0],
               [0,0,0,0,0,0,0,0,0,0],
               [0,1,1,1,1,1,1,1,0,0],
               [0,1,1,0,1,1,1,1,1,1],
               [0,1,1,0,1,1,1,1,0,1],
               [0,1,1,1,1,1,1,1,1,0],
               [0,1,1,1,1,1,1,1,0,0],
               [1,0,1,1,1,1,1,0,0,1],
               [0,1,1,1,1,1,1,1,1,0],],

    'skull':   [[0,1,1,1,0],
                [1,1,1,1,1],
                [1,0,1,0,1],
                [1,1,1,1,1],
                [0,1,0,1,0],],

    'clown': [[0,0,0,1,1,1,1,0,0,0],
              [0,0,1,0,0,1,1,1,0,0],
              [1,1,1,1,1,1,1,1,1,1],
              [0,1,0,1,0,0,1,0,1,0],
              [1,0,0,0,1,1,0,0,0,1],
              [1,0,0,0,1,1,0,0,0,1],
              [0,1,0,0,0,0,1,0,1,0],
              [0,1,0,0,1,1,0,0,1,0],
              [0,0,1,0,0,0,0,1,0,0],
              [0,1,1,1,1,1,1,1,1,0],],

    'candle': [ [1,0,1,0,1,1,1,1,1,1,0,0,1,1,1],
                [1,1,1,0,0,1,1,0,1,1,1,0,0,1,1],
                [1,1,1,0,1,0,1,1,1,1,1,0,0,0,1],
                [1,1,1,1,0,0,1,1,1,1,0,0,0,0,1],
                [1,1,1,1,1,0,1,1,1,1,1,0,0,0,1],
                [1,1,1,1,1,0,1,1,1,1,1,0,0,0,1],
                [1,1,1,0,0,0,0,0,1,1,1,0,0,1,1],
                [1,1,1,0,0,0,0,0,1,1,1,0,0,1,1],
                [1,1,1,0,1,0,0,0,1,1,1,1,1,1,1],
                [1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],
                [1,1,1,0,0,0,0,0,1,1,1,0,1,1,1],
                [1,1,1,0,0,0,0,0,1,1,0,1,0,1,1],
                [0,1,1,0,0,0,0,0,1,1,0,0,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],]
};