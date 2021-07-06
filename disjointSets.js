function Node(data, id) {
  this.data = data;
  this.id = id;
}

function Edge(startnode, endnode, id) {
  this.startnode = startnode;
  this.endnode = endnode;
  this.id = id;

  this.checkDuplicate =function (startnode,endnode){
    if(startnode===this.endnode&&endnode===this.startnode){
    return  true;
    }else{
      return false;
    }
  }
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
  let listOfEdges = formEdgeList(2, 2);
  console.log("edgelist size: ", listOfEdges.length);
  for (let i = 0; i < listOfEdges.length; i++) {
    console.log(listOfEdges[i]);
  }

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
