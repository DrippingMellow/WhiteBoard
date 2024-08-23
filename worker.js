import { displayTickets } from "./displayTickets.js"
import { start } from "./start.js"

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

function setupMenu() {
    const menuNode = document.getElementById('menu');
    menuNode.style.display = 'none';

    document.getElementById('delete-button').addEventListener('click', () => {
        if (currentShape) {
            const parent = currentShape.getParent();
            parent.destroy();
        }
    });

    // Hides menu after clicking "somewhere"
    window.addEventListener('click', () => {
        menuNode.style.display = 'none';
    });

    let currentShape;

    stage.on('contextmenu', function showDeleteButton(e) {
        e.evt.preventDefault();
        if (e.target === stage) {
            return;
        }
        currentShape = e.target;

        // Show menu
        menuNode.style.position = 'absolute';
        menuNode.style.display = 'initial';
        const containerRect = stage.container().getBoundingClientRect();
        menuNode.style.top = containerRect.top + stage.getPointerPosition().y + 4 + 'px';
        menuNode.style.left = containerRect.left + stage.getPointerPosition().x + 4 + 'px';
    });
}

document.addEventListener("DOMContentLoaded", () => {
	try {
		start();
		displayTickets();
		setupMenu();
	} catch (error) {
		console.error("An error occurred:", error);
	}
});