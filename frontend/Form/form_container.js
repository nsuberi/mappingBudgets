import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import axios from 'axios';

let FormContainer = (props) => {

	const { handleSubmit } = props;

	const submit = (values) => {
		axios.post('/addBudgetItem', {...values})
	}

		return(<form onSubmit={handleSubmit(submit)}>
			<div>
				<label>Site ID</label>
				<div>
					<Field name="siteID" component="input" type="text" placeholder="Site ID"/>
				</div>
			</div>
      <div>
        <label>Responsible Agency</label>
        <div>
          <Field name="agency" component="select">
            <option></option>
            <option value="HUD">Housing and Urban Development</option>
            <option value="DOT">Department of Transport</option>
            <option value="DOP">Department of Parks</option>
          </Field>
        </div>
      </div>
			<div>
				<label>Project Budget</label>
				<div>
					<Field name="budgetAmt" component="input" type="number" placeholder="Project Budget"/>
				</div>
			</div>
      <div>
        <label>Project Notes</label>
        <div>
          <Field name="notes" component="textarea"/>
        </div>
      </div>
			<div>
				<label htmlFor="priorityProject">Priority Project</label>
				<div>
					<Field name="isPriority" id="priorityProject" component="input" type="checkbox"/>
				</div>
			</div>
      <div>
        <button type="submit">Submit</button>
      </div>
		</form>
		);
	}

FormContainer = reduxForm({
	form: 'container',
  initialValues: { isPriority: false }
})(FormContainer)
/*
FormContainer = connect(
	state => ({
		initialValues: state.siteID
	}),
	{}
)(FormContainer)
*/
export default FormContainer;
