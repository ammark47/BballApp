import React from 'react';
var Router = require('react-router');
var Route = Router.Route;


// import  App  from './app';
// import  HomeView from './HomeView';
var App = require('./app').default;
var HomeView = require('./HomeView').default;

import ga from 'react-google-analytics';

import { GAInitiailizer } from 'react-google-analytics';
import { render } from 'react-dom';

var base = document.getElementById('base');

var routes = (
   <Route>
	  	<Route path="/" handler={HomeView} />
    	 <Route path="/app" handler={App} />
   </Route>
 );
 
Router.run(routes, function(Handler) {
   render(<Handler />, base);
});

ga('create', 'UA-XXXX-Y', 'auto');
ga('send', 'pageview');