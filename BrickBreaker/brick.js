function Brick() {
  this.r = random(20, 80);
  this.pos = createVector(random(100, width-100), random(100, height -400));
  this.total = 6;

  this.display = function (){
    push();//p5
    translate(this.pos.x, this.pos.y);
    beginShape();
    for(var i = 0; i <this.total; i++){
      let angel = map(i, 0, this.total, 0, TWO_PI);
      var x = this.r * cos(angel);
      var y = this.r * sin(angel);
      vertex(x,y);
    }
    endShape(CLOSE);
    pop();//p5
  }


}
