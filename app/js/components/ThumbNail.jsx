import React from 'react';
import Img from './Img';
import BasicInfo from './BasicInfo';
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var TeamStore = require('../stores/TeamStore');
var reactMixin = require('react-mixin');

// reactMixin(ThumbNail.prototype, Firebase);

class ThumbNail extends React.Component {
	constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this._updateArticle = this._updateArticle.bind(this);

    this.state = {
			name: this.getTeamState(),
			articles: []
			};
	}
	
	//retrieves current team name from TeamStore
	getTeamState() {
		return  TeamStore.getSelected() ;
	}
	//gets the team name and stores it as initial state in 'name'
	//initializes articles as []
	
	// sets baseUrl as prop with base firebase node
	

	// updates the node being referred to using the state 'name'
	_updateArticle() {
		//set teamRef as the node indicated by state.name
		var teamRef = new Firebase(this.props.baseUrl + this.state.name + "/results");
		// binds articles with node from teamRef
		this.bindAsArray(teamRef, 'articles');
		
	}

	//triggered when component mounts
	componentDidMount() {
		//adds the change listener to listen to changes in TeamStore
		TeamStore.addChangeListener(this._onChange);
		// triggers updateArticle
		// bind article to current state.name
		this._updateArticle();
		
	}

	//triggered when component unmounts
	componentWillUnmount() {
		//removes change listener
		TeamStore.removeChangeListener(this._onChange);
		//unbinds article from articles
		if(this.articles == '[]'){
			console.log(this.articles);
			this.unbind("articles");
		}
		//this.unbind("articles");
	}
	//renders BasicInfo with all the articles
	render() {
		return (

			<ul className="tiles">
				<BasicInfo article={this.state.articles} />
	        </ul>
			)	
	}
	//this is added when the component mounts 
	//gets triggered when team name changes
	_onChange() {
		//sets teamname as the current one in TeamStore
		var team = this.getTeamState();
		//when this changes, this entire function is triggered
		this.setState({name: team}, function(){
			//articles is unbound
			this.unbind("articles");
			//articles is bound to a new node
			this._updateArticle();
		});
	}

}

	// sets baseUrl as prop with base firebase node
ThumbNail.defaultProps = {
 baseUrl: "https://shining-inferno-1085.firebaseio.com/"
};

reactMixin(ThumbNail.prototype, ReactFireMixin);

 export default ThumbNail;
