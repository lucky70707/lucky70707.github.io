function setupDepthFirstMaze() {
  paletteCyberGermany();
  current = grid[0];
  console.log(grid);
  console.log(current);
}


function generateDepthFirstMaze() {
  current.visited = true;
  // STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    //step 2
    stack.push(current);
    //step 3
    removeWalls(current, next)
    //step 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();

  } else {
    while (done !== true) {
      done = true;
    }
    if (currentPlayer) {
      currentPlayer.drawPlayer();
    }
  }
}
