import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterPartCreateItem } from './../../../Actions/EncounterPartActions'

const formField = css({
	display: 'block',
	marginBottom: '10px',
	'> input, > textarea': {
		width: '100px',
		height :'30px',
		lineHeight :'30px',
		backgroundColor: '#fff',
		display: 'block',
		border: '1px solid #333'
	}
})
const part = css({
	backgroundColor: '#fff',
	margin: 'auto',
	padding: '50px',
	marginBottom: '30px'
})

class CreateFollow extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			cta: '',
			type: '',
			story_text: ''
		}
	}
	handleSubmit() {
		const data = this.state;
		data['follows'] = this.props.encounterParts.active;
		data['encounter_uuid'] = this.props.encounter.detail.uuid
		this.props.createItem(data)
	}

	handleChange(e) {
		const curState = this.state;
		curState[e.target.name] = e.target.value;
	}

	render() {
		return (

			<div {...part}>
				<div {...formField}>
					<label htmlFor={'type'}>type</label>
					<input type="text" name="type" onChange={(e) => this.handleChange(e) } placeholder={'type'} />
				</div>
				<div {...formField}>
					<label htmlFor={'cta'}>cta</label>
					<input type="text" name="cta" onChange={(e) => this.handleChange(e) } placeholder={'cta'} />
				</div>
				<div {...formField}>
					<label htmlFor={'story_text'}>text</label>
					<textarea type="text" name="story_text" onChange={(e) => this.handleChange(e)} placeholder={'story_text'}></textarea>
				</div>
				<a onClick={this.handleSubmit}> {this.props.encounterParts.created === null ? <span>Create encounterpart</span> : <span>saved</span>} </a>
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter,
			encounterParts: state.encounterParts
		}
	}, 
	dispatch => {
		return {
			createItem: (data) => { dispatch(EncounterPartCreateItem(data))}
		}
	}
)(CreateFollow)