import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterPartSelectActive } from './../../../Actions/EncounterPartActions'

import CreateFollow from './CreateFollow'
import NextPart from './NextPart'

const text = css({
	padding:'40px 0',
	fontFamily:'Lora',
})

const link = css({
	textDecoration:'none',
	padding:'5px',
	cursor:'pointer',
	color:'white',
	backgroundColor:'black',
	borderRadius:'5px',
	fontSize:'0.8em',
	position:'relative',
	top:'20px',
	opacity:'0.5',
	'::before' : {
		content:'<'
	},
	':hover' : {
		opacity:'1'
	}
})

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
		});
		
		return (
			<div>
				{ this.props.data.uuid !== this.props.encounter.detail.start_encounter_part_uuid ?
					<a {...link} onClick={this.handleBack}>&nbsp;back</a> : null 
				}

				<div {...text}>
					{this.props.data.story_text}
				</div>

				<CreateFollow/>

				<h4>Encounter Parts</h4>
				<ul>
					{following}
				</ul>
				
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