import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';


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
	}
	render() {
		return (
			<div className="page" {...Container}>
				<span>
				<h1>Edit Storyline</h1>					
					<switch>
						<Route path={`/edit/:uuid/:encounter_uuid`} exact component={EncounterPartApp} />	
						<Route path={`/edit/:uuid`} exact component={EncounterApp} />	
					</switch>
				</span>
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story
		}
	}, 
	dispatch => {
		return {
		}
	}
)(EditApp)