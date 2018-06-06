import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userLogin } from './../../Actions/UserActions';

class LoginApp extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: null,
      password: null
    }
  }
	handleSubmit() {
		const data = this.state;
		this.props.login(data)
	}

	handleChange(e) {
		const curState = this.state;
		curState[e.target.name] = e.target.value;
	}
  render() {
    return (
      <div>
				<div>
					<label htmlFor={'username'}>Email</label>
					<input type="email" name="username" onChange={(e) => this.handleChange(e) } placeholder={'email'} />
				</div>
				<div>
					<label htmlFor={'password'}>Password</label>
					<input type="password" name="password" onChange={(e) => this.handleChange(e) } placeholder={'Password'} />
				</div>
        <a onClick={this.handleSubmit}>Submit</a>
        <Link to={'/register'}> Register </Link>
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
			login: (data) => { dispatch( userLogin(data) )}
		}
	}
)(LoginApp)