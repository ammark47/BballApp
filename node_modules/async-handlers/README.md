# Asynchronous handlers

Function factories for performing synchronous operations after asynchronous operations.

```js
f1 = function (callback) {
  asyncOperation(function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, syncOperation(result);
    }
  }
}

// is equivalent to

var asyncHandlers = require('async-handlers')

f1 = function (callback) {
  handler = asyncHandlers.transform(syncOperation, callback);
  asyncOperation(handler);
}
```

## Methods

#### constant(value, callback)

Returns a function with the signature `(err)`.
When called with an error, passes it to the callback.
Otherwise executes callback with `(null, value)`.


#### exitOnError

Returns a function with the signature `(err)`.
When called with an error, prints the error in red to `stderr` and exits with status 1.
Otherwise does nothing.


#### extract(key, callback)

Returns a function with the signature `(err, result)`.
When called with an error, passes it to the callback.
Otherwise executes callback with `(null, result[key])`.


#### prependToError(prefix, callback)

Returns a function with the signature `(err, args...)`.
When error is a string, prepends prefix to it if and passes it to the callback.
When error is an object with a message property, prepends prefix to its message and passes it to the callback.
Otherwise passes all arguments to the callback.

_Note: the prefix will only be prepended if not already present._


#### transform(fn, callback)

Returns a function with the signature `(err, result)`.
When called with an error, passes it to the callback.
Otherwise executes callback with `(null, fn(result))`.
