

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
						xPercent: node.objectData.cords[0] || node.objectData.cords.x / stage.width(), // stage.find("#" + node.id).getAbsolutePosition().x.replace("px", "")
						yPercent: node.objectData.cords[1] || node.objectData.cords.y / stage.height(),
					},
				},
			})),
	};

	console.log('boardData:', boardData);
	const requestUrl = UrlAdress + "/api/PutKanban";
	const boardString = JSON.stringify(boardData, null, 2);
	const boardBytes = btoa(boardString);

	sendBoard(boardBytes, requestUrl).then((response) => {
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
	node = state.filter(node => id == node.id)
	switch (type) {
		case "position":
			console.log(pos)
				node[0].objectData.cords = pos
				break;
			case "color":
				node[0].objectData.color = pos
				break;
			case "description":
				node[0].objectData.text = pos
				break;
			case "title":
				node[0].objectData.title = pos
				break;
			case "column":
				node[0].objectData.attachedToColumn = pos
				break;
			default:
				throw new Error("Invalid type! please look at /function/sendBoard.js for the save_state_change function!");
				break;
	}
	lol(((pos.x + " " + pos.y) || pos)  + " as " + type + " saved for object: " + id);
};

