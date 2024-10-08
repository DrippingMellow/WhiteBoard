

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
				let enddata = []
				const start = data.json.slice(0, 3);
				lol(start);
				switch (start){
					case null:
						console.error("No data:", data);
						break;
					case "ZXd":
						enddata = JSON.parse(atob(atob(data.json)));
					case "ewo":
						enddata = JSON.parse(atob(data.json));
						break;
					case "MTI":
						arr = new Uint8Array(atob(data.json).split(",").map(x => parseInt(x))); //atob(data.json)
						var inflate = new Zlib.Inflate(arr);
						lol(inflate)
						var plain2 = inflate.decompress();
						lol(plain2)
						predata = new TextDecoder().decode(plain2);
						enddata = JSON.parse(predata);
						break;
					default:
						enddata = JSON.parse(data.json);
						break;
				}
				d = Object.assign({}, enddata);
				if (d == {}){
					console.error("No data:", data);
					throw new Error("No data");
				}
				return (enddata);
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
		console.log("done");
	});
}

/**
 * Retrieves the current user's data from the server.
 * @returns {Object} The user data returned from the server.
 */
function getUser() {
	const requestURL = UrlAdress + "/api/GetUser/" + UserId;
	$.ajax({
		url: requestURL,
		crossDomain: true,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			try {
				return data;
			}
			catch (error) {
				console.error("No data:", error);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.error('Error:', textStatus, errorThrown);
		}
	})
}