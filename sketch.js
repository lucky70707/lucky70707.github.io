
var paddle;
var bgA; //short for background animation
var ball;
var bricks = [];
var playingGame = false;
var youWin =false;
var aPressed = false;
var dPressed = false;
var winText;
var initText;
var level;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle();
  bgA = new BackgroundAnimation();
  ball = new Ball();
  this.level = 1;
  for(let i = 0; i <20; i++){
    bricks.push(new Brick());
  }
  createInitialText();
  createText();
}

function draw() {
  background(bgA.rValue, bgA.gValue, bgA.bValue);

  paddle.display();
  ball.display();

  if(playingGame){
    paddle.update();
    paddle.checkEdges();
    ball.update();
    ball.checkEdges();
    initText.style('display','none');
  }else{
    initText.style('display','block');
  }
  if(this.level === 2){
    noFill();
  }


if(youWin){
  winText.style('display','block');

}else {
  winText.style('display','none');
}


  if(ball.meets(paddle) && ball.direction.y > 0 ){
      if(paddle.dir === 1){//paddle goes to the right
        if(ball.direction> 0){
            ball.direction.x =1.5;
        }else {
          ball.direction.x +=0.5;
        }

      }else if (paddle.dir===-1) {//paddle goes to the left
        if(ball.direction.x < 0){
          ball.direction.x =-1.5;
        }else{
          ball.direction.x -=0.5;
        }

      }


    ball.direction.y *= -1;
  }

  for(var i = 0; i <bricks.length;i++){
    bricks[i].display();
    if(ball.hits(bricks[i])){
      if(bricks[i].r>40){
        bricks[i].r= bricks[i].r / 2 ;

        bgA.gChange(5);
      }else{
        bricks.splice(i, 1);
          bgA.gChange(-5);
      }
      ball.direction.y *= -1;
    }

  }
  if(ball.pos.y > height){//aka if you lose
    playingGame = false;
    ball.direction.x =1;
    ball.pos = createVector(width /2 , height /2);
  }
  if(bricks.length ===0){
    youWin = true;
    this.level =2;
    bgA.bValue = 250;
    playingGame = false;
  }
  //bgA.rUpdate();
}
function keyReleased(){
  if (key === 'a' || key === 'A') {
    this.aPressed =false;//maybe not this. ?
  }

  else if (key === 'd' || key === 'D') {
    this.dPressed =false;
}

  if(aPressed === false && dPressed == false){
    paddle.dir = 0;
  }
}
function keyPressed() {
  if (key === 'a' || key === 'A') {
    paddle.dir=-1;
    bgA.rChange(50);
    this.aPressed =true;//maybe not this. ?
    bgA.rUp = true;
  }

  else if (key === 'd' || key === 'D') {
    paddle.dir=1;
    this.dPressed =true;
    bgA.rChange(-50);
    //  if (backgroundValue < 256) {
    //  backgroundValue+=15;
    //  bgA.cUp = true;
  }else if(key === 's'|| key==='S'){
    playingGame = true;
    youWin = false;
    if(bricks.length === 0){
      for(let i = 0; i<20; i++){
        bricks.push(new Brick());
      }

    }
  }

}
function createInitialText (){
  initText = createP("Press 's' to start the game, move the paddle with 'a' and 'd'");
  initText.position(width / 4 -75, 100);
}

function createText(){
  winText = createP('You Win!')

  winText.position(width / 2 -50, 80);
}
