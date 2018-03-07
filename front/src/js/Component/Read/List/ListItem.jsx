
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import Hammer from 'react-hammerjs';


export default class ListItem extends Component {
	constructor(props) {
		super(props);

		this.handlePress = this.handlePress.bind(this);

	}

	handlePress(e) {
		this.props.handlePress();
	}

	render() {
		return (
			<Hammer onPress={this.handlePress}>
				<li className="listItem">
					<Link to={`/edit/${this.props.data.uuid}`}> 
						<h3>{this.props.data.title}</h3>
						<p>{this.props.data.description}</p>
					</Link>

					{this.props.children}

				</li>
			</Hammer>
		)
	}
}