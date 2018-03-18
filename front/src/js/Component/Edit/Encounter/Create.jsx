import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterCreateItem } from './../../../Actions/EncounterActions'

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

class Create extends Component {

	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			character_uuid: '',
			description: ''
		}
	}
	handleSubmit() {
		const data = this.state;
		data['story_uuid'] = this.props.story.detail.uuid;
		this.props.createItem(data)
	}

	handleChange(e) {
		const curState = this.state;
		curState[e.target.name] = e.target.value;
	}


	render() {
		return (
			<div>
				<h4>Create an Encounter</h4>
				<div>
					<label htmlFor={'character_uuid'}>character_uuid</label>
					<input type="text" name="character_uuid" onChange={(e) => this.handleChange(e) } placeholder={'character_uuid'} />
				</div>
				<div>
					<label htmlFor={'description'}>Description</label>
					<input type="text" name="description" onChange={(e) => this.handleChange(e)} placeholder={'description'} />
				</div>
				<div>
					<label htmlFor={'start'}>Description</label>
					<textarea type="text" name="start" onChange={(e) => this.handleChange(e)} placeholder={'start'}></textarea>
				</div>
				<a className={'button'} onClick={this.handleSubmit}> {this.props.encounter.created === null ? <span>Create encounter</span> : <span>saved</span>} </a>
			</div>
		)
	}
}

export default connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter
		}
	}, 
	dispatch => {
		return {
			createItem: (data) => { dispatch( EncounterCreateItem(data) )}
		}
	}
)(Create)