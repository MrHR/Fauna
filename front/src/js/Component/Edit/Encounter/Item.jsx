
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterInitUpdate, EncounterDeleteItem } from './../../../Actions/EncounterActions'

import icon_edit from '../../../../../public/images/icon_edit.svg';
import icon_trash from '../../../../../public/images/icon_trash.png';

const listItem = css({
	':hover': {
		'> .cmdEdit, .cmdDelete': {
			display:'block !important'
		}
	},
	'@media(max-width:600px)': {
		paddingTop:'30px',
		backgroundColor:'#ccc !important',
		'> a': {
			backgroundColor:'white'
		}
	}
})

const edit = css({
	zIndex:'100',
	width:'15px'
})

const iconDelete = css({
	zIndex:'100',
	width:'13px'
})

const listButton = css({
	display:'none',
	position: 'absolute !important',
	opacity:'0.5',
	cursor: 'pointer',
	padding:'20px',
	border:'none',
	backgroundColor:'transparent',
	':hover': {
		backgroundColor:'transparent !important',
		opacity: '1'
	},
	':focus': {
		outline: 'none',
		border: 'none'
	},
	'@media(max-width: 1000px)': {
		display:'block !important'
	}
})

const deleteButton = css({
	top: '-3px',
	right:'0',
	'@media(max-width:600px)': {
		top:'-14px !important'
	}
})

const editButton = css({
	top: '0',
	right:'40px',
	'@media(max-width:600px)': {
		top:'-11px !important'
	}
})

export class Item extends Component {
	constructor(props) {
		super(props)

		this.handleEdit = this.handleEdit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentWillMount() {
	}

	handleEdit() {
		this.props.initUpdate(this.props.data.uuid)
	}

	handleDelete() {
		this.props.deleteEncounter({
			story_uuid: this.props.data.story_uuid,
			uuid: this.props.data.uuid
		});

	}

	render() {
		return (
			<li className="listItem" {...listItem}>
				<Link to={`/edit/${this.props.data.story_uuid}/${this.props.data.uuid}`}> 
					{this.props.data.description} 
				</Link>
				 
				{!this.props.story.readMode ? 
					<div>
						<button className={"cmdDelete"} {...deleteButton} {...listButton} onClick={(e) => this.handleDelete()}>
							<img {...iconDelete} src={icon_trash} alt="icon delete"/>
						</button>
	
						<button className={"cmdEdit"} {...editButton} {...listButton} onClick={(e) => this.handleEdit()}>
							<img {...edit} src={icon_edit} alt="icon edit"/>
						</button>
					</div>
				:
				null
				}
			</li>
		)
	}
}

export default connect(
	state => {
		return {
			encounter: state.encounter,
			story: state.story
		}
	}, 
	dispatch => {
		return {
			initUpdate: (id) => { dispatch( EncounterInitUpdate(id) )},
			deleteEncounter: (id) => { dispatch( EncounterDeleteItem(id) )}
		}
	}
)(Item)