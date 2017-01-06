import React, { Component } from 'react';
import TSPContainer from '../../TSP/tsp_container';

require('bootstrap')
import { Grid, Col, Row } from 'react-bootstrap';

require('!style!css!./index.css')

export default class Main extends Component {
	render() {
		return (
			<div id="MapUI">
				<Grid>
					<Row className="show-grid">

						<Col lg={9} md={9} sm={9}>
							<TSPContainer/>
						</Col>

					</Row>
				</Grid>
			</div>

		)
	}
}
