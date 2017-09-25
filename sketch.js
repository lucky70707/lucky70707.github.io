var backgroundValue = 0;
var blokje;
var bgA;


function setup() {
  createCanvas(windowWidth, windowHeight);
  blokje = new Blokje();
  bgA = new BackgroundAnimation();
}

function draw() {
  background(bgA.cValue);

  blokje.display();
  blokje.move(1);
  bgA.update();
}
function keyReleased(){
  bgA.cDown = false;
  bgA.cUp = false;
}

function keyPressed() {
  if (key === 'a' || key === 'A') {
    if(backgroundValue > 0){
      bgA.cDown = true;
    }

  } else if (key === 'd' || key === 'D') {
    if (backgroundValue < 256) {
      bgA.cUp = true;
    }
  }
  }
