
const R          = require('ramda')
const PropsCheck = require('props-check')


const ERR = {
  DNE     : (name) => `Dependency does not exist ${name}`
, SUGGEST : (suggestions) => `\nDid you mean one of these: ${suggestions}`
}


const throwErrorIfNoSpec = R.when(
  R.either(R.isEmpty, R.isNil)
, () => { throw new Error('Spec object is required') }
)


const throwError = R.curry((spec, name) => R.ifElse(
  R.isEmpty
, () => { throw new Error(ERR.DNE(name))}
, (suggestions) => { throw new Error(ERR.DNE(name) + ERR.SUGGEST(suggestions)) }
))


const checkProps = R.curry((spec, name) => R.compose(
  throwError(spec, name)
, R.prop(name)
, PropsCheck(spec)
, R.objOf(R.__, null)
)(name))


const throwErrorIfNotInSpec = (spec) => R.when(
  R.compose(R.not, R.has(R.__, spec))
, checkProps(spec)
)


// Yaldic :: Spec -> Yaldic
const Yaldic = (spec) => {

  const instances = {}

  // createInstance :: String -> a
  const createInstance = (name) => {
    instances[name] = spec[name]()
    return instances[name]
  }

  // getInstance :: String -> a
  const getInstance = (name) => {
    throwErrorIfNotInSpec(spec)(name)
    if (instances[name])
      return instances[name]
    return createInstance(name)
  }

  throwErrorIfNoSpec(spec)

  return { get : getInstance }  

}


module.exports = Yaldic
