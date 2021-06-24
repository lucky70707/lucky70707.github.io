function setupKruskalMaze(){

  edges =formEdgeList(cols,rows);
  for(let i=0; i<grid.length;i++){
    nodes.push(new Node(grid[i],i));
  }
  sets= new DisJointSet(nodes);
  console.log("grid length: ",grid.length);
  console.log("edges length: ",edges.length);
  console.log("nodes length: ",nodes.length);


}

//kruskal's algorithm/*
/*algorithm explained in own words:
alle cellen behoren tot een tree.
kies een willekeurige cell
kies een willekeurige buurcell
als buurcell tot een andere tree behoort
  dan zorg ervoor dat de andere cell tot dezelfde tree behoort
zo niet, haal dan de cel weg.
*/
let failsafeIndex =0;
function generateKruskalMaze(){

  if(mazeGenerated){
    console.log("player is drawn: ",mazeGenerated);
    while(done!==true){
        done=true;

    }
    currentPlayer.drawPlayer();
  }
  //while(edges.length>0&&mazeGenerated===false){
    failsafeIndex++;
    if(edges.length===1){
      console.log(mazeGenerated);
      mazeGenerated=true;
    }
  //  console.log(edges);
    let pair =edges[floor(random(0,edges.length-1))]
    if(pair){
    //console.log("pair: ",pair);
    let startnodeIndex=pair.startnode;
    //console.log("startnodeIndex: ",startnodeIndex);
    let nextIndex=pair.endnode;
  //  console.log("startnodeIndex: ",nextIndex);

    currentNode=nodes[startnodeIndex];
    nextNode=nodes[nextIndex];

    if(sets.find(currentNode)!==sets.find(nextNode)){
      //console.log('recognised as different');
      sets.union(currentNode,nextNode)
      removeWalls(nextNode.data,currentNode.data);
      currentNode.data.visited=true;
      nextNode.data.visited=true;

    }else{
        let indexOfTobedeleted=pair.id;
        for(let i=0;i<edges.length;i++){
          if(edges[i].id===pair.id){
            indexOfTobedeleted =i;
          }
        }
        edges.splice(indexOfTobedeleted,1);
}}

}
