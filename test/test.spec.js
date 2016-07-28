/* eslint-env node, mocha */
const expect = require('chai').expect;
const yaldic = require('../index');


describe('YALDIC', function() {

  const container = yaldic();

  it('should be a function with an arity of one', () => {

    expect(yaldic).to.be.a('function');
    expect(yaldic.length).to.eql(0);

  });

  
  it('should be able to store and return an object', () => {

    container.register('foo', { boo: 'ahhh' });
    const actual = container.get('foo');

    expect(actual.boo).to.eql('ahhh');

  });
});
