
const R = require('ramda')


const throwErrorIfNoSpec = R.when(
  R.either(R.isEmpty, R.isNil)
, () => { throw new Error('Spec object is required') }
)


// const throwNotInSpec = (key) => {
//   throw new Error(`Dependency does not exist: ${key}`)
// }


const throwErrorIfNotInSpec = (spec) => R.when(
  R.compose(R.not, R.has(R.__, spec))
, (key) => { throw new Error(`Dependency does not exist: ${key}`) }
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

  return {
    get : getInstance
  }  

}


module.exports = Yaldic
