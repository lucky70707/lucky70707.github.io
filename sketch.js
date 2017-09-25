var backgroundValue = 200;
var paddle;
//var bgA;


function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  //bgA = new BackgroundAnimation();
}

function draw() {
  background(255);

  paddle.display();
  paddle.update();
  //paddle.move(1);
//  bgA.update();
}
function keyReleased(){
  paddle.isMovingLeft = false;
  paddle.isMovingRight = false;

}

function keyPressed() {
  if (key === 'a' || key === 'A') {
   paddle.isMovingRight = true;
  //  if(backgroundValue > 0){
  //    backgroundValue-=15;

      //bgA.cDown = true;
    }

 else if (key === 'd' || key === 'D') {
    paddle.isMovingLeft = true;
  //  if (backgroundValue < 256) {
    //  backgroundValue+=15;
    //  bgA.cUp = true;
    }
  }
