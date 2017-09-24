
var blokje;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blokje = new Blokje();

}

function draw() {
  background(255);

  blokje.display();
  blokje.move(0);
}


function keyPressed() {
  if (key === 'a' || key === 'A') {

      blokje.move(20);


  } else if (key === 'd' || key === 'D') {

  }
  }
}
