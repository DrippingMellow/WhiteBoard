// kanban.js
const stage = new Konva.Stage({
    container: document.getElementById('container'),
    width: document.querySelector("#scroll-container").scrollWidth,
    height: window.innerHeight,
});
globalThis.columns = []
const ColumnLayer = new Konva.Layer();
const NotesLayer = new Konva.Layer();
const layerguide = new Konva.Layer();
//const state = []
stage.add(ColumnLayer);
stage.add(NotesLayer);
stage.add(layerguide)
stage.on('')
// if (d == null){
  
  //columns = [{name:'To Do'}, {name: 'In Progress'}, {name: 'Done'}, {name : 'new'}, {name: 'lol'}];
//}
var columnWidth

/**
 * Responsible for managing the Columns
 * 
 * @method ColCol.initColumns() - Creates objects for every Column in: "@const {columns}".
 * 
 * @method ColCol.createNewColumn(name) - Adds a new Column to {@const {columns}}.
 * @param {string} name - Name of new Column
 */
class ColCol {
    initColumns() {
        columns.forEach((column, index) => {
            let columnName = column.name
            column.start = (index * columnWidth);
            column.end = (column.start + columnWidth - 10)
            let space = 0
            if (index != columns.length){
              space = 10
            }
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
                    width: columnWidth - space,
                    height: stage.height(),
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
                    width: columnWidth - space,
                    height: text.height(),
                    fill: "#007ac3",
                    cornerRadius:([10, 10, 0, 0]),
                    name: 'textrec'
                })
              
            group.add(textrec);
            group.add(rect);
            group.add(text);
            
            ColumnLayer.add(group);
            text.on('click', function(){
                text.setText(textarea.value)
                rect.fill(color_pick.value+"a6")
            })
        });
        ColumnLayer.draw()
    };

    createNewColumn(name) {
        if (columns.length >= "10") {
            //danger.classList = "btn-danger";
            return;
        };
        var oldColWidth = 0
        oldColWidth = columnWidth
        o = 0
        ColumnLayer.destroyChildren()
        const newColumnIndex = columns.length;
        columns.push({name: name});
        columnWidth = stage.width() / columns.length;
        ColumnLayer.clear();
        this.initColumns();
        lol(oldColWidth)
        notes.resize_nodes(oldColWidth);
    };

    resetColumnPos() {
        ColumnLayer.destroyChildren()
        this.initColumns()
    }
    
    deleteColumn(name) {
        const index = columns.findIndex(column => column.name === name);
        if (index !== -1) {
            columns.splice(index, 1);
        }
    }
};



class Note {
  constructor(title, text, x, y){
    this.title = title;
    this.text = text;
    this.x = x;
    this.y = y;
    this.attachedToColumn = null;
    this.hoverTimer = null;
  }
    // Function to create a task
    createNote(title, text="no value", x, y, color="#fff", attachedToColumn=false) {
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
            text: title,
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
        taskGroup.add(taskTitle);
        taskGroup.add(taskText);
        NotesLayer.add(taskGroup);
        NotesLayer.draw();

        state.push({id:note_id, objectData: {title: title, text: text, cords:[x, y],  color: color, attachedToColumn: attachedToColumn}})

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
            const nodeId = taskGroup.id();
            const positi_on = taskGroup.getAbsolutePosition();
            let index = 0
            for (let iterator = 0; iterator < state.length; iterator++) {
              const element = state[iterator];
              if (element.id == note_id){
                index = iterator
                break;
              }
            }
            let current = state[index].objectData
            
            current.group = taskGroup.x()
            current.cords = positi_on
            lol(index)
            try{
              globalThis.save_state_change([nodeId,positi_on, state[index]], "position")
            }
            catch{
              console.log("error")
            }
        });
        taskText.on('click tap', () => {
            var local_parent = taskGroup;
            var stageBox = stage.container().getBoundingClientRect();
            const type = 'description';
            TaskTextEditor(local_parent, taskText, stageBox, type, taskRect);
        });
        taskTitle.on('click tap', () => {
            var local_parent = taskGroup;
            var stageBox = stage.container().getBoundingClientRect();
            TaskTextEditor(local_parent, taskTitle,stageBox, 'title', taskRect);
        });

        taskGroup.on('dragmove', () => {
          this.checkAttachment(taskGroup);
        });
    
        //Add hover functionality
        taskGroup.on('mouseenter', () => {
          this.startHoverTimer(taskGroup);
        });
    
        taskGroup.on('mouseleave', () => {
          this.clearHoverTimer();
        });
        return taskGroup;
    };

    /// TODO: Column should change the color, when the task is dragged over it, to show that it is about to be attached ///
    startHoverTimer(taskGroup) {
      this.clearHoverTimer();
      this.hoverTimer = setTimeout(() => {
        this.attachToNearestColumn(taskGroup);
      }, 2500); // Hover for 1 second before attaching
    }
  
    clearHoverTimer() {
      if (this.hoverTimer) {
        clearTimeout(this.hoverTimer);
        this.hoverTimer = null;
      }
    }
  
    attachToNearestColumn(taskGroup) {
      const columns = ColumnLayer.find('.column');
      let nearestColumn = null;
      let minDistance = Infinity;
      const maxDistance = 50; // Maximum distance for attachment
  
      columns.forEach((column) => {
        if (Konva.Util.haveIntersection(taskGroup.getClientRect(), column.getClientRect())) {
          nearestColumn = column;
          lol(nearestColumn)
          return ; // Break the loop if we find an intersecting column
        }
      });
  
      if (nearestColumn.x) {
        lol("this")
        this.attachToColumn(taskGroup, nearestColumn);
      }
    }
  
    attachToColumn(taskGroup, column) {
      lol(taskGroup + " " + column)
      this.attachedToColumn = column.attrs.id;
      //id = this.id
      state.find(id => id = element => {
        element.objectData.attachedToColumn = column.attrs.id;
      });
      
      taskGroup.moveTo(column)
      taskGroup.position({
        x: taskGroup.x() - column.x(),
        y: taskGroup.y()
      });
      ColumnLayer.draw();
      save_state_change([taskGroup.id(), column.id()], "column")
    }
  
    detachFromColumn(taskGroup) {
      if (this.attachedToColumn) {
        taskGroup.moveTo(NotesLayer);
        this.attachedToColumn = null;
        ColumnLayer.draw();
        NotesLayer.draw();
      }
    }
  
    checkAttachment(taskGroup) {
      if (this.attachedToColumn) {
        const columnRect = taskGroup.getClientRect();
        const taskRect = taskGroup.getClientRect();

        if (
          taskRect.x < columnRect.x ||
          taskRect.x + taskRect.width > columnRect.x + columnRect.width
        ) {
          this.detachFromColumn(taskGroup);
        }
      }
    }

    /// FIXED: Position Change correction, as adding columns brings the tasks to wrong positions. ///
    resize_nodes(oldColWidth) {
        const all_notes = NotesLayer.find('.note')
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
        NotesLayer.draw()
    };

    /// FIXME: It has a general problem (maybe with x).  I somehow works now but in unexpected ways. ///
    tasksToTop() {
      var r = 44
      var current_group = ([])

      state.forEach((a) => {
        if (a.objectData.attachedToColumn == null) {
          return;
        }
        if (typeof(a) === "string"){
          return;
        }
        lol(r)
        const group = a.objectData.attachedToColumn
        const object = stage.findOne('#' + a.id);
        lol(group, object)
        if (group != current_group) {
          r = 44 // reset to top
        }

          current_group = group
          const child = object.getChildren()[0]
          var start = 44
          object.position({x: object.x(), y: r})
          r = r + child.height()
          lol(r)
        })
    };
    /// FIXME: It filters out the tasks that has to be removed, but it doesn't remove it. ///
    taskdelete(delement) {
      //element = element
      lol("delete: " + delement.id())
      save_state_change([delement.id()], "delete")
      state.filter(element => {
        console.log(element.id)
        console.log(element.id != delement.id())
        return element.id != delement.id();
      }, state);
    }

}

const colcol = new ColCol();
const notes = new Note()

function addColumn(value = textarea.value, color_pick = document.querySelector('#color_pick').value) {
    colcol.createNewColumn(value)
}

function addTask(title=textarea.value, value="no value", color_pick = document.querySelector('#color_pick').value) {
    notes.createNote(title, value, 10, 400, color_pick);
}



colcol.initColumns();
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
        ColumnLayer.add(line);
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
        ColumnLayer.add(line);
        line.absolutePosition({
          x: lg.lineGuide,
          y: 0,
        });
      }
    });
  }

  ColumnLayer.on('dragmove', function (e) {
    // clear all previous lines on the screen
    ColumnLayer.find('.guid-line').forEach((l) => l.destroy());
    NotesLayer.find('.guid-line').forEach((l) => l.destroy());

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

  NotesLayer.on('dragmove', function (e) {
    // clear all previous lines on the screen
    NotesLayer.find('.guid-line').forEach((l) => l.destroy());
    ColumnLayer.find('.guid-line').forEach((l) => l.destroy());

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

  NotesLayer.on('dragend', function (e) {
    // clear all previous lines on the screen
    ColumnLayer.find('.guid-line').forEach((l) => l.destroy());
  });

