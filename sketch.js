var backgroundValue = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  textAlign(CENTER);
  noFill();
  stroke(0);

  createText();
}

function draw() {
  background(0);

}
/*
function keyReleased() {
  board.isMovingRight = false;
  board.isMovingLeft = false;
}*/

function keyPressed() {
  if (key === 'a' || key === 'A') {
    if(backgroundValue > 0){
      backgroundValue--;
    }

  } else if (key === 'd' || key === 'D') {
    if (backgroundValue < 256) {
      backgroundValue++;
    }
  }
  }
}



function createText() {

}
