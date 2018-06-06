import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';

import { StoryFetchItem } from './../../../Actions/StoryActions'

import Create from './Create'
import List from './List'

const header = css({
})

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
			<div>
				{ this.props.story.detail ? 
					<span>
						<h3 {...header}>{this.props.story.detail.title}</h3>
						<List uuid={this.props.match.params.uuid} />
						<Create />
					</span>
				: <span>loading</span> }
			</div>
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