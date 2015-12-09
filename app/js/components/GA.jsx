import React from 'react';
var ga = require('react-google-analytics');
var GAInitiailizer = ga.Initializer;

// Use the initializer to add the script to your page somewhere.
var GA = React.createClass({
  render: function() {
    return (
	      <div>
	        
	          <GAInitiailizer />
	    
	      </div>
    );
  }
});

module.exports = GA;