

function Subclass(constructor) {

  constructor.prototype             = Object.create(Error.prototype);
  constructor.prototype.constructor = constructor;

  constructor.throw = (ErrorClass) => (function () {

    function ThrowableError(args) {
      return ErrorClass.apply(this, args);
    }
    ThrowableError.prototype = ErrorClass.prototype;

    throw new ThrowableError(arguments);

  })(constructor);


  return constructor;
}


function OverwriteError(namespace) {
  this.message =
    `Cannot overwrite already existing namespace ${namespace}`;
}


module.exports = {

  OverwriteError: Subclass(OverwriteError)

};
