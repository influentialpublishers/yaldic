

const { DepGraph } = require('dependency-graph');


function Yaldic() {

  const graph = new DepGraph();


  return {
    register: (name, node) => {
      if (graph.hasNode(name)) {

        graph.setNodeData(name, node);
        
      } else {
        graph.addNode(name, node);
      }

      return this;
    }

  , get: (name) => graph.getNodeData(name)
  }
  
}


module.exports = Yaldic;
