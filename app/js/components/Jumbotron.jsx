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


@ThemeDecorator(ThemeManager.getMuiTheme(DarkRawTheme))
class BigPic extends React.Component {

	//This is supposed to change the theme of material-ui
		// constructor(props, context) {
		//   super(props, context);
		//   this.state = {
		//   	muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)
		//   }
		// }

		// static childContextTypes = {
		//     muiTheme: React.PropTypes.object,
		//  }

		// getChildContext() {
		//    return {
		//      muiTheme: this.state.muiTheme,
		//    };
		//  }

		//  componentWillMount() {
		//      let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
		// 						primary1Color: "#1690DB",
		// 						primary2Color: "#2173B3",
		// 						primary3Color: "#A9D2EB",
		// 						accent1Color: "#ED3B3B",
		// 						accent2Color: "#ED2B2B",
		// 						accent3Color: "#F58C8C",


		// 						// rest of the palette is set from Theme Manager
		// 						});

		//      this.setState({muiTheme: newMuiTheme});
		//    }

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