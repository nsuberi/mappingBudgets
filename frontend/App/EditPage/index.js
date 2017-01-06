import React, { Component } from 'react';
import EditControlContainer from '../../AddToMap/editcontrol_container';

require('bootstrap')
import { Grid, Col, Row } from 'react-bootstrap';

require('!style!css!./index.css')

export default class Main extends Component {
	render() {
		return (
      <div id="EditMapUI">
				<Grid>
					<Row className="show-grid">

						<Col lg={9} md={9} sm={9}>
							<EditControlContainer/>
						</Col>

					</Row>
				</Grid>
			</div>

		)
	}
}
