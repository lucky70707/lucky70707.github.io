function BackgroundAnimation(){
  this.cValue = 170;
  this.cUp = false;
  this.cDown = false;



  this.change = function (step) {
    this.pos.x += step;
  }

  this.update = function(){
    if(cUp==true){
      change(15);
    }
    if(cDown==true){
      change(-15);
    }

  }


}
