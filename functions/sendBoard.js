//sendBoard.js

/**
 * Send the board to save on the database
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
		data: JSON.stringify({ Json: boarditems, Id: requestId }, null, 2),
		success: function (data) {
			lol(data);
			board.Id = data;
			return (data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	});
}
function saveBoardState() {
	const boardData = {
		boardId: 1,
		columns: columns.map(column => ({
			id: column.id,
			x: column.x,
			y: column.y,
			nodes: state
				.filter(node => column.start <= node.objectData.group && node.objectData.group <= column.end)
				.map(node => ({
					id: node.id,
					objectData: {
						...node.objectData,
						coordinates: {
							xPercent: node.objectData.cords.x / stage.width(),
							yPercent: node.objectData.cords.y / stage.height(),
						},
						attachedToColumn: node.attachedToColumn || null,
					},
				})),
		})),
		nodes: state
			.map(node => ({
				id: node.id,
				objectData: {
					...node.objectData,
					coordinates: {
						xPercent: /*(node.objectData[0] || node.objectData.cords.x )*/ node.objectData.x / stage.width(), // stage.find("#" + node.id).getAbsolutePosition().x.replace("px", "")
						yPercent: /*(node.objectData.cords[1] || node.objectData.cords.y || node.objectData.y)*/ node.objectData.y / stage.height(),
					},
				},
			})),
	};

	console.log('boardData:', boardData);
	const requestUrl = UrlAdress + "/api/PutKanban";
	const boardString = JSON.stringify(boardData, null, 2);
	
	const news = new TextEncoder().encode(boardString);
	const deflate = new Zlib.Deflate(news)
	var dataa = deflate.compress()
	const boardBytes = btoa(boardString).length;
	const boardBytesCompressed = btoa(dataa);
	lol(boardBytesCompressed)
	lol(dataa)
	lol(atob(boardBytesCompressed))
	lol(`Before Compression: ${news.length} bytes, After Compression: ${dataa.length} bytes, Compression Ratio: ${news.length / dataa.length} additional btoa ${boardBytesCompressed.length} bytes. ${boardBytes} would be the size with base64 encoding.`);
	const boardBytese = btoa(boardString);

	sendBoard(boardString, requestUrl).then((response) => {
	 	boardData.boardId = response;
	});
};

/**
 * Saves a state change with the given value and type.
 *
 * @param {array} value - An array containing the id and position of the state change.
 * @param {string} type - The type of the state change.
 * @return {undefined}
 */
function save_state_change(value, type) {	
	const id = value[0];
	const pos = value[1];
	console.log(type)
	node = state.filter(node => id == node.id)[0];
	switch (type) {
		case "position":
			console.log(pos)
			//node.objectData.cords = pos
			node.objectData.x = pos.x
			node.objectData.y = pos.y
			break;
		case "color":
			node.objectData.color = pos
			break;
		case "description":
			node.objectData.text = pos
			break;
		case "title":
			node.objectData.title = pos
			break;
		case "column":
			node.objectData.attachedToColumn = pos
			break;
		case "delete":
			state = state.filter(node => id != node.id)
			pos = null
			break;
		default:
			throw new Error("Invalid type! please look at /function/sendBoard.js for the save_state_change function!");
			break;
	}
	lol((typeof pos == "object" ? pos.x + " " + pos.y : pos)  + " as " + type + " saved for object: " + id);
};

