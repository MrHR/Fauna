
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

import icon_edit from '../../../../../public/images/icon_edit.svg';

const listItem = css({
	display:'flex',
	alignItems:'center'
})

const link = css({
	positon:'relative',
	boxSizing:'border-box',
	display:'block',
	width:'100%'
})

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
	':hover': {
		backgroundColor:'transparent !important'
	}
})

export default class ListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<li className="listItem" {...listItem}> 
					
					{this.props.children}
					
					<Link to={`/edit/${this.props.data.uuid}`} {...link} > 
						<h3>{this.props.data.title}</h3>
						<p>{this.props.data.description}</p>
					</Link>

					<Link {...editButton} to={`/Create/${this.props.data.uuid}`}>
						<img {...edit} src={icon_edit} alt="icon edit"/>
					</Link>
					
				</li>
		)
	}
}