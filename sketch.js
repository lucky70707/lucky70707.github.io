let cols, rows;
let w =160;
let grid= [];

let current;

let stack=[];
//player code
let currentPlayer;
let done = false;
let upInt =0;
let rightInt=1;
let downInt=2;
let leftInt=3;

let winText;
let wincount=0;

//color values
let colorPlayer = 255;
let colorPlayerStroke =0;
let colorStart ='#F8EDED';  //'#A0937D';
let colorFinish = '#F6DFEB';//'#3A6351';
let colorMaze = '#CAF7E3';  //'#5F939A';
let colorWalls = 0;
let colorBackground=51;
let colorBackgroundOnWin=0;


function  setup(){
  createCanvas(800,800);
  cols =floor(width/w);
  rows = floor(height/w)
  //framerate(5);

  for(let j   =0; j < rows; j++){
    for(let i =0; i < cols; i++){
      let cell = new Cell(i,j,cols,rows);
      grid.push(cell);
    }
  }

  current=grid[0];
  currentPlayer=new Player();

}

function draw(){

  background(colorBackground);
for (let i = 0; i < grid.length; i++) {
  grid[i].show();
}

current.visited = true;

// STEP 1
let next = current.checkNeighbors();
if (next) {
    next.visited = true;
    //step 2
    stack.push(current);
    //step 3
    removeWalls(current,next)
    //step 4
    current=next;
  }else if(stack.length>0){
    current=stack.pop();

}else{
  while(done!==true){
      done=true;

  }
  currentPlayer.drawPlayer();
}

}
function index(i,j){
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
   return -1;
 }
 return i + j * cols;
}

function Player(){
  let locX=0+w;
  let locY=0+w;
  let gridLocation=grid[0];
  this.drawPlayer = function(){

    stroke(colorPlayerStroke);
    fill(color(colorPlayer));

    ellipse(locX/2,locY/2,w/2,w/2);
  }
  this.move = function(dir){


    //in the following statements the value of the grid's index equals that of i+j*cols where i represents the current column,
    // j the current row and cols the total amount of columns.
    if(done){
      //up
      if(dir===upInt){
        if(gridLocation.walls[upInt]===false){
          locY=locY-(2*w);
          let index = gridLocation.i+gridLocation.j*cols-cols;
          gridLocation=grid[index];

        }

        //right
      }else if (dir===rightInt) {
        if(gridLocation.walls[rightInt]===false){
          locX=locX+(2*w);
          let index = gridLocation.i+1+gridLocation.j*cols;
          gridLocation=grid[index];

        }

        //down
      }else if (dir===downInt) {
        if(gridLocation.walls[downInt]===false){
          locY=locY+(2*w);
          let index = gridLocation.i+gridLocation.j*cols+cols;
          gridLocation=grid[index];
        }

        //left
      }else if (dir===leftInt) {
        if(gridLocation.walls[leftInt]===false){
          locX=locX-(2*w);
          let index = gridLocation.i-1+gridLocation.j*cols;
          gridLocation=grid[index];
                }

      }
    }


    if(gridLocation===grid[grid.length-1]){
      winLevel();
    }

  }

}



function removeWalls(a, b){
  let x = a.i - b.i;
   if (x === 1) {
     a.walls[3] = false;
     b.walls[1] = false;

   } else if (x === -1) {
     a.walls[1] = false;
     b.walls[3] = false;

   }
   let y = a.j - b.j;
   if (y === 1) {
     a.walls[0] = false;
     b.walls[2] = false;

   } else if (y === -1) {
     a.walls[2] = false;
     b.walls[0] = false;
   }
 }

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


 }
 function winLevel() {
   wincount++;
   done=false;

   winText = createP('You Win!')
   winText.position(width / 2 -50, 80);
   winText.style('display','block');
   erase();

   rect(0, 0, cols, rows);
   clear();
   background(colorBackgroundOnWin);
   noErase();
   console.log(wincount);

   console.log(w);
sleep(2000).then(function(){
  switch (wincount) {
    case 1:w=floor(w/2);

      break;
     case 2:w=floor(w/2);
     break;
     case 3:w=floor(w/2);
     break;

    default:

  }
  breakDown();
    setup();
})

 }


// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

 function breakDown(){
   winText.style('display','none');
   stack.length=0;
   grid.length=0;
 }
