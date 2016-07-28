

const { DepGraph } = require('dependency-graph');


function Yaldic() {

  const graph = new DepGraph();


  return {
    register: (name, node) => {
      graph.addNode(name, node);

      return this;
    }

  , get: (name) => graph.getNodeData(name)
  }
  
}


module.exports = Yaldic;
