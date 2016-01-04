import React from 'react';
import Guide from './Guide';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';

export default class Info extends React.Component {
	render() {
		return (

				<Grid>
				    <Row className='show-grid'>
				      <Col xs={6} md={4}>
				      	<Guide image="/images/mouse.jpg" title="Choose A Team" description="Pick your favorite NBA basketball team" />
				      </Col>
				      <Col xs={6} md={4}>
				      	<Guide image="/images/explore.jpg" title="Explore" description="Read the latest news about your favorite team" />
				      </Col>
				      <Col xs={6} md={4}>
				      	<Guide image="/images/mouse.jpg" title="Kickback and Relax" description="Or go study but we'll send you a notifiation if theres any news about your team" />
				      </Col>
				    </Row>
				</Grid>

			)
	}
}