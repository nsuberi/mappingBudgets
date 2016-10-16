import React, { Component } from 'react';
var ReactDOM = require('react-dom');

import { connect } from 'react-redux';

import {
	fetchItems
} from './geojson_actions';

import { Map, TileLayer, GeoJson } from 'react-leaflet';

require('style!css!leafletcss')

export class GeoJsonContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			center: [40.2171,-74.7429],
			zoom:13,
      geojson:null
		}
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.props.fetchItems();
	}

	onEachFeature(feature, layer) {
		layer.on({
			click: function(e) {
				layer.bindPopup(
				 "Select this lot in form."
			}
		})
	}

	componentDidUpdate(prevProps, prevState) {
    if (!this.state.geojson && this.props.geojson.length !== 0) {
			this.setState({
				geojson: this.props.geojson
			}, () => {
				console.log("Geojson to be loaded")
				console.log("adding geojsonlayer")
			})
		}
  }


	render() {
		console.log(this.state)
		return (
			<Map
				center = {this.state.center}
				zoom={this.state.zoom}
			  style={{"height": "100vh"}}
			>
				<TileLayer
					attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			/>
				{ this.state.geojson ?
					<GeoJson
						data={this.state.geojson}
						onEachFeature={this.onEachFeature}
					/>
					: null
				}
			</Map>
		);
	}
}

	function mapStateToProps(state) {
		return {
			geojson: state.geojson
		}
	}

	export default connect(mapStateToProps, {
		fetchItems
	})(GeoJsonContainer);
