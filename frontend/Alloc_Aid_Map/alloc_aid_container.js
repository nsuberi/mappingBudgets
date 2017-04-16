import React, { Component } from 'react';
var ReactDOM = require('react-dom');

import { connect } from 'react-redux';

import {
	fetchMap
//	selectSiteID
} from './alloc_aid_actions';

import { Map, TileLayer, GeoJson } from 'react-leaflet';

require('style!css!leafletcss')

export class AllocAidContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			center: [40.2171,-74.7429],
			zoom:1,
      alloc_aid_geojson:null,
		 	selectedId: null
		}
	}

	componentWillMount() {
	}

	componentDidMount() {
		this.props.fetchMap();
	}

	onEachFeature(feature, layer) {
		layer.on({
			click: function(e) {
				layer.bindPopup("iso3: " + e.target.feature.properties.main_iso3);
			}
		})
	}

	/*
	setSiteID(siteID) {
		this.setState({selectedId: siteID})
	}
	*/

	componentDidUpdate(prevProps, prevState) {
    if (!this.state.alloc_aid_geojson && this.props.alloc_aid_geojson.length !== 0) {
			this.setState({
				alloc_aid_geojson: this.props.alloc_aid_geojson
			})
			console.log(this.props.alloc_aid_geojson),
			() => {
				console.log("Geojson to be loaded")
				console.log("adding geojsonlayer")
			}
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
		{ this.state.alloc_aid_geojson ?
					<GeoJson
						data={this.state.alloc_aid_geojson}
						onEachFeature={this.onEachFeature.bind(this)}
					/>
					: null
				}
			</Map>
		);
	}
}

	function mapStateToProps(state) {
		return {
			alloc_aid_geojson: state.alloc_aid_geojson
		}
	}

	export default connect(mapStateToProps, {
		fetchMap
	})(AllocAidContainer);
