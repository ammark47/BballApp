import React from 'react';
import ImageLoader from 'react-imageloader';

export default class Image extends React.Component {
	constructor(props, context) {
    super(props, context);
    this.preloader = this.preloader.bind(this);
    this.error = this.error.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  openLink(url) {

	}

  	preloader() {
    return <img src="spinner.gif" />;
  }

  	error() {
    return <img src="basketball.jpg" />;
  }

	render() {

	    return (
	      <ImageLoader 
	      src={this.props.item.iurl}
	      style={{"width": "282px", "height": "200px"}}
	      >
	      {this.error()}
	      </ImageLoader>
	    );
	  }
}