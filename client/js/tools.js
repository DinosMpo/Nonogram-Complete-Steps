function createSinglePlayerTools() {
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['redo_undo', 'clear', 'help', 'home'];
	const tools = document.getElementById("tools");
	const singleplayer = document.createElement('div');
	singleplayer.id = "singleplayer-tools";
	tools.appendChild(singleplayer);
	for(let i=0; i<singlePlayerTools.length; i++) {
		//Δημιουργούμε ένα li tag element και του ορίζουμε την class tool.
		var li = document.createElement('li');
		li.classList.add("tool");
		//Δημιουργούμε ένα div tag element και του ορίζουμε σαν class το όνομα του εργαλείου που θα αντιπροσωπεύει π.χ default. 
		var div = document.createElement('div');
		div.className = singlePlayerTools[i];
		//Δημιουργούμε ένα img tag element και του ορίζουμε το source μονοπάτι για την εικόνα του εργαλείου που θα αντιπροσωπεύει.
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerTools[i] + ".png";
		//Τέλος κάνουμε append το img tag στο li tag και το li tag στο singleplayer tag.
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	for(let i=0; i<singlePlayerExtraTools.length; i++) {   
		var li = document.createElement('li');
		li.classList.add("extra-tool");
		var div = document.createElement('div');
		div.className = singlePlayerExtraTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	singleplayer.firstElementChild.classList.add("active");
};

createSinglePlayerTools();

let singleplayer = document.getElementById("singleplayer-tools");
let singleplayerTools = singleplayer.getElementsByClassName("tool");

for (let i = 0; i < singleplayerTools.length; i++) {
  singleplayerTools[i].addEventListener("click", function() {
    let current = singleplayer.getElementsByClassName("active");
    if(typeof current[0] !== 'undefined') {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}

function resetTools(toolContainer) {
  let singleplayer = document.getElementById("singleplayer-tools");
  let currentTool;
  let tools;

  if(toolContainer === "singleplayer") {
    currentTool = singleplayer.getElementsByClassName("active");
    tools = singleplayer.getElementsByClassName("tool");
    currentTool[0].className = currentTool[0].className.replace(" active", "");
    tools[0].className += " active";
  }
}