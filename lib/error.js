

function Subclass(constructor) {

  constructor.prototype             = Object.create(Error.prototype);
  constructor.prototype.constructor = constructor;

  constructor.throw = (function (ErrorClass) {

    function ThrowableError(args) {
      return ErrorClass.apply(this, args);
    }
    ThrowableError.prototype = ErrorClass.prototype;

    return function() { throw new ThrowableError(arguments); };

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
