import React from 'react';

import BigPic from './components/Jumbotron';

import Major from './components/Major';
import Footer from './components/Footer';
import GA from './components/GA';
var gA = require('react-google-analytics');

function googleAnalytics() {
	var ga = document.createElement('div');
	document.body.appendChild(ga);
	React.render(<GA />, ga);
	gA('create', 'UA-XXXX-Y', 'auto');
	gA('send', 'pageview');
}

function jumbotron() {
	//jumbotron
	var wrapper = document.createElement('div');
	//set jumbotron id and class
	wrapper.id = "big";
	wrapper.className = "site-wrapper";
	//append div
	document.body.appendChild(wrapper);
	const jumbotron = document.getElementById('big');
	React.render(<BigPic />, jumbotron);
}

function features() {
	//features
	var feature = document.createElement('div');
	//set features id
	feature.id= "featured-wrapper";
	// append div to body
	document.body.appendChild(feature);
	const major = document.getElementById('featured-wrapper');
	 React.render(<Major />, major);
}

function footer() {
	//footer
	var bottom = document.createElement('footer');
	//set footer id
	bottom.id = 'footer';
	bottom.className = "footer-basic-centered";
	//append footer to bottom
	document.body.appendChild(bottom);
	const footer = document.getElementById('footer');
  	React.render(<Footer />, footer);
}

function homepage() {
	jumbotron();
	features();
	footer();
	googleAnalytics();
}

homepage();

