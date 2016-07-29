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


  it('should throw an error by default when attempting to overwrite a ' +
  'node with a new value', () => {

    const container = yaldic();

    container.register('foo', 'bar');
    const intermediate = container.get('foo');

    expect(intermediate).to.eql('bar');

    const test = () => container.register('foo', 'baz');
    expect(test).to.throw(/Cannot overwrite already existing node: foo/);

  });


  it('should not allow an overwrite when configured to do so', () => {

    const container = yaldic({ allow_overwrite : true });

    container.register('foo', 'bar');
    const intermediate = container.get('foo');

    expect(intermediate).to.eql('bar');

    container.register('foo', 'baz');
    const actual = container.get('foo');
    expect(actual).to.eql('baz');


  });


  describe('Yaldic.express', function() {

    it('should return a function with an arity of 3', () => {

      const plugin = yaldic.express({});
      expect(plugin).to.be.a('function');
      expect(plugin.length).to.eql(3);

    });


    it('should return an empty container in the request at the given ' +
    'namespace', (done) => {

      const plugin = yaldic.express({});
      const req = {};

      plugin(req, {}, () => {

        expect(req.hasOwnProperty('yaldic')).to.be.true;
        expect(req.yaldic.get).to.be.a('function');
        expect(req.yaldic.register).to.be.a('function');
        done();

      });

    });


    it('should throw an error when the request namespace already exists ',
    () => {

      const plugin = yaldic.express({});
      const req = { yaldic: 'yo mama' };

      const test = () => plugin(req, {});

      expect(test).to.throw(/Cannot overwrite already existing namespace/);

    });


    it('should use the provided namespace', (done) => {

      const plugin = yaldic.express({ namespace: 'blorp' });
      const req = {};

      plugin(req, {}, () => {
        expect(req.hasOwnProperty('blorp')).to.be.true;
        done();
      });

    });


    it('should accept an allow overwrite parameter', (done) => {

      const plugin = yaldic.express({ allow_overwrite: true });
      const req = {};

      plugin(req, {}, () => {

        req.yaldic.register('foo', 'bar');
        req.yaldic.register('foo', 'baz');

        expect(req.yaldic.get('foo')).to.eql('baz');

        done();
      });

    });


    it('should use the set container', (done) => {

      const mydic  = yaldic();
      mydic.register('foo', 'bar');

      const plugin = yaldic.express({ container: mydic });
      const req    = {};

      plugin(req, {}, () => {
        expect(req.yaldic.get('foo')).to.eql('bar');
        done();
      });

    });

  });

});
