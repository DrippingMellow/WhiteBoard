import { UrlAdress, lol } from "./worker.js";

/**
 * Loads tickets, to show them above the kanban, for the user to see and add.
 */

async function getTickets() {
	var requestURL = UrlAdress + "/api/GetTickets/";
	return new Promise((resolve, reject) => {
		$.ajax({
			url: requestURL,
			crossDomain: true,
			dataType: 'json',
			contentType: 'application/json',
			success: function (data) {
				lol(data);
				resolve(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				reject(errorThrown);
			}
		});
	});
}

/**
 * Fetches a list of tickets from the server and displays them in the UI.
 *
 * This function makes an AJAX request to the server to retrieve a list of tickets,
 * and then creates HTML elements to display each ticket in the UI. The tickets
 * are displayed in a container element with the ID 'tasks', and a button is
 * added to each ticket that allows the user to create a new note with the
 * ticket's name.
 *
 * @returns {Promise<void>} A Promise that resolves when the tickets have been
 * displayed in the UI.
 */
export function displayTickets() {
	const tasksContainer = document.querySelector('#tasks');
	const ticketsContainer = document.querySelector('.NeueTasksGehege');

	if (tasksContainer && ticketsContainer) {
		getTickets().then(tickets => {
			tasksContainer.innerHTML = '';
			tickets.forEach(ticket => {
				const ticketContainerElement = document.createElement('div');
				ticketContainerElement.classList.add('ticket-container');
				const ticketElement = document.createElement('div');
				ticketElement.classList.add('ticket');
				ticketElement.textContent = ticket.name;
				const addButton = document.createElement('div');
				addButton.textContent = '+';
				addButton.classList.add('btn');
				addButton.classList.add('plusElement');
				addButton.classList.add('null');
				addButton.setAttribute("onClick",
					`notes.createNote("${ticket.name}");
					parentElement.remove()`);
				ticketContainerElement.appendChild(ticketElement);
				ticketContainerElement.appendChild(addButton);
				tasksContainer.appendChild(ticketContainerElement);
			});
			ticketsContainer.appendChild(tasksContainer);
		}).catch(error => {
			console.error('Error fetching tickets:', error);
		});
	} else {
		console.error('Container elements not found');
	}
}
