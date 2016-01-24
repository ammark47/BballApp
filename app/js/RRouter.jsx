import React from 'react';
import { Router, Route, Link } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
require('../../css/default.css');

import  App  from './app';
import  HomeView from './HomeView';


import ga from 'react-google-analytics';

import { GAInitiailizer } from 'react-google-analytics';
import { render } from 'react-dom';

var base = document.getElementById('base');

// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});

ga('create', 'UA-56110516-3', 'auto');
ga('require', 'linkid');
ga('send', 'pageview');

render((
  <Router  history={history}>
    <Route path="/" component={HomeView} />
    <Route path="app" component={App} />

  </Router>
), base)

// history={history}
