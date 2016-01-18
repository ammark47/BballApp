import Navs from './components/Navs';
import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom';
import GA from './components/GA';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';


var App = React.createClass ({

	componentWillMount() {
	     this.lock = new Auth0Lock('X0tDU1TYK3dgEX2mAQtNOP1CtcQ6AlSw', 'squadstream.auth0.com');
	     this.setState({idToken: this.getIdToken()});
	 },

	 getIdToken() {
	     var idToken = localStorage.getItem('userToken');
	     var authHash = this.lock.parseHash(window.location.hash);
	     if (!idToken && authHash) {
	       if (authHash.id_token) {
	         idToken = authHash.id_token
	         localStorage.setItem('userToken', authHash.id_token);
	       }
	       if (authHash.error) {
	         console.log("Error signing in", authHash);
	         return null;
	       }
	     }
	     return idToken;
	   },

    render() {
    
		return ( 
				<div>
					<Navs lock={this.lock} idToken={this.state.idToken}/>
					<GA />
					{this.props.children}
				</div>
			);
		}
});


module.exports = App;