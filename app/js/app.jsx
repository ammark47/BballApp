import Navs from './components/Navs';
import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom';

import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';


var App = React.createClass ({
    render() {
		return ( 
				<div>

					<Navs />
					<RouteHandler/>
				</div>
			);
		}
});

 module.exports = App;