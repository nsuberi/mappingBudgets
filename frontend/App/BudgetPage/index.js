import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	fetchBudgetItems
//	selectSiteID
} from './budget_actions';

var Griddle = require('griddle-react');

//require('bootstrap')
//import { Grid, Col, Row } from 'react-bootstrap';

export class BudgetPage extends Component {

	componentDidMount() {
		this.props.fetchBudgetItems();
	}

	render() {

		console.log(this.props.budgetItems)

		return (
			<div id="Budget">
				<p> Budget Goes Here </p>
				<Griddle results={this.props.budgetItems} />
			</div>

		)
	}
}

function mapStateToProps(state) {
	return {
		budgetItems: state.budgetItems
	}
}

export default connect(mapStateToProps, {
	fetchBudgetItems
})(BudgetPage);
