
import React, { Component } from 'react';

export default class ListItem extends Component {
	render() {
		return (
			<li> {this.props.data.title}, {this.props.data.description}</li>
		)
	}
}