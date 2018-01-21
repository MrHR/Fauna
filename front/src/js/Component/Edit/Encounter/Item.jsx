
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Item extends Component {
	constructor() {
		super()

	}
	render() {
		return (
			<li> {this.props.data.description} <Link to={`/edit/${this.props.data.story_uuid}/${this.props.data.uuid}`}>Edit</Link></li>
		)
	}
}