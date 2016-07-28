/* eslint-env node, mocha */
const expect = require('chai').expect;
const yaldic = require('../index');


describe('YALDIC', function() {


  it('should be a function with an arity of one', () => {

    expect(yaldic).to.be.a('function');
    expect(yaldic.length).to.eql(0);

  });

  
  it('should be able to store and return an object', () => {

    const container = yaldic();

    container.register('foo', { boo: 'ahhh' });
    const actual = container.get('foo');

    expect(actual.boo).to.eql('ahhh');

  });


  it('should overwrite a node with a new value', () => {

    const container = yaldic();

    container.register('foo', 'bar');
    const intermediate = container.get('foo');

    expect(intermediate).to.eql('bar');

    container.register('foo', 'baz');
    const actual = container.get('foo');

    expect(actual).to.eql('baz');

  });
});
