import React, { Component } from 'react';
import GeoJsonContainer from './geojson_container';
require('style!css!normalize');
//require('expose?$!expose?jQuery!jquery');
//require('bootstrap-webpack');
import { Grid, Col, Row } from 'react-bootstrap';

require('!style!css!./index.css')

export default class Main extends Component {
	render() {
		return (
			<div>
				<h1>GeoJsonContainers App</h1>
				<Grid>
					<Row className="show-grid">
						<Col sm={3} md={3} lg={3}>

							<GeoJsonContainer />
						</Col>
						<Col sm={3} md={3} lg={3}>
							<p>New Space</p>
						</Col>
					</Row>
				</Grid>
			</div>

		)
	}
}
