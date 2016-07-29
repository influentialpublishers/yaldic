

const { DepGraph } = require('dependency-graph');


const DEFAULT_NAMESPACE = 'yaldic';


function throwOverwriteError(name) {
  throw new Error(`Cannot overwrite already existing node: ${name}`);
}


function throwExpressNamespaceExistsError(namespace) {
  throw new Error(`Cannot overwrite already existing namespace: ${namespace}`);
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


Yaldic.express = function(config = {}) {

  let { namespace, allow_overwrite, container } = config;

  if (!namespace) namespace = DEFAULT_NAMESPACE;
  if(!container) container = Yaldic({ allow_overwrite }); 

  return function(req, res, next) {

    if (req[namespace]) throwExpressNamespaceExistsError(namespace);

    req[namespace] = container;

    return next();

  }

}


module.exports = Yaldic;
