import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import { UserRegister } from './../../Actions/UserActions';

class RegisterApp extends Component {
  constructor(props) {
		super(props)

    this.state = {
      email: null,
      password: null, 
      first_name: null,
      last_name: null
    }
		
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if(newProps.user.registered) {
			this.props.history.push('/')
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
      <div className={"page"}>
			<h1>Register</h1>
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
        <button className={"button"} onClick={this.handleSubmit}>Submit</button>
				<Link to={'/login'}> {'< back'} </Link>
      </div>
    )
  }
}

export default withRouter(connect(
	state => {
		return {
			user: state.user
		}
	}, 
	dispatch => {
		return {
			register: (data) => { dispatch( UserRegister(data) )}
		}
	}
)(RegisterApp))