
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';

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
				</li>
		)
	}
}