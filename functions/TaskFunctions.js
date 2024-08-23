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

            edit(parent, textelement, stageBox, textbox, 0, taskRect);
            break;
        case "description":
            textelement = 'textarea';
            edit(parent, textelement, stageBox, textbox, 10, taskRect);
            break;

    }
}

function edit(parent, txtelement, stageBox, textbox, a = 0, b = 0) {
    let titleheight = 22;
    let textpos = parent.getAbsolutePosition();
    var areapos = {
        x: stageBox.left + textpos.x,
        y: stageBox.top + textpos.y,
    };
    var textarea = document.createElement(txtelement);
    Object.assign(textarea, {
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
        }
    });
            document.body.appendChild(textarea);
            textarea.value = textbox.text()
            textarea
                .setPosition(areapos.x, areapos.y)
                .setWidth(b.width() - a)
                .setHeight(b !== 0 ? b.height() - titleheight : titleheight);
            
            lol(areapos)

            textarea.focus();
            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                lol(e.key)
                if (e.key === "Enter") {
                    txtelement.width(b.width());
                    txtelement.wrap('char')
                txtelement.text(textarea.value);
                document.body.removeChild(textarea);
                save_state_change([parent.id(),txtelement.text()])
                }
                if (e.key === "Escape") {
                    document.body.removeChild(textarea)
                }
            });
}