// kanban.js
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const layer = new Konva.Layer();
const layertwo = new Konva.Layer();
stage.add(layer);
stage.add(layertwo);
stage.on('')
globalThis: var o = 0
globalThis: var columns = ['To Do', 'In Progress', 'Done', 'new', 'lol'];
var columnWidth = stage.width() / columns.length;

class ColCol {
    initColumns() {
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
    };

    createNewColumn(name) {
        if (columns.length >= "10") {
            danger.class = btn-danger;
            return;
        };
        var oldColWidth = 0
        oldColWidth = columnWidth
        o = 0
        layer.destroyChildren()
        const newColumnIndex = columns.length;
        columns.push(name);
        columnWidth = stage.width() / columns.length;
        layer.clear();
        this.initColumns();
        notes.resize_nodes(oldColWidth);

        
    };
};

const colcol = new ColCol();
colcol.initColumns();

/*columns.forEach((column, index) => {

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

layer.draw();*/

// Function to create a task

class Notes {
    createNote(titletext, text, x, y, color="#fff") {
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
            name: "rect",
            maxheight: 250,
        });

        const taskTitle = new Konva.Text({
            text: titletext,
            fontSize: 20,
            padding: 2,
            height: 20,
            ellipsis: true,
            width: taskRect.width()-10,
        })

        const taskText = new Konva.Text({
            text: text,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#000',
            x: 10,
            y: 22
        });

        taskGroup.add(taskRect);
        taskGroup.add(taskTitle)
        taskGroup.add(taskText);
        layertwo.add(taskGroup);
        layertwo.draw();

        state.push(taskGroup)

        taskGroup.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        taskGroup.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });  
        taskGroup.on('dblclick dbltap', function() {
            const textNode = (taskText, taskRect)
            taskRect.fill(color_pick.value);
            lol(textNode)
        });
        taskGroup.on('dragend', function(){
            const positi_on = taskGroup.getAbsolutePosition();
            const ste_ee = taskGroup.id();
            
            save_state_change([ste_ee,positi_on])
        });
        taskText.on('click tap', () => {
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
            textarea.style.width = (taskRect.width()-10) + 'px';
            textarea.style.height = (taskRect.height()-22) + 'px';
            lol(areapos)

            textarea.focus();
            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                lol(e.key)
                if (e.key === "Enter") {
                    taskText.width(taskRect.width()-10);
                    taskText.wrap('word');
                taskText.text(textarea.value);
                
                document.body.removeChild(textarea);
                taskRect.height(taskText.height()+22)
                if (taskRect.height() >= 250) {
                    taskText.height(230)
                    taskRect.height(taskText.height()+22)
                }
                save_state_change([local_parent,taskText.text(),taskRect.height()])
                }
                if (e.key === "Escape") {
                    document.body.removeChild(textarea)
                }
            });
        });
        taskTitle.on('click tap', () => {
            var local_parent = taskGroup.id();
            var textpos = taskTitle.getAbsolutePosition();
            var stageBox = stage.container().getBoundingClientRect();
            var areapos = {
                x: stageBox.left + textpos.x,
                y: stageBox.top + textpos.y,
            };
            var textarea = document.createElement('input');
            document.body.appendChild(textarea);
            textarea.value = taskTitle.text()

            textarea.style.position = 'absolute';
            textarea.style.top = areapos.y + 'px';
            textarea.style.left = areapos.x + 'px';
            textarea.style.width = taskRect.width() + 'px';
            textarea.style.height = 22 + 'px';
            lol(areapos)

            textarea.focus();
            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                lol(e.key)
                if (e.key === "Enter") {
                    taskTitle.width(taskRect.width());
                    taskTitle.wrap('char')
                taskTitle.text(textarea.value);
                
                document.body.removeChild(textarea);
                save_state_change([local_parent,taskTitle.text()])
                }
                if (e.key === "Escape") {
                    document.body.removeChild(textarea)
                }
            });
        });
    }

    resize_nodes(oldColWidth) {
        const all_notes = layertwo.find('.note')
        lol(all_notes)

        all_notes.forEach((item) => {
            const itemx = item.getAbsolutePosition().x;
            const itemy = item.getAbsolutePosition().y;

            lol(itemx-10)
            lol(oldColWidth)
            const x = ((item.getAbsolutePosition().x - 10) / oldColWidth);
            lol(x)
            const newx = x * columnWidth + 10
            lol("x: " + newx + "y: " + itemy)
            item.position({x: newx, y: itemy})
            var myitem = item.getChildren()
            lol(myitem[0]);
            const rect = myitem[0]
            const title = myitem[1]
            const text = myitem[2]
            rect.width(columnWidth-20);
            title.width(rect.width()-10)
            text.width(rect.width()-10)
            if (text.height() >= 250-20) {
                text.height(230)
                rect.height(250)
            }
            

        })
        layertwo.draw()
    }

}

const notes = new Notes()

function addColumn() {
    value = textarea.value
    colcol.createNewColumn(value)


    
    

    
}

function addTask(value=textarea.value) {
    
    notes.createNote(value, 10, 400, color_pick);
}



// Example tasks
notes.createNote('Task 1', "lol", 10, 100);
notes.createNote('Task 2', "beschreibung", columnWidth + 10, 200);
notes.createNote('Task 3', "etc", 2 * columnWidth + 10, 300);
