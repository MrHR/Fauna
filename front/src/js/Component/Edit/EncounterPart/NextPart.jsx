import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { EncounterPartSelectActive } from './../../../Actions/EncounterPartActions'

class NextPart extends Component {

	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.props.selectEncounterPart(this.props.data.uuid)
	}
	render() {
		return (
			<li className={'listItem'} onClick={this.handleClick}>
				<a>
					<h3>{this.props.data.cta}</h3>
					<p>
						{this.props.data.story_text}
					</p>
				</a>
			</li>

		)
	}
}

export default connect(
	state => {
		return {
			story: state.story
		}
	}, 
	dispatch => {
		return {
			selectEncounterPart: (id) => dispatch(EncounterPartSelectActive(id))
		}
	}
)(NextPart)