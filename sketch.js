let cols, rows;
let width=800;
let height=800;
let defaultW=160;
let cnv;

let w =defaultW;
let grid= [];

let current;
let currentCell = 0;
let stack=[];
//player code
let currentPlayer;
let done = false;
let upInt =0;
let rightInt=1;
let downInt=2;
let leftInt=3;

//level creation decision variables;
let winText;
let wincount=0;
let difficulty=0;

//required for kruskal generation
let edges=[];
let nodes=[];
let sets;

//required for prim generation
let listFrontier=[];
let toconcatwith;
let nextCell;

let mazeGenerated=false;
let setupDone=false;

function  setup(){
   cnv =createCanvas(width,height);
  cnv.position(floor((windowWidth/2)-width/2),floor(windowHeight/10))
  cols =floor(width/w);
  rows = floor(height/w)
  //frameRate(5);
if(winText){
  winText.style('display','none');
}
//setupGrid
for(let j   =0; j < rows; j++){
  for(let i =0; i < cols; i++){
    let cell = new Cell(i,j,cols,rows,grid.length);
    grid.push(cell);

  }
}
//setupPrimsMaze();

switch (difficulty) {
  case 0:
    setupDepthFirstMaze();
    break;
    case 1:
      setupKruskalMaze();
      break;
  default:
  difficulty=0;
  setupDepthFirstMaze();
  break;

}
  currentPlayer=new Player();

}

function setupDepthFirstMaze() {
  paletteCyberGermany();
  current=grid[0];
  console.log(grid);
  console.log(current);
}


function generateDepthFirstMaze(){
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
      if(currentPlayer){currentPlayer.drawPlayer();}
    }
}

function draw(){
  background(colorBackground);
for (let i = 0; i < grid.length; i++) {
  grid[i].show();
}
//generatePrimsMaze();

  switch (difficulty) {
    case 0:
      generateDepthFirstMaze();
      break;
      case 1:
        generateKruskalMaze();
        break;
    default:
    difficulty=0;
    generateDepthFirstMaze();
    break;
  }
}

function index(i,j){
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
   return -1;
 }
 return i + j * cols;
}

function setupPrimsMaze(){
  edges =formEdgeList(cols,rows);
  for(let i=0; i<grid.length;i++){
    nodes.push(new Node(grid[i],i));
  }
  //sets= new DisJointSet(nodes);

  listFrontier=[];
  currentCell= nodes[floor(random(0,grid.length-1))].data ;
  currentCell.visited=true;
  toconcatwith =currentCell.markFrontier();
  listFrontier = [...listFrontier.concat(toconcatwith)];
  nextCell=currentCell.checkNeighbors();
}
function generatePrimsMaze(){
  //  console.log("currentCell",currentCell);
    if(nextCell){


     toconcatwith =nextCell.markFrontier();

    listFrontier = [...listFrontier.concat(toconcatwith)];
    //console.log("listFrontier:",listFrontier);
    //console.log("nextCell.visited: ",nextCell.visited,"currentCell.visited: ",currentCell.visited);

    if(nextCell.visited===true&&currentCell.visited===false){
      //console.log("currentCell: ",currentCell," nextCell: ",nextCell);
      removeWalls(currentCell,nextCell);
      currentCell.visited=true;
    }
    if(nextCell.visited===false&&currentCell.visited===true){
      //console.log("currentCell: ",currentCell," nextCell: ",nextCell);
      removeWalls(currentCell,nextCell);
      nextCell.visited=true;

    }
    let indexOfTobedeleted;
    console.log("deletion to follow:");
    console.log("listFrontier before delete",listFrontier);
    console.log("nextCell to be removed",nextCell);


    for(let k=0;k<listFrontier.length;k++){
      if(listFrontier[k].visited){
        indexOfTobedeleted =k;
        console.log("listFrontier before splice:",listFrontier);
        console.log("indexOfTobedeleted: ",indexOfTobedeleted);
        console.log(listFrontier[k].visited);
        listFrontier.splice(indexOfTobedeleted,1);
        console.log("listFrontier after splice:",listFrontier);
      }
    }
    //console.log(listFrontier);
    currentCell= listFrontier[floor(random(0,listFrontier.length-1))] ;
    currentCell.visited=true;
    toconcatwith =currentCell.markFrontier();
    listFrontier = [...listFrontier.concat(toconcatwith)];
    nextCell=currentCell.checkPrimNeighbors();
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


 function winLevel() {
   wincount++;
   done=false;
   fill(colorText);

   winText= createP('You Win!');

   winText.style('color', color(colorText));
   winText.style('font-size', '500%');
   winText.style('text-align', 'center');
   winText.style('display','block');
   winText.position(floor((windowWidth/2)-width/4),floor(windowHeight/8));

   erase();

   rect(0, 0, cols, rows);
   clear();
   background(colorBackgroundOnWin);
   noErase();
   console.log(wincount);

   console.log(w);
   breakDown();
sleep(2000).then(function(){
  switch (wincount) {
    case 1:
      w=floor(w/2);
      break;
     case 2:
     w=floor(w/2);
     break;
     case 3:
     w=floor(w/2);
     break;
     case 4:
     difficulty++;
     w=defaultW;
     wincount =0;
     break;
    default:

  }
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
   setupDone=false;
   currentPlayer=null;
   stack.length=0;
   grid.length=0;
    edges.length=0;
    nodes.length=0;
    sets=0;
 }
