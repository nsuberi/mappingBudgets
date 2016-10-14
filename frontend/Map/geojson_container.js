import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import {
	fetchItems
} from './geojson_actions';
//import L from 'leaflet';

import { Map, TileLayer, GeoJson } from 'react-leaflet';

var geojson = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

	"features": [
	{ "type": "Feature", "properties": { "NAME": "Smith St & Bergen St At Ne Corner (To Manhattan And Queens Only)", "URL": "http:\/\/www.mta.info\/nyct\/service\/", "LINE": "F-G" }, "geometry": { "type": "Point", "coordinates": [ -73.990271999344998, 40.686727997981862 ] } },
	{ "type": "Feature", "properties": { "NAME": "Court St & Montague St At Sw Corner", "URL": "http:\/\/www.mta.info\/nyct\/service\/", "LINE": "2-3-4-5-N-R" }, "geometry": { "type": "Point", "coordinates": [ -73.990678000925513, 40.693724998853824 ] } },
	{ "type": "Feature", "properties": { "NAME": "Court St & Montague St At Sw Corner", "URL": "http:\/\/www.mta.info\/nyct\/service\/", "LINE": "2-3-4-5-N-R" }, "geometry": { "type": "Point", "coordinates": [ -73.990591999101738, 40.693641998305573 ] } },
	{ "type": "Feature", "properties": { "NAME": "Clinton St & Montague St At Nw Corner", "URL": "http:\/\/www.mta.info\/nyct\/service\/", "LINE": "2-3-4-5-N-R" }, "geometry": { "type": "Point", "coordinates": [ -73.992537356702158, 40.694392786197241 ] } },
	{ "type": "Feature", "properties": { "NAME": "Flatbush Ave & Empire Blvd At Sw Corner", "URL": "http:\/\/www.mta.info\/nyct\/service\/", "LINE": "B-Q-S" }, "geometry": { "type": "Point", "coordinates": [ -73.96224891524794, 40.662727024905131 ] } },
	]
}

var geojson2 = {
	"type" : "FeatureCollection",

	"features": [{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7381722547457,40.2376254551508],[-74.7382279632499,40.23759092658],[-74.7384532227379,40.2378043788691],[-74.7383975142337,40.2378389020438],[-74.7381722547457,40.2376254551508]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7746640840801,40.2228580943258],[-74.7746696652727,40.2228525257235],[-74.7747099908734,40.22281595839],[-74.7748151773785,40.2228780484832],[-74.7748900144625,40.2229292082166],[-74.7748648127608,40.2229455956628],[-74.7746640840801,40.2228580943258]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7484025925056,40.2192802809604],[-74.7483646761888,40.2192304819013],[-74.7480949722051,40.2188762875109],[-74.7482537061435,40.2188158000093],[-74.7486148819712,40.2192901033557],[-74.7485380816671,40.2193193690936],[-74.7484561408381,40.2193505971525],[-74.7484025925056,40.2192802809604]]]},"properties":{"parc_type":"VACANT LOT","taxes":"5460.64000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7439410981032,40.2240523463388],[-74.7439858762471,40.224029593491],[-74.7441702597496,40.2242487951459],[-74.7441254744111,40.2242715524903],[-74.7439410981032,40.2240523463388]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7427937484327,40.1998172683524],[-74.7431742713754,40.1997635131758],[-74.7431611394749,40.1997819987403],[-74.7431269094793,40.1998302203885],[-74.743092664195,40.1998784411373],[-74.7430584270048,40.1999266681813],[-74.7427937484327,40.1998172683524]]]},"properties":{"parc_type":"VACANT LOT","taxes":"2932.88000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7548252672722,40.2006043729936],[-74.7551938139433,40.2005472480571],[-74.7551943805162,40.2005496357572],[-74.7552020625251,40.2005823189189],[-74.7551843287936,40.2005850672471],[-74.7551845509262,40.2005878110787],[-74.7548341408828,40.2006421301302],[-74.7548252672722,40.2006043729936]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7508665955169,40.2031256978927],[-74.7509501029649,40.2031051357935],[-74.7510595594511,40.2033665156524],[-74.7509760367146,40.2033870777516],[-74.750890807065,40.2034080589348],[-74.7507813667666,40.203146679076],[-74.7508665955169,40.2031256978927]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7599368375149,40.206172587495],[-74.7601203756548,40.2061447894506],[-74.7601361173878,40.2062039675392],[-74.7599525801474,40.2062317664829],[-74.7599368375149,40.206172587495]]]},"properties":{"parc_type":"VACANT LOT","taxes":"2841.59000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7548610090283,40.2007564339624],[-74.755194161981,40.2007065719508],[-74.7551681850637,40.2007480324958],[-74.7548699060213,40.2007942693402],[-74.7548610090283,40.2007564339624]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7693842165083,40.2273706882067],[-74.7694794628069,40.2272723914078],[-74.7695100811252,40.2272970589123],[-74.7694194609393,40.2273905875057],[-74.7693842165083,40.2273706882067]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7548431493918,40.2006804484441],[-74.7551877264323,40.2006270305132],[-74.7551908560731,40.2006656492005],[-74.7548520158078,40.2007181714066],[-74.7548431493918,40.2006804484441]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7548163855677,40.2005665430116],[-74.7551849169503,40.2005094126793],[-74.7551938139433,40.2005472480571],[-74.7548252672722,40.2006043729936],[-74.7548163855677,40.2005665430116]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7594559331447,40.214569070906],[-74.7593044585338,40.2146628926785],[-74.7592649962825,40.2146255780081],[-74.7593894795408,40.2145237603634],[-74.7594006230403,40.2145168598653],[-74.7594559331447,40.214569070906]]]},"properties":{"parc_type":"VACANT LOT","taxes":"7451.69000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7548699060213,40.2007942693402],[-74.7551681850637,40.2007480324958],[-74.755079774512,40.2008014144539],[-74.7550357778788,40.2008279813263],[-74.7549911742033,40.200854914223],[-74.7549480040471,40.2008809729787],[-74.7549001951878,40.2009098484108],[-74.7548974594501,40.2009114959689],[-74.7548699060213,40.2007942693402]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7552920199107,40.2234135084268],[-74.7553192720666,40.2233597838271],[-74.755653066236,40.2234592695298],[-74.7556258077848,40.2235130058206],[-74.7552920199107,40.2234135084268]]]},"properties":{"parc_type":"VACANT LOT","taxes":"336.650000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7575646516873,40.2047676917756],[-74.757725145599,40.204741292177],[-74.75774131451,40.204803219493],[-74.7577574681326,40.204865135118],[-74.7577736298491,40.2049270570381],[-74.7577820600939,40.2049593615854],[-74.7577904831441,40.2049916652333],[-74.757806651156,40.2050535871534],[-74.7576461572443,40.2050799813561],[-74.7575646516873,40.2047676917756]]]},"properties":{"parc_type":"VACANT LOT","taxes":"1717.51000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7482537061435,40.2188158000093],[-74.7484101620993,40.2187561776556],[-74.7487782087473,40.2192278621762],[-74.7486148819712,40.2192901033557],[-74.7482537061435,40.2188158000093]]]},"properties":{"parc_type":"VACANT LOT","taxes":"467.890000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7458751746995,40.2185435176693],[-74.7459554553799,40.2185131331747],[-74.7461127998658,40.2187597407695],[-74.7460325272792,40.2187901261635],[-74.7458751746995,40.2185435176693]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.7479923316807,40.2093324850063],[-74.7479795469185,40.2093013540743],[-74.7479692029164,40.2092761604666],[-74.7482926701705,40.2094090982515],[-74.7482710225895,40.2094409558356],[-74.7479923316807,40.2093324850063]]]},"properties":{"parc_type":"VACANT LOT","taxes":"2128.34000000"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-74.759842106528,40.2338329853042],[-74.7599092193349,40.2337669184086],[-74.7599131745533,40.2337692827262],[-74.7598460698401,40.2338353433266],[-74.759842106528,40.2338329853042]]]},"properties":{"parc_type":"VACANT LOT","taxes":"0.00000000000"}}]
}

export class GeoJsonContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			center: [40.2171,-74.7429],
			zoom:13,
      geojson:null


		/*	{
			"type": "FeatureCollection",
			"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },

				"features": []
			}
		*/

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
				layer.bindPopup("Hello!");
			}
		})
	}

	componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
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
			  style={{"height":"400px", "width":"100%"}}
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

//module.exports = GeoJsonContainer;

	function mapStateToProps(state) {
		return {
			geojson: state.geojson
		}
	}

	export default connect(mapStateToProps, {
		fetchItems
	})(GeoJsonContainer);
