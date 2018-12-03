const fs = require('fs')
fs.readFile('./input', (err, data) => {
  let fabric = createFabric();
  let input = data.toString('utf8').split('\n');
  const finalRows = []
  input
    .map(parseDesign)
    .forEach(design => {
      finalRows.push(markRect(fabric, design))
    })
  
  /* uncomment to solve part1 */
  const count = countOverlappingCells(fabric);
  console.log("PART ONE ANSWER:", count)

  finalRows
    .filter(row => isSafe(fabric, row))
    .map(row => row.id)
    .forEach(row => console.log("PART TWO ANSWER:", row));
  
});

const countOverlappingCells = fabric => fabric
  .reduce((acc, row) => {
    return acc.concat(row) }, 
  [])
  .filter(cell => cell > 1)
  .length

const parseDesign = design => {
  let [id, data] = design.split(' @ ')
  let [offset, size] = data.split(': ')
  let [x, y] = offset.split(',')
  let [width, height] = size.split('x')

  return {
    id: id.substr(1), 
    startX: parseInt(x), 
    startY: parseInt(y), 
    endX: parseInt(x) + parseInt(width), 
    endY: parseInt(y) + parseInt(height)
  }
}

const markRect = (fabric, design) => {
  const { startX, endX, startY, endY } = design
  for (var i = startY; i < endY; i++) {  // iterate through the rows
    for (var j = startX; j < endX; j++) { // then through the columns
      fabric[i][j] = fabric[i][j] + 1;
    }
  }
  
  return design
}

const isSafe = (fabric, design) => {
  const {startX, endX, startY, endY} = design;
  const output = [];
  for (var i = startY; i < endY; i++) {
    for (var j = startX; j < endX; j++) {
      output.push(fabric[i][j])
    }
  }

  return output.every(cell => cell === 1)
}

const createFabric = () => {
  const fabric = [];
  for (var i = 0; i < 1000; i++) {
    const row = createEmptyRow();
    fabric.push(row)
  }

  return fabric;
}

const createEmptyRow = () => {
  let returnValue = [];
  for (var i = 0; i < 1000; i++) {
    returnValue.push(0);
  }

  return returnValue
}