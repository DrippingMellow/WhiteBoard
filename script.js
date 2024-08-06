function AddNote () {
      // create shape
      var box_1 = new Konva.Rect({
        x: 50,
        y: 50,
        width: 60,
        height: 40,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
      });
      layer.add(box_1);
      stage.add(layer);

    
      // add cursor styling
      box.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      box.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });
      box_1.on('dbclick', function () {
        FocusEvent() > this.AddLol()
      })

    console.log("2")
}

window.addEventListener('DOMContentLoaded', () => {
    start;
});

function AddLol () {
    var foo = {input}; // create an object. You can use window for this if you are not worried about scope.

// use a loop to create some line objects.
for (var i = 1; i < 11; i = i + 1){

  foo['line_' + i] = {name: 'line ' + i};

}

// now you can refer to the line objects via the 'variable' name, link line_3
console.log('Object line_3.name=' + foo.line_3.name);

// and of course you can use the arry-like notation
console.log('Object line_7.name=' + foo['line_7'].name);

// and you can iterate them
for (var i = 1; i < 11; i = i + 1){
  console.log('Object line_' + i + '.name=' + foo['line_' + i].name);

}}