import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterPartSelectActive } from './../../../Actions/EncounterPartActions'

import CreateFollow from './CreateFollow'
import NextPart from './NextPart'

class Part extends Component {
	constructor() {
		super()
		this.handleBack = this.handleBack.bind(this)
	}
	handleBack() {
		this.props.selectEncounterPart(this.props.data.follows)
	}
	render() {

		const { list } = this.props.encounterParts;

		const following = list.map((index, key) => {
			if(index.follows === this.props.data.uuid) {
				return <NextPart data={index} key={key} />
			}
		})
		return (
			<div>
				{ this.props.data.uuid !== this.props.encounter.detail.start_encounter_part_uuid ?
					<a onClick={this.handleBack}>back</a>: null }
				{this.props.data.story_text}
				<CreateFollow />
				{following}
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story,
			encounterParts: state.encounterParts,
			encounter: state.encounter
		}
	}, 
	dispatch => {
		return {
			selectEncounterPart: (id) => dispatch(EncounterPartSelectActive(id))
		}
	}
)(Part)