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
