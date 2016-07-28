

const { DepGraph } = require('dependency-graph');


function throwOverwriteError(name) {
  throw new Error(`Cannot overwrite already existing node: ${name}`);
}


function Yaldic({ allow_overwrite = false } = {}) {

  const graph = new DepGraph();


  return {

    register: (name, node) => {
      if (graph.hasNode(name)) {

        if (!allow_overwrite) throwOverwriteError(name);

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
