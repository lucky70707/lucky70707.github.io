//touch controls
let startX;
let startY;
let endY;
let endX;

function touchStarted(){
  startX=mouseX;
  startY=mouseY;
  console.log(startX);
}
function mousePressed(){
  startX=mouseX;
  startY=mouseY;
  console.log(startX);
}

 function touchMoved(){
 endX=mouseX;
 endY=mouseY;
 //console.log(endX);
  return false;
}

function touchEnded(){
  //console.log(startX);
  let dir;
  let difX=startX-endX;
  let difY=startY-endY;
  if(abs(difX)>abs(difY)){
    if(difX>0){
      dir=leftInt;
      currentPlayer.move(dir);
    }else if (difX<0) {
      dir=rightInt;
      currentPlayer.move(dir);
    }
  }else if (abs(difX)<abs(difY)) {
    if(difY<0){
      dir=downInt;
      currentPlayer.move(dir);
    }else if (difY>0) {
      dir=upInt;
      currentPlayer.move(dir);
    }
  }

  return false;
}
//key controls
function keyPressed() {


  let dir=0;
  if (key === 'w' || key === 'W'||keyCode ===UP_ARROW) {
    dir=upInt;
    if(currentPlayer){
     currentPlayer.move(dir);
    }
  }

  if (key === 'd' || key === 'D'||keyCode ===RIGHT_ARROW) {

    dir=rightInt;
    if(currentPlayer){
     currentPlayer.move(dir);

    }
}

if (key === 's' || key === 'S'||keyCode ===DOWN_ARROW){
  dir=downInt;
  if(currentPlayer){
   currentPlayer.move(dir);

  }
}
if (key === 'a' || key === 'A'||keyCode ===LEFT_ARROW) {
  dir=leftInt;
  if(currentPlayer){
   currentPlayer.move(dir);

  }
}
if (key === 'x' || key === 'X') {
  currentPlayer.dig();
}


}
