import Navs from './components/Navs';
import React from 'react';
import Router from 'react-router';
import { render } from 'react-dom';


class App extends React.Component {
    render() {
		return ( 
				<div>
					<Navs />
					
				</div>
			);
		}
}

module.exports = App;