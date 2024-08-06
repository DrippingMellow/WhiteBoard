// Sample data (you can load this from a JSON file)
const initialData = [
    {   id: 1, 
        title: 'To Do', 
        items: [
            {task: 'Task 1', dueDate: '2024-08-10'},
            {task: 'Task 2'}
        ],
        colour: '#005500'
    },
    { id: 2, title: 'In Progress', items: ['Task 3'] },
    { id: 3, title: 'Done', items: ['Task 4', 'Task 5'] }
];

const items = document.querySelectorAll('.kanban_items div');
const add = document.querySelectorAll('#plusElement');
//add.addEventListener('click', AddNote(11));


items.forEach(item => {
    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.textContent);
    });

    item.addEventListener('dragover', e => {
        e.preventDefault();
    });

    item.addEventListener('drop', e => {
        e.preventDefault();
        const droppedTask = e.dataTransfer.getData('text/plain');
        item.textContent = droppedTask;
    });
    
});

// Create columns and items dynamically
function createColumnsAndItems(data) {
    const kanban = document.querySelector('.kanban');
    data.forEach(column => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('kanban_column');
        var column_id = 'column-' + column.id; //create column id to use for colouring
        columnDiv.classList.add(column_id)
        columnDiv.innerHTML = `
            <div class="kanban_column-title">${column.title}</div>
            <div class="kanban_items">
                ${column.items.map(item => `<div data-tag="${item}">${item}</div>`).join('')}
            </div>
            <div class='plusElement btn' onclick='`+AddNote(1111)+`' id='addnote-${column.id}'>+</div>
        `;
        kanban.appendChild(columnDiv);
    });
    console.log('data done')
}

function saveBoardState() {
    const columns = document.querySelectorAll('.kanban_column');
    const boardData = [];

    columns.forEach(column => {
        const title = column.querySelector('.kanban_column-title').textContent;
        const items = Array.from(column.querySelectorAll('.kanban_items div')).map(item => item.textContent);
        boardData.push({ title, items });
    });

    const jsonContent = JSON.stringify(boardData, null, 2);

    // Save jsonContent to a file or display it as needed
    console.log(jsonContent);
}
// Load data and create the board
window.addEventListener('DOMContentLoaded', () => {
    createColumnsAndItems(initialData);
});

function AddNote(value){
    console.log(value)
}
window.addEventListener()