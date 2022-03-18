let levels5x5 = {
    'chess':    [[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]],
    'snake':    [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],
    'airplane':   [[0,0,1,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0]],
    'smile':    [[1,1,0,1,1],[1,1,0,1,1],[0,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]]
};

let levels10x10 = {
    'questionmark': [[0,0,1,1,1,1,1,1,0,0],
                  [0,1,1,0,0,0,0,1,1,0],
                  [0,1,1,0,0,0,0,1,1,0],
                  [0,0,0,0,0,0,0,1,1,0],
                  [0,0,0,0,0,0,1,1,1,0],
                  [0,0,0,0,1,1,1,1,0,0],
                  [0,0,0,0,1,1,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,1,1,0,0,0,0],
                  [0,0,0,0,1,1,0,0,0,0]],

    'leaf': [[0,0,0,0,1,1,1,1,1,1],
            [0,0,0,1,0,1,0,1,0,1],
            [0,0,1,1,0,1,0,1,1,0],
            [0,1,0,1,0,1,1,1,1,0],
            [0,1,0,1,0,1,1,1,1,0],
            [0,1,0,1,1,0,0,0,1,0],
            [0,1,1,1,1,1,1,1,1,0],
            [0,0,1,0,0,0,0,1,0,0],
            [0,1,0,1,1,1,1,0,0,0],
            [1,1,0,0,0,0,0,0,0,0]],

    'music': [[0,0,0,0,0,0,1,1,1,1],
             [0,0,0,1,1,1,0,0,0,1],
             [0,0,0,1,0,0,0,1,1,1],
             [0,0,0,1,1,1,1,0,0,1],
             [0,0,0,1,0,0,0,0,0,1],
             [0,0,0,1,0,0,0,1,1,1],
             [0,1,1,1,0,0,1,1,1,1],
             [1,1,1,1,0,0,1,1,1,1],
             [1,1,1,1,0,0,0,1,1,0],
             [0,1,1,0,0,0,0,0,0,0]],

    'tree': [[0,0,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,0,1,1,1,0],
            [1,1,1,1,1,0,1,1,1,1],
            [1,1,0,1,1,1,0,0,1,1],
            [1,1,1,0,1,1,1,1,1,0],
            [0,1,1,1,1,1,0,0,0,0],
            [0,0,0,0,1,1,1,0,0,0],
            [0,0,0,0,1,1,0,0,0,0],
            [0,1,0,0,1,1,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1]]
};

let levels15x15 = {
    'dolphin' : [[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
                [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
                [0,0,1,1,1,1,1,1,1,1,1,1,0,1,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,0,1,1,0,1,1,1,1],
                [1,1,1,0,0,0,0,1,1,0,0,0,1,1,0],
                [1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,1,1,0,1,1,0,1,0,1,1,0,0],
                [0,0,1,0,0,1,1,0,1,1,0,1,1,1,0],
                [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1]],

    'alarm' : [[0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
              [0,1,1,1,0,0,1,1,1,0,0,1,1,1,0],
              [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
              [1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
              [1,0,1,1,1,1,1,1,1,1,0,1,1,0,1],
              [0,0,1,1,1,1,1,1,1,0,1,1,1,0,0],
              [0,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
              [0,1,0,0,1,0,0,0,1,1,1,0,0,1,0],
              [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
              [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],
              [0,0,1,1,1,1,1,0,1,1,1,1,1,0,0],
              [0,0,0,1,1,1,1,0,1,1,1,1,0,0,0],
              [0,0,1,0,0,1,1,1,1,1,0,0,1,0,0],
              [0,1,0,0,1,0,1,1,1,0,1,0,0,1,0],
              [0,0,1,1,0,0,0,0,0,0,0,1,1,0,0]],

    'more-music' : [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                 [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
                 [1,1,1,0,1,0,1,1,1,1,1,1,1,1,1],
                 [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0],
                 [1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
                 [0,1,1,0,0,1,1,0,0,0,0,0,0,0,0],
                 [1,1,0,0,1,1,1,1,1,1,0,1,1,0,1],
                 [1,0,1,0,0,1,1,0,0,0,0,0,0,0,0],
                 [1,0,0,0,1,0,1,1,1,1,0,1,0,1,1],
                 [1,0,1,0,1,0,1,0,0,0,0,0,0,0,0],
                 [1,1,0,0,0,1,1,1,1,0,1,1,1,1,1],
                 [1,1,1,0,1,1,0,0,0,0,0,0,0,0,0],
                 [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1],
                 [1,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
};

let currentStage;
let nonogram;

function createLevel(level, stage) {
    state = "level";
    currentStage = stage;
    nonogram = new Nonogram(level);
    container.style.left = "50%";    
    container.style.top = "50%";
    container.style.transform = "translate(-50%, -50%)";
    canvas.width = nonogram.width;
    canvas.height = nonogram.height;
    canvas.style.border = "1px solid black";
    clearCanvas();
    if(!localStorage.getItem(currentStage)) {
            nonogram.drawGrid();
            nonogram.drawRowNumbers();
            nonogram.drawColumnNumbers();
    }else{
        nonogram.drawGrid();
        nonogram.drawRowNumbers();
        nonogram.drawColumnNumbers();
        nonogram.retrieveProgress(retrieve(currentStage), 
        retrieve('rowNumbersGrid-'+currentStage), 
        retrieve('columnNumbersGrid-'+currentStage));
        nonogram.redrawProgress();
    }
    if(nonogram.checkProgress()) {
        $("#correct-singleplayer").show();
        $("#correct-level-tools").show();
    }
    resetTools("singleplayer");
    $("#multiplayer-tools").hide();
    $("#singleplayer-tools").show();
    $("#info-current-progress").text("");
    $("#info-current-progress").text(nonogram.findProgress() + "%");
    limitBottom = nonogram.height-myLimit;
    limitRight = nonogram.width-myLimit;
    $("#clients-count").hide();
}

let stages5x5 = document.getElementById('levels5x5');
let stages5x5Header = document.createElement('h3');
let stages10x10 = document.getElementById('levels10x10');
let stages10x10Header = document.createElement('h3');
let stages15x15 = document.getElementById('levels15x15');
let stages15x15Header = document.createElement('h3');
stages5x5Header.innerHTML = "5x5";
stages5x5.append(stages5x5Header);
stages10x10Header.innerHTML = "10x10";
stages10x10.append(stages10x10Header);
stages15x15Header.innerHTML = "15x15";
stages15x15.append(stages15x15Header);

Object.keys(levels5x5).forEach(key => {
    let stage = document.createElement('div');
    stage.classList.add('stage');
    stage.addEventListener('click', () => {
        createLevel(levels5x5[key], key);
    });
    let image = new Image();
    image.classList.add('correct-'+key);
    image.src = 'img/green-button.png';
    stage.innerHTML = key.toUpperCase();    
    stage.append(image);
    stages5x5.append(stage);
});
let closeLevels5x5 = document.createElement('div');
closeLevels5x5.classList.add('close-levels5x5');
closeLevels5x5.innerHTML = 'Close';
stages5x5.append(closeLevels5x5);

Object.keys(levels10x10).forEach(key => {
    let stage = document.createElement('div');
    stage.classList.add('stage');
    stage.addEventListener('click', () => {
        createLevel(levels10x10[key], key);
    });
    let image = new Image();
    image.classList.add('correct-'+key);
    image.src = 'img/green-button.png';
    stage.innerHTML = key.toUpperCase();    
    stage.append(image);
    stages10x10.append(stage);
});
let closeLevels10x10 = document.createElement('div');
closeLevels10x10.classList.add('close-levels10x10');
closeLevels10x10.innerHTML = 'Close';
stages10x10.append(closeLevels10x10);

Object.keys(levels15x15).forEach(key => {
    let stage = document.createElement('div');
    stage.classList.add('stage');
    stage.addEventListener('click', () => {
        createLevel(levels15x15[key], key);
    });
    let image = new Image();
    image.classList.add('correct-'+key);
    image.src = 'img/green-button.png';
    stage.innerHTML = key.toUpperCase();
    stage.append(image);    
    stages15x15.append(stage);
});
let closeLevels15x15 = document.createElement('div');
closeLevels15x15.classList.add('close-levels15x15');
closeLevels15x15.innerHTML = 'Close';
stages15x15.append(closeLevels15x15);

let allStages = ['chess', 'snake', 'airplane', 'smile', 'questionmark', 'leaf', 'music', 'tree', 'dolphin', 'alarm', 'more-music'];
