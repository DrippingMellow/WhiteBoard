import { displayTickets } from "./functions/displayTickets.js"
import { start } from "./functions/start.js"

export let i = 0 //Iterator for ItemID
globalThis.i = 0
let o = 0 //iterator for ColumnID
globalThis.o = 0
//Reserved for Future Use
//var n = 0 //iterator for NoteID 
let state = []
globalThis: state  //Tasks 
export const requestId = 13 //ID for request
globalThis: requestId;
const board = 0
globalThis: board

/**
 * @constant {string} UrlAdress - Is the [Domain / Url] on which the API [is running on / can be spocken to].
 */
export const UrlAdress = "https://localhost:7064" //Enter your Domain here

Cache.bind()

globalThis.lol = function lol(value) {
	console.log(value)
}
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