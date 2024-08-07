// kanban.js
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);
stage.on('')
globalThis: var o = 0
const columns = ['To Do', 'In Progress', 'Done', 'new', 'lol'];
const columnWidth = stage.width() / columns.length;

columns.forEach((column, index) => {

    const column_id = "column" + o;
    o = o + 1;
    const group = new Konva.Group({
        id: column_id,
        name: "column",
        x: index * columnWidth,
        y: 0,
        width: columnWidth,
        height: stage.height(),
        draggable: true,
        
    });

    const rect = new Konva.Rect({
        width: columnWidth - 10,
        height: stage.height() - 10,
        fill: '#dddddda6',
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
        rect.fill(color_pick.value)
    })
});

layer.draw();
// Function to create a task
function createNote(text, x, y, color="#fff") {
    const local_state = state
    const note_id = 'note' + i;
    i = i + 1; 
    const taskGroup = new Konva.Group({
        x: x,
        y: y,
        draggable: true,
        id: note_id,
        name: "note",
    });

    const taskRect = new Konva.Rect({
        width: columnWidth - 20,
        height: 50,
        fill: color,
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

    state.push(taskGroup)
    

    /*taskGroup.on('dblclick', function() {
        // Find the text node
        const textNode = taskText

        textNode.setText("tex");

        layer.draw();

    });*/
    taskGroup.on('', function() {
        const textNode = (taskText, taskRect)
        taskRect.fill(color_pick.value);

        lol(textNode)
        
        
    });
    taskGroup.on('dragend', function(){
        const positi_on = taskGroup.getAbsolutePosition();
        const ste_ee = taskGroup.id();
        
        save_state_change([ste_ee,positi_on])
    })
    taskText.on('dblclick dbltap', () => {
        var local_parent = taskGroup.id();
        var textpos = taskText.getAbsolutePosition();
        var stageBox = stage.container().getBoundingClientRect();
        var areapos = {
            x: stageBox.left + textpos.x,
            y: stageBox.top + textpos.y,
        };
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = taskText.text()

        textarea.style.position = 'absolute';
        textarea.style.top = areapos.y + 'px';
        textarea.style.left = areapos.x + 'px';
        textarea.style.width = taskRect.width() + 'px';
        textarea.style.height = taskRect.height() + 'px';
        lol(areapos)

        textarea.focus();
        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            lol(e.key)
            if (e.key === "Enter") {
                taskText.width(taskRect.width());
                taskText.wrap('word');
              taskText.text(textarea.value);
              
              document.body.removeChild(textarea);
              taskRect.height(taskText.height())
              save_state_change([local_parent,taskText.text(),taskRect.height()])
            }
            if (e.key === "Escape") {
                document.body.removeChild(textarea)
            }
          });
    })
    
}

function addColumn() {
    const newColumnIndex = columns.length;
    columns.push('New Column');
    const group = new Konva.Group({
        x: newColumnIndex * columnWidth,
        y: 0,
        width: columnWidth,
        height: stage.height(),
        draggable: true,
        name: "column"
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

function addTask(value=textarea.value) {
    
    createNote(value, 10, 400, color_pick);
}



// Example tasks
createNote('Task 1', 10, 100);
createNote('Task 2', columnWidth + 10, 200);
createNote('Task 3', 2 * columnWidth + 10, 300);
