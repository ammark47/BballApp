# babel-plugin-react-hot
Babel plugin using [`react-hot-api`](https://github.com/gaearon/react-hot-api) to add hot reloading to `React.createClass` and all ES6 classes with a `render` method.

Most of this can be accredited to [`babel-plugin-react-hotify`](https://github.com/gaearon/babel-plugin-react-hotify).  This particular repo was made to support the original [`react-hot-api`](https://github.com/gaearon/react-hot-api) as a Babel plugin.


## Installation
```
jspm install babel-plugin-react-hot=github:loggur/babel-plugin-react-hot
```
or
```
jspm install babel-plugin-react-hot=npm:babel-plugin-react-hot
```
or
```
npm install babel-plugin-react-hot
```


## Usage
Simply add the module to either `.babelrc` or `options.plugins` for `babel.transform`.  See [Babel's plugin docs](https://babeljs.io/docs/advanced/plugins/).

To use this with `webpack` without manually adding `module.hot.accept()` to the bottom of your modules, use [`webpack-module-hot-accept`](https://github.com/loggur/webpack-module-hot-accept).


## License
MIT
