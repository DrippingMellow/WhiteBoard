globalThis: var i = 0
globalThis: state = []

Cache.bind()

function lol(value) {
  console.log(value)
}

//const type = {"note": createNote(), "img_note": createImgNote(), "column": addColumn()}

async function start() {
	const requestURL = "kanban.json";
	const request = new Request(requestURL);
	lol(request)

	const response = await fetch(request);
	lol(response)
	const awnser = await response.json(response);
	lol("return" + awnser)
}

function saveBoardState() {
    //const columns = document.querySelectorAll('.kanban_column');
	const columns = stage.find(".column")
	const notes = stage.find(".note")
	const items = columns.concat(notes);
	const boardData = [];

    items.forEach(col => {
		const item = col;
		//col.forEach(ite => {ite.push(item)})
		lol(item)
		
		//boardData.push({id: col.attrs.id, node_data: (item.attrs), child_data: item.children[0], child_data1: item.children[1]});
		boardData.push({id: col.attrs.id, data: (col)})
	});

	lol(boardData)

    global: jsonContent = JSON.stringify(boardData, null, 2);
	localStorage.setItem("/kanban.json", jsonContent);

    // Save jsonContent to a file or display it as needed
    console.log(jsonContent);

};

function save_state_change(value) {
	var kanban = fileName= "kanban.json"
	const id = value[0];
	const pos = value[1];
	JSON.stringify(id,pos)
	lol(value , "saved in: ")
}

function save_name_change(value) {
	const id = value[0];
	const pos = value[1];
	JSON.stringify(id,pos)
	lol(value + "saved in: ")
}

document.addEventListener("DOMContentLoaded", () => {
	start();
})

// setup menu
let currentShape;
var menuNode = document.getElementById('menu');

document.getElementById('delete-button').addEventListener('click', () => {
  currentShape.destroy();
});

window.addEventListener('click', () => {
  // hide menu
  menuNode.style.display = 'none';
});