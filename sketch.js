let cols, rows;
let width=800;
let height=800;
let defaultW=160;
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

let mazeGenerated=false;

function  setup(){
  let cnv =createCanvas(width,height);
  cnv.position(floor((windowWidth/2)-width/2),floor(windowHeight/10))
  cols =floor(width/w);
  rows = floor(height/w)
  //frameRate(1);
if(winText){
  winText.style('display','none');
}

  setupKruskalMaze();
  setupDepthFirstMaze();

  currentPlayer=new Player();

}

function setupDepthFirstMaze() {
current=grid[0];
}
function setupKruskalMaze(){
 paletteMintyTrans();
  for(let j   =0; j < rows; j++){
    for(let i =0; i < cols; i++){
      let cell = new Cell(i,j,cols,rows,grid.length);
      grid.push(cell);

    }
  }
  edges =formEdgeList(cols,rows);
  for(let i=0; i<grid.length;i++){
    nodes.push(new Node(grid[i],i));
  }
  sets= new DisJointSet(nodes);
  console.log("grid length: ",grid.length);
  console.log("edges length: ",edges.length);
  console.log("nodes length: ",nodes.length);


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
//kruskal's algorithm/*
/*algorithm explained in own words:
alle cellen behoren tot een tree.
kies een willekeurige cell
kies een willekeurige buurcell
als buurcell tot een andere tree behoort
  dan zorg ervoor dat de andere cell tot dezelfde tree behoort
zo niet, haal dan de cel weg.
*/
let failsafeIndex =0;
function generateKruskalMaze(){

  if(mazeGenerated){
    console.log("player is drawn: ",mazeGenerated);
    while(done!==true){
        done=true;

    }
    currentPlayer.drawPlayer();
  }
  //while(edges.length>0&&mazeGenerated===false){
    failsafeIndex++;
    if(edges.length===1){
      console.log(mazeGenerated);
      mazeGenerated=true;
    }
  //  console.log(edges);
    let pair =edges[floor(random(0,edges.length-1))]
    if(pair){
    //console.log("pair: ",pair);
    let startnodeIndex=pair.startnode;
    //console.log("startnodeIndex: ",startnodeIndex);
    let nextIndex=pair.endnode;
  //  console.log("startnodeIndex: ",nextIndex);

    currentNode=nodes[startnodeIndex];
    nextNode=nodes[nextIndex];

    if(sets.find(currentNode)!==sets.find(nextNode)){
      //console.log('recognised as different');
      sets.union(currentNode,nextNode)
      removeWalls(nextNode.data,currentNode.data);
      currentNode.data.visited=true;
      nextNode.data.visited=true;

    }else{
        let indexOfTobedeleted=pair.id;
        for(let i=0;i<edges.length;i++){
          if(edges[i].id===pair.id){
            indexOfTobedeleted =i;
          }
        }
        edges.splice(indexOfTobedeleted,1);
}}

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


 function winLevel() {
   wincount++;
   done=false;
   fill(colorText);

   winText= createP('You Win!');

   winText.style('color', color(colorText));
   winText.style('font-size', '500%');
   winText.style('text-align', 'center');
   winText.style('display','block');
   winText.position((windowWidth / 2)-(winText.width/4) , windowHeight/2);

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
     paletteMintyTrans();
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
   currentPlayer=null;
   stack.length=0;
   grid.length=0;
    edges.length=0;
    nodes.length=0;
    sets=0;
 }
