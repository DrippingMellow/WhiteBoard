// kanban.js
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

const columns = ['To Do', 'In Progress', 'Done'];
const columnWidth = stage.width() / columns.length;

columns.forEach((column, index) => {
    const group = new Konva.Group({
        x: index * columnWidth,
        y: 0,
        width: columnWidth,
        height: stage.height(),
        draggable: true,
    });

    const rect = new Konva.Rect({
        width: columnWidth - 10,
        height: stage.height() - 10,
        fill: '#ddd',
        stroke: '#000',
        strokeWidth: 2,
        cornerRadius: 10,
    });

    const text = new Konva.Text({
        text: column,
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: '#000',
        padding: 10,
        align: 'center',
    });

    group.add(rect);
    group.add(text);
    layer.add(group);
    text.on('click', function(){
        text.setText(textarea.value)
    })
});

layer.draw();

// Function to create a task
function createNote(text, x, y) {
    const taskGroup = new Konva.Group({
        x: x,
        y: y,
        draggable: true,
    });

    const taskRect = new Konva.Rect({
        width: columnWidth - 20,
        height: 50,
        fill: '#fff',
        stroke: '#000',
        strokeWidth: 1,
        cornerRadius: 5,
    });

    const taskText = new Konva.Text({
        text: text,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000',
        padding: 10,
    });

    taskGroup.add(taskRect);
    taskGroup.add(taskText);
    layer.add(taskGroup);
    layer.draw();

    taskGroup.on('dbclick', function() {
        // Find the text node
        const textNode = taskText

        textNode.setText("tex");

        layer.draw();

    });
    taskGroup.on('click', function() {
        const textNode = taskText
        textarea.style.display = 'block';
        textarea.style.position = 'fixed';
        textarea.style.left = taskText.x() + 'px';
        textarea.style.top = taskText.y() + 'px';
        textarea.style.width = taskText.width() + 'px';
        textarea.style.height = taskText.height() + 'px';
        textarea.value = taskText.text();
        textarea.focus()
        while (textarea)
            textNode.setText(textarea.value);
        
    });
    
}

// Add this to kanban.js

function addColumn() {
    const newColumnIndex = columns.length;
    columns.push('New Column');
    const group = new Konva.Group({
        x: newColumnIndex * columnWidth,
        y: 0,
        width: columnWidth,
        height: stage.height(),
        draggable: true,
    });

    const rect = new Konva.Rect({
        width: columnWidth - 10,
        height: stage.height() - 10,
        fill: '#ddd',
        stroke: '#000',
        strokeWidth: 2,
        cornerRadius: 10,
    });

    const text = new Konva.Text({
        text: 'New Column',
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: '#000',
        padding: 10,
        align: 'center',
    });

    group.add(rect);
    group.add(text);
    layer.add(group);
    layer.draw();

    
}

function addTask() {
    
    createNote(textarea.value, 10, 400);
}


// Example tasks
createNote('Task 1', 10, 100);
createNote('Task 2', columnWidth + 10, 200);
createNote('Task 3', 2 * columnWidth + 10, 300);
