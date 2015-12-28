import React from 'react';

export default class Footer extends React.Component {
	render() {
		return (
				<footer className='footer-basic-centered'>
					<p className="footer-company-motto">Don&#39;t get left behind, stay Streets Ahead</p>
					<p className="footer-links">
					<a href="#">Home</a>
					&nbsp;·&nbsp; 
					<a href="/#/app">Get Started</a>
					
					</p>
					<p className="footer-company-name">Streets Ahead by Ammar Karim © 2015</p>
				</footer>
			)
	}
}