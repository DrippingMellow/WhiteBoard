import { lol, UrlAdress } from "../worker.js";

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
	const board = { boardid: 1, columns: columns.map(column => ({
		id: column.id,
		x: column.x,
		y: column.y,
		nodes: state.filter(node => column.start < node.objectData.group && node.objectData.group < column.end).map(node => ({
			id: node.id,
			objectData: {
				...node.objectData,
				cords: {
					xPercent: node.objectData.cords.x / stage.width(),
					yPercent: node.objectData.cords.y / stage.height()
				},
				attachedToColumn: node.attachedToColumn || "column1"
			}
		}))
	}))};
	const requestURL = UrlAdress + "/api/PuttodoItem";
	lol(board);
	a = btoa(JSON.stringify(board, null, 2));
	let awnser = sendBoard(a, requestURL);
	lol("saved " + awnser + " under: " + board.id);
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
	JSON.stringify(id, pos, type);
	lol(type + " " + value + "saved in: ");
};
globalThis.save_state_change = save_state_change();

