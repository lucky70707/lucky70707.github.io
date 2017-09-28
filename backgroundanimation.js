function BackgroundAnimation(){
  this.rValue = 151
  this.gValue = 0;
  this.bValue = 0;

  this.rUp = false;
  this.rDown = false;



  this.rChange = function (amount) {
   if(this.rValue + amount > 0 && this.rValue + amount < 256){
     this.rValue += amount;
   }
  }

 this.rUpdate = function(){
    if(rUp){
      rChange(1);
    } else
    if(rDown==true){
      rChange(-1);
    }

  }


}
