import React from 'react';
import Jumbotron  from 'react-bootstrap/lib/Jumbotron';
import Buttons from 'react-button';


class BigPic extends React.Component {
		render() {
			var theme = {
			    disabledStyle: { background: '#03a9f4'},
			    style: { background: 'black', color: '#03a9f4', border: 'none', padding: "15px 28px 28px 0px",
				    fontSize: "22px",
				    lineHeight: "normal",
				    WebkitBorderRadius: "8px",
				       MozBorderRadius: '8px',
				            BorderRadius: '8px'},
			    overStyle: { 
			    	background: '#03a9f4', 
			    	color:'black', 
			    	padding: "18px 28px",
				    fontSize: "22px",
				    lineHeight: "normal",
				    WebkitBorderRadius: "8px",
				       MozBorderRadius: '8px',
				            BorderRadius: '8px'
       			 },
			    activeStyle: { background: '#03a9f4'},
			    //pressedStyle: {background: 'magenta', fontWeight: 'bold'},
			    //overPressedStyle: {background: 'purple', fontWeight: 'bold'}
			}

			return (
					<div className='wrapper big'>
						<Jumbotron style={{height: "100%"}} className="lander">
							<div className='container vertical-center intro-header'>
								<div className='intro-message'>
							    	<h1>Streets Ahead</h1>
							    	<p>Real-time news for your favorite sports team</p>
							    	<hr className="intro-divider"></hr>
							    	<Buttons theme={theme} >Get Started</Buttons>
							    </div>
						    </div>
						 </Jumbotron>
					</div>

				)
		}
	}

export default BigPic;