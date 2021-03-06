import React from 'react';
import InfoBar from './InfoBar';

export default class Major extends React.Component {
	render() {
		return (
				<div className='featured-wrapper'>
					<div className="featured container">
						<div className="major">
							<h2>The Future is Now</h2>
							
						</div>
					
						<InfoBar column="column1 col-md-4 leftColumn" icon="icon fa fa-star" title="Choose Your Team" description="Choose your favorite NBA team." />

						<InfoBar column="column2 col-md-4 middleColumn" icon="icon fa fa-search" title="Explore" description="Explore the latest news and stay Streets Ahead. And by latest news we mean to the minute." />

						<InfoBar column="column3 col-md-4" icon="icon fa fa-dribbble" title="Kickback and Relax" description="...or go study, but leave the tab open and we'll send you notifs about any breaking news." />



					</div>
				</div>
			)
	}
}