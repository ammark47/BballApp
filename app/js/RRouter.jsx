var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
import 'bootstrap-webpack';
import App from './app';
import HomeView from './HomeView';
var ga = require('react-google-analytics');
var GAInitiailizer = ga.Initializer;



var routes = (
  <Route>
  	<Route path="/" handler={HomeView} />
    <Route path="/app" handler={App} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);

});

ga('create', 'UA-XXXX-Y', 'auto');
ga('send', 'pageview');
