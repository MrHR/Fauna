import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userRegister } from './../../Actions/UserActions';

class RegisterApp extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: null,
      password: null, 
      first_name: null,
      last_name: null
    }
  }
	handleSubmit() {
		const data = this.state;
		this.props.register(data)
	}

	handleChange(e) {
		const curState = this.state;
		curState[e.target.name] = e.target.value;
	}
  render() {
    return (
      <div>
				<div>
					<label htmlFor={'email'}>Email</label>
					<input type="email" name="email" onChange={(e) => this.handleChange(e) } placeholder={'email'} />
				</div>
				<div>
					<label htmlFor={'first_name'}>First name</label>
					<input type="text" name="first_name" onChange={(e) => this.handleChange(e) } placeholder={'First name'} />
				</div>
				<div>
					<label htmlFor={'last_name'}>Last name</label>
					<input type="text" name="last_name" onChange={(e) => this.handleChange(e) } placeholder={'Last name'} />
				</div>
				<div>
					<label htmlFor={'password'}>Password</label>
					<input type="password" name="password" onChange={(e) => this.handleChange(e) } placeholder={'Password'} />
				</div>
        <a onClick={this.handleSubmit}>Submit</a>
      </div>
    )
  }
}
export default connect(
	state => {
		return {
		}
	}, 
	dispatch => {
		return {
			register: (data) => { dispatch( userRegister(data) )}
		}
	}
)(RegisterApp)