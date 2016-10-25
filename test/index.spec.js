/* eslint-env node, mocha */
const R      = require('ramda')
const Expect = require('chai').expect
const Yaldic = require('../index')


describe('YALDIC', function() {

  it('should be a function', () => {
    Expect(Yaldic).to.be.a('function')
  })


  it('should resolve to an object with get property', () => {
    Expect(Yaldic({ foo : R.T })).to.have.property('get')
  })


  it('should throw an error when passed in empty/undefined spec', () => {
    Expect(() => Yaldic()).to.throw(Error)
    Expect(() => Yaldic({})).to.throw(Error)
  })


  it('should throw an error when getting a nonexistant dependency', () => {
    const myYaldic = Yaldic({ foo : R.T })
    Expect(() => myYaldic.get('food')).to.throw(Error)
  })


  it('should return an object of dependencies', () => {
    const myYaldic = Yaldic({
      soft : () => ({ get: R.T, isHere: R.F })
    , money : () => ({ getMoney: R.T, isRich: R.F })
    })
    Expect(myYaldic.get('soft')).to.be.an('object')
    Expect(myYaldic.get('money')).to.be.an('object')
  })


  it('should use the singleton pattern and not re-init if already done',
    () => {
    let counter = 0
    const testFn = () => {
      counter = counter + 1
      return { get: R.T, isHere: R.F }
    }
    const myYaldic = Yaldic({
      soft : testFn
    })
    Expect(counter).to.equal(0)
    myYaldic.get('soft')
    Expect(counter).to.equal(1)
    myYaldic.get('soft')
    Expect(counter).to.equal(1)
  })
})
