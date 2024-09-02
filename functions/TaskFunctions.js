// function Task(name, description, dueDate, priority, completed) {
//     this.name = name;
//     this.description = description;
//     this.dueDate = dueDate;
//     this.priority = priority;
//     this.completed = completed;
// }

function TaskTextEditor(parent, textbox, stageBox, type, taskRect) {
    this.parent = parent;
    this.textbox = textbox;
    lol(parent);
    lol(textbox);
    this.stageBox = stageBox;
    this.type = type;

    switch (type) {
        case "title":
            textelement = 'input';

            createTextEditor(parent, textelement, stageBox, textbox, type, 0, taskRect);
            break;
        case "description":
            textelement = 'textarea';
            createTextEditor(parent, textelement, stageBox, textbox, type, 10, taskRect);
            break;

    }
}

function createTextEditor(parent, b , stageBox, textBox, type, a = 0 , taskRect) {
    const textElement = type === 'title' ? 'input' : 'textarea';
    const textEditor = document.createElement(b);

    const position = parent.getAbsolutePosition();
    const areaPosition = {
        x: stageBox.left + position.x,
        y: stageBox.top + position.y,
    };

    Object.assign(textEditor, {
        setPosition(x, y) {
            this.style.position = 'absolute';
            this.style.left = x + 'px';
            this.style.top = y + 'px';
            return this;
        },

        setWidth(width) {
            this.style.width = width + 'px';
            return this;
        },

        setHeight(height) {
            this.style.height = height + 'px';
            return this;
        },
    });

    document.body.appendChild(textEditor);
    textEditor.value = textBox.text();
    /// FIXME: The text box is placed at a wrong position vertically
    textEditor
        .setPosition(type === 'title' ? 22 : areaPosition.x, areaPosition.y)
        .setWidth(taskRect.width())
        .setHeight(type === 'title' ? 22 : taskRect.height() - 22);

    textEditor.focus();
    textEditor.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            parent.width(taskRect.width());
            textBox.wrap('word');
            textBox.text(textEditor.value);
            document.body.removeChild(textEditor);
            if (type === 'description') {
                taskRect.height(textBox.height() + parent.height());
                if (taskRect.height() >= 250) {
                    textBox.height(230)
                    taskRect.height(textBox.height()+22)
            }}
            save_state_change([parent.id(), textBox.text()], type);
        }

        if (event.key === 'Escape') {
            document.body.removeChild(textEditor);
        }
    });
}
