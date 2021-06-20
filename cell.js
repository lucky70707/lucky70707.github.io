function Cell(i,j,cols,rows){


  this.i = i;
  this.j =j;
  this.walls=[true,true,true,true]
  this.visited = false;


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

    stroke(255);

    if(this.walls[0]){
      line(x    ,y    ,x+w  ,y);}

    if(this.walls[1]){
    line(x+w  ,y    ,x+w  ,y+w);}
    if(this.walls[2]){
    line(x+w  ,y+w  ,x    ,y+w);}
    if(this.walls[3]){
    line(x    ,y+w  ,x    ,y);}

    if(this.visited){
      if(i===0&&j===0){
        //background(255);
        noStroke     ()
        fill(6,214,160,100);
        rect(x,y,w,w);
      }else if(i===cols-1&&j===rows-1){
        noStroke();
        fill(6,214,160,100);
        rect(x,y,w,w);
      }else{
      //  background(51);
        noStroke();
        fill(255,0,255,100);
        rect(x,y,w,w);
      }


    }


  }

  this.showAsStart = function(){
    let x=this.i*w;
    let y= this.j*w;

    stroke(165);
    fill(100,255,255,100);
    rect(x,y,w,w);
  }
}
