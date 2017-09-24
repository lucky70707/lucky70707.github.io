var backgroundValue = 0;
var blokje;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blokje = new Blokje();

}

function draw() {
  background(255);
  paddle.display();

}


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
