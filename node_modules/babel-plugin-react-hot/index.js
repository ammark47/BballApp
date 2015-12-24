'use strict';

var pluginName = 'babel-plugin-react-hot';
var pluginPath = typeof __dirname === 'undefined' ? pluginName : __dirname;

var makeHotName = 'makeHot';
var makeHotPath = pluginPath+'/makeHot.js';

var reactName = 'React';
var reactPath = 'react';

var mountName = 'ReactMount';
var mountPath = 'react/lib/ReactMount';

function isRenderMethod (member) {
  return member.kind === 'method' &&
         member.key.name === 'render';
}

exports = module.exports = transform;
function transform (babel) {
  var t = babel.types;

  return new babel.Transformer(pluginName, {
    /**
     * ES6 ReactComponent
     */
    ClassDeclaration: function (node, parent, scope, file) {
      var hasRenderMethod = node.body.body.filter(isRenderMethod).length > 0;
      if (!hasRenderMethod) {
        return;
      }

      var makeHot = file.addImport(makeHotPath, makeHotName);
      var React   = file.addImport(reactPath,   reactName);
      var mount   = file.addImport(mountPath,   mountName);

      node.decorators = node.decorators || [];
      node.decorators.push(
        t.decorator(
          t.callExpression(
            makeHot,
            [
              React,
              mount,
              t.literal(file.opts._address || file.opts.filename),
              t.literal(node.id.name)
            ]
          )
        )
      );
    },

    /**
     * ReactClassComponent
     */
    CallExpression: function (node, parent, scope, file) {
      var callee = this.get('callee');
      if (node._hotDecorated || !callee.matchesPattern('React.createClass')) {
        return;
      }
      
      var makeHot = file.addImport(makeHotPath, makeHotName);
      var React   = file.addImport(reactPath,   reactName);
      var mount   = file.addImport(mountPath,   mountName);
      
      node._hotDecorated = true;

      return t.callExpression(
        t.callExpression(
          makeHot,
          [
            React,
            mount,
            t.literal(file.opts._address || file.opts.filename),
            t.literal(parent && parent.id && parent.id.name || null)
          ]
        ),
        [node]
      );
    }
  });
}
