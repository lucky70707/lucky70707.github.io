function Cell(i,j,cols,rows,setId){


  this.i = i;
  this.j =j;
  this.setId=setId

  this.walls=[true,true,true,true]
  this.visited = false;

  this.checkKruskalNeighbors= function(){
    let neighbors = [];

    let top     = grid[index(i   ,j-1)]
    let right   = grid[index(i+1 ,j)]
    let bottom  = grid[index(i   ,j+1)]
    let left    = grid[index(i-1 ,j)]

    if(top){
      neighbors.push(top);
    }
    if(right){
      neighbors.push(right);
    }
    if(bottom){
      neighbors.push(bottom);
    }
    if(left){
      neighbors.push(left);
    }

    if(neighbors.length>0){
      let r=floor(random(0,neighbors.length));
      return neighbors[r];
    }else{
      console.log("no neighbors");
      return undefined;
    }


  }
  this.checkNeighbors= function(){
    let neighbors = [];

    let top     = grid[index(i   ,j-1)]
    let right   = grid[index(i+1 ,j)]
    let bottom  = grid[index(i   ,j+1)]
    let left    = grid[index(i-1 ,j)]

    if(top&&!top.visited){
      neighbors.push(top);
    }
    if(right&&!right.visited){
      neighbors.push(right);
    }
    if(bottom&&!bottom.visited){
      neighbors.push(bottom);
    }
    if(left&&!left.visited){
      neighbors.push(left);
    }

    if(neighbors.length>0){
      let r=floor(random(0,neighbors.length));
      return neighbors[r];
    }else{
      return undefined;
    }


  }

  this.show = function(){
    let x=this.i*w;
    let y= this.j*w;
    //this.walls=[true,true,true,true]

    stroke(colorWalls);
    strokeWeight(2);
    if(this.walls[0]){
      line(x    ,y    ,x+w  ,y);}

    if(this.walls[1]){
    line(x+w  ,y    ,x+w  ,y+w);}
    if(this.walls[2]){
    line(x+w  ,y+w  ,x    ,y+w);}
    if(this.walls[3]){
    line(x    ,y+w  ,x    ,y);}

    if(this.visited){
      //start
      if(i===0&&j===0){

        noStroke     ()
        fill(color(colorStart));
        rect(x,y,w,w);
        //finish
      }else if(i===cols-1&&j===rows-1){
        noStroke();
        fill(color(colorFinish));
        rect(x,y,w,w);
        //maze
      }else{
      //  background(51);
        noStroke();
        fill(color(colorMaze));
        rect(x,y,w,w);
      }
    }
  }
}
