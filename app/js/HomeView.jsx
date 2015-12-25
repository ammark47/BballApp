var React = require('react');
var BigPic = require('./components/Jumbotron');

var Major = require('./components/Major');
var Footer = require('./components/Footer');
var GA = require('./components/GA');


export default class HomePage extends React.Component {
    render() {
		return (
				<div>
					
					<BigPic />
					<Major />
					<Footer />
					<GA />
				</div>
			)
	}
}

//module.exports = HomePage;