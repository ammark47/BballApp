# option-multiplexer

Create combinations of configurations from an initial set of options.

```javascript
var multiplex = require('option-multiplexer');

var choices = {
	cheese: [ 'swiss', 'gouda', 'cheddar' ],
	meat: [ 'salami', 'chicken' ],
	bread: [ 'flatbread', 'white', 'italian' ]
};

var sandwiches = multiplex(choices);

console.log(sandwiches);
```
