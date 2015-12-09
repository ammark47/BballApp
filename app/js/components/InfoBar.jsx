import React from 'react';

export default class InfoBar extends React.Component {
	render() {
		return (
				<div className={this.props.column} >
					<span className={this.props.icon}></span>
					<div className="title">
						<h2>{this.props.title}</h2>
						<span className="byline" >{this.props.description}</span>
					</div>
				</div>
			)
	}
}