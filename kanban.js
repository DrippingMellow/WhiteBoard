// kanban.js
const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight,
});

const layer = new Konva.Layer();
const layertwo = new Konva.Layer();
const layerguide = new Konva.Layer();
const state = []
stage.add(layer);
stage.add(layertwo);
stage.add(layerguide)
stage.on('')
globalThis: var o = 0
globalThis: var columns = [{name:'To Do'}, {name: 'In Progress'}, {name: 'Done'}, {name : 'new'}, {name: 'lol'}];
columns_width = []
var columnWidth = stage.width() / columns.length;

class ColCol {
    initColumns() {
        columns.forEach((column, index) => {
          let columnName = column.name
          column.start = (index * columnWidth);
          column.end = (column.start + columnWidth - 10)

            const column_id = "column" + o;
            o = o + 1;
            const group = new Konva.Group({
                id: column_id,
                name: "column",
                x: column.start,
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
                text: columnName,
                fontSize: 24,
                fontFamily: 'Calibri',
                fill: '#000',
                padding: 10,
                align: 'center',
            });

            const textrec = new Konva.Rect({
                width: columnWidth - 10,
                height: text.height(),
                fill: "#fcd",
                cornerRadius:([10, 10, 0, 0]),
                name: 'textrec'
            })
            
            group.add(textrec);
            group.add(rect);
            group.add(text);
            
            layer.add(group);
            text.on('click', function(){
                text.setText(textarea.value)
                rect.fill(color_pick.value)
            })
        });
        layer.draw()
    };

    createNewColumn(name) {
        if (columns.length >= "10") {
            //danger.classList = "btn-danger";
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

    resetColumnPos() {
        layer.destroyChildren()
        this.initColumns()
    }
};


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

        state.push({id:note_id, objectData: {group: taskGroup.x(), title: titletext, text: text, cords:[x, y],  color: color}})

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
            const nodeId = taskGroup.id();
            let index = 0
            for (let iterator = 0; iterator < state.length; iterator++) {
              const element = state[iterator];
              if (element.id == note_id){
                index = iterator
                break;
              }
            }
            
            state[index].group = taskGroup.x()
            state[index].cords = positi_on
            lol(index)
            save_state_change([nodeId,positi_on])
        });
        taskText.on('click tap', () => {
            var local_parent = taskGroup.id();
            var textpos = taskText.getRelativePosition();
            lol(textpos)
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
    };

    /// TODO: Position Change correction, as adding columns brings the tasks to wrong positions. ///
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
    };

    tasksToTop() {
      var r = 44
      var current_group = ([])

      state.forEach((a) => {
        if (typeof(a) === "string"){
          return;
        }
        lol(r)
        const {group, object} = a
        lol(group, object)
        if (group != current_group) {
          r = 44 // reset to top
        }
        if (group === object.x()) {
          current_group = object.x()
          lol(object)
          const child = object.getChildren()[0]
          var start = 44
          object.position({x: object.x(), y: r})
          r = r + child.height()
          lol(r)
        }
          
      })
    }

}

const colcol = new ColCol();
const notes = new Notes()

function addColumn() {
    value = textarea.value
    colcol.createNewColumn(value)
}

function addTask(title=textarea.value, value="no value") {
    notes.createNote(title, value, 10, 400, color_pick);
}



// Example tasks



// were can we snap our objects?
function getLineGuideStops(skipShape) {
    guideItem = []
    // we can snap to stage borders and the center of the stage
    var vertical = [0, stage.width() / 2, stage.width()];
    var horizontal = [0, stage.height() / 2, stage.height()];

    const childs = stage.getChildren()
    childs.forEach(child => {
        const children = child.getChildren()
        children.forEach((guideItem) => {
            if (guideItem === skipShape) {
                return;
              }
              var box = guideItem.getClientRect();
              // and we can snap to all edges of shapes
            if (guideItem.name() === 'column') {
                vertical.push([box.x + box.width-1, box.x + box.width / 2]);
              horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
              return;
            }
              horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
            });
            
        });
        const texthigh = stage.findOne('.textrec');
        const y = texthigh.getAbsolutePosition().y
        horizontal.push([y + texthigh.height()])
        //lol(vertical)
        return {
            vertical: vertical.flat(),
            horizontal: horizontal.flat(),
        };
    };
  // what points of the object will trigger to snapping?
  // enables snapping horizontally all edges and center and Vertically just end
  function getObjectSnappingEdges(node) {
    var box = node.getClientRect();
    var absPos = node.absolutePosition();

    return {
      vertical: [
        /*{
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: 'center',
        },*/
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: 'end',
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: 'end',
        },
      ],
    };
  }

  // find all snapping possibilities
  function getGuides(lineGuideStops, itemBounds) {
    var resultV = [];
    var resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < 10) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        var diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < 10) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    var guides = [];

    // find closest snap
    var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      });
    }
    return guides;
  }

  function drawGuides(guides) {
    guides.forEach((lg) => {
      if (lg.orientation === 'H') {
        var line = new Konva.Line({
          points: [-6000, 0, 6000, 0],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        });
        layer.add(line);
        line.absolutePosition({
          x: 0,
          y: lg.lineGuide,
        });
      } else if (lg.orientation === 'V') {
        var line = new Konva.Line({
          points: [0, -6000, 0, 6000],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 1,
          name: 'guid-line',
          dash: [4, 6],
        });
        layer.add(line);
        line.absolutePosition({
          x: lg.lineGuide,
          y: 0,
        });
      }
    });
  }

  layer.on('dragmove', function (e) {
    // clear all previous lines on the screen
    layer.find('.guid-line').forEach((l) => l.destroy());
    layertwo.find('.guid-line').forEach((l) => l.destroy());

    // find possible snapping lines
    var lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    var itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    var guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
      return;
    }

    drawGuides(guides);

    var absPos = e.target.absolutePosition();
    // now force object position
    guides.forEach((lg) => {
      switch (lg.orientation) {
        case 'V': {
          absPos.x = lg.lineGuide + lg.offset;
          break;
        }
        case 'H': {
          absPos.y = lg.lineGuide + lg.offset;
          break;
        }
      }
    });
    e.target.absolutePosition(absPos);
  });

  layertwo.on('dragmove', function (e) {
    // clear all previous lines on the screen
    layertwo.find('.guid-line').forEach((l) => l.destroy());
    layer.find('.guid-line').forEach((l) => l.destroy());

    // find possible snapping lines
    var lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    var itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    var guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
      return;
    }

    drawGuides(guides);

    var absPos = e.target.absolutePosition();
    // now force object position
    guides.forEach((lg) => {
      switch (lg.orientation) {
        case 'V': {
          absPos.x = lg.lineGuide + lg.offset;
          break;
        }
        case 'H': {
          absPos.y = lg.lineGuide + lg.offset;
          break;
        }
      }
    });
    e.target.absolutePosition(absPos);
  });

  layertwo.on('dragend', function (e) {
    // clear all previous lines on the screen
    layer.find('.guid-line').forEach((l) => l.destroy());
  });
