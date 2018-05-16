
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ListItem extends Component {
	render() {
		return (
			<li className="listItem">
				<Link to={`/edit/${this.props.data.uuid}`}> 
					<h3>{this.props.data.title}</h3>
					<p>{this.props.data.description}</p>
				</Link>
			</li>
		)
	}
}