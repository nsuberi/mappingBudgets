import React, { Component } from 'react';
import GeoJsonContainer from './geojson_container'


export default class Main extends Component {
	render() {
		return (
			<div>
				<h1>GeoJsonContainers App</h1>
				<GeoJsonContainer />
			</div>
		)
	}
}
