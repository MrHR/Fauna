import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { withRouter } from 'react-router-dom';

import Menu from './../General/ListMenu';

import { userLogout } from './../../Actions/UserActions';



import {
	Link, 
	Match,
	Switch,
	Route
} from 'react-router-dom'

import EncounterApp from './Encounter/EncounterApp'
import EncounterPartApp from './EncounterPart/EncounterPartApp'

const Container = css({

})

class EditApp extends Component {
	constructor() {
		super()

		this.handleClick = this.handleClick.bind(this);

	}

	componentWillReceiveProps(newProps) {
		if(newProps.user.logout) {
			this.props.history.push('/login')
		}
	}

	handleClick() {
		this.props.logout();
	}

	render() {
		return (
			<div className="page" {...Container}>
				<span>
					<h1>Edit Storyline</h1>		
					<Menu>
						<div>
							<Link to={'/'}>Home</Link>
	
							<div onClick={this.handleClick}>
								Logout
							</div>
							
						</div>

					</Menu>	

					<switch>
						<Route path={`/edit/:uuid/:encounter_uuid`} exact component={EncounterPartApp} />	
						<Route path={`/edit/:uuid`} exact component={EncounterApp} />	
					</switch>
				</span>
			</div>
		)
	}
}

export default withRouter(connect(
	state => {
		return {
			user: state.user,
			story: state.story
		}
	}, 
	dispatch => {
		return {
			logout: (data) => { dispatch( userLogout(data) )}
		}
	}
)(EditApp))