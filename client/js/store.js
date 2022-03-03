function store(level, progress) {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if(!localStorage.getItem(level)){
              localStorage.setItem(level, progress);
        }else{
            localStorage[level] = progress;
        }
    } else {
          alert("Sorry, your browser does not support Web Storage...");
    }
};

function retrieve(level) {
    return localStorage.getItem(level).split(',').map(function(item){
        return parseInt(item, 10);
    });
};

function isCorrect(level) {
    if(localStorage.getItem(level) === "1") {
        return true;
    }
};