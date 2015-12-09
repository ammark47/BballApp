import React from 'react';

export default class Img extends React.Component {
	render () {
			return (<img src={this.props.image} width="282" height="200" />)
		}
}