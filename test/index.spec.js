/* eslint-env node, mocha */
const Expect = require('chai').expect
const Yaldic = require('../index')
const Path   = require('path')


describe('YALDIC', function() {

  it('should be an object with a get property', () => {

    Expect(Yaldic).to.have.property('get')

  })


  it(`should return the requested connection/interface function`,
    () => {

    const domain_path = Path.join(__dirname, './asset/domain')
    const DO          = Yaldic.get('DO')(domain_path)

    Expect(Yaldic.get('DO')).to.be.a('function')
    Expect(Yaldic.get('DAO')).to.be.a('function')
    Expect(Yaldic.get('rabbitmq')).to.be.a('function')
    Expect(Yaldic.get('socialzombie')).to.be.a('function')
    Expect(Yaldic.get('elasticsearch')).to.be.a('function')

    Expect(DO).to.have.property('Network')
    Expect(DO).to.have.property('User')
    Expect(DO.Network).to.have.property('type')
    Expect(DO.User).to.have.property('getCount')

  })


  it(`should throw error if the requested function does not exist`, () => {

    Expect(() => Yaldic.get('not_exist')).to.throw(Error)

  })


  it(`should throw TypeError if no config is passed into returned fn`, () => {

    Expect(Yaldic.get('DO')).to.throw(TypeError)
    Expect(Yaldic.get('DAO')).to.throw(TypeError)
    Expect(Yaldic.get('rabbitmq')).to.throw(TypeError)
    Expect(Yaldic.get('socialzombie')).to.throw(TypeError)
    Expect(Yaldic.get('elasticsearch')).to.throw(TypeError)

  })

})