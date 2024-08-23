import { lol, UrlAdress } from "./worker.js";

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
	columns.forEach((column, index) => {
		const columnNode = layer.findOne('#column' + index);
		column.x = columnNode.x();
		column.y = columnNode.y();
		const nodes = new Array;
		state.forEach((node, index) => {
			if (column.start < node.objectData.group && node.objectData.group < column.end) {
				// Store positions as percentages
				const xPercent = node.objectData.cords.x / stage.width();
				const yPercent = node.objectData.cords.y / stage.height();
				node.objectData.cords = { xPercent, yPercent };
				node.objectData.attachedToColumn = node.attachedToColumn ? column : "column1";
				lol(node.objectData.attachedToColumn);
				nodes.push(node);
			}
		});
		column.nodes = nodes;
	});
	const board = { boardid: 1, columns };
	const requestURL = UrlAdress + "/api/PuttodoItem";
	lol(board);
	a = btoa(JSON.stringify(board, null, 2));
	let awnser = sendBoard(a, requestURL);
	lol("saved " + awnser + " under: " + board.id);
}
;
function save_state_change(value, type) {
	const id = value[0];
	const pos = value[1];
	JSON.stringify(id, pos, type);
	lol(type + " " + value + "saved in: ");
}
