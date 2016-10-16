import React, { Component } from 'react';
import GeoJsonContainer from '../Map/geojson_container';
import FormContainer from '../Form/form_container'
//require('style!css!normalize');
//require('expose?$!expose?jQuery!jquery');
//require('bootstrap-webpack');
require('bootstrap')
import { Grid, Col, Row } from 'react-bootstrap';

require('!style!css!./index.css')

export default class Main extends Component {
	render() {
		return (
			<div id="MapUI">
				<h1>GeoJsonContainer App</h1>
				<Grid>
					<Row className="show-grid">

						<Col lg={9} md={9} sm={9}>
							<GeoJsonContainer/>
						</Col>

						<Col lg={3} md={3} sm={3}>
							<FormContainer/>
						</Col>

					</Row>
				</Grid>
			</div>

		)
	}
}
