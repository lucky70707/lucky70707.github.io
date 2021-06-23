function Node(data,id){
  this.data = data;
  this.id;
}
class DisJointSet{
    rank=[];
    parent = [];
    n;

  constructor(n){
    this.n=n;
    this.makeSet()
  }

  makeSet(){
    for(let i=0;i<this.n;i++){
      this.parent[i]=i;
    }
  }
  union(i,j){
    let irep = this.find(i);
    let jrep = this.find(j);

    if(irep===jrep){
      return;
    }
    else if (this.rank[irep.id]<this.rank[jrep.id]) {
      this.parent[irep.id]=jrep;
    }else if (this.rank[irep]>this.rank[jrep.id]) {
      this.parent[jrep.id]=irep;
    }else{
      this.parent[jrep.id]=irep;

      this.rank[irep.id]=this.rank[irep.id]+1;
    }

  }

  find(x){
    if(this.parent[x.id]==x){
      return x;
    }
    else{
      return this.find(this.parent[x.id]);
    }
  }
}

function test(){
  let cell1 = new Cell(1,0,cols,rows,1);
  let cell2 = new Cell(1,0,cols,rows,2);
  let cell3 = new Cell(1,0,cols,rows,3);

let node1=Node(cell1,1);
let node2=Node(cell2,2);
let node3=Node(cell3,3);

  let n=3;


  let dus = new DisJointSet(n);
dus.find(node1);

  // 0 is a friend of 2
        dus.union(node1, node2);

        // 4 is a friend of 2
        dus.union(node2, node3);


        console.log("is 1 friends with 3?");
        if (dus.find(cell1) == dus.find(cell3))
          { console.log("Yes");
          console.log("find4: ",dus.find(cell1));
          console.log("find0: ",dus.find(cell3));}
       else{
         console.log("No");
         console.log("find4: ",dus.find(cell1));
         console.log("find0: ",dus.find(cell3));
       }

}
