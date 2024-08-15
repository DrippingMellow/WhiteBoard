globalThis: var i = 0
globalThis: state = []
globalThis: a = ""
globalThis: board = 0

Cache.bind()

function lol(value) {
  console.log(value)
}

//const type = {"note": createNote(), "img_note": createImgNote(), "column": addColumn()}

async function start() {
	const requestURL = "https://localhost:7064/api/GetTodoItems";
	//const request = new Request(requestURL);

	$.ajax({
		url: requestURL,
		crossDomain: true,
		ContentType: "json",
		dataType: "json",
		success: function(data) {
            lol(data)
			return(data)
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	})
}

function saveBoardState() {
    object = stage.toObject()
	const a = JSON.stringify(object, null, 2)
	lol(a)
	const requestURL = "https://localhost:7064/api/SaveNew";
	b = {
		"name": "nomnom","description": "this is text","ownerId": 1
	};
	
	//const request = new Request(requestURL);

	$.ajax({
		type: "POST",
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
        contentType: 'application/json',
		data: JSON.stringify(b, null, 2),
		
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
	colcol.initColumns()
	notes.createNote('Task 1', "lol", 10, 100);
	notes.createNote('Task 2', "beschreibung", columnWidth + 10, 200);
	notes.createNote('Task 3', "etc", 2 * columnWidth + 10, 300);
}

function loadkanson() {
	const state = []
	const requestURL = "https://localhost:7064/api/GetTodoItem/Id";
	//const request = new Request(requestURL);

	$.ajax({
		url: requestURL,
		crossDomain: true,
		dataType: "json",
		success: function(data) {
            lol(data)
			return(data)
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	})
	stage.create(data)
}

document.addEventListener("DOMContentLoaded", () => {
	loadkanban()
	start();
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