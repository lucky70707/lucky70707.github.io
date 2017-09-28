var backgroundValue = 200;
var paddle;
var bgA; //short for background animation
var ball;
var bricks = [];
var playingGame = false;
var youWin =false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  bgA = new BackgroundAnimation();
  ball = new Ball();

  for(let i = 0; i <20; i++){
    bricks.push(new Brick());
  }
}

function draw() {
  background(bgA.rValue, bgA.gValue, bgA.bValue);

  paddle.display();
  paddle.update();
  paddle.checkEdges();
  ball.display();
  ball.update();
  ball.checkEdges();
  if(ball.meets(paddle) && ball.direction.y > 0 ){
    ball.direction.y *= -1;
  }

  for(var i = 0; i <bricks.length;i++){
    bricks[i].display();
    if(ball.hits(bricks[i])){
      if(bricks[i].r>40){
        bricks[i].r= bricks[i].r / 2 ;
      }else{
        bricks.splice(i, 1);
      }
      ball.direction.y *= -1;
    }



  }

  //bgA.rUpdate();
}


function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.dir=-1;
    bgA.rChange(50);
    bgA.rUp = true;
  }

  else if (key === 'd' || key === 'D') {
    paddle.dir=1;
    bgA.rChange(-50);
    //  if (backgroundValue < 256) {
    //  backgroundValue+=15;
    //  bgA.cUp = true;
  }else if(key == 's'){
    playingGame = true;
    youWin = false;
    if(bricks.length === 0){
      bricks.push(new Brick());
    }
  }
}
