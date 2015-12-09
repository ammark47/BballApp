var React = require('react');
require('bootstrap-webpack');

var BigPic = require('./components/Jumbotron');

var Major = require('./components/Major');
var Footer = require('./components/Footer');
var GA = require('./components/GA');


var HomePage = React.createClass({
	render(){
		return (
				<div>
					<BigPic />
					<Major />
					<Footer />
					<GA />
				</div>
			)
	}
});

module.exports = HomePage;