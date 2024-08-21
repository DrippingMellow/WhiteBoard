globalThis: var i = 0 //Iterator for ItemId
globalThis: state = [] //Tasks 
globalThis: a = ""
globalThis: board = 0 
globalThis: d = null //Used for data transfer

Cache.bind()

function lol(value) {
  console.log(value)
}


async function start() {
	const requestURL = "https://localhost:7064/api/GetTodoItem/13";
	//const request = new Request(requestURL);

	var z = "";

	$.ajax({
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
        contentType: 'application/json',
		success: function(data) {
			var parsedata = JSON.parse(atob(atob(data.json)));
			d = Object.assign({}, parsedata)
            lol(d);
			return(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	}).done(function() {
		loadkanban();
	});
}

function saveBoardState() {
	columns.forEach((column) =>
	{
		const nodes = new Array;
		state.forEach((node, index) =>
		{
			if (column.start < node.objectData.group && node.objectData.group < column.end ){
				nodes.push(node)
				lol(column);
			}
		});
		column.nodes = nodes;
	});
	const board = {boardid: 1, columns}
	const requestURL = "https://localhost:7064/api/PutTodoItem";
	lol(board)
	a = btoa(JSON.stringify(board, null,2))
	//const request = new Request(requestURL);

	$.ajax({
		type: "PUT",
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
        contentType: 'application/json',
		data: JSON.stringify({Json: btoa(a), Id: 13}, null, 2),
		
		success: function(data) {
            lol(data)
			board.Id = data
			return(data)
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	})
};

function save_state_change(value) {
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

function loadkanban() {
	columns = []
	columnWidth = stage.width() / d.columns.length
	
	d.columns.forEach((column) => {
		columns.push({name: column.name})
		lol(column)
		column.nodes.forEach((node) => {
			lol(node)
			obj = node.objectData
			lol(obj)
			lol([obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color])
			notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
		})
	});	
	colcol.initColumns()
}


document.addEventListener("DOMContentLoaded", () => {
	// loadkanban()
	// start();
	var menuNode = document.getElementById('menu');
	menuNode.style.display = 'none'

	document.getElementById('delete-button').addEventListener('click', () => {
  		var parent = currentShape.getParent();
		parent.destroy();
	});

	window.addEventListener('click', () => {
  		// hide menu
  		lol("lol")
  		menuNode.style.display = 'none';
	});
	// setup menu
	let currentShape;


	stage.on('contextmenu', function (e) {
		// prevent default behavior
		e.evt.preventDefault();
		if (e.target === stage) {
		// if we are on empty place of the stage we will do nothing
		return;
		}
		currentShape = e.target;
		
		// show menu
		menuNode.style.position = 'absolute'
		menuNode.style.display = 'initial';
		var containerRect = stage.container().getBoundingClientRect();
		menuNode.style.top =
		containerRect.top + stage.getPointerPosition().y + 4 + 'px';
		menuNode.style.left =
		containerRect.left + stage.getPointerPosition().x + 4 + 'px';
	});
})