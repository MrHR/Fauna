import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import { EncounterPartSelectActive, EncounterPartInitUpdate } from './../../../Actions/EncounterPartActions'

import icon_edit from '../../../../../public/images/icon_edit.svg';

import CreateFollow from './CreateFollow'
import NextPart from './NextPart'
import UuidCopy from './../../General/UuidCopy'

const text = css({
	padding:'40px 0',
	fontFamily:'Lora',
	backgroundColor:'#ddd',
	padding:'40px 20px 30px 20px',
	position:'relative',
	':hover': {
		'> button': {
			display:'block !important'
		}
	}
})

const link = css({
	textDecoration:'none',
	padding:'5px',
	cursor:'pointer',
	color:'white',
	backgroundColor:'black',
	borderRadius:'5px',
	fontSize:'0.8em',
	position:'absolute',
	top:'100px',
	opacity:'0.5',
	'::before' : {
		content:'<'
	},
	':hover' : {
		opacity:'1'
	}
})

const edit = css({
	width:'15px',
	opacity: '0.5'
})

const btnEdit = css({
	display:'none',
	position: 'absolute', 
	top:'0',
	right: '0',
	padding:'10px',
	border:'none',
	backgroundColor:'transparent',
	cursor: 'pointer'
})

class Part extends Component {
	constructor(props) {
		super(props)

		this.state = {
			edit: false
		};

		this.handleBack = this.handleBack.bind(this)
		this.initEdit = this.initEdit.bind(this)
		this.cancelUpdate = this.cancelUpdate.bind(this)
	}

	handleBack() {
		this.props.selectEncounterPart(this.props.data.follows, this.props.data)
	}

	initEdit() {
		this.setState({ edit: true });
		//console.log('uuid', this.props.data)
		this.props.initUpdate(this.props.data.uuid)
	}

	cancelUpdate() {
		this.setState({edit: false});
	}

	render() {
		const { list } = this.props.encounterParts;
		let count = 0;
		const following = list.map((index, key) => {
			if(index.follows === this.props.data.uuid) {
				count++;
				return <NextPart data={index} key={key} />
			}
		});

		console.log('part', this.props.encounterParts)

		return (
			<div>
				{ this.props.encounter.detail ?
						this.props.data.uuid !== this.props.encounter.detail.start_encounter_part_uuid ?
							<a {...link} onClick={this.handleBack}>&nbsp;back</a>
							:
							( this.props.story.detail ? <Link {...link} to={`/edit/${this.props.story.detail.uuid}`}>&nbsp;back</Link> : null )
					: null
				}

				{this.state.edit ? null : 
					<div {...text}>
						
						{!this.props.story.readMode ? 
							<button {...btnEdit} onClick={this.initEdit}>
								<img {...edit} src={icon_edit} alt="icon edit"/>
							</button>
							: null}
						
						{this.props.data.story_text}

						{this.props.encounterParts.active && !this.props.story.readMode ? 
							<UuidCopy uuidName={''}>{this.props.encounterParts.active}</UuidCopy>
						:null}
					</div>
				}

				{count > 0 ? 
					<div>
						<h4>Encounter Parts</h4>
						<ul>
							{following}
						</ul>
					</div>
				:null}

				{!this.props.story.readMode ? 
					<CreateFollow cancelUpdate={this.cancelUpdate}/>
					: null
				}
				
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
			selectEncounterPart: (id, data) => { dispatch(EncounterPartSelectActive(id, data) )},
			initUpdate: (id) => { dispatch(EncounterPartInitUpdate(id))}
		}
	}
)(Part)