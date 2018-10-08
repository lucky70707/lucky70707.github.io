function Paddle() {
  this.w = 160;
  this.h = 20;

  this.dir = 0;
  this.vel = 2;

  this.isMovingLeft = false;
  this.isMovingRight = false;

  this.pos = createVector(width /2 , height - 40)

  this.display = function(){
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

/*  this.move = function(step) {
    this.pos.x += step;
  }*/

  this.update = function(){
    this.pos.x += this.vel * this.dir;
    }


  this.checkEdges = function() {
    if(this.pos.x < 0) this.pos.x = 0;
    else if (this.pos.x > width - this.w) this.pos.x =  width - this.w;
  }

}
