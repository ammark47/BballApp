var React = require('react');
var BigPic = require('./components/Jumbotron');
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

var Major = require('./components/Major');
var Footer = require('./components/Footer');
var GA = require('./components/GA');


var HomeView = React.createClass ( {

    render() {
		return (
				<div>
					
					<BigPic />
					<Major />
					<Footer />
					<GA />
					<RouteHandler />
				</div>
			)
	}
});

module.exports = HomeView;