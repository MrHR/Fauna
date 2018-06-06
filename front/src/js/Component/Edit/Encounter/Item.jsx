
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

import icon_edit from '../../../../../public/images/icon_edit.svg';

const edit = css({
	zIndex:'100',
	width:'15px'
})

const editButton = css({
	display:'block',
	position: 'absolute !important',
	top: '0',
	right:'0',
	opacity:'0.5',
	cursor: 'pointer',
	padding:'20px',
	border:'none',
	backgroundColor:'transparent',
	':hover': {
		backgroundColor:'transparent !important'
	},
	':focus': {
		outline: 'none',
		border: 'none'
	}
})

export default class Item extends Component {
	constructor() {
		super()

		this.handleEdit = this.handleEdit.bind(this)
	}

	handleEdit(e, uuid) {
		console.log('uuid', uuid)
	}

	render() {
		return (
			<li className="listItem">
				<Link to={`/edit/${this.props.data.story_uuid}/${this.props.data.uuid}`}> 
					{this.props.data.description} 
				</Link>

				<button {...editButton} onClick={(e) => this.handleEdit(e, this.props.data.uuid)}>
					<img {...edit} src={icon_edit} alt="icon edit"/>
				</button>
			</li>
		)
	}
}