let cols, rows;
let width=800;
let height=800;
let defaultW=160;
let w =defaultW;
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
let currentCell = 0;

let edges;

let arrayEmptied=false;

function  setup(){
  let cnv =createCanvas(width,height);
  cnv.position(floor((width/2)),floor(windowHeight/10))
  cols =floor(width/w);
  rows = floor(height/w)
  //framerate(5);

  for(let j   =0; j < rows; j++){
    for(let i =0; i < cols; i++){
      let cell = new Cell(i,j,cols,rows,grid.length);
      grid.push(cell);
    }
  }
  edges=[...grid];

  current=grid[0];
  currentPlayer=new Player();

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
    currentPlayer.drawPlayer();
  }
}

function draw(){
  background(colorBackground);
for (let i = 0; i < grid.length; i++) {
  grid[i].show();
}

 generateDepthFirstMaze();
//generateKruskalMaze();

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
function generateKruskalMaze(){


  while(edges.length>0){
    currentCell=edges[floor(random(0,edges.length))];
    console.log(currentCell);
    let next= currentCell.checkKruskalNeighbors();
    console.log(next);
    console.log('currentId',currentCell.setId,' next id',next.setId);
    if(currentCell.setId!==next.setId){
      console.log('recognised as different');
      removeWalls(next,currentCell)
      //set the setId of next and all the other cells with next their setID to that of currentCell

    }else{
      console.log('recognised as same');
      for(i=0;i>edges.length;i++){
        if(edges[i].setId===next.setId){
          edges.splice(next.id,1);

        }
      }

      console.log(edges.length);

    }


  }
  if(arrayEmptied){
    console.log(grid);
    arrayEmptied=true;
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


 function winLevel() {
   wincount++;
   done=false;
   fill(colorText);

   winText = createP('You Win!')
   winText.position(windowWidth / 2 , 20);
   winText.style('color', color(colorText));
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
     paletteMintyTrans();
     w=defaultW;
     wincount =0;
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
