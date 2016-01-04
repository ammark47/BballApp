import React from 'react';
import ImageLoader from 'react-imageloader';

export default class Image extends React.Component {
	render() {
	    return (
	      <ImageLoader 
	      src={this.props.image}
	      style={{"width": "282px", "height": "200px"}}
	      >
	      </ImageLoader>
	    );
	  }
}