
[![NPM version](https://badge.fury.io/js/jquery-loader.png)](http://badge.fury.io/js/jquery-loader)
[![Build Status](https://api.travis-ci.org/netroy/jquery-loader.png?branch=master)](https://travis-ci.org/netroy/jquery-loader)

NOTE
====
Almost a fork for node-jquery, but rewritten because the jquery team is taking over maintaining the `jQuery` package [coolaj86/node-jquery#59](https://github.com/coolaj86/node-jquery/issues/59).


DOES NOT WORK ON WINDOWS
====
Many people are having problems getting this module to work on windows. The
failure has to do with building contextify on window. It seems to be a windows
environment issue. I don't have access to a windows machine so I cannot explore
working through the windows install process. If you figure out how to build
[contextify](https://github.com/brianmcd/contextify) on windows please send me working instructions!

Installing.
====
`npm install jquery-loader`

Usage
---
```
    var $ = require('jquery').create();
```

Examples
---
```javascript
    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());
```

In Node.JS you may also create separate window instances

```javascript
    var jsdom = require('jsdom').jsdom
      , myWindow = jsdom().parentWindow
      , $ = require('jquery').create()
      , jQuery = require('jquery').create(myWindow)
      ;

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jQuery("<h3>second test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());
```

Output:

```html
    <h1>test passes</h1>
    <h3>second test passes</h3>
```

You may also specify the version of jQuery you'd like to use
```javascript
    var $ = require('jquery')(null, '1.9');
```
Currently the version defaults to `1.10.1`.

Following versions are available -

* 1.6(.4)
* 1.7(.2)
* 1.8(.3)
* 1.9(.1)
* 1.10(.1)
* 2.0(.3)
* 2.1(.1)

JSONP Example
----

```javascript
    var $ = require('jquery');

    $.getJSON('http://twitter.com/status/user_timeline/treason.json?count=10&callback=?',function(data) {
      console.log(data);
    });
```

Building/Publishing to NPM
----
```
grunt && npm publish
```
