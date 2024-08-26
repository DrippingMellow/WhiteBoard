

function loadkanban(d) {
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
			
			// if (obj.attachedToColumn) {
			//     const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
			//         notes.attachToColumn(note.taskGroup, attachedColumn);
			//}
		});
	});
	d.nodes.forEach((node) => {
		let obj = node.objectData;
			//notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
			// Calculate actual positions from percentages
			let x = (obj.coordinates.xPercent * stage.width()) || obj.cords[0] || obj.cords.x;
			let y = (obj.coordinates.yPercent * stage.height()) || obj.cords[1];
			console.log(x);
			const note = notes.createNote(obj.title, obj.text, x, y, obj.color, obj.attachedToColumn);
			console.log(note);
			if (obj.attachedToColumn != null) {
				const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
				notes.attachToColumn(note, attachedColumn);
				console.log('note:', note);
			}
	})
	//colcol.initColumns()
}
