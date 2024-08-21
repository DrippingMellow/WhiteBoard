globalThis: var i = 0 //Iterator for ItemID
globalThis: var o = 0 //iterator for ColumnID
globalThis: state = [] //Tasks 
globalThis: requestId = 13 //ID for request
globalThis: board = 0
globalThis: d = null //Used for data transfer
/**
 * @constant {string} UrlAdress - Is the [Domain / Url] on which the API [is running on / can be spocken to].
 */
const UrlAdress = "https://localhost:7064" //Enter your Domain here

Cache.bind()

function lol(value) {
	console.log(value)
}

/**
 * starts everything up after loading
 * 
 * @requires UrlAdress - The domain of the Server
 * @requires requestId - The ID of the requested board
 * @function start - Please don't edit it cause it might break!
 * @event done - Loads the board when done.
 */
async function start() {
	const requestURL = UrlAdress + "/api/GetTodoItem/" + requestId;

	$.ajax({
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			var parsedata = JSON.parse(atob(atob(data.json)));
			d = Object.assign({}, parsedata)
			lol(d);
			return (data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	}).done(function () {
		loadkanban();
	});
}

/**
 * Send the board to save
 * 
 * @param {JSON} boarditems - Is a with 64 decoded JSon.
 */
async function sendBoard(boarditems, requestURL) {
	$.ajax({
		type: "PUT",
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({ Json: btoa(boarditems), Id: requestId }, null, 2),
		success: function (data) {
			lol(data)
			board.Id = data
			return (data)
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	})
}

function saveBoardState() {
	columns.forEach((column) => {
		const nodes = new Array;
		state.forEach((node, index) => {
			if (column.start < node.objectData.group && node.objectData.group < column.end) {
				// Store positions as percentages
                const xPercent = node.objectData.cords.x / stage.width();
                const yPercent = node.objectData.cords.y / stage.height();
                node.objectData.cords = { xPercent, yPercent };
                node.objectData.attachedToColumn = node.attachedToColumn ? column.name : null;
                nodes.push(node);
			}
		});
		column.nodes = nodes;
	});
	const board = { boardid: 1, columns }
	const requestURL = UrlAdress + "/api/PuttodoItem";
	lol(board)
	a = btoa(JSON.stringify(board, null, 2))
	let awnser = sendBoard(a, requestURL)
	lol("saved " + awnser + " under: " + board.id)
};

function save_state_change(value, type) {
	const id = value[0];
	const pos = value[1];
	JSON.stringify(id, pos, type)
	lol(type + " " + value + "saved in: ")
}

function loadkanban() {
	columns = []
	columnWidth = stage.width() / d.columns.length

	d.columns.forEach((column) => {
		columns.push({ name: column.name })
		lol(column)
		column.nodes.forEach((node) => {
			obj = node.objectData
			//notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
			// Calculate actual positions from percentages
            const x = obj.cords.xPercent * stage.width();
            const y = obj.cords.yPercent * stage.height();
            const note = notes.createNote(obj.title, obj.text, x, y, obj.color);
            if (obj.attachedToColumn) {
                const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
                if (attachedColumn) {
                    note.attachToColumn(note.taskGroup, attachedColumn);
                }
            }
		})
	});
	colcol.initColumns()
}

document.addEventListener("DOMContentLoaded", () => {
	var menuNode = document.getElementById('menu');
	menuNode.style.display = 'none'
	document.getElementById('delete-button').addEventListener('click', () => {
		var parent = currentShape.getParent();
		parent.destroy();
	});

	//hides menue after clicking "somewhere"
	window.addEventListener('click', () => {
		// hide menu
		lol("lol")
		menuNode.style.display = 'none';
	});
	// setup menu
	let currentShape;

	stage.on('contextmenu', function showDeleteButton(e) {
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