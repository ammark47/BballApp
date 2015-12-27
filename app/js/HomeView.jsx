var React = require('react');
import BigPic from './components/Jumbotron';
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Major from './components/Major';
import Footer from './components/Footer';
import GA from './components/GA';


var HomeView = React.createClass ( {

    render() {
    	
		return (
				<div>
					
					<BigPic />
					<Major />
					<Footer />
					<GA />
					{this.props.children}
				</div>
			)
	}
});

module.exports = HomeView;