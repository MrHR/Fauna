import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { withRouter } from 'react-router-dom';

import { EncounterPartSelectActive } from './../../../Actions/EncounterPartActions'

class NextPart extends Component {

	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.props.selectEncounterPart(this.props.data.uuid, this.props.data)
	}
	render() {
		return (
			<li className={'listItem'} onClick={this.handleClick}>
				<a>
					<h3>{this.props.data.cta}</h3>
				</a>
			</li>

		)
	}
}

export default withRouter(connect(
	state => {
		return {
			story: state.story
		}
	}, 
	dispatch => {
		return {
			selectEncounterPart: (id, data) => dispatch(EncounterPartSelectActive(id, data))
		}
	}
)(NextPart))