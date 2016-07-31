/*eslint-env node, mocha*/
const { expect }         = require('chai');
const { OverwriteError } = require('../../lib/error');


describe('Error', function () {


  describe('OverwriteError', function() {

    it('should set a specific message', () => {

      const err = new OverwriteError('foo');

      expect(err.message).to.eql(
        'Cannot overwrite already existing namespace foo'
      );

    });


    it('should be an Error object', () => {

      const err = new OverwriteError('foo');
      expect(err).to.be.an.instanceOf(Error);

    });


    it('should have a throw method which will throw a new instance of ' +
    'itself', () => {

      const test = () => OverwriteError.throw('bar');
      

      expect(test).to.throw(
        OverwriteError
      , /Cannot overwrite already existing namespace bar/
      );

    });

  });


});
