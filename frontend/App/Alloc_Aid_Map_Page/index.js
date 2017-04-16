import React, { Component } from 'react';
import AllocAidContainer from '../../Alloc_Aid_Map/alloc_aid_container';
// import FormContainer from '../../Form/form_container'
//require('style!css!normalize');
//require('expose?$!expose?jQuery!jquery');
//require('bootstrap-webpack');
require('bootstrap')
import { Grid, Col, Row } from 'react-bootstrap';

require('!style!css!./index.css')

export default class Main extends Component {
	render() {
		return (
			<div id="Alloc_Aid_MapUI">
				<Grid>
					<Row className="show-grid">

						<Col lg={9} md={9} sm={9}>
							<AllocAidContainer/>
						</Col>

						<Col lg={3} md={3} sm={3}>
							// <FormContainer/>
							// replace with griddle table to display ranked list
						</Col>

					</Row>
				</Grid>
			</div>

		)
	}
}
