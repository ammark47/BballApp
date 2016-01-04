
import React from 'react';
import { Router, Route, Link } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
require('../../css/default.css');
require('../../css/fonts.css');
require('../../css/font-awesome/css/font-awesome.min.css');
import  App  from './app';
import  HomeView from './HomeView';
// var {App} = require('./app');
// var HomeView = require('./HomeView');

import ga from 'react-google-analytics';

import { GAInitiailizer } from 'react-google-analytics';
import { render } from 'react-dom';

var base = document.getElementById('base');

// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});


render((
  <Router history={history} >
    <Route path="/" component={HomeView} />
    <Route path="app" component={App} />
    
  </Router>
), base)

ga('create', 'UA-XXXX-Y', 'auto');
ga('send', 'pageview');
