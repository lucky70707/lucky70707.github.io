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
let difficulty=2;
let isWinning=false;
let level=0;
let levelText;
let isTransitioning=false;

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
  isTransitioning=true;
  level++;
   cnv =createCanvas(width,height);
   isWinning=false;
  cnv.position(floor((windowWidth/2)-width/2),floor(windowHeight/10))
  cols =floor(width/w);
  rows = floor(height/w)


if(winText){
  winText.style('display','none');
}

//leveltext here:
fill(colorText);
let levelString="Level "+level;
levelText= createP(levelString);

levelText.style('color', color(colorText));
levelText.style('font-size', '500%');
levelText.style('text-align', 'center');
levelText.style('display','block');
levelText.position(floor((windowWidth/2)-width/4),floor(windowHeight/8));


sleep(1000).then(function(){
  isTransitioning=false;
levelText.style('display','none');

  //setupGrid
  for(let j   =0; j < rows; j++){
    for(let i =0; i < cols; i++){
      let cell = new Cell(i,j,cols,rows,grid.length);
      grid.push(cell);

    }
  }
  //decide on generation
  switch (difficulty) {
    case 0:
      setupDepthFirstMaze();
      break;
      case 1:
        setupKruskalMaze();
        break;
      case 2:
      setupPrimsMaze();
        break;
    default:
    difficulty=0;
    setupDepthFirstMaze();
    break;
  }
    currentPlayer=new Player();

})

}


function draw(){
  background(colorBackground);
if(!isWinning){
  if(!isTransitioning){

  }

  for (let i = 0; i < grid.length; i++) {
  grid[i].show();
    switch (difficulty) {
      case 0:
        generateDepthFirstMaze();
        break;
        case 1:
          generateKruskalMaze();
          break;
        case 2:
        generatePrimsMaze()
        break;
      default:
      difficulty=0;
      generateDepthFirstMaze();
      break;
    }
  }

}else{
  drawFireworks();
}


}

function index(i,j){
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
   return -1;
 }
 return i + j * cols;
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
