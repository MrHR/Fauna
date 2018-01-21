import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { StoryFetchItem } from './../../../Actions/StoryActions'

import Create from './Create'
import List from './List'

class EncounterPartApp extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		console.log(this.props, 'props')

		this.props.fetchItem(this.props.match.params.uuid);
	}
	render() {
		return (
			<span>
				{ this.props.story.detail ? 
					<span>
						<Create />
						<List />
					</span>
				: <span>loading</span> }
			</span>
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
			fetchItem: (data) => { dispatch( StoryFetchItem(data) )}
		}
	}
)(EncounterPartApp)