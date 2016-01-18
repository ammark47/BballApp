import React from 'react';
import Jumbotron  from 'react-bootstrap/lib/Jumbotron';
import Buttons from 'react-button';
import { Router, Route, Link } from 'react-router';
import {RaisedButton} from 'material-ui';


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

		 showLock() {
		    // We receive lock from the parent component in this case
		    // If you instantiate it in this component, just do this.lock.show()
		    this.props.lock.show();
		  }


		render() {
			
			return (
					<div className='wrapper big'>
						<Jumbotron style={{height: "100%", backgroundImage: "url('basketball.jpg')"}} className="lander">
							<div className='container vertical-center intro-header'>
								<div className='intro-message'>
							    	<h1>Squad Stream</h1>
							    	<p>Real-time news for your favorite NBA team</p>
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