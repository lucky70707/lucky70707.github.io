/*
function Node(data){
  this.data = data;
  this.children =[];
}
class Tree{

  constructor(){
    this.root =null;
  }
  add(data, toNodeData){
    const node = new Node(data);
    const parent = toNodeData ? this.findBFS(toNodeData) : null;

    if(parent){
      parent.children.push(node);
    }else{
      if(!this.root){
        this.root = node;
      }
      else{
        return "Tried to store at root, but root exists already."
      }
    }
  }
getRoot(){
  return this.root;
}
findBFS(data){
  const queue = [this.root];
  let _node =null;

  this.traverseBFS((node)=>{
    if(node.data==data){
      _node=node;
    }
  })
  return _node;
}
  traverseBFS(cb){
    const queue = [this.root]
    if(cb){
      while(queue.length){
          const node = queue.shift();

          cb(node);

          for(const child of node.children){
            queue.push(child);
          }
      }
    }
  }
}

function test(){
  let tree = new Tree();
  let cell1 = new Cell(1,0,cols,rows,1;
  let cell2 = new Cell(1,0,cols,rows,2);
  let cell3 = new Cell(1,0,cols,rows,3);

  tree.add(cell1);
  tree.add(cell2,cell1);
  //tree.add("Node3","Node1");

  //tree.add("Node4","Node2");
  //tree.add("Node5","Node2");
  //tree.add("Node6","Node1");

  tree.traverseBFS((node)=>{
    node.data
    console.log("Current node: ",node)})


console.log(  tree.traverseBFS(cell2).queue);
}
*/
