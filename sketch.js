let cols, rows;
let w =40;
let grid= [];

let current;

let stack=[];
let currentPlayer=new Player();

function  setup(){
  createCanvas(400,400);
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


}

function draw(){
  background(51);
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
  //console.log("drawPlayer function called");
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
  this.drawPlayer = function(){
    console.log("drawPlayer function reached");
    stroke(255);
    fill(255,255,255,100);
    ellipse(locX/2,locY/2,w/2,w/2);
  }
  this.move = function(dir){
    console.log("move function reached")
    if(dir=0){
      locX=locX+40;
      drawPlayer();
    }


  }

}



function removeWalls(a, b){
  let x = a.i - b.i;
   if (x === 1) {
     a.walls[3] = false;
     b.walls[1] = false;
     console.log(b);
   } else if (x === -1) {
     a.walls[1] = false;
     b.walls[3] = false;
     console.log(b);
   }
   let y = a.j - b.j;
   if (y === 1) {
     a.walls[0] = false;
     b.walls[2] = false;
     console.log(b);
   } else if (y === -1) {
     a.walls[2] = false;
     b.walls[0] = false;
   }
 }

 function keyPressed() {
   console.log('keyPressed: ' + key);
   console.clear();
   console.log("key pressed");

   let dir=0;
   if (key === 'a' || key === 'A') {
   }

   else if (key === 'd' || key === 'D') {
     console.log("d pressed");
     if(draw.currentPlayer){
       draw.currentPlayer.move(dir);

     }

 }


 }
