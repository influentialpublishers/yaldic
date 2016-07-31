

const { DepGraph }       = require('dependency-graph');
const Type               = require('./lib/type');
const ExpressConfig      = require('./lib/express-config');
const { OverwriteError } = require('./lib/error');


function validateNode(node) {

  if (typeof node === 'string')
    throw new TypeError('Dependency node cannot be a string');

  return node;

}

function Yaldic({ allow_overwrite = false } = {}) {

  const graph = new DepGraph();


  return {

    register: (name, node, type = Type.VALUE) => {

      validateNode(node);

      node.$type = type;

      if (graph.hasNode(name)) {

        if (!allow_overwrite) OverwriteError.throw(name);

        graph.setNodeData(name, node);
        
      } else {
        graph.addNode(name, node);
      }

      return this;
    }

  , get: (name) => graph.getNodeData(name)
  }
  
}


Yaldic.autoInject = function autoInject(context, container) {

  return {
    register: container.register.bind(container)
  , get: (name) => {

      const node = container.get(name);
      return typeof node === 'function' ? node(context) : node;

    }
  };

};

/**
 * Configuration:
 *
 * - namespace: This will be the `req` object attachment point.
 * - allow_overwrite:
 *      Are you allowed to re-assign node values?  (default = no)
 * - container: Your very own yaldic container
 */
Yaldic.express = function(settings = {}) {

  const {
    namespace
  , container
  , auto_inject_req
  } = ExpressConfig(Yaldic, settings);

  return function(req, res, next) {

    if (req[namespace]) OverwriteError.throw(namespace);

    req[namespace] = auto_inject_req ?
      Yaldic.autoInject(req, container) : container;

    return next();

  };

}

Yaldic.Type = Type;


module.exports = Yaldic;
