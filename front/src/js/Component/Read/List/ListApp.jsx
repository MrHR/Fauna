import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StoryFetchList } from './../../../Actions/StoryActions'
import ListItem from './ListItem'

class StoryList extends Component {
	constructor() {
		super()
	}
	componentDidMount() {
		this.props.fetchList();
	}
	render() {
		return (
			<div className={'page'}>
				<h2>Stories</h2>
				<ul>
					{this.props.story.list.map((index, key) => {
						return <ListItem key={key} data={index}/>
					})}
				</ul>
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
			fetchList: (data) => { dispatch(StoryFetchList(data))}
		}
	}
)(StoryList)