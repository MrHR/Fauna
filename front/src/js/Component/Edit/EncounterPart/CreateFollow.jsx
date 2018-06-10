import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { withRouter } from 'react-router-dom';

import { EncounterPartCreateItem, EncounterPartUpdateItem } from './../../../Actions/EncounterPartActions'

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

const btnCancel = css({
	backgroundColor: '#888 !important'
})

const wrapperSubmit = css({
	display:'flex',
	justifyContent: 'space-between',
	'> button': {
		maxWidth:'45%'
	},
	'> a': {
		maxWidth:'45%'
	}
})

class CreateFollow extends Component {
	constructor() {
		super()
		this.state = {
			cta: '',
			story_text: '',
			update: null
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.cancelUpdate = this.cancelUpdate.bind(this)
	}

	componentWillReceiveProps(prevProps) {
		if(this.props.encounterParts.detail) {
			console.log('new data', this.props.encounterParts.detail)
			this.setState({
				update: this.props.encounterParts.detail.uuid || null,
				cta: this.props.encounterParts.detail.cta || '',
				story_text: this.props.encounterParts.detail.story_text || ''
			})
		} else {
			this.cancelUpdate();
		}
	}

	handleSubmit() {
		const data = this.state;
		data['follows'] = this.props.encounterParts.active;
		data['encounter_uuid'] = this.props.encounter.detail.uuid;
		
		if(this.state.update) {
			this.props.updateItem(data);
		} else {
			this.props.createItem(data);
		}
		
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	cancelUpdate() {
		this.setState({
			update: null,
			type: '',
			cta: '',
			story_text: ''
		}, () => {
			this.props.cancelUpdate();
		})
	}

	render() {
		return (
			<div>
				{this.state.update ? 
					<h4>Update the Encounter Part</h4>
					:
					<h4>Create an Encounter Part</h4>
				}
				
				<div>
					<label htmlFor={'cta'}>cta</label>
					<input type="text" name="cta" onChange={(e) => this.handleChange(e) } placeholder={'cta'} value={this.state.cta} />
				</div>

				<div>
					<label htmlFor={'story_text'}>text</label>
					<textarea type="text" name="story_text" onChange={(e) => this.handleChange(e)} placeholder={'story_text'} value={this.state.story_text}/>
				</div>

				{this.state.update ?
					<div {...wrapperSubmit}>
						<button className={'button'} {...btnCancel} onClick={this.cancelUpdate}>Cancel</button> 
						<a className={'button'} onClick={this.handleSubmit}> <span>Update</span> </a>	
					</div>
					:
					<a className={'button'} onClick={this.handleSubmit}> <span>Create</span></a>
				}

			</div>
		)
	}
}

export default withRouter(connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter,
			encounterParts: state.encounterParts
		}
	}, 
	dispatch => {
		return {
			createItem: (data) => { dispatch(EncounterPartCreateItem(data))},
			updateItem: (data) => { dispatch( EncounterPartUpdateItem(data) )},
		}
	}
)(CreateFollow))