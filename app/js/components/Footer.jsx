import React from 'react';

export default class Footer extends React.Component {
	render() {
		return (
				<footer className='footer-basic-centered'>
					<p className="footer-links">
					<a href="#">Home</a>
					&nbsp;·&nbsp; 
					<a href="/#/app">Get Started</a>
					
					</p>
					<p className="footer-company-name">Squad Stream by Ammar Karim © 2015-2016</p>
				</footer>
			)
	}
}