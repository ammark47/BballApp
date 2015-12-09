require('bootstrap-webpack');
var Navs = require('./components/Navs');
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;



var App = React.createClass({
	render(){
		return ( 
				<div>
					<Navs />
					<RouteHandler/>
				</div>
			);
		}
});

module.exports = App;