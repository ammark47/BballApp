import React from 'react';
import Jumbotron  from 'react-bootstrap/lib/Jumbotron';
import Buttons from 'react-button';
import { Router, Route, Link } from 'react-router';
import {RaisedButton} from 'material-ui';

import MyRawTheme from '../../../css/raw-theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';


class BigPic extends React.Component {

		constructor(props, context) {
		  super(props, context);
		  this.state = {
		  	muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
		  }
		}

		static childContextTypes = {
		    muiTheme: React.PropTypes.object,
		 }

		getChildContext() {
		   return {
		     muiTheme: this.state.muiTheme,
		   };
		 }



		render() {
			
			return (
					<div className='wrapper big'>
						<Jumbotron style={{height: "100%"}} className="lander">
							<div className='container vertical-center intro-header'>
								<div className='intro-message'>
							    	<h1>Streets Ahead</h1>
							    	<p>Real-time news for your favorite sports team</p>
							    	<hr className="intro-divider"></hr>
							 		<RaisedButton className="raised-button" label="Get Started" primary={true} 
							 		containerElement={<Link to="/app" />} 
							 		style={{
							 		    backgroundColor: '#00bcd4',
							 		  }}/>
								  
							    </div>
						    </div>
						 </Jumbotron>
					</div>

				)
		}
	}

export default BigPic;