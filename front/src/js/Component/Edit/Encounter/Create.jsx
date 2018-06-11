import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { withRouter } from 'react-router-dom';

import { EncounterCreateItem, EncounterFetchItem, EncounterUpdateItem } from './../../../Actions/EncounterActions'

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

class Create extends Component {

	constructor() {
		super();

		this.state = {
			description: '',
			start: '',
			update: null,
			edit: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.cancelUpdate = this.cancelUpdate.bind(this)
	}

	componentWillReceiveProps(newProps) {
		if(newProps.encounter.detail) {
			this.setState({
				update: newProps.encounter.detail.uuid || null,
				description: newProps.encounter.detail.description || '',
				start: newProps.encounter.detail.story_text || ''
			})
		} else {
			this.cancelUpdate();
		}
	}
	
	handleSubmit() {
		const data = this.state;
		data['story_uuid'] = this.props.story.detail.uuid;

		if(this.state.update) {
			data['uuid'] = this.props.encounter.detail.uuid
			this.props.updateItem(data)
		} else {
			this.props.createItem(data)
		}

		this.setState({
			update: null,
			description:'',
			start: ''
		});

	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	cancelUpdate() {
		this.setState({
			description: '',
			start: '',
			update: null
		})
	}

	render() {
		//console.log('%c state', 'color:green', this.state)

		return (
			<div>
				<div>
					<h4>{ this.state.update ? 'Update Encounter' : 'Create an Encounter'}</h4>
					<div>
						<label htmlFor={'description'}>Description</label>
						<input type="text" name="description" onChange={(e) => this.handleChange(e)} placeholder={'Short description'} value={this.state.description}/>
					</div>
					<div>
						<label htmlFor={'start'}>Story</label>
						<textarea type="text" name="start" onChange={(e) => this.handleChange(e)} placeholder={'The story goes here'} value={this.state.start}/>
					</div>
					{this.state.update ? 
							<div {...wrapperSubmit}>
								<button className={'button'} {...btnCancel} onClick={this.cancelUpdate}>Cancel</button> 
								<a className={'button'} onClick={this.handleSubmit}> <span>Update</span> </a>
							</div>
						: 
							<a className={'button'} onClick={this.handleSubmit}> <span>Create</span> </a>
					}
					
				</div>
			</div>
		)
	}
}

export default withRouter(connect(
	state => {
		return {
			story: state.story,
			encounter: state.encounter
		}
	}, 
	dispatch => {
		return {
			createItem: (data) => { dispatch( EncounterCreateItem(data) )},
			updateItem: (data) => { dispatch( EncounterUpdateItem(data) )},
			fetchItem: (id) => { dispatch(EncounterFetchItem(id) )}
		}
	}
)(Create))