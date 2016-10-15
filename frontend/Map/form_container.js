import React, { Component } from 'react';
var ReactDOM = require('react-dom');
import { Field , reduxForm } from 'redux-form';

export class FormContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
		}
	}

  handleSubmit = (values) => {
    console.log(values);
  }

	render() {
		return (
      <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email"/>
          </div>
          <button type="submit">Submit</button>
        </form>
		);
	}
}

export default reduxForm({
	form: 'container'
})(FormContainer)
