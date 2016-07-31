/*eslint-env node, mocha*/
const { expect }    = require('chai');
const sinon = require('sinon');
const ConfigFactory = require('../../lib/express-config');


// basic test container factory
var cf;

describe('lib/express-config :: ConfigFactory', function() {

  beforeEach(() => cf = sinon.stub().returns('foo'));


  it('should return the default namespace if not given', () => {

    const config = ConfigFactory(cf);
    expect(config.namespace).to.eql(ConfigFactory.DEFAULT_NAMESPACE);

  });


  it('should call the given container factory if a container is ' +
  'not provided by the user', () => {

    const settings = {};
    const config   = ConfigFactory(cf, settings);

    expect(cf.calledOnce).to.be.true;
    expect(config.container).to.eql('foo');

  });


  it('should set the namespace given by the user settings',
  () => {

    const settings = { namespace: 'foo' };
    const config   = ConfigFactory(cf, settings);

    expect(config.namespace).to.eql('foo');
    
  });


  it('should set container to the container given by the user settings',
  () => {

    const container = {};
    const settings = { container: container };
    const config = ConfigFactory(cf, settings);

    expect(config.container).to.eql(container);

  });


  it('should pass the allow_overwrite setting to the container factory',
  () => {

    const settings = { allow_overwrite: true };
    ConfigFactory(cf, settings);

    expect(cf.calledWith(settings)).to.be.true;

  });
  

});
