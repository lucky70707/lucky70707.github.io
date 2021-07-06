function setupPrimsMaze() {
  edges = formEdgeList(cols, rows);
  for (let i = 0; i < grid.length; i++) {
    nodes.push(new Node(grid[i], i));
  }
  //sets= new DisJointSet(nodes);

  listFrontier = [];
  nextCell = nodes[floor(random(0, grid.length - 1))].data;
  toconcatwith = nextCell.markFrontier();
  listFrontier = [...listFrontier.concat(toconcatwith)];
  let indexRandom = floor(random(0, listFrontier.length))
  console.log("indexandom: ", indexRandom);
  currentCell = listFrontier[indexRandom];
}

function generatePrimsMaze() {
  //  console.log("currentCell",currentCell);
  if (nextCell && listFrontier.length > 0) {

    //console.log("listFrontier:",listFrontier);
    //console.log("nextCell.visited: ",nextCell.visited,"currentCell.visited: ",currentCell.visited);

    //this should be true every time
    //nexctell should always be true
    if (nextCell.visited === true && currentCell.visited === false) {
      //console.log("currentCell: ",currentCell," nextCell: ",nextCell);
      removeWalls(currentCell, nextCell);
      currentCell.visited = true;
      currentCell.isFrontier = false;
    }
    let indexOfTobedeleted;
    console.log("deletion to follow:");
    //console.log("listFrontier before delete",listFrontier);
    console.log("Cell to be removed", currentCell);
    for (let k = listFrontier.length - 1; k > 0; k--) {
      if (listFrontier[k] === currentCell) {
        indexOfTobedeleted = k;
        break;
      }
    }

    console.log("listFrontier before delete", listFrontier);
    listFrontier.splice(indexOfTobedeleted, 1);
    console.log("listFrontier after splice:", listFrontier); //console.log(listFrontier);
    toconcatwith = currentCell.markFrontier();
    listFrontier = [...listFrontier.concat(toconcatwith)];

    let rndIndex = 0;


    rndIndex = floor(random(0, listFrontier.length));
    if (listFrontier.length > 0) {
      currentCell = listFrontier[rndIndex];
      nextCell = currentCell.getVisitedNeighbor();
      console.log(nextCell);
    }


  } else {
    while (done !== true) {
      done = true;
    }
    if (currentPlayer) {
      currentPlayer.drawPlayer();
    }
  }

}
