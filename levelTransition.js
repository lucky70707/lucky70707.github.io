function winLevel() {
  wincount++;
  isWinning = true;
  done = false;
  fill(colorText);
  setupFireworks();
  winText = createP('You Win!');

  winText.style('color', color(colorText));
  winText.style('font-size', '500%');
  winText.style('text-align', 'center');
  winText.style('display', 'block');
  winText.position(floor((windowWidth / 2) - width / 4), floor(windowHeight / 8));

  erase();

  rect(0, 0, cols, rows);
  clear();
  background(colorBackgroundOnWin);
  noErase();
  console.log(wincount);

  console.log(w);
  breakDown();




  sleep(3000).then(function() {


    switch (wincount) {
      case 1:
        w = floor(w / 2);
        break;
      case 2:
        w = floor(w / 2);
        break;
      case 3:
        w = floor(w / 2);
        break;
      case 4:
        difficulty++;
        w = defaultW;
        wincount = 0;
        break;
      default:

    }
    setup();
  })
}




function breakDown() {

  setupDone = false;
  currentPlayer = null;
  stack.length = 0;
  grid.length = 0;
  edges.length = 0;
  nodes.length = 0;
  sets = 0;
}
