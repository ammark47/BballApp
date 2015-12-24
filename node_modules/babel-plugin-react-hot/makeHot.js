'use strict';

var ReactHotAPI = require('react-hot-api');
var madeHot = {};

module.exports = makeHot;
function makeHot (React, ReactMount, filename, displayName) {
  var id = filename+'$$$'+displayName;

  function getRootInstances () {
    return ReactMount._instancesByReactRootID
      || ReactMount._instancesByContainerID
      || [];
  }
  
  return function (ReactClass) {
    if (!madeHot[id]) {
      madeHot[id] = ReactHotAPI(getRootInstances, React);
    }

    if (displayName === null) {
      displayName = ReactClass.displayName || null;
      id = filename+'$$$'+displayName;
    } else if (ReactClass.displayName === undefined) {
      ReactClass.displayName = displayName;
    }
    
    return madeHot[id](ReactClass, id);
  };
}
