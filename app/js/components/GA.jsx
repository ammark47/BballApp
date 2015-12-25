import React from 'react';
var ga = require('react-google-analytics');
var GAInitiailizer = ga.Initializer;

// Use the initializer to add the script to your page somewhere.
class GA extends React.Component {
  render() {
    return (
	      <div>
	        
	          <GAInitiailizer />
	    
	      </div>
    );
  }
}

module.exports = GA;