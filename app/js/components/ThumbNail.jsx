import React from 'react';
import Img from './Img';
import BasicInfo from './BasicInfo';
import Notification from './Notification';
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
			articles: [],
			ignore: true,
			title: ''
			};
	}

	handlePermissionGranted() {
	    console.log('Permission Granted');
	    this.setState({
	      ignore: false
	    });
	 }

	handlePermissionDenied() {
	     console.log('Permission Denied');
	     this.setState({
	       ignore: true
	     });
	}

	handleNotSupported(){
	    console.log('Web Notification not Supported');
	    this.setState({
	      ignore: true
	    });
	  }

	handleNotificationOnClick(e, tag){
	  console.log(e, 'Notification clicked tag:' + tag);
	}

    handleNotificationOnError(e, tag){
      console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag){
      console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag){
      console.log(e, 'Notification shown tag:' + tag);
    }

	handleButtonClick() {

	    if(this.state.ignore) {
	      return;
	    }

	

	    const title = "";
	    const body = 'Hello' + new Date();
	    const tag = "";
	    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
	    // const icon = 'http://localhost:3000/Notifications_button_24.png';

	    // Available options
	    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
	    const options = {
	      tag: tag,
	      body: body,
	      icon: icon,
	      lang: 'en',
	      dir: 'ltr'
	    }
	    this.setState({
	      title: title,
	      options: options
	    });
	}
	
	//retrieves current team name from TeamStore
	getTeamState() {
		return  TeamStore.getSelected() ;
	}
	

	// updates the node being referred to using the state 'name'
	_updateArticle() {
		//set teamRef as the node indicated by state.name
		var teamResRef = new Firebase(this.props.baseUrl + this.state.name + "/results");
		var teamRef = new Firebase(this.props.baseUrl + this.state.name);
		
		// binds articles with node from teamRef
		this.bindAsArray(teamResRef, 'articles');
		teamResRef.limitToLast(1).on('child_added', function(childSnapshot, prevChildKey) {
		  // code to handle new child.
		  // console.log(childSnapshot.val());
		  	if(!childSnapshot.exists()){
		  		console.log(childSnapshot.val());
		  	}
		});
		
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
		        <Notification
	          ignore={this.state.ignore && this.state.title !== ''}
	          notSupported={this.handleNotSupported.bind(this)}
	          onPermissionGranted={this.handlePermissionGranted.bind(this)}
	          onPermissionDenied={this.handlePermissionDenied.bind(this)}
	          onShow={this.handleNotificationOnShow.bind(this)}
	          onClick={this.handleNotificationOnClick.bind(this)}
	          onClose={this.handleNotificationOnClose.bind(this)}
	          onError={this.handleNotificationOnError.bind(this)}
	          timeout={5000}
	          title={this.state.title}
	          options={this.state.options}/>

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
 baseUrl: "https://articleserver.firebaseio.com/"
};

reactMixin(ThumbNail.prototype, ReactFireMixin);

 export default ThumbNail;
