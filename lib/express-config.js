

const DEFAULT_NAMESPACE = 'yaldic';


function ConfigFactory(ContainerFactory, settings = {}) {

  let {
    namespace
  , container
  , allow_overwrite
  } = settings;

  const containerSettings = {
    allow_overwrite: allow_overwrite ? true : false
  };


  return {

    namespace: namespace ? namespace : DEFAULT_NAMESPACE
  , container: container ? container : ContainerFactory(containerSettings)

  };

}

ConfigFactory.DEFAULT_NAMESPACE = DEFAULT_NAMESPACE;


module.exports = ConfigFactory;
