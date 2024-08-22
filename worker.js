import { displayTickets } from "./displayTickets"

var i = 0 //Iterator for ItemID
var o = 0 //iterator for ColumnID
globalThis: state = [] //Tasks 
globalThis: requestId = 13 //ID for request
globalThis: board = 0
globalThis: d = null //Used for data transfer
/**
 * @constant {string} UrlAdress - Is the [Domain / Url] on which the API [is running on / can be spocken to].
 */
export const UrlAdress = "https://localhost:7064" //Enter your Domain here

Cache.bind()

export function lol(value) {
	console.log(value)
}

document.addEventListener("DOMContentLoaded", () => {
	try {
		displayTickets();
		var menuNode = document.getElementById('menu');
		menuNode.style.display = 'none';
		document.getElementById('delete-button').addEventListener('click', () => {
			var parent = currentShape.getParent();
			parent.destroy();
		});

		//hides menue after clicking "somewhere"
		window.addEventListener('click', () => {
			// hide menu
			lol("lol");
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
			menuNode.style.position = 'absolute';
			menuNode.style.display = 'initial';
			var containerRect = stage.container().getBoundingClientRect();
			menuNode.style.top =
				containerRect.top + stage.getPointerPosition().y + 4 + 'px';
			menuNode.style.left =
				containerRect.left + stage.getPointerPosition().x + 4 + 'px';
		});
	} catch (error) {
		console.error("An error occurred:", error);
	}
});