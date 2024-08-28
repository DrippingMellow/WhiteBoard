

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

	// d.columns.forEach((column, index) => {
	// 	//colom = colcol.createNewColumn(column.name)
	// 	//columns.push({ name: column.name })
	// 	lol(column);
	// 	column.nodes.forEach((node) => {
			
	// 		// if (obj.attachedToColumn) {
	// 		//     const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
	// 		//         notes.attachToColumn(note.taskGroup, attachedColumn);
	// 		//}
	// 	});
	// });
	d.nodes.forEach((node) => {
		let obj = node.objectData;
			//notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
			// Calculate actual positions from percentages
			let x = (obj.coordinates.xPercent * stage.width()) || obj.cords[0] || obj.cords.x;
			let y = (obj.coordinates.yPercent * stage.height()) || obj.cords[1];
			console.log(x);
			const note = notes.createNote(obj.title, obj.text, x, y, obj.color, obj.attachedToColumn);
			// console.log(note);
			// if (obj.attachedToColumn != null) {
			// 	const attachedColumn = columns.find(col => col.name === obj.attachedToColumn);
			// 	notes.attachToColumn(note, attachedColumn);
			// 	console.log('note:', note);
			// }
	})
	stage.find(".note").forEach((note) => {
		console.log(note.id());
		const noteId = note.id();
		const noteObject = state.find((n) => n.id === noteId);
		obj = noteObject.objectData.attachedToColumn;
		console.log(noteObject);
		if (obj != (false || null)) {
			lol(obj)
			const attachedColumn = ColumnLayer.findOne((col) => col.id() === obj);
			lol(attachedColumn)
			if (attachedColumn) {
				notes.attachToColumn(note, attachedColumn);
			}
		}
	});
	//colcol.initColumns()
}
