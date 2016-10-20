import React, { Component } from 'react';
var ReactDOM = require('react-dom');
var path = require('path');

var pic1 = require('../../graphhopper/img/marker-icon-green.png');
var pic2 = require('../../graphhopper/img/marker-icon.png');

import { connect } from 'react-redux';

require('style!css!leafletcss')
require('style!css!./index.css')

// Graph Hopper initialization

import L from 'leaflet';
import { GHUtil, GHInput, graphhopper } from '../../graphhopper/GHUtil';
import { GraphHopperOptimization } from '../../graphhopper/GHOptimizer';
import { GraphHopperRouting } from '../../graphhopper/GHRouting';

var host;// = "http://localhost:9000/api/1";
var defaultKey = "8fadfc65-e464-46a7-9680-f321678f4275";
var profile = "car";

import $ from 'jquery';

var ghRouting = new GraphHopperRouting({key: defaultKey, host: host, vehicle: profile, elevation: false});
var ghOptimization = new GraphHopperOptimization({key: defaultKey, host: host, profile: profile});

function setupRoutingAPI(map, ghRouting) {
    map.setView([52.521235, 13.3992], 12);

    var instructionsDiv = $("#instructions");
    map.on('click', function (e) {
        if (ghRouting.points.length > 1) {
            ghRouting.clearPoints();
            routingLayer.clearLayers();
        }

        L.marker(e.latlng, {icon: iconObject}).addTo(routingLayer);
        ghRouting.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
        if (ghRouting.points.length > 1) {
            // ******************
            //  Calculate route!
            // ******************
            ghRouting.doRequest(function (json) {
                if (json.message) {
                    var str = "An error occured: " + json.message;
                    if (json.hints)
                        str += json.hints;

                    $("#routing-response").text(str);

                } else {
                    var path = json.paths[0];
                    routingLayer.addData({
                        "type": "Feature",
                        "geometry": path.points
                    });
                    var outHtml = "Distance in meter:" + path.distance;
                    outHtml += "<br/>Times in seconds:" + path.time / 1000;
                    outHtml += "<br/><a href='" + ghRouting.getGraphHopperMapsLink() + "'>GraphHopper Maps</a>";
                    $("#routing-response").html(outHtml);

                    if (path.bbox) {
                        var minLon = path.bbox[0];
                        var minLat = path.bbox[1];
                        var maxLon = path.bbox[2];
                        var maxLat = path.bbox[3];
                        var tmpB = new L.LatLngBounds(new L.LatLng(minLat, minLon), new L.LatLng(maxLat, maxLon));
                        map.fitBounds(tmpB);
                    }

                    instructionsDiv.empty();
                    if (path.instructions) {
                        var allPoints = path.points.coordinates;
                        var listUL = $("<ol>");
                        instructionsDiv.append(listUL);
                        for (var idx in path.instructions) {
                            var instr = path.instructions[idx];

                            // use 'interval' to find the geometry (list of points) until the next instruction
                            var instruction_points = allPoints.slice(instr.interval[0], instr.interval[1]);

                            // use 'sign' to display e.g. equally named images

                            $("<li>" + instr.text + " <small>(" + ghRouting.getTurnText(instr.sign) + ")</small>"
                                    + " for " + instr.distance + "m and " + Math.round(instr.time / 1000) + "sec"
                                    + ", geometry points:" + instruction_points.length + "</li>").
                                    appendTo(listUL);
                        }
                    }
                }
            });
        }
    });

    var instructionsHeader = $("#instructions-header");
    instructionsHeader.click(function () {
        instructionsDiv.toggle();
    });

    var routingLayer = L.geoJson().addTo(map);
    routingLayer.options = {
        style: {color: "#00cc33", "weight": 5, "opacity": 0.6}
    };
}


function setupRouteOptimizationAPI(map, ghOptimization, ghRouting) {
    map.setView([51.505, -0.09], 13);

    L.NumberedDivIcon = L.Icon.extend({
        options: {
            iconUrl: pic2,
            number: '',
            shadowUrl: null,
            iconSize: new L.Point(25, 41),
            iconAnchor: new L.Point(13, 41),
            popupAnchor: new L.Point(0, -33),
            className: 'leaflet-div-icon'
        },
        createIcon: function () {
            var div = document.createElement('div');
            var img = this._createImg(this.options['iconUrl']);
            var numdiv = document.createElement('div');
            numdiv.setAttribute("class", "number");
            numdiv.innerHTML = this.options['number'] || '';
            div.appendChild(img);
            div.appendChild(numdiv);
            this._setIconStyles(div, 'icon');
            return div;
        },
        // you could change this to add a shadow like in the normal marker if you really wanted
        createShadow: function () {
            return null;
        }
    });

    var addPointToMap = function (lat, lng, index) {
        index = parseInt(index);
        if (index === 0) {
            new L.Marker([lat, lng], {
                icon: new L.NumberedDivIcon({iconUrl: pic1, number: '1'}),
                bounceOnAdd: true,
                bounceOnAddOptions: {duration: 800, height: 200}
            }).addTo(routingLayer);
        } else {
            new L.Marker([lat, lng], {
                icon: new L.NumberedDivIcon({number: '' + (index + 1)}),
                bounceOnAdd: true,
                bounceOnAddOptions: {duration: 800, height: 200},
            }).addTo(routingLayer);
        }
    };

    map.on('click', function (e) {
        addPointToMap(e.latlng.lat, e.latlng.lng, ghOptimization.points.length);
        ghOptimization.addPoint(new GHInput(e.latlng.lat, e.latlng.lng));
    });

    var routingLayer = L.geoJson().addTo(map);
    routingLayer.options.style = function (feature) {
        return feature.properties && feature.properties.style;
    };

    var clearMap = function () {
        ghOptimization.clear();
        routingLayer.clearLayers();
        ghRouting.clearPoints();
        $("#vrp-response").empty();
        $("#vrp-error").empty();
    };

    var createSignupSteps = function () {
        return "<div style='color:black'>To test this example <br/>"
                + "1. <a href='https://graphhopper.com/#directions-api'>sign up for free</a>,<br/>"
                + "2. log in and request a free standard package then <br/>"
                + "3. copy the API key to the text field in the upper right corner<div>";
    };

    var optimizeResponse = function (json) {
        if (json.message) {
            $("#vrp-response").text(" ");

            if (json.message.indexOf("Too many locations") >= 0) {
                $("#vrp-error").empty();
                $("#vrp-error").append(createSignupSteps());
            } else {
                $("#vrp-error").text("An error occured: " + json.message);
            }
            console.log(JSON.stringify(json));
            return;
        }
        var sol = json.solution;
        if (!sol)
            return;

        $("#vrp-response").text("Solution found for " + sol.routes.length + " vehicle(s)! "
                + "Distance: " + Math.floor(sol.distance / 1000) + "km "
                + ", time: " + Math.floor(sol.time / 60) + "min "
                + ", costs: " + sol.costs);

        var no_unassigned = sol.unassigned.services.length + sol.unassigned.shipments.length;
        if (no_unassigned > 0)
            $("#vrp-error").append("<br/>unassigned jobs: " + no_unassigned);

        routingLayer.clearLayers();
        for (var routeIndex = 0; routeIndex < sol.routes.length; routeIndex++) {
            var route = sol.routes[routeIndex];

            // fetch real routes from graphhopper
            ghRouting.clearPoints();
            var firstAdd;
            for (var actIndex = 0; actIndex < route.activities.length; actIndex++) {
                var add = route.activities[actIndex].address;
                ghRouting.addPoint(new GHInput(add.lat, add.lon));

                if (!eqAddress(firstAdd, add))
                    addPointToMap(add.lat, add.lon, actIndex);

                if (actIndex === 0)
                    firstAdd = add;
            }

            var routeStyle;
            if (routeIndex === 3) {
                routeStyle = {color: "cyan"};
            } else if (routeIndex === 2) {
                routeStyle = {color: "black"};
            } else if (routeIndex === 1) {
                routeStyle = {color: "green"};
            } else {
                routeStyle = {color: "blue"};
            }

            routeStyle.weight = 5;
            routeStyle.opacity = 1;

            var ghCallback = createGHCallback(routeStyle);
            ghRouting.doRequest(ghCallback, {instructions: false});
        }
    };

    var eqAddress = function (add1, add2) {
        return add1 && add2
                && Math.floor(add1.lat * 1000000) === Math.floor(add2.lat * 1000000)
                && Math.floor(add1.lon * 1000000) === Math.floor(add2.lon * 1000000);
    };

    var createGHCallback = function (routeStyle) {
        return function (json) {
            if (json.message) {
                var str = "An error for the routing occurred: " + json.message;
                if (json.hints)
                    str += json.hints;
                $("#vrp-error").text(str);
                console.log(JSON.stringify(json));

            } else {
                for (var pathIndex = 0; pathIndex < json.paths.length; pathIndex++) {
                    var path = json.paths[pathIndex];
                    routingLayer.addData({
                        "type": "Feature",
                        "geometry": path.points,
                        "properties": {
                            style: routeStyle
                        }
                    });
                }
            }
        };
    };

    var optimizeRoute = function () {
        if (ghOptimization.points.length < 3) {
            $("#vrp-response").text("At least 3 points required but was: " + ghOptimization.points.length);
            return;
        }
        $("#vrp-response").text("Calculating ...");
        ghOptimization.doVRPRequest(optimizeResponse, $("#optimize_vehicles").val());
    };

    $("#vrp_clear_button").click(clearMap);

    // Increase version if one of the examples change, see #2
    var exampleVersion = 2;

    $("#set_example_vrp").click(function () {
        $.getJSON("route-optimization-examples/vrp_lonlat_new.json?v=" + exampleVersion, function (jsonData) {

            clearMap();
            map.setView([51, 10], 6);
            $("#vrp-response").text("Calculating ...");
            ghOptimization.doRequest(jsonData, optimizeResponse);
        });
    });

    $("#set_example_tsp").click(function () {
        $.getJSON("route-optimization-examples/tsp_lonlat_new.json?v=" + exampleVersion, function (jsonData) {

            clearMap();
            map.setView([51, 10], 6);
            $("#vrp-response").text("Calculating ...");
            ghOptimization.doRequest(jsonData, optimizeResponse);
        });
    });

    $("#set_example_tsp2").click(function () {
        $.getJSON("route-optimization-examples/tsp_lonlat_end.json?v=" + exampleVersion, function (jsonData) {

            clearMap();
            map.setView([51, 10], 6);
            $("#vrp-response").text("Calculating ...");
            ghOptimization.doRequest(jsonData, optimizeResponse);
        });
    });

    $("#set_example_us_tour").click(function () {
        $.getJSON("route-optimization-examples/american_road_trip.json?v=" + exampleVersion, function (jsonData) {

            clearMap();
            map.setView([38.754083, -101.074219], 4);
            $("#vrp-response").text("Calculating ...");
            ghOptimization.doRequest(jsonData, optimizeResponse);
        });
    });

    $("#set_example_uk_tour").click(function () {
        $.getJSON("route-optimization-examples/uk50.json?v=" + exampleVersion, function (jsonData) {

            clearMap();
            map.setView([54.136696, -4.592285], 6);
            $("#vrp-response").text("Calculating ...");
            ghOptimization.doRequest(jsonData, optimizeResponse);
        });
    });

    $("#optimize_button").click(optimizeRoute);
}


function createMap(divId) {
    var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    var omniscale = L.tileLayer.wms('https://maps.omniscale.net/v1/ghexamples-3646a190/tile', {
        layers: 'osm',
        attribution: osmAttr + ', &copy; <a href="http://maps.omniscale.com/">Omniscale</a>'
    });

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: osmAttr
    });

    var map = L.map(divId, {layers: [omniscale]});
    L.control.layers({
        "Omniscale": omniscale,
        "OpenStreetMap": osm}).addTo(map);
    return map;
}

export default class TSPContainer extends Component {

	constructor(){
		super();
	}

	componentWillMount() {
	}

	componentDidMount() {
    var vrpMap = createMap('vrp-map');
    setupRouteOptimizationAPI(vrpMap, ghOptimization, ghRouting);
	}

	componentDidUpdate(prevProps, prevState) {
  }


	render() {
    console.log("Directory:")
		console.log(path.join(__dirname))
    console.log(pic1)
    console.log(pic2)
		return (

      <div id="main">
          <div id="logo" className="left">
              <a href="https://graphhopper.com">
                  <img src="https://graphhopper.com/img/header.png" alt="GraphHopper Logo"/>
              </a>
          </div>

          <div id="routing" className="tab-content">

              <div>
                  The Routing API calculates the best path between two or more locations.
                  Calculate your own route via clicking on the map and try
                  <a href="https://graphhopper.com/maps">GraphHopper Maps</a> for a more advanced
                  routing demo.
              </div>
              <br/>

              <div id="routing-response">

              </div>
              <div id="routing-error">
              </div>

              <div id="routing-map"></div>

          </div>

          <div id="optimization" className="tab-content">
              <div>
                  The Route Optimization API gets several locations and vehicles as input and calculates the best
                  route for every of the vehicles, where several constraints like capacity or time windows can be added.
                  Click on the map to add locations and then click 'optimize' or just on one of the examples.
              </div>

              <div id="button-list" className="right">
                  vehicles:
                  <input id="optimize_vehicles" type="number" min="1" max="4"/>
                  <button id="optimize_button">Optimize</button>
                  <button id="vrp_clear_button">Clear</button>
              </div>

              <div className="clear"></div>
              <div id="vrp-map-wrapper">
                  <div id="vrp-map" style={{"height": "400px", "width": "80%"}} ></div>

                  <div id="example-list">
                      <div>
                          <button id="set_example_vrp">Set Vehicle Routing</button>
                      </div>
                      <div>
                          <button id="set_example_tsp">Set Salesman</button>
                      </div>
                      <div>
                          <button id="set_example_tsp2">Set Open Salesman</button>
                      </div>

                      <div>
                          <button id="set_example_us_tour">Set Beauty US Tour</button>
                      </div>
                      <div>
                          <button id="set_example_uk_tour">Set Election Campaign UK</button>
                      </div>

                  </div>
              </div>
              <div className="clear"></div>
              <div id="vrp-error" >
              </div>

              <div id="vrp-response">
              </div>
          </div>
      </div>


		);
	}
}

/*
	function mapStateToProps(state) {
		return {
			geojson: state.geojson
		}
	}

	export default connect(mapStateToProps, {
		fetchItems
	})(GeoJsonContainer);

*/
