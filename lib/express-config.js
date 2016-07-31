

const DEFAULT_NAMESPACE = 'yaldic';


function ConfigFactory(ContainerFactory, settings = {}) {

  let {
    namespace
  , container
  , allow_overwrite
  , auto_inject_req
  } = settings;

  const containerSettings = {
    allow_overwrite: allow_overwrite ? true : false
  };


  return {

    namespace: namespace ? namespace : DEFAULT_NAMESPACE
  , container: container ? container : ContainerFactory(containerSettings)
  , auto_inject_req: auto_inject_req ? true : false

  };

}

ConfigFactory.DEFAULT_NAMESPACE = DEFAULT_NAMESPACE;


module.exports = ConfigFactory;
