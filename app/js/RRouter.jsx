
import React from 'react';
import { Router, Route, Link } from 'react-router'

import { App } from './app';
import { HomeView } from './HomeView';


import ga from 'react-google-analytics';

import { GAInitiailizer } from 'react-google-analytics';
import { render } from 'react-dom'

var base = document.getElementById('base');

var routes = (
  <Route>
  	<Route path="/" component={HomeView} />
    <Route path="/app" component={App} />
  </Route>
);


render(<Router routes={routes} />, base)

// Router.run(routes, function(Handler) {
//   React.render(<Handler />, document.body);

// });

ga('create', 'UA-XXXX-Y', 'auto');
ga('send', 'pageview');
