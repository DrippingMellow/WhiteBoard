



/**
 * Loads tickets, to show them above the kanban, for the user to see and add.
 */

async function getTickets() {
	var requestURL = UrlAdress + "/api/Tickets/GetTickets/";
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

// Searchbar
// https://stackoverflow.com/questions/4965335/how-to-filter-results-in-a-select-dropdown-using-javascript
// https://stackoverflow.com/questions/13596534/how-to-search-for-text-in-a-select-dropdown-using-javascript
// TODO: Add search bar with dropdown
async function searchTickets() {
    const searchTerm = document.getElementById('searchbar').querySelector('input').value.toLowerCase();
    const requestURL = UrlAdress + `/api/Tickets/SearchTickets?searchTerm=${searchTerm}`;
	//const data = JSON.stringify({ searchTerm: searchTerm }, null, 2);
    
    $.ajax({
        url: requestURL,
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
		data: null,
        success: successFunction,
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
        }
    });
}

function successFunction(data) {
    const tickets = document.getElementById('tasks').querySelectorAll('.ticket-container');
    tickets.forEach(ticket => {
        const ticketName = ticket.querySelector('.ticket').textContent.toLowerCase();
        ticket.style.display = data.includes(ticketName) ? 'block' : 'none';
    });
}

document.getElementById('searchbar').querySelector('input').addEventListener('keyup', searchTickets);

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
function displayTickets() {
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
