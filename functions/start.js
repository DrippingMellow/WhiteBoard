

let d = null //Used for data transfer
globalThis: d;

/**
 * starts everything up after loading
 *
 * @requires UrlAdress - The domain of the Server
 * @requires requestId - The ID of the requested board
 * @function start - Please don't edit it cause it might break!
 * @event done - Loads the board when done.
 */

async function start() {
	const requestURL = UrlAdress + "/api/GetKanban/" + requestId;

	$.ajax({
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			try {
				var parsedata = JSON.parse(atob(atob(data.json)));
				d = Object.assign({}, parsedata);
				lol(d);
				return (data);
			}
			catch (error) {
				console.error("No data:", error);
			}
			
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	}).done(function () {
		loadkanban(d);
	});
}
