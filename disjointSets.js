function Node(data, id) {
  this.data = data;
  this.id = id;
}

function Edge(startnode, endnode, id) {
  this.startnode = startnode;
  this.endnode = endnode;
  this.id = id;
}

class DisJointSet {
  rank = [];
  parent = [];
  n = [];

  constructor(n) {
    this.n = n;
    this.makeSet()
  }

  makeSet() {


    for (let i = 0; i < this.n.length; i++) {
      this.parent[i] = this.n[i];
    }
    //console.log("array length is:",this.parent.length);

  }
  union(i, j) {
    let irep = this.find(i);
    let jrep = this.find(j);

    if (irep === jrep) {
      return;
    } else if (this.rank[irep.id] < this.rank[jrep.id]) {
      this.parent[irep.id] = jrep;
    } else if (this.rank[irep] > this.rank[jrep.id]) {
      this.parent[jrep.id] = irep;
    } else {
      this.parent[jrep.id] = irep;

      this.rank[irep.id] = this.rank[irep.id] + 1;
    }

  }

  find(x) {

    //console.log(x);
    //console.log(this.parent);
    if (this.parent[x.id] == x) {
      return x;
    } else {
      return this.find(this.parent[x.id]);
    }
  }
}

function test() {
  //test code with integers again and find out whether it works with integers outside of 1 to 5 with given n 5;
  /*
  let cell1 = new Cell(1,0,cols,rows);
  let cell2 = new Cell(2,0,cols,rows);
  let cell3 = new Cell(3,0,cols,rows);

let node1= new Node(cell1,0);
let node2=new Node(cell2,1);
let node3=new Node(cell3,2);

  let n = [node1,node2,node3];
  */


  let listOfEdges = formEdgeList(2, 2);
  console.log("edgelist size: ", listOfEdges.length);
  for (let i = 0; i < listOfEdges.length; i++) {
    console.log(listOfEdges[i]);
  }

  /*

    let dus = new DisJointSet(n);
          //console.log(cell1);
          console.log(node1);
          dus.find(node1);

    // 0 is a friend of 2
          dus.union(node1, node2);

          // 4 is a friend of 2
          dus.union(node2, node3);


          console.log("is 1 friends with 3?");
          if (dus.find(node1) == dus.find(node3))
            { console.log("Yes");
            console.log("node1: ",dus.find(node1));
            console.log("node3: ",dus.find(node3));}
         else{
           console.log("No");
           console.log("node1: ",dus.find(node1));
           console.log("node3: ",dus.find(node3));
         }*/

}

function edgeListIndex(i, j, gridwidth, gridheight) {
  this.gridwidth = gridwidth;
  this.gridheight = gridheight;
  if (i < 0 || j < 0 || i > gridwidth - 1 || j > gridheight - 1) {

    return -1;
  }
  return i + j * gridwidth;
}

function formEdgeList(gridwidth, gridheight) {
  this.gridwidth = gridwidth;
  this.gridheight = gridheight;

  let edgeList = [];
  let indexId = 0
  for (let j = 0; j < gridheight; j++) {
    for (let i = 0; i < gridwidth; i++) {
      switch (j) {
        case 0:
          //is the top, so has no top, but definitely has a bottom;
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i, j + 1, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;
        case gridheight - 1:
          //is the bottom, so has no bottom, but definitely has a top;
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i, j - 1, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;
        default:
          //must have top and bottom;
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i, j + 1, gridwidth, gridheight),
              edgeList.length
            )
          )
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i, j - 1, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;
      }
      switch (i) {
        case 0:
          //is the most left, so has no left, but definitely has a right;
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i + 1, j, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;
        case (gridwidth - 1):
          //is the most right, so has no right, but definitely has a left;
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i - 1, j, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;
        default:
          //is somewhere in the middle so has left and rightInt
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),
              edgeListIndex(i - 1, j, gridwidth, gridheight),
              edgeList.length
            )
          )
          edgeList.push(
            new Edge(
              edgeListIndex(i, j, gridwidth, gridheight),

              edgeListIndex(i + 1, j, gridwidth, gridheight),
              edgeList.length
            )
          )
          break;

      }


    }
  }
  return edgeList;
}
