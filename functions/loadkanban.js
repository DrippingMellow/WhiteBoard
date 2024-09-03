async function loadkanban(d) {
	columns = [];
	done = 0;
	columnWidth = stage.width() / d.columns.length;

	columns = d.columns.map((column, index) => {
		return {
			name: column.name,
			nodes: []
		};
	});
	await columnManager.initColumns();

	d.nodes.forEach(async (node) => {
		let obj = node.objectData;
			//notes.createNote(obj.title, obj.text, (obj.cords[0] || obj.cords.x), (obj.cords[1] || obj.cords.y), obj.color)
			// Calculate actual positions from percentages
			let x = (obj.coordinates.xPercent * stage.width()) || obj.cords[0] || obj.cords.x;
			let y = (obj.coordinates.yPercent * stage.height()) || obj.cords[1];
			console.log(x);
			const note = notes.createNote(obj.title, obj.text, x, y, obj.color, obj.attachedToColumn);			
	})
	stage.find(".note").forEach(async (note) => {
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
}
