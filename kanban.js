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
//var columnWidth;
class ColumnManager {
    constructor() {
        this.columnWidth = stage.width();
    }

    initColumns() {
        columns.forEach((column, index) => {
            const { name: columnName } = column;
            this.columnWidth = stage.width() / columns.length

            const group = this.createColumnGroup(columnName, index);
            ColumnLayer.add(group);
        });
        ColumnLayer.draw();
    }

    createColumnGroup(columnName, index) {
        const column_id = `column${index}`;
        const group = new Konva.Group({
            id: column_id,
            name: "column",
            x: index * this.columnWidth,
            y: 0,
            width: this.columnWidth,
            height: stage.height(),
            draggable: true,
        });

        const rect = new Konva.Rect({
            width: this.columnWidth - 10,
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
            width: this.columnWidth - 10,
            height: text.height(),
            fill: "#007ac3",
            cornerRadius: [10, 10, 0, 0],
            name: 'textrec'
        });

        group.add(textrec, rect, text);
        this.addColumnEventListeners(text, rect);
        return group;
    }

    addColumnEventListeners(text, rect) {
        text.on('click', () => {
            text.setText(textarea.value);
            rect.fill(color_pick.value + "a6");
        });
    }

    createNewColumn(name) {
        if (columns.length >= 10) return;
        const oldColWidth = this.columnWidth;
        ColumnLayer.destroyChildren();
        columns.push({ name });
        this.columnWidth = stage.width() / columns.length;
        this.initColumns();
        this.resizeNotes(oldColWidth);
    }

    resizeNotes(oldColWidth) {
        notes.resize_nodes(oldColWidth);
    }

    resetColumnPos() {
        ColumnLayer.destroyChildren();
        this.initColumns();
        this.resizeNotes(this.columnWidth);
    }

    deleteColumn(name) {
        columns.splice(name.index, 1);
        this.resetColumnPos();
    }
};

  // Global functions optimization
  const addColumn = (value = textarea.value, color = color_pick.value) => {
      columnManager.createNewColumn(value, color);
  };
  const deleteColumn = (name) => {
      columnManager.deleteColumn(name);
  };

  // Initialize
  const columnManager = new ColumnManager();
  columnManager.initColumns();
  class Note {
    constructor(title, text, x, y){
      this.title = title;
      this.text = text;
      this.x = x;
      this.y = y;
      this.attachedToColumn = null;
      this.hoverTimer = null;
      this.noteId = 0;
    }

    // Function to create a task
    createNote(title, text="no value", x, y, color="#fff", attachedToColumn=false) {
      const NoteFactory = (() => {

        const createNote = (title, text = "no value", x, y, color = "#fff", attachedToColumn = false) => {
          const id = `note${this.noteId++}`;
          const group = new Konva.Group({
            x, y,
            draggable: true,
            id,
            name: "note",
          });

          const rect = new Konva.Rect({
            width: columnWidth - 20,
            height: 50,
            fill: color,
            stroke: '#000',
            strokeWidth: 1,
            cornerRadius: 5,
            name: "rect",
            maxheight: 250,
          });

          const titleText = new Konva.Text({
            text: title,
            fontSize: 20,
            padding: 2,
            height: 20,
            ellipsis: true,
            width: rect.width() - 10,
          });

          const contentText = new Konva.Text({
            text,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#000',
            x: 10,
            y: 22
          });

          group.add(rect, titleText, contentText);

          return {
            id,
            group,
            rect,
            titleText,
            contentText,
            data: { title, text, x, y, color, attachedToColumn }
          };
        };

        return { createNote };
      })();

      const note = NoteFactory.createNote(title, text, x, y, color, attachedToColumn);
      NotesLayer.add(note.group);
      state.push({ id: note.id, objectData: note.data });

      note.group.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      note.group.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });  
      note.group.on('dblclick dbltap', function() {
        const textNode = (note.contentText, note.rect)
        note.rect.fill(color_pick.value);
        lol(textNode)
      });
      note.group.on('dragend', function(){
        const nodeId = note.group.id();
        const positi_on = note.group.getAbsolutePosition();
        let index = 0
        for (let iterator = 0; iterator < state.length; iterator++) {
          const element = state[iterator];
          if (element.id == note.id){
            index = iterator
            break;
          }
        }
        let current = state[index].objectData
      
        current.group = note.group.x()
        current.cords = positi_on
        lol(index)
        try{
          globalThis.save_state_change([nodeId,positi_on, state[index]], "position")
        }
        catch{
          console.log("error")
        }
      });
      note.contentText.on('click tap', () => {
        var local_parent = note.group;
        var stageBox = stage.container().getBoundingClientRect();
        const type = 'description';
        TaskTextEditor(local_parent, note.contentText, stageBox, type, note.rect);
      });
      note.titleText.on('click tap', () => {
        var local_parent = note.group;
        var stageBox = stage.container().getBoundingClientRect();
        TaskTextEditor(local_parent, note.titleText, stageBox, 'title', note.rect);
      });

      note.group.on('dragmove', () => {
        this.checkAttachment(note.group);
      });

      //Add hover functionality
      note.group.on('mouseenter', () => {
        this.startHoverTimer(note.group);
      });

      note.group.on('mouseleave', () => {
        this.clearHoverTimer();
      });
      return note.group;
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

const notes = new Note()

const addTask = (title = textarea.value, value = "no value", color = color_pick.value = document.querySelector('#color_pick').value) => {
      notes.createNote(title, value, 10, 400, color);
  };

// function addTask(title=textarea.value, value="no value", color = document.querySelector('#color_pick').value) {
//     notes.createNote(title, value, 10, 400, color);
// }


// class Guide {
//     constructor() {
//         this.guide = new Konva.Line({
//             stroke: 'red',
//             strokeWidth: 2,
//             lineCap: 'round',
//             lineJoin: 'round',
//             globalCompositeOperation: 'source-over',
//             dash: [10, 10],
//             dashOffset: 0,
//             opacity: 0.5,
//             name: 'guide',
//             draggable: false,
//             visible: false,
//         });
//         this.guide.on('mouseover', () => {
//             this.guide.show();
//         });
//         this.guide.on('mouseout', () => {
//             this.guide.hide();
//         });
//     }

//     initGuideManager() {
//       const SnapManager = {
//           snapTo: function(shape, skipShape) {
//               var stops = getLineGuideStops(skipShape);
//               var closest = getClosestLineGuideStop(shape, stops);
//               var snapTo = getSnapTo(shape, closest);
//               return snapTo;
//           }
//       }}
    
//   // were can we snap our objects?
//     getLineGuideStops(skipShape) {
//       guideItem = []
//       // we can snap to stage borders and the center of the stage
//       var vertical = [0, stage.width() / 2, stage.width()];
//       var horizontal = [0, stage.height() / 2, stage.height()];

//       const childs = stage.getChildren()
//       childs.forEach(child => {
//           const children = child.getChildren()
//           children.forEach((guideItem) => {
//               if (guideItem === skipShape) {
//                   return;
//                 }
//                 var box = guideItem.getClientRect();
//                 // and we can snap to all edges of shapes
//               if (guideItem.name() === 'column') {
//                   vertical.push([box.x + box.width-1, box.x + box.width / 2]);
//                 horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
//                 return;
//               }
//                 horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
//               });
              
//           });
//           const texthigh = stage.findOne('.textrec');
//           const y = texthigh.getAbsolutePosition().y
//           horizontal.push([y + texthigh.height()])
//           //lol(vertical)
//           return {
//               vertical: vertical.flat(),
//               horizontal: horizontal.flat(),
//           };
//       };
//     // what points of the object will trigger to snapping?
//     // enables snapping horizontally all edges and center and Vertically just end
//     getObjectSnappingEdges(node) {
//       var box = node.getClientRect();
//       var absPos = node.absolutePosition();

//       return {
//         vertical: [
//           /*{
//             guide: Math.round(box.x),
//             offset: Math.round(absPos.x - box.x),
//             snap: 'start',
//           },
//           {
//             guide: Math.round(box.x + box.width / 2),
//             offset: Math.round(absPos.x - box.x - box.width / 2),
//             snap: 'center',
//           },*/
//           {
//             guide: Math.round(box.x + box.width),
//             offset: Math.round(absPos.x - box.x - box.width),
//             snap: 'end',
//           },
//         ],
//         horizontal: [
//           {
//             guide: Math.round(box.y),
//             offset: Math.round(absPos.y - box.y),
//             snap: 'start',
//           },
//           {
//             guide: Math.round(box.y + box.height / 2),
//             offset: Math.round(absPos.y - box.y - box.height / 2),
//             snap: 'center',
//           },
//           {
//             guide: Math.round(box.y + box.height),
//             offset: Math.round(absPos.y - box.y - box.height),
//             snap: 'end',
//           },
//         ],
//       };
//     }

//     // find all snapping possibilities
//     getGuides(lineGuideStops, itemBounds) {
//       var resultV = [];
//       var resultH = [];

//       lineGuideStops.vertical.forEach((lineGuide) => {
//         itemBounds.vertical.forEach((itemBound) => {
//           var diff = Math.abs(lineGuide - itemBound.guide);
//           // if the distance between guild line and object snap point is close we can consider this for snapping
//           if (diff < 10) {
//             resultV.push({
//               lineGuide: lineGuide,
//               diff: diff,
//               snap: itemBound.snap,
//               offset: itemBound.offset,
//             });
//           }
//         });
//       });

//       lineGuideStops.horizontal.forEach((lineGuide) => {
//         itemBounds.horizontal.forEach((itemBound) => {
//           var diff = Math.abs(lineGuide - itemBound.guide);
//           if (diff < 10) {
//             resultH.push({
//               lineGuide: lineGuide,
//               diff: diff,
//               snap: itemBound.snap,
//               offset: itemBound.offset,
//             });
//           }
//         });
//       });

//       var guides = [];

//       // find closest snap
//       var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
//       var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
//       if (minV) {
//         guides.push({
//           lineGuide: minV.lineGuide,
//           offset: minV.offset,
//           orientation: 'V',
//           snap: minV.snap,
//         });
//       }
//       if (minH) {
//         guides.push({
//           lineGuide: minH.lineGuide,
//           offset: minH.offset,
//           orientation: 'H',
//           snap: minH.snap,
//         });
//       }
//       return guides;
//     }

//     drawGuides(guides) {
//       guides.forEach((lg) => {
//         if (lg.orientation === 'H') {
//           var line = new Konva.Line({
//             points: [-6000, 0, 6000, 0],
//             stroke: 'rgb(0, 161, 255)',
//             strokeWidth: 1,
//             name: 'guid-line',
//             dash: [4, 6],
//           });
//           ColumnLayer.add(line);
//           line.absolutePosition({
//             x: 0,
//             y: lg.lineGuide,
//           });
//         } else if (lg.orientation === 'V') {
//           var line = new Konva.Line({
//             points: [0, -6000, 0, 6000],
//             stroke: 'rgb(0, 161, 255)',
//             strokeWidth: 1,
//             name: 'guid-line',
//             dash: [4, 6],
//           });
//           ColumnLayer.add(line);
//           line.absolutePosition({
//             x: lg.lineGuide,
//             y: 0,
//           });
//         }
//       });
//     }

//     ColumnLayer.on('dragmove', function (e) {
//       // clear all previous lines on the screen
//       ColumnLayer.find('.guid-line').forEach((l) => l.destroy());
//       NotesLayer.find('.guid-line').forEach((l) => l.destroy());

//       // find possible snapping lines
//       var lineGuideStops = getLineGuideStops(e.target);
//       // find snapping points of current object
//       var itemBounds = getObjectSnappingEdges(e.target);

//       // now find where can we snap current object
//       var guides = getGuides(lineGuideStops, itemBounds);

//       // do nothing of no snapping
//       if (!guides.length) {
//         return;
//       }

//       drawGuides(guides);

//       var absPos = e.target.absolutePosition();
//       // now force object position
//       guides.forEach((lg) => {
//         switch (lg.orientation) {
//           case 'V': {
//             absPos.x = lg.lineGuide + lg.offset;
//             break;
//           }
//           case 'H': {
//             absPos.y = lg.lineGuide + lg.offset;
//             break;
//           }
//         }
//       });
//       e.target.absolutePosition(absPos);
//     });

//     NotesLayer.on('dragmove', function (e) {
//       // clear all previous lines on the screen
//       NotesLayer.find('.guid-line').forEach((l) => l.destroy());
//       ColumnLayer.find('.guid-line').forEach((l) => l.destroy());

//       // find possible snapping lines
//       var lineGuideStops = getLineGuideStops(e.target);
//       // find snapping points of current object
//       var itemBounds = getObjectSnappingEdges(e.target);

//       // now find where can we snap current object
//       var guides = getGuides(lineGuideStops, itemBounds);

//       // do nothing of no snapping
//       if (!guides.length) {
//         return;
//       }

//       drawGuides(guides);

//       var absPos = e.target.absolutePosition();
//       // now force object position
//       guides.forEach((lg) => {
//         switch (lg.orientation) {
//           case 'V': {
//             absPos.x = lg.lineGuide + lg.offset;
//             break;
//           }
//           case 'H': {
//             absPos.y = lg.lineGuide + lg.offset;
//             break;
//           }
//         }
//       });
//       e.target.absolutePosition(absPos);
//     });

//     NotesLayer.on('dragend', function (e) {
//       // clear all previous lines on the screen
//       ColumnLayer.find('.guid-line').forEach((l) => l.destroy());
//     });
// }

// const SnapManager = {
//   getLineGuideStops(skipShape) {
//     const vertical = [0, stage.width() / 2, stage.width()];
//     const horizontal = [0, stage.height() / 2, stage.height()];

//     stage.children.forEach(layer => {
//       layer.children.forEach(guideItem => {
//         if (guideItem === skipShape) return;
        
//         const box = guideItem.getClientRect();
//         if (guideItem.name() === 'column') {
//           vertical.push(box.x + box.width - 1, box.x + box.width / 2);
//           horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
//         } else {
//           horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
//         }
//       });
//     });

//     const texthigh = stage.findOne('.textrec');
//     horizontal.push(texthigh.getAbsolutePosition().y + texthigh.height());

//     return { vertical: vertical.flat(), horizontal: horizontal.flat() };
//   },

//   getObjectSnappingEdges(node) {
//     const box = node.getClientRect();
//     const absPos = node.absolutePosition();

//     return {
//       vertical: [
//         { guide: box.x + box.width, offset: absPos.x - box.x - box.width, snap: 'end' }
//       ],
//       horizontal: [
//         { guide: box.y, offset: absPos.y - box.y, snap: 'start' },
//         { guide: box.y + box.height / 2, offset: absPos.y - box.y - box.height / 2, snap: 'center' },
//         { guide: box.y + box.height, offset: absPos.y - box.y - box.height, snap: 'end' }
//       ]
//     };
//   },

//   getGuides(lineGuideStops, itemBounds) {
//     const resultV = [];
//     const resultH = [];

//     lineGuideStops.vertical.forEach(lineGuide => {
//       itemBounds.vertical.forEach(itemBound => {
//         const diff = Math.abs(lineGuide - itemBound.guide);
//         if (diff < 10) {
//           resultV.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset });
//         }
//       });
//     });

//     lineGuideStops.horizontal.forEach(lineGuide => {
//       itemBounds.horizontal.forEach(itemBound => {
//         const diff = Math.abs(lineGuide - itemBound.guide);
//         if (diff < 10) {
//           resultH.push({ lineGuide, diff, snap: itemBound.snap, offset: itemBound.offset });
//         }
//       });
//     });

//     const guides = [];
//     const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
//     const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

//     if (minV) guides.push({ ...minV, orientation: 'V' });
//     if (minH) guides.push({ ...minH, orientation: 'H' });

//     return guides;
//   }
// };
