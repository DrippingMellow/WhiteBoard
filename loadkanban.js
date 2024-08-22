import { lol } from "./worker";

export function loadkanban() {
	columns = [];
	columnWidth = stage.width() / d.columns.length;

	columns = d.columns.map((column, index) => {
		return {
			name: column.name,
			start: (index * columnWidth),
			end: (column.start + columnWidth - 10),
			nodes: []
		};
	});
	colcol.initColumns();

	d.columns.forEach((column, index) => {
		//colom = colcol.createNewColumn(column.name)
		//columns.push({ name: column.name })
		lol(column);
		column.nodes.forEach((node) => {
			obj = node.objectData;
			//notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
			// Calculate actual positions from percentages
			const x = obj.cords.xPercent * stage.width();
			const y = obj.cords.yPercent * stage.height();
			const note = notes.createNote(obj.title, obj.text, x, y, obj.color);
			console.log('note:', note);
			columnGroup = stage.findOne('#column' + index);
			console.log('columnGroup:', columnGroup);
			note.moveTo(columnGroup);
			note.position({
				x: x - columnGroup.x(),
				y: y,
			});
			// if (obj.attachedToColumn) {
			//     const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
			//         notes.attachToColumn(note.taskGroup, attachedColumn);
			//}
		});
	});
	//colcol.initColumns()
}
